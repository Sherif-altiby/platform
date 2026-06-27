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
import { getAllSubjects, removeSubject } from "../controller/subjectController.js";
import { createLevel } from "../controller/levelController.js";
import { createTeacherValidations } from "../validations/teacherValidations.js";
import { validate } from "../validations/validate.js";
import { getDashboardStats } from "../controller/admin/dashboardStatcicsController.js";
import { getAllTeachers, getAllUsers } from "../controller/admin/getUsersController.js";
import { createSubject, getAllSubjectsController } from "../controller/admin/getSubjectsController.js";
import { getAllLevels } from "../controller/admin/levelsControllers.js";
import { createSubjectService } from "../services/admin/getSubjectsServices.js";


const adminRouter = Router();



adminRouter.get('/users', auth, isAdmin, getAllUsers);
adminRouter.get('/teachers', auth, isAdmin, getAllTeachers);
adminRouter.get('/subjects', auth, isAdmin, getAllSubjectsController);
adminRouter.get('/levels', auth, isAdmin, getAllLevels);

adminRouter.get('/statics', auth, isAdmin, getDashboardStats);

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