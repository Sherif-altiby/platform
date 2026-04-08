import { Course, Subject, User } from "../models/model.js";
import { Teacher } from "../models/teacherModel.js";
import uploadImageClodinary from "../utils/uploadImages.js";

export const removeSubject = async (req, res) => {
  try {
    const { subId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(subId)) {
      return res.status(400).json({
        message: "Invalid Subject ID format",
        error: true,
        status: false,
      });
    }

    const subject = await Subject.findById(subId);
    if (!subject) {
      return res.status(400).json({
        message: "subject not found",
        error: true,
        status: false,
      });
    }

    if (subject.teachers.length > 0) {
      return res.status(400).json({
        message: "can not remove subject",
        error: true,
        status: false,
      });
    }

    await Subject.findByIdAndDelete(subId);

    return res.status(200).json({
      message: "Subject removed successfully",
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

export const createSubject = async (req, res) => {
  try {
    const { subjectName } = req.body;

    if (!subjectName) {
      return res.status(500).json({
        message: "Complete data",
        error: true,
        status: false,
      });
    }

    const isSubjectExist = await Subject.findOne({ name: subjectName });
    if (isSubjectExist) {
      return res.status(400).json({
        message: "The subjict is exist",
        error: true,
        status: false,
      });
    }

    const uploaded = await uploadImageClodinary(req.file.buffer);

    const newUbject = new Subject({
      name: subjectName,
      image: uploaded.secure_url,
    });
    await newUbject.save();

    return res.json({
      message: "Subject created successfully",
      error: false,
      status: true,
      data: newUbject,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const getAllSubjects = async (req, res) => {
  try {
    const allSubs = await Subject.find({});

    return res.json({
      error: false,
      status: true,
      data: allSubs,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const getSubjectDetails = async (req, res) => {
  try {
    const { subId } = req.body;

    if (!subId) {
      return res.status(400).json({
        message: "Provide sub Id",
        error: true,
        status: false,
      });
    }

    const subDetails = await Subject.findById(subId)
      .populate("teachers", "name avatar about")
      .populate("courses");

    if (!subDetails) {
      return res.status(404).json({
        message: "Not found",
        error: true,
        status: false,
      });
    }

    return res.json({
      error: false,
      status: true,
      data: subDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const getSubjectsByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.body;

    if (!teacherId) {
      return res.status(400).json({
        message: "Provide teacher Id",
        error: true,
        status: false,
      });
    }

    const subjects = await Subject.find({ teachers: teacherId }).populate({
    path: 'courses',       // الحقل المراد تعبئته
    select: 'title _id'    // الحقول المحددة التي تريدها من موديل الكورس
  })

    return res.json({
      error: false,
      status: true,
      data: subjects,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const getStudentCoursesByTeacher = async (req, res) => {
  try {
    const { teacherId, subjectId } = req.body;
    const studentId = req.userId;

    if (!teacherId || !subjectId) {
      return res.status(400).json({
        message: "يرجى إكمال جميع البيانات",
        error: true,
        status: false,
      });
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "المعلم غير موجود" });
    }

    const subjectExistsForTeacher = await Subject.findOne({
      _id: subjectId,
      teachers: teacherId,
    });

    if (!subjectExistsForTeacher) {
      return res.status(403).json({ message: "هذا المعلم لا يدرس هذه المادة" });
    }

    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "الطالب غير موجود" });
    }

    const courses = await Course.find({
      subject: subjectId,
      level: student.level,
    })
      .populate("subject", "name")
      .sort({ createdAt: -1 });

    const results = courses.map((course) => {
      const isCourseGloballyOpen = course.status === "open";

      const accessRecord = student.accessedCourses.find(
        (acc) => acc.course.toString() === course._id.toString(),
      );

      let finalStatus = "close";

      if (isCourseGloballyOpen) {
        finalStatus = "open";
      } else if (accessRecord) {
        finalStatus = accessRecord.status;
      }

      return {
        ...course._doc,
        status: finalStatus,
        teacherPhone: teacher.phone,
      };
    });

    return res.status(200).json({
      success: true,
      error: false,
      data: results,
    });
  } catch (error) {
     return res.status(500).json({ message: "حدث خطأ في الخادم" });
  }
};
