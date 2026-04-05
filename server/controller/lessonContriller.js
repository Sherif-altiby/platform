import { Lesson } from "../models/lessonCourse.js";
import { Course, User } from "../models/model.js";
import { Teacher } from "../models/teacherModel.js";

export const addLesson = async (req, res) => {
  try {
    const { title, videoUrl, description, courseId, subjectId } = req.body;
    const teacherId = req.userId; // From your auth middleware

    // 1. Basic validation
    if (!title || !videoUrl || !courseId || !subjectId) {
      return res.status(400).json({
        message: "Title, Video URL, Course ID, and Subject ID are required.",
        error: true,
        status: false,
      });
    }

    // 2. Security Check: Is the teacher authorized to teach this Subject?
    const teacher = await Teacher.findOne({
      _id: teacherId,
      subjects: subjectId, // Checks if subjectId exists in the teacher's subjects array
    });

    if (!teacher) {
      return res.status(403).json({
        message: "Unauthorized: You are not assigned to this subject.",
        error: true,
        status: false,
      });
    }

    // 3. Consistency Check: Does the Course actually belong to this Subject?
    const course = await Course.findOne({ _id: courseId, subject: subjectId });
    if (!course) {
      return res.status(404).json({
        message:
          "Course not found or does not belong to the specified subject.",
        error: true,
        status: false,
      });
    }

    // 4. Create the Lesson
    const newLesson = new Lesson({
      course: courseId,
      title,
      videoUrl,
      description,
    });

    await newLesson.save();

    return res.status(201).json({
      message: "Lesson created successfully",
      error: false,
      status: true,
      data: newLesson,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const teacherId = req.userId;

    const lesson = await Lesson.findById(lessonId).populate("course");

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found.",
        error: true,
        status: false,
      });
    }

    const subjectId = lesson.course.subject;

    const teacher = await Teacher.findOne({
      _id: teacherId,
      subjects: subjectId,
    });

    if (!teacher) {
      return res.status(403).json({
        message:
          "Unauthorized: You do not have permission to delete lessons in this subject.",
        error: true,
        status: false,
      });
    }

    await Lesson.findByIdAndDelete(lessonId);

    return res.status(200).json({
      message: "Lesson deleted successfully",
      error: false,
      status: true,
      deleteImg
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const getCourseLessons = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;

    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ 
        success: false, 
        message: "الكورس غير موجود" 
      });
    }

    if (course.status === "open") {
      const lessons = await Lesson.find({ course: courseId }).sort({ createdAt: 1 });
      return res.status(200).json({
        success: true,
        data: lessons,
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    const accessRecord = user.accessedCourses.find(
      (acc) => acc.course.toString() === courseId
    );

    if (!accessRecord || accessRecord.status !== "open") {
      const statusLabel = accessRecord ? accessRecord.status : "close";

      return res.status(403).json({
        success: false,
        message: "عذراً، هذا الكورس غير مفعل لك حالياً. يرجى التواصل مع الإدارة.",
        status: statusLabel,
      });
    }

    const lessons = await Lesson.find({ course: courseId }).sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      data: lessons,
    });

  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).json({ 
      success: false, 
      message: "حدث خطأ في الخادم أثناء جلب الدروس" 
    });
  }
};

export const getTeacherCourseLessons = async (req, res) => {
 try {
    const { courseId } = req.params;
    const teacherId = req.userId;

    if(!courseId) {
      return res.status(400).json({ message: " Complete all data " });
    }

    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    const lessons = await Lesson.find({ course: courseId }).sort({
      createdAt: 1,
    });

    return res.status(200).json({
      success: true,
      data: lessons,
    });
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).json({ message: "حدث خطأ في الخادم أثناء جلب الدروس" });
  }
}