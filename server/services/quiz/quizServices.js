import { Level } from "../../models/levelModel.js";
import { Quizz } from "../../models/quizzModel.js";
import { CourseAccess } from "../../models/courseAccessModel.js";
import { AppError } from "../../utils/appError.js";

export const getTeacherQuizzesByLevelService = async ({
  teacherId,
  level,
  studentId,
}) => {
  if (!teacherId || !level) {
    throw new AppError("Complete all data", 400);
  }

  const generalLevel = await Level.findOne({
    name: "عام",
  }).select("_id");

  const levels = [level];

  if (generalLevel?._id) {
    levels.push(generalLevel._id);
  }

  const quizzes = await Quizz.find({
    teacher: teacherId,
    level: { $in: levels },
  })
    .populate("course", "title status")
    .populate("subject", "name")
    .lean();

  if (!quizzes || quizzes.length === 0) {
    return [];
  }

  const groupedCourses = new Map();

  for (const quiz of quizzes) {
    if (!quiz.course) continue;

    const courseId = quiz.course._id.toString();

    let status = groupedCourses.get(courseId)?.course.status;

    if (!status) {
      status = quiz.course.status;

      if (status === "close" && studentId) {
        const access = await CourseAccess.findOne({
          student: studentId,
          course: quiz.course._id,
        }).select("status");

        if (access) {
          status = access.status;
        }
      }

      groupedCourses.set(courseId, {
        course: {
          _id: quiz.course._id,
          name: quiz.course.title,
          status,
          quizzes: [],
        },
      });
    }

    const quizItem = {
      _id: quiz._id,
      title: quiz.title,
      duration: quiz.duration,
      subject: quiz.subject,
      lessonCount: quiz.lessons?.length || 0,
      questionsCount: quiz.questions?.length || 0,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
    };

    groupedCourses.get(courseId).course.quizzes.push(quizItem);
  }

  return Array.from(groupedCourses.values());
};

export const getQuizByIdService = async ({ quizId }) => {
  if (!quizId) {
    throw new AppError("Quiz ID is required", 400);
  }

  const quiz = await Quizz.findById(quizId)
    .populate("course", "title")
    .populate("subject", "name")
    .lean();

  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }

  // remove correctAnswer from questions
  const safeQuestions = (quiz.questions || []).map((q) => {
    return {
      title: q.title,
      titleImage: q.titleImage,
      answers: q.answers,
    };
  });

  return {
    ...quiz,
    questions: safeQuestions,
  };
};