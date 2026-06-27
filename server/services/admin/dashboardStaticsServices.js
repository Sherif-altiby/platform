import { Course, Subject, User } from "../../models/model.js";
import { Lesson } from "../../models/lessonCourse.js";
import { Teacher } from "../../models/teacherModel.js";
import { PdfModel } from "../../models/pdfModel.js";
import { Comment } from "../../models/commentsModel.js";
import { Quizz } from "../../models/quizzModel.js";

export const getDashboardStatsService = async () => {
    const [ lessons, users, subjects, courses, notes, quizzes, teachers, ratings,
    ] = await Promise.all([
        Lesson.countDocuments(),
        User.countDocuments(),
        Subject.countDocuments(),
        Course.countDocuments(),
        PdfModel.countDocuments(),
        Quizz.countDocuments(),
        Teacher.countDocuments(),
        Comment.countDocuments(),
    ]);

    return { lessons, users, subjects, courses, notes, quizzes, teachers, ratings,};
};