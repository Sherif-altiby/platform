import { CourseAccess } from "../models/courseAccessModel.js";
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



export const getSubjectCourses = async (req, res) => {
  try {
    const { subId } = req.body;
    const studentId = req.userId;

    // 1. التحقق من وجود معرف المادة
    if (!subId) {
      return res.status(400).json({
        success: false,
        message: "Subject ID is required"
      });
    }

    // 2. جلب بيانات الطالب لمعرفة مستواه الدراسي (Level)
    const user = await User.findById(studentId).select("level")
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 3. جلب الكورسات التي تنتمي لهذه المادة "و" تطابق مستوى الطالب
    const courses = await Course.find({
      subject: subId,
      level: user.level // الربط بمستوى الطالب
    })
      .populate("subject")
      .lean();

    console.log(user, courses)

    if (!courses || courses.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No courses found for your level in this subject",
        data: []
      });
    }

    // 4. جلب سجلات الوصول (CourseAccess) الخاصة بهذا الطالب لهذه الكورسات فقط
    const courseIds = courses.map(c => c._id.toString());
    const courseAccessRecords = await CourseAccess.find({
      student: studentId,
      course: { $in: courseIds }
    }).lean();

    // 5. إنشاء Map للمقارنة السريعة O(1)
    const accessMap = new Map(
      courseAccessRecords.map(record => [
        record.course.toString(),
        record.status
      ])
    );

    // 6. الدمج: الأولوية لبيانات سجل الوصول، ثم حالة الكورس الأصلية
    const coursesWithStatus = courses.map(course => {
      const courseIdStr = course._id.toString();

      let finalStatus = course.status; // الحالة الافتراضية من موديل الكورس

      // إذا وُجد سجل في CourseAccess (سواء كان pending أو open)، نأخذه كأولوية
      if (accessMap.has(courseIdStr)) {
        finalStatus = accessMap.get(courseIdStr);
      }

      return {
        ...course,
        status: finalStatus
      };
    });

    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully for your level",
      data: coursesWithStatus
    });

  } catch (error) {
    console.error("Error fetching student courses:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
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
        message: "يرجى إرسال معرف المعلم ومعرف المادة",
        error: true,
        status: false,
      });
    }

    // 2. التحقق من وجود المعلم
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "المعلم غير موجود" });
    }

    // 3. التحقق من أن المعلم يدرس هذه المادة فعلاً
    const subjectExistsForTeacher = await Subject.findOne({
      _id: subjectId,
      teachers: teacherId,
    });

    if (!subjectExistsForTeacher) {
      return res.status(403).json({ message: "هذا المعلم لا يدرس هذه المادة" });
    }

    // 4. جلب بيانات الطالب (لمعرفة المستوى فقط)
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "الطالب غير موجود" });
    }

    // 5. جلب الكورسات المتوافقة مع المادة والمستوى
    const courses = await Course.find({
      subject: subjectId,
      level: student.level,
    })
      .populate("subject", "name")
      .sort({ createdAt: -1 });

      console.log("Courses: ", courses)

    // 6. جلب جميع سجلات الوصول لهذا الطالب من الموديل الجديد
    const allAccessRecords = await CourseAccess.find({ student: studentId });

    // 7. دمج الحالات (Logic Mapping)
    const results = courses.map((course) => {
      const courseObj = course.toObject();
      const isCourseGloballyOpen = courseObj.status === "open";

      // البحث عن سجل الوصول لهذا الكورس تحديداً
      const accessRecord = allAccessRecords.find(
        (acc) => acc.course.toString() === courseObj._id.toString()
      );

      let finalStatus = "close";

      if (isCourseGloballyOpen) {
        finalStatus = "open";
      } else if (accessRecord) {
        finalStatus = accessRecord.status; // ستكون إما open أو pending
      }

      return {
        ...courseObj,
        accessStatus: finalStatus, // نستخدم اسم حقل مختلف لتمييزه عن حالة الكورس الأصلية
        teacherPhone: teacher.phone,
      };
    });

    return res.status(200).json({
      success: true,
      error: false,
      data: results,
    });
  } catch (error) {
    console.error("Error in getStudentCoursesByTeacher:", error);
    return res.status(500).json({ message: "حدث خطأ في الخادم" });
  }
};