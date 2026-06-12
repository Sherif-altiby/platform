import { CourseAccess } from "../models/courseAccessModel.js";
import { List } from "../models/listModel.js";
import { Course } from "../models/model.js";
import { getListsService } from "../services/payment/paymentServices.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getList = asyncHandler(async (req, res) => {
  
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const method = req.query.method?.trim();

  const teacherId = req.userId

  const data = await getListsService({
    page,
    limit,
    method,
    teacherId
  });

  return res.status(200).json({
    status: true,
    error: false,
    message: "Lists fetched successfully",
    ...data,
  });
});

export const addToList = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.userId; // المعرف القادم من الـ Middleware

  // 1. التحقق من إرسال معرف الكورس
  if (!courseId) {
    return res.status(400).json({ message: "معرف الكورس مطلوب" });
  }

  try {
    // 2. التأكد من وجود الكورس فعلياً في قاعدة البيانات
    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return res.status(404).json({ message: "هذا الكورس غير موجود" });
    }

    // 3. التحقق مما إذا كان هناك سجل وصول (Access) مسبق لهذا الطالب
    // نستخدم الموديل الجديد CourseAccess بدلاً من البحث داخل الـ User
    const existingEntry = await CourseAccess.findOne({
      student: userId,
      course: courseId,
    });

    if (existingEntry) {
      return res.status(400).json({
        message: "هذا الكورس موجود بالفعل في قائمتك",
        status: existingEntry.status,
      });
    }

    // 4. إنشاء سجل الوصول الجديد في الموديل المستقل
    const newEntry = await CourseAccess.create({
      student: userId,
      course: courseId,
      status: "pending", // الحالة الافتراضية بانتظار المراجعة
    });

    // الكورسات داخل مصفوفة في موديل المستخدم (Best Practice)

    res.status(201).json({
      success: true,
      message: "تمت إضافة الكورس بنجاح وبانتظار التفعيل",
      entry: newEntry,
    });
  } catch (error) {
    // التعامل مع أخطاء الـ MongoDB (مثل خطأ في صيغة الـ ID)
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "صيغة المعرف (ID) غير صحيحة" });
    }
    console.error("AddToList Error:", error);
    res.status(500).json({ message: "حدث خطأ في السيرفر أثناء الإضافة" });
  }
};

export const userAccessCourse = async (req, res) => {
  // استقبال معرف الطالب ومعرف الكورس من الـ body
  const { userId, courseId } = req.body;

  if (!userId || !courseId) {
    return res.status(400).json({
      message: "معرف الطالب ومعرف الكورس مطلوبان لتفعيل الوصول",
    });
  }

  try {
    // 1. البحث باستخدام المعرفين معاً وتحديث الحالة
    const updatedAccess = await CourseAccess.findOneAndUpdate(
      {
        student: userId,
        course: courseId,
      },
      { status: "open" },
      { new: true }, // لإرجاع البيانات بعد التعديل
    )
      .populate("student", "name email")
      .populate("course", "title");

    // 2. التحقق من وجود السجل
    if (!updatedAccess) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على طلب انضمام لهذا الطالب في هذا الكورس",
      });
    }

    const removeFromList = await List.findOneAndDelete({
      user: userId,
      course: courseId,
    });

    // 3. النجاح
    res.status(200).json({
      success: true,
      message: "تم تفعيل الوصول للكورس بنجاح",
      data: {
        student: updatedAccess.student.name,
        course: updatedAccess.course.title,
        status: updatedAccess.status,
      },
    });
  } catch (error) {
    console.error("Activation Error:", error);
    res.status(500).json({ message: "حدث خطأ أثناء محاولة تفعيل الكورس" });
  }
};
