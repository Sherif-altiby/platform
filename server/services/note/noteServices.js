import { Level } from "../../models/levelModel.js";
import { PdfModel } from "../../models/pdfModel.js";
import { CourseAccess } from "../../models/courseAccessModel.js";
import { AppError } from "../../utils/appError.js";
import destroyPdfCloudinary from "../../utils/destroyFile.js";
import { Course, Subject } from "../../models/model.js";
import destroyImageCloudinary from "../../utils/destroyImage.js";

export const getNoteByLevelService = async ({
  level,
  teacherId,
  studentId,
}) => {
  if (!teacherId || !level) {
    throw new AppError("Complete all data", 400);
  }

  const generalLevel = await Level.findOne({
    name: "عام",
  }).select("_id");

  const levels = [level];

  if (generalLevel?._id) {
    levels.push(generalLevel._id);
  }

  const pdfs = await PdfModel.find({
    teacher: teacherId,
    level: { $in: levels },
  }).populate("course", "title status");

  if (pdfs.length === 0) {
    return [];
  }

  const groupedCourses = new Map();

  for (const pdf of pdfs) {
    if (!pdf.course) continue;

    const courseId = pdf.course._id.toString();

    let status = groupedCourses.get(courseId)?.course.status;

    if (!status) {
      status = pdf.course.status;

      // إذا كان الكورس مغلقًا، نبحث عن حالة وصول الطالب
      if (status === "close" && studentId) {
        const access = await CourseAccess.findOne({
          student: studentId,
          course: pdf.course._id,
        }).select("status");

        if (access) {
          status = access.status;
        }
      }

      groupedCourses.set(courseId, {
        course: {
          _id: pdf.course._id,
          name: pdf.course.title,
          status,
          notes: [],
        },
      });
    }

    const note = {
      _id: pdf._id,
      title: pdf.title,
      lesson: pdf.lesson,
      createdAt: pdf.createdAt,
      updatedAt: pdf.updatedAt,
    };

    // أضف رابط الـ PDF فقط إذا كان الكورس مفتوحًا
    if (status === "open") {
      note.pdf = pdf.pdf;
    }

    groupedCourses.get(courseId).course.notes.push(note);
  }

  const data = Array.from(groupedCourses.values());

  if (data.length === 0) {
    throw new AppError("No valid courses found for these notes", 404);
  }

  return data;
};


export const deleteCourseService = async ({ courseId }) => {
  if (!courseId) {
    throw new AppError("Course ID is required", 400);
  }

  const course = await Course.findById(courseId);

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  // 1. Remove course from subject
  if (course.subject) {
    await Subject.findByIdAndUpdate(course.subject, {
      $pull: { courses: courseId },
    });
  }

  // 2. Get all PDFs related to course
  const pdfs = await PdfModel.find({ course: courseId });

  // 3. Delete PDFs from Cloudinary
  for (const pdfRecord of pdfs) {
    if (pdfRecord.pdf) {
      await destroyPdfCloudinary(pdfRecord.pdf);
    }
  }

  // 4. Delete PDFs from DB
  await PdfModel.deleteMany({ course: courseId });

  // 5. Delete course image from Cloudinary
  let deleteImgResult = null;

  if (course.image) {
    deleteImgResult = await destroyImageCloudinary(course.image);
  }

  // 6. Delete course
  await Course.findByIdAndDelete(courseId);

  return {
    courseId,
    deletedPdfsCount: pdfs.length,
    deleteImgResult,
  };
};