import { Lesson } from "../../models/lessonCourse.js";
import { Course } from "../../models/model.js";
import { Teacher } from "../../models/teacherModel.js";
import { AppError } from "../../utils/appError.js";

export const getTeacherCourseLessonsService = async ({ teacherId, courseId, }) => {
    if (!courseId) {throw new AppError("Complete all data", 400);}
  
    const teacher = await Teacher.findById(teacherId);
  
    if (!teacher) {throw new AppError("المستخدم غير موجود", 404);}
  
    const course = await Course.findById(courseId).select("subject");
  
    if (!course) {throw new AppError("الكورس غير موجود", 404);}
  
    const lessons = await Lesson.find({ course: courseId }).sort({ createdAt: 1 });
  
    return {
      lessons,
    };
  };