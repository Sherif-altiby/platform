import { CourseAccess } from "../models/courseAccessModel.js";
import { Lesson } from "../models/lessonCourse.js";
import { Course } from "../models/model.js";
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

    // 1. التأكد من وجود الكورس وحالته العامة
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "الكورس غير موجود"
      });
    }

    // 2. إذا كان الكورس مفتوحاً للجميع (Free/Open)، أرسل الدروس فوراً
    if (course.status === "open") {
      const lessons = await Lesson.find({ course: courseId }).sort({ createdAt: 1 });
      return res.status(200).json({
        success: true,
        data: lessons,
      });
    }

    // 3. إذا كان الكورس مغلقاً، نتحقق من وجود صلاحية وصول للطالب في الموديل الجديد
    const accessRecord = await CourseAccess.findOne({
      student: userId,
      course: courseId
    });

    // 4. التحقق من حالة الصلاحية (يجب أن تكون موجودة وحالتها "open")
    if (!accessRecord || accessRecord.status !== "open") {
      // نحدد الحالة لإرسالها للفرونت إند (pending أو close)
      const currentStatus = accessRecord ? accessRecord.status : "close";

      return res.status(403).json({
        success: false,
        message: "عذراً، هذا الكورس غير مفعل لك حالياً. يرجى الاشتراك أو انتظار التفعيل.",
        status: currentStatus,
      });
    }

    // 5. إذا وصل الكود هنا، فهذا يعني أن الطالب لديه صلاحية "open"
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

    if (!courseId) {
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


export const teacherUpdateLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { title, videoUrl, description } = req.body;

    if (!lessonId) {
      return res.status(400).json({ message: " Complete all data " });
    }

    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found." });
    }

    lesson.title = title || lesson.title;
    lesson.videoUrl = videoUrl || lesson.videoUrl;
    lesson.description = description || lesson.description;

    await lesson.save();

    return res.status(200).json({
      message: "Lesson updated successfully",
      success: true,
      data: lesson,
    });
  } catch (error) {
    console.error("Error updating lesson:", error);
    res.status(500).json({ message: "حدث خطأ في الخادم أثناء تحديث الدرس" });
  }
};
