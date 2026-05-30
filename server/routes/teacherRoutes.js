import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  getQuizeById,
  getTeacherQuizzesByLevel,
  getTeacherById,
  deleteQuize,
  teacherStatics,
  teacherUpdateProfile,
  teacherUpdateAvatar,
} from "../controller/teacherController.js";
import { addCourseValidation, uploadQuizValidation, } from "../validations/ApiValidations.js";
import isTeacher from "../middlewares/isTeacher.js";
import uploadPdfMulter from "../middlewares/pdfMulter.js";
import upload from "../middlewares/multer.js";
import { getList, userAccessCourse } from "../controller/listCoontroller.js";
import { addCourse, deleteCourse, getSubjectCourses, updateCourse } from "../controller/courseController.js";
import { addLesson, deleteLesson, getTeacherCourseLessons, teacherUpdateLesson } from "../controller/lessonController.js";
import { getTeacherStats } from "../controller/staticsController.js";
import { getTeacherRatings } from "../controller/ratingController.js";
import { deleteQuiz, getTeacherQuizResults, getTeacherQuizzes, getTeacherQuizzesSummary, teacherUpdateQuiz, teacherUploadQuiz } from "../controller/quizController.js";
import { createNote, deleteNote, getNoteByLevel, getTeacherNotes, updateNote } from "../controller/noteController.js";


const teacherRouter = Router();

teacherRouter.get('/get-teacher/:teacherId', auth, getTeacherById);
teacherRouter.post('/upload-quiz', auth, isTeacher, upload.any(), teacherUploadQuiz);
teacherRouter.put('/update-quiz/:quizId', auth, isTeacher, upload.any(), teacherUpdateQuiz);

teacherRouter.get('/quizzes', auth, isTeacher, getTeacherQuizzes)
teacherRouter.delete('/quiz-delete/:quizId', auth, isTeacher, deleteQuiz)
teacherRouter.post('/get-quiz-by-level', auth, getTeacherQuizzesByLevel);
teacherRouter.get('/quiz-results/:quizId', auth, isTeacher, getTeacherQuizResults);
teacherRouter.get('/quizzes-summary', auth, isTeacher, getTeacherQuizzesSummary)

teacherRouter.get('/quizzes/:id', auth, getQuizeById);
teacherRouter.delete('/delete-quiz', auth, isTeacher, deleteQuize);

teacherRouter.post('/upload-pdf', auth, isTeacher, uploadPdfMulter.single('pdf'), createNote);
teacherRouter.post('/get-pdf-by-level', auth, getNoteByLevel);
teacherRouter.delete('/delete-pdf', auth, isTeacher, deleteNote);
teacherRouter.put('/update-pdf', auth, isTeacher, uploadPdfMulter.single('pdf'), updateNote);
teacherRouter.get('/teacher-pdf', auth, isTeacher, getTeacherNotes);

teacherRouter.get('/statics', auth, isTeacher, teacherStatics)

teacherRouter.post('/add-course', auth, isTeacher, upload.single('avatar'), addCourseValidation, addCourse);
teacherRouter.delete('/delete-course/:courseId', auth, isTeacher, deleteCourse);
teacherRouter.get('/get-courses/:subjectId', auth, getSubjectCourses);
teacherRouter.put('/update-course/:courseId', auth, isTeacher, upload.single('image'), updateCourse);

teacherRouter.get('/get-list', auth, isTeacher, getList);
teacherRouter.delete('/delete-list-item', auth, isTeacher, userAccessCourse);

teacherRouter.post('/add-lesson', auth, isTeacher, addLesson);
teacherRouter.get('/get-course-lessons/:courseId', auth, isTeacher, getTeacherCourseLessons);
teacherRouter.delete('/delete-lesson/:lessonId', auth, isTeacher, deleteLesson);
teacherRouter.put('/update-lesson/:lessonId', auth, isTeacher, teacherUpdateLesson);

teacherRouter.put('/change-data', auth, isTeacher, teacherUpdateProfile)

teacherRouter.get('/sub-stats', auth, isTeacher, getTeacherStats)
teacherRouter.get('/get-rates', auth, isTeacher, getTeacherRatings)

teacherRouter.post('/change-avatar', auth, isTeacher, upload.single('avatar'), teacherUpdateAvatar)


export default teacherRouter