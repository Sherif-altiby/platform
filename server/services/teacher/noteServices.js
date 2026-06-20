import { Lesson } from "../../models/lessonCourse.js";
import { Level } from "../../models/levelModel.js";
import { Course, Subject } from "../../models/model.js";
import { PdfModel } from "../../models/pdfModel.js";
import { Teacher } from "../../models/teacherModel.js";
import { v2 as cloudinary } from "cloudinary";

export const createNoteService = async ({ teacherId, title, levelId, subjectId, courseId, lessonId,  file, }) => {
    if (!file) { throw new AppError("يرجى رفع ملف المذكرة بصيغة PDF", 400);}
  
    const [teacher, subject, course, foundLevel] = await Promise.all([
      Teacher.findById(teacherId),
      Subject.findById(subjectId),
      Course.findById(courseId),
      Level.findById(levelId),
    ]);
  
    if (!teacher || !subject || !course || !foundLevel) {
      throw new AppError( "عذراً، المعلم أو المادة أو الكورس غير موجود", 404 );
    }
  
    let lesson = null;
  
    // ✅ optional lesson check
    if (lessonId) {
      lesson = await Lesson.findById(lessonId);
  
      if (!lesson) {
        throw new AppError("الدرس غير موجود", 404);
      }
    }
  
    const isPdfExist = await PdfModel.findOne({ title });
  
    if (isPdfExist) {
      throw new AppError( "اسم المذكرة موجود بالفعل، يرجى اختيار اسم آخر", 400 );
    }
  
    // 📤 upload to cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "pdf_uploads",
          format: "pdf",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    
      uploadStream.end(file.buffer);
    });
  
    // 📄 create PDF
    const newPdf = await PdfModel.create({ title, level: foundLevel._id, subject: subjectId, course: courseId, teacher: teacherId, pdf: result.secure_url, lesson: lesson ? lesson._id : undefined,});
  
    //  link to course
    await Course.findByIdAndUpdate(courseId, {
      $push: { notes: newPdf._id },
    });
  
    //  bidirectional linking if lesson exists
    if (lesson) {
      await Lesson.findByIdAndUpdate(lesson._id, {
        $set: { note: newPdf._id },
      });
    }
  
    return newPdf;
  };