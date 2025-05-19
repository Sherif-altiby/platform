import { Router } from "express";
import auth from "../middlewares/auth.js";
import { 
    addTeacherToSubject, 
    blockTeacher, 
    blockUser, 
    createSubject, 
    createTeacher, 
    removeSubject, 
    removeTeacherFromSubject, 
    unBlockTeacher, 
    unBlockUser, 
    updateSubjectName, 
    getComments,
    deleteComment, 
    showComment } from "../controller/adminController.js";
import isAdmin from "../middlewares/isAdmin.js";
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
     const imageType = file.mimetype.split("/")[0];

     if(imageType === "image"){
        return cb(null, true)
     } else {
        return cb('File must be image', false)
     }
}

const upload = multer({storage: diskStorage, fileFilter: fileFilter})

const adminRouter = Router();

adminRouter.post('/add-subject', auth, isAdmin, upload.single('avatar'), createSubject);
adminRouter.put('/change-subject-name', auth, isAdmin, updateSubjectName);

adminRouter.post('/add-teacher', auth, isAdmin, upload.single('avatar'), createTeacher);
adminRouter.post('/block-user', auth, isAdmin, blockUser);
adminRouter.post('/unblock-user', auth, isAdmin, unBlockUser);
adminRouter.post('/block-teacher', auth, isAdmin, blockTeacher);
adminRouter.post('/unblock-teacher', auth, isAdmin, unBlockTeacher);
adminRouter.put('/add-teacher-to-subject', auth, isAdmin, addTeacherToSubject);
adminRouter.put('/remove-teacher-from-subject', auth, isAdmin, removeTeacherFromSubject);
adminRouter.delete('/remove-subject', auth, isAdmin, removeSubject);
adminRouter.get('/get-all-comments', auth, isAdmin, getComments);
adminRouter.put('/show-comment', auth, isAdmin, showComment);
adminRouter.delete('/delete-comment', auth, isAdmin, deleteComment);


export default adminRouter;