import { Course, Subject } from "../models/model.js";
import { Teacher } from "../models/teacherModel.js";
import uploadImageClodinary from "../utils/uploadImages.js";
import { List } from "../models/listModel.js";
import { Level } from "../models/levelModel.js";
import destroyImageCloudinary from "../utils/destroyImage.js";
import { CourseAccess } from "../models/courseAccessModel.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { createCourseService, updateCourseService } from "../services/teacher/coursesServices.js";
import { requestCourseAccessService } from "../services/payment/paymentServices.js";
import { deleteCourseService } from "../services/note/noteServices.js";

export const addCourse = asyncHandler( async (req, res) => {
    const course = await createCourseService( req.userId, req.body, req.file );

    res.status(201).json({ message: "Course added successfully", error: false, status: true, data: course, });
  }
);

export const updateCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const updatedCourse = await updateCourseService({
    courseId,
    body: req.body,
    file: req.file,
  });

  return res.status(200).json({
    message: "تم تحديث الكورس بنجاح",
    error: false,
    status: true,
    data: updatedCourse,
  });
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const result = await deleteCourseService({ courseId });

  return res.status(200).json({
    message: "Course deleted successfully",
    error: false,
    status: true,
    data: result,
  });
});

export const getSubjectCourses = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { level } = req.query;
    const teacherId = req.userId; // Provided by your auth middleware

    // 1. Verify that this subject belongs to this teacher
    const teacher = await Teacher.findOne({
      _id: teacherId,
      subjects: subjectId, // Assumes 'subjects' is an array of IDs in Teacher schema
    });

    if (!teacher) {
      return res.status(403).json({
        message:
          "Access denied. You are not authorized to manage this subject.",
        error: true,
        status: false,
      });
    }

    // 2. Build the query
    const query = {
      subject: subjectId,
    };

    if (level) {
      query.level = level;
    }

    // 3. Find courses
    const courses = await Course.find(query)
      .populate("subject", "name")
      .sort({ createdAt: -1 });

    if (!courses || courses.length === 0) {
      return res.status(200).json({
        message: "No courses found for this criteria",
        error: false,
        status: true,
        data: [],
      });
    }

    return res.status(200).json({
      message: "Courses retrieved successfully",
      error: false,
      status: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const requestCourseAccess = asyncHandler(async (req, res) => {
  
    const result = await requestCourseAccessService( req.userId, req.file, req.body );

    res.status(201).json({ success: true, message: "تم إرسال طلب الانضمام بنجاح، بانتظار المراجعة", data: result, });
  }
);
