import { Course } from "../models/model.js";
import { PdfModel } from "../models/pdfModel.js";
import { v2 as cloudinary } from "cloudinary";
import destroyPdfCloudinary from "../utils/destroyFile.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createNoteService } from "../services/teacher/noteServices.js";

export const createNote = asyncHandler(async (req, res) => {
  const teacherId = req.userId;
  const { title, levelId, subjectId, courseId , lessonId} = req.body;

  const newPdf = await createNoteService({ teacherId, title, levelId, subjectId, courseId, lessonId ,  file: req.file, });

  return res.status(201).json({ message: "تم رفع المذكرة بنجاح وربطها بالكورس", error: false, status: true, data: newPdf, });
});

export const updateNote = async (req, res) => {
  try {
    const { pdfId, title, levelId, subjectId, courseId } = req.body;
    const teacherId = req.userId;

    // 1. التحقق من وجود معرف الملف المراد تحديثه
    if (!pdfId) {
      return res.status(400).json({
        message: "يرجى تقديم معرف الملف (PDF ID)",
        error: true,
        status: false,
      });
    }

    // 2. البحث عن الملف والتأكد من أن المدرس الحالي هو صاحبه
    const pdfRecord = await PdfModel.findOne({
      _id: pdfId,
      teacher: teacherId,
    });

    if (!pdfRecord) {
      return res.status(404).json({
        message: "الملف غير موجود أو ليس لديك صلاحية تعديله",
        error: true,
        status: false,
      });
    }

    const oldCourseId = pdfRecord.course; // الاحتفاظ بمعرف الكورس القديم للمقارنة لاحقاً

    // 3. تجهيز البيانات الجديدة: إذا أرسلت قيمة جديدة نستخدمها، وإلا نترك القديمة كما هي
    let newPdfUrl = pdfRecord.pdf; // افتراضيًا أبقِ رابط الـ PDF القديم
    if (req.file) {
      // رفع ملف PDF جديد إلى Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            format: "pdf",
            folder: "pdf_uploads",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        uploadStream.end(req.file.buffer);
      });
      // حذف الـ PDF القديم من Cloudinary
      await destroyPdfCloudinary(pdfRecord.pdf);
      newPdfUrl = uploadResult.secure_url;
    }

    const updateData = {
      title: title || pdfRecord.title,
      level: levelId,
      subject: subjectId || pdfRecord.subject,
      course: courseId || pdfRecord.course,
      pdf: newPdfUrl,
    };

    // 4. تحديث المستند في قاعدة البيانات وإرجاع المستند الجديد بعد التعديل
    const updatedPdf = await PdfModel.findByIdAndUpdate(
      pdfId,
      { $set: updateData },
      { new: true }, // لإرجاع البيانات بعد التحديث
    );

    // 5. منطق ذكي: إذا قام المدرس بتغيير الكورس (courseId)، يجب نقل الـ PDF من الكورس القديم إلى الجديد
    if (courseId && courseId !== String(oldCourseId)) {
      // سحب معرف الـ PDF من الكورس القديم
      await Course.findByIdAndUpdate(oldCourseId, {
        $pull: { notes: pdfId },
      });

      // دفع معرف الـ PDF إلى الكورس الجديد
      await Course.findByIdAndUpdate(courseId, {
        $addToSet: { notes: pdfId }, // استخدمنا $addToSet لمنع التكرار
      });
    }

    return res.json({
      message: "تم تحديث بيانات المذكرة بنجاح",
      error: false,
      status: true,
      data: updatedPdf,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "حدث خطأ داخلي في الخادم",
      error: true,
      status: false,
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { pdfId } = req.body;
    const teacherId = req.userId;

    if (!pdfId) {
      return res.status(400).json({
        message: "يرجى تقديم معرف الملف (PDF ID)",
        error: true,
        status: false,
      });
    }

    const pdfRecord = await PdfModel.findOne({
      _id: pdfId,
      teacher: teacherId,
    });

    if (!pdfRecord) {
      return res.status(404).json({
        message: "الملف غير موجود أو ليس لديك صلاحية حذفه",
        error: true,
        status: false,
      });
    }

    const deleteFrom = await destroyPdfCloudinary(pdfRecord.pdf);
    await PdfModel.findByIdAndDelete(pdfId);

    await Course.findByIdAndUpdate(pdfRecord.course, {
      $pull: { notes: pdfId },
    });

    return res.json({
      message: "تم حذف المذكرة بنجاح من السحابة وقاعدة البيانات",
      error: false,
      status: true,
      deleteFrom,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "حدث خطأ داخلي في الخادم",
      error: true,
      status: false,
    });
  }
};

export const getNoteByLevel = async (req, res) => {
  try {
    const { level, teacherId } = req.body;
    if (!teacherId) {
      return res.status(400).json({
        message: "Complete all data",
        error: true,
        status: false,
      });
    }

    const pdf = await PdfModel.find({ teacher: teacherId, level });
    if (!pdf) {
      return res.status(404).json({
        message: "Pdf not found",
        error: true,
        status: false,
      });
    }

    return res.status(200).json({
      error: false,
      status: true,
      data: pdf,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const getTeacherNotes = async (req, res) => {
  try {
    const teacherId = req.userId;
    const { subjectId, courseId, level } = req.query;

    const query = { teacher: teacherId };

    if (subjectId && subjectId !== "all") {
      query.subject = subjectId;
    }

    if (courseId && courseId !== "all") {
      query.course = courseId;
    }

    if (level && level !== "all") {
      query.level = level;
    }

    const notes = await PdfModel.find(query)
      .populate("subject", "name")
      .populate("lesson", "title")
      .populate("course", "title")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "تم جلب الاختبارات بنجاح",
      error: false,
      status: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};
