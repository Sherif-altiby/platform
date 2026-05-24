import { Level } from "../models/levelModel.js";
import { Course, Subject } from "../models/model.js";
import { PdfModel } from "../models/pdfModel.js";
import { Teacher } from "../models/teacherModel.js";
import { v2 as cloudinary } from "cloudinary";
import destroyPdfCloudinary from "../utils/destroyFile.js"

export const createNote = async (req, res) => {
    try {

        const teacherId = req.userId;
        const { title, levelId, subjectId, courseId } = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: "يرجى رفع ملف المذكرة بصيغة PDF",
                error: true
            });
        }

        const [teacher, subject, course, foundLevel] = await Promise.all([
            Teacher.findById(teacherId),
            Subject.findById(subjectId),
            Course.findById(courseId),
            Level.findById(levelId)
        ]);

        if (!teacher || !subject || !course || !foundLevel) {
            return res.status(404).json({
                message: "عذراً، المعلم أو المادة أو الكورس غير موجود",
                error: true,
                status: false,
            });
        }

        const isPdfExist = await PdfModel.findOne({ title });
        if (isPdfExist) {
            return res.status(400).json({
                message: "اسم المذكرة موجود بالفعل، يرجى اختيار اسم آخر",
                error: true
            });
        }


        const result = await new Promise((resolve, reject) => {
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

        const newPdf = new PdfModel({
            title,
            level: foundLevel.name,
            subject: subjectId,
            course: courseId,
            teacher: teacherId,
            pdf: result.secure_url,
        });

        await newPdf.save();

        await Course.findByIdAndUpdate(courseId, {
            $push: { notes: newPdf._id }
        });

        return res.status(201).json({
            message: "تم رفع المذكرة بنجاح وربطها بالكورس",
            error: false,
            status: true,
            data: newPdf
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "حدث خطأ في الخادم أثناء الرفع",
            error: true,
            status: false,
        });
    }
};

export const updateNote = async (req, res) => {
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


        const deleteFrom = await destroyPdfCloudinary(pdfRecord.pdf)
        await PdfModel.findByIdAndDelete(pdfId);

        await Course.findByIdAndUpdate(pdfRecord.course, {
            $pull: { notes: pdfId }
        });

        return res.json({
            message: "تم حذف المذكرة بنجاح من السحابة وقاعدة البيانات",
            error: false,
            status: true,
            deleteFrom
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


        const deleteFrom = await destroyPdfCloudinary(pdfRecord.pdf)
        await PdfModel.findByIdAndDelete(pdfId);

        await Course.findByIdAndUpdate(pdfRecord.course, {
            $pull: { notes: pdfId }
        });

        return res.json({
            message: "تم حذف المذكرة بنجاح من السحابة وقاعدة البيانات",
            error: false,
            status: true,
            deleteFrom
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

        const quizzes = await PdfModel.find(query)
            .populate("subject", "name")
            .populate("course", "title")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "تم جلب الاختبارات بنجاح",
            error: false,
            status: true,
            count: quizzes.length,
            data: quizzes,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            status: false,
        });
    }
};