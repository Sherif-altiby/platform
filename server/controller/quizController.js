import { validationResult } from "express-validator";
import { Quizz } from "../models/quizzModel.js";
import { Teacher } from "../models/teacherModel.js";
import { Course, Subject } from "../models/model.js";
import { Level } from "../models/levelModel.js";
import { Result } from "../models/quizModel.js";

export const teacherUploadQuiz = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), error: true, status: false });
    }

    const teacherId = req.userId;
    const { title, level, subjectId, courseId, questions, duration } = req.body;

    if (!duration || isNaN(duration)) {
      return res.status(400).json({ 
        message: "يرجى تحديد مدة الاختبار بالدقائق بشكل صحيح", 
        error: true 
      });
    }

    // 1. التأكد من المعلم والكورس والمادة
    const [teacher, subject, course, foundLevel] = await Promise.all([
      Teacher.findById(teacherId),
      Subject.findById(subjectId),
      Course.findById(courseId),
      Level.findById(level)
    ]);

    if (!teacher || !subject || !course || !foundLevel) {
      return res.status(404).json({
        message: "Teacher, Subject, or Course not found",
        error: true,
        status: false,
      });
    }

    const isQuizExist = await Quizz.findOne({ title });
    if (isQuizExist) {
      return res.status(400).json({ message: "Quiz title already exists", error: true });
    }

    const shuffledQuestions = questions.map((q) => {
      const { answers, correctAnswer, title: qTitle } = q;
      
      const shuffledAnswers = [...answers].sort(() => 0.5 - Math.random());

      return {
        title: qTitle,
        answers: shuffledAnswers,
        correctAnswer: correctAnswer, 
      };
    });

    const newQuiz = new Quizz({
      title,
      level: foundLevel.name,
      subject: subjectId,
      course: courseId,
      teacher: teacherId,
      duration: Number(duration),
      questions: shuffledQuestions,
    });

    await newQuiz.save();

    await Course.findByIdAndUpdate(courseId, {
       $push: { quizzes: newQuiz._id } 
    });

    return res.status(201).json({
      message: "Quiz added successfully and linked to course",
      error: false,
      status: true,
      data: newQuiz
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const getTeacherQuizzes = async (req, res) => {
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

     const quizzes = await Quizz.find(query)
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

export const deleteQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const teacherId = req.userId; 

        const quiz = await Quizz.findOne({ _id: quizId, teacher: teacherId });

        if (!quiz) {
            return res.status(404).json({
                status: false,
                message: "الاختبار غير موجود أو ليس لديك صلاحية لحذفه."
            });
        }

        await Quizz.findByIdAndDelete(quizId);

        return res.status(200).json({
            status: true,
            message: "تم حذف الاختبار بنجاح."
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "حدث خطأ أثناء محاولة الحذف.",
            error: error.message
        });
    }
};





export const checkQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const studentId = req.userId; // القادم من middleware الحماية (Auth)

    // 1. التحقق من وجود quizId
    if (!quizId) {
      return res.status(400).json({
        message: "Quiz ID is required",
        error: true,
        status: false,
      });
    }

    // 2. جلب الاختبار
    const quiz = await Quizz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
        error: true,
        status: false,
      });
    }

    // 3. التحقق من عدد الإجابات
    if (!answers || answers.length !== quiz.questions.length) {
      return res.status(400).json({
        message: "Please answer all questions",
        error: true,
        status: false,
      });
    }

    // 4. معالجة الإجابات وحساب الدرجة
    let correctCount = 0;
    const processedAnswers = [];

    for (let i = 0; i < quiz.questions.length; i++) {
      const question = quiz.questions[i];
      const isCorrect = answers[i] === question.correctAnswer;
      
      if (isCorrect) correctCount++;

      processedAnswers.push({
        questionTitle: question.title,
        userAnswer: answers[i],
        correctAnswer: question.correctAnswer,
        isCorrect: isCorrect,
      });
    }

    const finalScore = (correctCount / quiz.questions.length) * 100;

    // 5. حفظ أو تحديث النتيجة في قاعدة البيانات (Upsert)
    // نبحث عن سجل بنفس الطالب ونفس الاختبار
    const updatedResult = await Result.findOneAndUpdate(
      { student: studentId, quiz: quizId }, 
      {
        student: studentId,
        quiz: quizId,
        course: quiz.course, // مأخوذ من بيانات الـ quiz
        score: finalScore,
        totalQuestions: quiz.questions.length,
        correctAnswersCount: correctCount,
        answers: processedAnswers,
      },
      { 
        new: true,      // لإرجاع البيانات الجديدة بعد التحديث
        upsert: true,   // إذا لم يجد سجل، قم بإنشاء واحد جديد
        runValidators: true 
      }
    );

    // 6. إرجاع النتيجة للمستخدم
    return res.status(200).json({
      message: "Quiz processed and saved successfully",
      error: false,
      status: true,
      data: updatedResult, // نرسل بيانات الموديل كاملة
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};