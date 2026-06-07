import { validationResult } from "express-validator";
import { Course, Subject, User } from "../models/model.js";
import { Teacher } from "../models/teacherModel.js";
import uploadImageClodinary from "../utils/uploadImages.js";
import { List } from "../models/listModel.js";
import { Level } from "../models/levelModel.js";
import destroyImageCloudinary from "../utils/destroyImage.js";
import { CourseAccess } from "../models/courseAccessModel.js";

export const addCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        error: true,
        status: false,
        details: errors.array(),
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Course image file is required",
        error: true,
        status: false,
      });
    }

    const { title, subjectId, price, offer, offerExpirt, level, status } =
      req.body;
    const teacherId = req.userId;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res
        .status(404)
        .json({ message: "Teacher not found", error: true, status: false });
    }

    const isSubjectExist = await Subject.findById(subjectId);
    if (!isSubjectExist) {
      return res
        .status(404)
        .json({ message: "Subject not found", error: true, status: false });
    }

    const foundLevel = await Level.findById(level);
    if (!foundLevel) {
      return res.status(404).json({
        message: "المستوى الدراسي غير موجود",
        error: true,
        status: false,
      });
    }

    // 2. Upload to Cloudinary
    const uploaded = await uploadImageClodinary(req.file.buffer);

    const course = new Course({
      title,
      subject: subjectId,
      image: uploaded.secure_url,
      price,
      offer,
      offerExpirt,
      level: foundLevel._id,
      status,
    });

    await course.save();

    isSubjectExist.courses.push(course);

    await isSubjectExist.save();

    return res.status(201).json({
      message: "Course added successfully",
      error: false,
      status: true,
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({
        message: "Course ID is required",
        error: true,
        status: false,
      });
    }

    const { title, subjectId, price, offer, offerExpirt, level, status } =
      req.body;

    if (offer >= price  && status !== "open") {
      return res.status(400).json({
        message: "Offer cannot be greater than or equal to the original price",
        error: true,
        status: false,
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ message: "الكورس غير موجود", error: true, status: false });
    }

    let imageUrl = course.image;
    if (req.file) {
      if (course.image) {
        const destroyImage = await destroyImageCloudinary(course.image);
      }
      const uploaded = await uploadImageClodinary(req.file.buffer);
      imageUrl = uploaded.secure_url;
    }

    if (subjectId && subjectId !== course.subject.toString()) {
      await Subject.findByIdAndUpdate(course.subject, {
        $pull: { courses: courseId },
      });

      await Subject.findByIdAndUpdate(subjectId, {
        $push: { courses: courseId },
      });
    }

    let levelName = course.level;
    if (level) {
      const foundLevel = await Level.findById(level);
      if (foundLevel) levelName = foundLevel._id;
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        title: title || course.title,
        subject: subjectId || course.subject,
        image: imageUrl,
        price: price || course.price,
        offer: offer || course.offer,
        offerExpirt: offerExpirt || course.offerExpirt,
        level: levelName,
        status: status || course.status,
      },
      { new: true },
    );

    return res.status(200).json({
      message: "تم تحديث الكورس بنجاح",
      error: false,
      status: true,
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Update Course Error:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        error: true,
        status: false,
      });
    }

    if (course.subject) {
      await Subject.findByIdAndUpdate(course.subject, {
        $pull: { courses: courseId },
      });
    }

    const deleteImg = await destroyImageCloudinary(course.image);

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      message: "Course deleted successfully and removed from subject list",
      error: false,
      status: true,
      deleteImg,
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

export const requestCourseAccess = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.userId;

    // 1. التحقق من وجود البيانات الأساسية
    if (!courseId) {
      return res.status(400).json({ message: "معرف الكورس مطلوب" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "يرجى إرفاق صورة إيصال الدفع" });
    }

    // 2. التأكد من وجود الكورس في قاعدة البيانات
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "الكورس غير موجود" });
    }

    // 3. التحقق مما إذا كان الطالب قد طلب الكورس مسبقاً (باستخدام الموديل الجديد)
    const alreadyRequested = await CourseAccess.findOne({
      student: userId,
      course: courseId,
    });

    if (alreadyRequested) {
      const statusMessage =
        alreadyRequested.status === "pending"
          ? "طلبك قيد الانتظار حالياً"
          : alreadyRequested.status === "open"
            ? "لديك صلاحية الوصول لهذا الكورس بالفعل"
            : "تم رفض طلبك مسبقاً، يرجى التواصل مع الدعم";

      return res.status(400).json({
        message: statusMessage,
        status: alreadyRequested.status,
      });
    }

    // 4. رفع صورة الإيصال إلى Cloudinary
    const uploaded = await uploadImageClodinary(req.file.buffer);

    // 5. إنشاء سجل الوصول الجديد بحالة "pending"
    // ملاحظة: أضفنا حقل image هنا إذا كنت تريد حفظ الإيصال في نفس موديل الوصول
    const newAccessRequest = new CourseAccess({
      student: userId,
      course: courseId,
      status: "pending",
      receiptImage: uploaded.secure_url, // تأكد من إضافة هذا الحقل للموديل إذا كنت تحتاجه
    });

    await newAccessRequest.save();

    const newList = await List.create({
      user: userId,
      course: courseId,
      image: uploaded.secure_url,
    });

    // ملاحظة: لم نعد بحاجة لعمل $push في موديل User لأننا فصلنا البيانات

    res.status(201).json({
      success: true,
      message:
        "تم إرسال طلب الانضمام بنجاح، بانتظار مراجعة الإيصال وتفعيل الكورس",
      newList,
    });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ message: "حدث خطأ أثناء معالجة الطلب" });
  }
};
