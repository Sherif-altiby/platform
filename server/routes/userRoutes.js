import { Router } from "express";
import { 
    getAllTeachers, 
    getAllUsers, 
    getUserDetails, 
    getVideo, 
    updateUserDetails, 
    addComment,
    getAvilableComments,
    getVideoByLevel,
    checkAuth,
    userUpdateProfile,
    getPlatformStatics,
    }  from "../controller/userController.js";
import auth from "../middlewares/auth.js";
import { validateRegistration } from "../validations/ApiValidations.js";
import isAdmin from "../middlewares/isAdmin.js";
import { checkQuiz } from "../controller/quizController.js";
import { login, register, forgotPassword, logout, ressetPassword, userChangePassword, verifyForgotPasswordCode } from "../controller/authController.js";
import { getAllSubjects, getSubjectDetails } from "../controller/subjectController.js";
import { addToList } from "../controller/listCoontroller.js";

const  userRouter = Router();

userRouter.post('/register', validateRegistration, register)
userRouter.post('/login', login)
userRouter.post('/logout', auth, logout)
userRouter.post('/forgot-password', forgotPassword)
userRouter.post('/verify-code', verifyForgotPasswordCode)
userRouter.post('/resset-password', ressetPassword)

userRouter.put('/update-user-details', auth,  updateUserDetails)
userRouter.get('/get-user-details', auth,  getUserDetails)
userRouter.get('/get-users', auth, isAdmin,  getAllUsers)
userRouter.get('/get-teachers',  getAllTeachers)
userRouter.get('/get-subjects',  getAllSubjects)
userRouter.post('/get-subject-details',  getSubjectDetails)
userRouter.get('/get-video', auth,  getVideo)
userRouter.post('/get-video-by-level', auth,  getVideoByLevel)
userRouter.post('/add-comment', auth,  addComment)
userRouter.get('/get-main-comments', auth,  getAvilableComments)
userRouter.get('/check', auth,  checkAuth)

userRouter.post('/update-profile', auth,  userUpdateProfile)
userRouter.post('/change-password', auth,  userChangePassword)

userRouter.post('/check-quiz', auth,  checkQuiz)
userRouter.get('/get-statics-num',  getPlatformStatics)


userRouter.post('/add-to-list', auth, addToList);

export default userRouter