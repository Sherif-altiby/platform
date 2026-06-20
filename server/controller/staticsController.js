import { Lesson } from "../models/lessonCourse.js";
import { Subject } from "../models/model.js";

export const getTeacherStats = async (req, res) => {
  try {
    const teacherId = req.userId;  

    const subjects = await Subject.find({ teachers: teacherId }).select("courses");
    
    const courseIds = subjects.flatMap(subject => subject.courses);

    const totalCourses = courseIds.length;

    const totalLessons = await Lesson.countDocuments({
      course: { $in: courseIds }
    });

    return res.status(200).json({
      success: true,
      data: {
        totalCourses,
        totalLessons
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: "حدث خطأ أثناء جلب الإحصائيات",
      error: error.message
    });
  }
};