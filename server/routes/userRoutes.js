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
import { getAllSubjects, getStudentCoursesByTeacher, getSubjectCourses, getSubjectsByTeacher } from "../controller/subjectController.js";
import { addToList } from "../controller/listCoontroller.js";
import { requestCourseAccess } from "../controller/courseController.js";
import { getCourseLessons } from "../controller/lessonContriller.js";
import upload from "../middlewares/multer.js";
import { getLevels } from "../controller/levelController.js";
import { userRateTeacher } from "../controller/ratingController.js";
import { getWatchList, updateWatchHistory } from "../controller/watchHistoryController.js";
import { getWatchQuizzesList } from "../controller/watchedQuizzesController.js";
import { addNoteToHistory, getWatchNotesList } from "../controller/watchedNotesController.js";

const  userRouter = Router();

userRouter.post('/register', validateRegistration, register)
userRouter.post('/login', login)
userRouter.post('/logout', auth, logout)
userRouter.post('/forgot-password', forgotPassword)
userRouter.post('/verify-code', verifyForgotPasswordCode)
userRouter.post('/resset-password', ressetPassword)

// userRouter.put('/update-user-details', auth,  updateUserDetails)
userRouter.get('/get-user-details', auth,  getUserDetails)
userRouter.get('/get-users', auth, isAdmin,  getAllUsers)
userRouter.get('/get-teachers',  getAllTeachers)
userRouter.get('/get-subjects',  getAllSubjects)
userRouter.post('/get-subject-details',auth ,  getSubjectCourses)
// userRouter.get('/get-video', auth,  getVideo)
// userRouter.post('/get-video-by-level', auth,  getVideoByLevel)
userRouter.post('/add-comment', auth,  addComment)
userRouter.get('/get-main-comments', auth,  getAvilableComments)
userRouter.get('/check', auth,  checkAuth)

userRouter.post('/update-profile', auth,  userUpdateProfile)
userRouter.post('/change-password', auth,  userChangePassword)

userRouter.post('/check-quiz', auth,  checkQuiz)
userRouter.get('/get-statics-num',  getPlatformStatics)


// userRouter.post('/add-to-list', auth, addToList);
 
userRouter.post('/get-teacher-subjects', auth,  getSubjectsByTeacher)

userRouter.post('/teacher-subject-courses', auth, getStudentCoursesByTeacher)
userRouter.post('/request-access-course', auth ,upload.single('avatar'),  requestCourseAccess)
userRouter.get('/course-lessons/:courseId', auth, getCourseLessons)

userRouter.get('/get-levels', getLevels)

userRouter.post('/rate-teacher', auth, userRateTeacher)

userRouter.post('/watch-list', auth, updateWatchHistory)
userRouter.get('/watch-list', auth, getWatchList)
userRouter.get('/watch-quiz', auth, getWatchQuizzesList)
userRouter.post('/watch-note', auth, addNoteToHistory)
userRouter.get('/watch-note', auth, getWatchNotesList)

export default userRouter