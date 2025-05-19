import { Router } from "express";
import auth from "../middlewares/auth.js";
import { 
          getPdfByLevel, 
          getQuizeById, 
          getTeacherQuizzesByLevel, 
          teacherDeleteVideo, 
          teacherUpdateVideo, 
          teacherUploadQuiz, 
          teacherUploadVideo, 
          uploadPdf,
          deletePdf,
          getTeacherById,
          deleteQuize,
          teacherStatics,
        } from "../controller/teacherController.js";
import { uploadQuizValidation, uploadVideoValidation } from "../validations/ApiValidations.js";
import isTeacher from "../middlewares/isTeacher.js";
import multer from "multer";

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb){
        const ext = file.mimetype.split("/")[1];
        const fileName = `teacher-${Date.now()}.${ext}`
        cb(null, fileName)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["application/pdf"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); 
    } else {
      cb(new Error("Invalid file type. Only PDF files are allowed!"), false); 
    }
}
 
const upload = multer({storage: diskStorage, fileFilter: fileFilter})

const teacherRouter = Router();

teacherRouter.post('/upload-video', auth, isTeacher, uploadVideoValidation, teacherUploadVideo);
teacherRouter.get('/get-teacher/:teacherId', auth, getTeacherById);
teacherRouter.delete('/delete-video', auth, isTeacher, teacherDeleteVideo);
teacherRouter.put('/update-video', auth, isTeacher, teacherUpdateVideo);

teacherRouter.post('/upload-quiz', auth, isTeacher, uploadQuizValidation, teacherUploadQuiz);
teacherRouter.post('/get-quiz-by-level', auth, getTeacherQuizzesByLevel);
teacherRouter.get('/get-quiz-by-id/:id', auth, getQuizeById);
teacherRouter.delete('/delete-quiz', auth, isTeacher, deleteQuize);

teacherRouter.post('/upload-pdf', auth, isTeacher, upload.single('pdf'), uploadPdf);
teacherRouter.post('/get-pdf-by-level', auth, getPdfByLevel);
teacherRouter.delete('/delete-pdf', auth, isTeacher, deletePdf);

teacherRouter.get('/statics', auth, isTeacher, teacherStatics)

export default teacherRouter