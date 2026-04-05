import mongoose from "mongoose";
import { Rating } from "../models/ratingModel.js";
import { Teacher } from "../models/teacherModel.js";

export const userRateTeacher = async (req, res) => {
  try {
    const { teacher, rating } = req.body;
    const userId = req.userId; 

    if (!teacher || !rating) { 
      return res.status(400).json({
        message: "بيانات التقييم غير مكتملة",
        error: true,
        status: false,
      });
    }

    const teacherExists = await Teacher.findById(teacher);
    if (!teacherExists) {
      return res.status(404).json({
        message: "المعلم غير موجود",
        error: true,
        status: false,
      });
    }

    const updatedRating = await Rating.findOneAndUpdate(
      { user: userId, teacher: teacher },  
      { rating: rating },                 
      { 
        new: true,       
        upsert: true,   
        runValidators: true 
      }
    );


    return res.status(200).json({
      message: "تم تسجيل تقييمك بنجاح",
      error: false,
      status: true,
      data: updatedRating,
    });

  } catch (error) {
    console.error("Error in userRateTeacher:", error);

    // معالجة خطأ الـ Validation (مثلاً لو كان التقييم أكبر من 5)
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "قيمة التقييم غير صالحة (يجب أن تكون بين 1 و 5)",
        error: true,
        status: false,
      });
    }

    return res.status(500).json({
      message: "حدث خطأ في الخادم أثناء تسجيل التقييم",
      error: true,
      status: false,
    });
  }
};
export const getTeacherRatings = async (req, res) => {
  try {
    // التصحيح: المعلم يريد جلب تقييماته هو، لذا نستخدم الـ ID الخاص به من التوكن
    const teacherId = req.userId; 

    if (!teacherId) {
      return res.status(401).json({ message: "غير مصرح لك بالوصول" });
    }

    // التحقق من صحة الـ ID قبل الاستعلام
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        return res.status(400).json({ message: "معرف المعلم غير صحيح" });
    }

    const ratings = await Rating.find({ teacher: teacherId })
      .sort({ createdAt: -1 });

    const stats = await Rating.aggregate([
      // نستخدم new لمنع أي مشاكل في المقارنة داخل MongoDB
      { $match: { teacher: new mongoose.Types.ObjectId(teacherId) } },
      {
        $group: {
          _id: "$teacher",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    const teacherStats = stats.length > 0 ? {
      average: parseFloat(stats[0].averageRating.toFixed(1)),
      total: stats[0].totalReviews
    } : { average: 0, total: 0 };

    return res.status(200).json({
      success: true,
      stats: teacherStats,
      // أضفت لك البيانات الكاملة إذا أردت عرض التعليقات أيضاً
      data: ratings 
    });

  } catch (error) {
    console.error("Error fetching ratings:", error);
    return res.status(500).json({ message: "حدث خطأ أثناء جلب التقييمات" });
  }
};