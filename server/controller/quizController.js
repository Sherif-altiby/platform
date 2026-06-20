import { validationResult } from "express-validator";
import { Quizz } from "../models/quizzModel.js";
import { Teacher } from "../models/teacherModel.js";
import { Course, Subject } from "../models/model.js";
import { Level } from "../models/levelModel.js";
import { Result } from "../models/resultModel.js";
import { QuizzesHistory } from "../models/watchedQuizMode.js";
import uploadImageClodinary from "../utils/uploadImages.js";
import destroyImageCloudinary from "../utils/destroyImage.js";

export const teacherUploadQuiz = async (req, res) => {
  try {
    const teacherId = req.userId;
    const { title, level, subjectId, courseId, questions, duration, lessons } =
      req.body;

    if (!duration || isNaN(duration)) {
      return res.status(400).json({
        message: "يرجى تحديد مدة الاختبار بالدقائق بشكل صحيح",
        error: true,
      });
    }

    // 1. التأكد من المعلم والكورس والمادة
    const [teacher, subject, course, foundLevel] = await Promise.all([
      Teacher.findById(teacherId),
      Subject.findById(subjectId),
      Course.findById(courseId),
      Level.findById(level),
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
      return res
        .status(400)
        .json({ message: "Quiz title already exists", error: true });
    }

    // Parse questions if sent as string (from FormData)
    const parsedQuestions =
      typeof questions === "string" ? JSON.parse(questions) : questions;

    // Helper function to find file by fieldname
    const findFileByFieldname = (fieldname) => {
      return req.files?.find((file) => file.fieldname === fieldname);
    };

    // Process questions with image uploads
    const processedQuestions = await Promise.all(
      parsedQuestions.map(async (q, qIndex) => {
        let titleImage = null;

        // Upload question title image if exists
        const titleImageFile = findFileByFieldname(
          `questions[${qIndex}][titleImage]`,
        );
        if (titleImageFile) {
          const uploadResult = await uploadImageClodinary(
            titleImageFile.buffer,
          );
          titleImage = uploadResult.secure_url;
        }

        // Process answers with images
        const processedAnswers = await Promise.all(
          q.answers.map(async (answer, aIndex) => {
            let answerImage = null;

            const answerImageFile = findFileByFieldname(
              `questions[${qIndex}][answers][${aIndex}][image]`,
            );
            if (answerImageFile) {
              const uploadResult = await uploadImageClodinary(
                answerImageFile.buffer,
              );
              answerImage = uploadResult.secure_url;
            }

            return {
              text: answer.text || null,
              image: answerImage,
            };
          }),
        );

        const lastAnswer = processedAnswers[processedAnswers.length - 1];
        const correctAnswerImage = lastAnswer?.image || null;
        const correctAnswerText =
          q.correctAnswer?.text || lastAnswer?.text || null;

        const shuffledAnswers = [...processedAnswers].sort(
          () => 0.5 - Math.random(),
        );

        return {
          title: q.title,
          titleImage: titleImage,
          answers: shuffledAnswers,
          correctAnswer: {
            text: q.correctAnswer?.text || null,
            image: correctAnswerImage,
          },
        };
      }),
    );

    let updatedLessons = [];

    if (req.body.lessons) {
      try {
        updatedLessons = JSON.parse(req.body.lessons);
      } catch (error) {
        return res.status(400).json({
          error: true,
          status: false,
          message: "Invalid lessons format",
        });
      }
    }

    const newQuiz = new Quizz({
      title,
      level: foundLevel._id,
      subject: subjectId,
      course: courseId,
      lessons: updatedLessons,
      teacher: teacherId,
      duration: Number(duration),
      questions: processedQuestions,
    });

    await newQuiz.save();

    await Course.findByIdAndUpdate(courseId, {
      $push: { quizzes: newQuiz._id },
    });

    return res.status(201).json({
      message: "Quiz added successfully and linked to course",
      error: false,
      status: true,
      data: newQuiz,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
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
      .populate("lessons", "title")
      .lean()
 
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
        message: "الاختبار غير موجود أو ليس لديك صلاحية لحذفه.",
      });
    }

    await Quizz.findByIdAndDelete(quizId);

    return res.status(200).json({
      status: true,
      message: "تم حذف الاختبار بنجاح.",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "حدث خطأ أثناء محاولة الحذف.",
      error: error.message,
    });
  }
};

export const checkQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const studentId = req.userId;

    if (!quizId) {
      return res.status(400).json({
        message: "Quiz ID is required",
        error: true,
        status: false,
      });
    }

    const quiz = await Quizz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
        error: true,
        status: false,
      });
    }

    if (!answers || answers.length !== quiz.questions.length) {
      return res.status(400).json({
        message: "Please answer all questions",
        error: true,
        status: false,
      });
    }

    let correctCount = 0;
    const processedAnswers = [];

    for (let i = 0; i < quiz.questions.length; i++) {
      const question = quiz.questions[i];
      const studentAnswer = answers[i];
      const correctAnswer = question.correctAnswer;

      // Parse student answer if it's a JSON string (new format with images)
      let parsedStudentAnswer = studentAnswer;
      if (typeof studentAnswer === "string") {
        try {
          parsedStudentAnswer = JSON.parse(studentAnswer);
        } catch {
          // If parsing fails, treat it as old format (plain string)
          parsedStudentAnswer = studentAnswer;
        }
      }

      // Check if answer is correct
      let isCorrect = false;

      // New format: Compare both text and image
      if (
        typeof parsedStudentAnswer === "object" &&
        parsedStudentAnswer !== null
      ) {
        const studentText = parsedStudentAnswer.text || null;
        const studentImage = parsedStudentAnswer.image || null;
        const correctText = correctAnswer.text || null;
        const correctImage = correctAnswer.image || null;

        // Both text and image must match
        isCorrect =
          studentText === correctText && studentImage === correctImage;
      }
      // Old format: Compare as strings
      else {
        isCorrect =
          parsedStudentAnswer === correctAnswer.text ||
          parsedStudentAnswer === correctAnswer;
      }

      if (isCorrect) correctCount++;

      processedAnswers.push({
        questionTitle: question.title,
        questionImage: question.titleImage || null,
        userAnswer: parsedStudentAnswer,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect,
      });
    }

    const finalScore = (correctCount / quiz.questions.length) * 100;

    const updatedResult = await Result.findOneAndUpdate(
      { student: studentId, quiz: quizId },
      {
        student: studentId,
        quiz: quizId,
        course: quiz.course,
        score: finalScore,
        totalQuestions: quiz.questions.length,
        correctAnswersCount: correctCount,
        answers: processedAnswers,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    );

    await QuizzesHistory.findOneAndUpdate(
      { userId: studentId, quizId: quizId },
      {
        userId: studentId,
        teacherId: quiz.teacher,
        courseId: quiz.course,
        quizId: quizId,
        score: correctCount,
        total: quiz.questions.length,
        percentage: Math.round(finalScore),
        updatedAt: new Date(),
      },
      { upsert: true, new: true },
    );

    return res.status(200).json({
      message: "Quiz processed and saved successfully",
      error: false,
      status: true,
      data: {
        ...updatedResult.toObject(),
        percentage: Math.round(finalScore),
        passed: finalScore >= 50, // You can adjust the passing threshold
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const getTeacherQuizResults = async (req, res) => {
  try {
    const { quizId } = req.params;
    const teacherId = req.userId;

    const quiz = await Quizz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        message: "الاختبار غير موجود",
        error: true,
        status: false,
      });
    }

    if (quiz.teacher.toString() !== teacherId) {
      return res.status(403).json({
        message: "غير مسموح لك بالوصول لنتائج هذا الاختبار",
        error: true,
        status: false,
      });
    }

    const allResults = await Result.find({ quiz: quizId }).populate(
      "student",
      "name",
    );

    return res.status(200).json({
      message: "تم جلب النتائج بنجاح",
      error: false,
      status: true,
      count: allResults.length,
      data: allResults,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "حدث خطأ داخلي في السيرفر",
      error: true,
      status: false,
    });
  }
};

export const getTeacherQuizzesSummary = async (req, res) => {
  try {
    const teacherId = req.userId;

    const totalQuizzes = await Quizz.countDocuments({ teacher: teacherId });

    const teacherQuizzes = await Quizz.find({ teacher: teacherId }).select(
      "_id",
    );
    const quizIds = teacherQuizzes.map((q) => q._id);

    const totalSubmissions = await Result.countDocuments({
      quiz: { $in: quizIds },
    });

    return res.status(200).json({
      success: true,
      message: "تم جلب إحصائيات الاختبارات بنجاح",
      stats: {
        totalQuizzes,
        totalSubmissions,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب البيانات",
      error: error.message,
    });
  }
};

export const teacherUpdateQuiz = async (req, res) => {
  try {
    const teacherId = req.userId;
    const { quizId } = req.params;
    const { title, level, subjectId, courseId, questions, duration } = req.body;

    if (!duration || isNaN(duration)) {
      return res.status(400).json({
        message: "يرجى تحديد مدة الاختبار بالدقائق بشكل صحيح",
        error: true,
      });
    }

    // 1. جلب الكويز الحالي للتأكد من وجوده وصلاحية المعلم
    const existingQuiz = await Quizz.findById(quizId);
    if (!existingQuiz) {
      return res
        .status(404)
        .json({ message: "الامتحان غير موجود", error: true, status: false });
    }

    if (existingQuiz.teacher.toString() !== teacherId) {
      return res.status(403).json({
        message: "غير مسموح لك بتعديل هذا الاختبار",
        error: true,
        status: false,
      });
    }

    const [subject, course, foundLevel] = await Promise.all([
      Subject.findById(subjectId),
      Course.findById(courseId),
      Level.findById(level),
    ]);

    if (!subject || !course || !foundLevel) {
      return res.status(404).json({
        message: "Subject, Course, or Level not found",
        error: true,
        status: false,
      });
    }

    const isQuizExist = await Quizz.findOne({ title, _id: { $ne: quizId } });
    if (isQuizExist) {
      return res.status(400).json({
        message: "عنوان الاختبار مستخدم بالفعل في اختبار آخر",
        error: true,
      });
    }

    // Parse الأسئلة القادمة من الـ FormData
    const parsedQuestions =
      typeof questions === "string" ? JSON.parse(questions) : questions;

    const findFileByFieldname = (fieldname) => {
      return req.files?.find((file) => file.fieldname === fieldname);
    };

    // 2. معالجة الأسئلة والإجابات المحدثة (حذف القديم ورفع الجديد)
    const processedQuestions = await Promise.all(
      parsedQuestions.map(async (q, qIndex) => {
        // --- أ. تحديث صورة عنوان السؤال ---
        let titleImage = q.titleImage || null;
        const titleImageFile = findFileByFieldname(
          `questions[${qIndex}][titleImage]`,
        );

        if (titleImageFile) {
          // إذا كانت هناك صورة قديمة، احذفها أولاً من Cloudinary
          if (q.titleImage) {
            await destroyImageCloudinary(q.titleImage);
          }
          const uploadResult = await uploadImageClodinary(
            titleImageFile.buffer,
          );
          titleImage = uploadResult.secure_url;
        }

        // --- ب. تحديث خيارات الإجابات (قد تكون نصوص أو صور) ---
        const processedAnswers = await Promise.all(
          q.answers.map(async (answer, aIndex) => {
            let answerImage = answer.image || null;
            const answerImageFile = findFileByFieldname(
              `questions[${qIndex}][answers][${aIndex}][image]`,
            );

            if (answerImageFile) {
              // إذا كان الخيار يحتوي على صورة قديمة وتم استبدالها، احذف القديمة
              if (answer.image) {
                await destroyImageCloudinary(answer.image);
              }
              const uploadResult = await uploadImageClodinary(
                answerImageFile.buffer,
              );
              answerImage = uploadResult.secure_url;
            }

            return {
              text: answer.text || null, // يمكن أن يكون نص أو null إذا كان الخيار صورة فقط
              image: answerImage,
            };
          }),
        );

        // --- ج. تحديث صورة الإجابة الصحيحة ---
        let correctAnswerImage = q.correctAnswer?.image || null;
        const correctAnswerImageFile = findFileByFieldname(
          `questions[${qIndex}][correctAnswer][image]`,
        );

        if (correctAnswerImageFile) {
          if (q.correctAnswer?.image) {
            await destroyImageCloudinary(q.correctAnswer.image);
          }
          const uploadResult = await uploadImageClodinary(
            correctAnswerImageFile.buffer,
          );
          correctAnswerImage = uploadResult.secure_url;
        }

        // ترتيب الإجابات عشوائياً (الـ Shuffle الخاص بك)
        const shuffledAnswers = [...processedAnswers].sort(
          () => 0.5 - Math.random(),
        );

        return {
          title: q.title,
          titleImage: titleImage,
          answers: shuffledAnswers,
          correctAnswer: {
            text: q.correctAnswer?.text || null,
            image: correctAnswerImage,
          },
        };
      }),
    );

    // 3. إدارة نقل الكويز بين الكورسات إن وجد تغيير
    const oldCourseId = existingQuiz.course.toString();
    const isCourseChanged = oldCourseId !== courseId;

    // 4. حفظ البيانات الجديدة في الـ Database
    existingQuiz.title = title;
    existingQuiz.level = foundLevel;
    existingQuiz.subject = subjectId;
    existingQuiz.course = courseId;
    existingQuiz.duration = Number(duration);
    existingQuiz.questions = processedQuestions;

    await existingQuiz.save();

    if (isCourseChanged) {
      await Course.findByIdAndUpdate(oldCourseId, {
        $pull: { quizzes: quizId },
      });
      await Course.findByIdAndUpdate(courseId, { $push: { quizzes: quizId } });
    }

    return res.status(200).json({
      message: "تم تحديث الاختبار بنجاح وحذف الصور المستبدلة المستغنى عنها",
      error: false,
      status: true,
      data: existingQuiz,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};
