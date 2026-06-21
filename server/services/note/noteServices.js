import { Level } from "../../models/levelModel.js";
import { PdfModel } from "../../models/pdfModel.js";
import { CourseAccess } from "../../models/courseAccessModel.js";
import { AppError } from "../../utils/appError.js";

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
    throw new AppError("Pdf not found", 404);
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