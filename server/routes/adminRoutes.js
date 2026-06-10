import { Router } from "express";
import auth from "../middlewares/auth.js";
import { 
    addTeacherToSubject, 
    blockTeacher, 
    blockUser, 
    createTeacher, 
    removeTeacherFromSubject, 
    unBlockTeacher, 
    unBlockUser, 
    updateSubjectName, 
     } from "../controller/adminController.js";
import isAdmin from "../middlewares/isAdmin.js";
import upload from "../middlewares/multer.js";
import { deleteComment, getComments, showComment } from "../controller/commentController.js";
import { createSubject, removeSubject } from "../controller/subjectController.js";
import { createLevel } from "../controller/levelController.js";
import { createTeacherValidations } from "../validations/teacherValidations.js";
import { validate } from "../validations/validate.js";


const adminRouter = Router();

adminRouter.post('/add-subject', auth, isAdmin, upload.single('avatar'), createSubject);
adminRouter.put('/change-subject-name', auth, isAdmin, updateSubjectName);

adminRouter.post('/add-teacher', auth, isAdmin,   upload.single('avatar'), validate(createTeacherValidations) , createTeacher);
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


adminRouter.post('/create-level', auth, isAdmin, createLevel)


export default adminRouter;