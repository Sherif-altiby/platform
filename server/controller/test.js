import { Level } from "../models/levelModel.js";
import { Course, Subject } from "../models/model.js";
import { Teacher } from "../models/teacherModel.js";
import { Quizz } from "../models/quizzModel.js";
import uploadImageClodinary from "../utils/uploadImages.js";

export const teacherUploadQuizTest = async (req, res) => {
  try {
    const teacherId = req.userId;
    const { title, level, subjectId, courseId, questions, duration } = req.body;

    console.log("Received files:", req.files); // Debug log

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

    // Parse questions if sent as string (from FormData)
    const parsedQuestions = typeof questions === 'string' 
      ? JSON.parse(questions) 
      : questions;

    console.log("Parsed questions:", parsedQuestions); // Debug log

    // Helper function to find file by fieldname
    const findFileByFieldname = (fieldname) => {
      return req.files?.find(file => file.fieldname === fieldname);
    };

    // Process questions with image uploads
    const processedQuestions = await Promise.all(
      parsedQuestions.map(async (q, qIndex) => {
        let titleImage = null;

        // Upload question title image if exists
        const titleImageFile = findFileByFieldname(`questions[${qIndex}][titleImage]`);
        if (titleImageFile) {
          console.log(`Uploading title image for question ${qIndex}`); // Debug log
          const uploadResult = await uploadImageClodinary(titleImageFile.buffer);
          titleImage = uploadResult.secure_url;
          console.log(`Title image uploaded: ${titleImage}`); // Debug log
        }

        // Process answers with images
        const processedAnswers = await Promise.all(
          q.answers.map(async (answer, aIndex) => {
            let answerImage = null;

            // Upload answer image if exists
            const answerImageFile = findFileByFieldname(`questions[${qIndex}][answers][${aIndex}][image]`);
            if (answerImageFile) {
              console.log(`Uploading answer image for Q${qIndex} A${aIndex}`); // Debug log
              const uploadResult = await uploadImageClodinary(answerImageFile.buffer);
              answerImage = uploadResult.secure_url;
              console.log(`Answer image uploaded: ${answerImage}`); // Debug log
            }

            return {
              text: answer.text || null,
              image: answerImage
            };
          })
        );

        console.log("Processed answers:", processedAnswers);

        // Process correct answer image if exists
        let correctAnswerImage = null;
        const correctAnswerImageFile = findFileByFieldname(`questions[${qIndex}][correctAnswer][image]`);
        if (correctAnswerImageFile) {
          console.log(`Uploading correct answer image for Q${qIndex}`); // Debug log
          const uploadResult = await uploadImageClodinary(correctAnswerImageFile.buffer);
          correctAnswerImage = uploadResult.secure_url;
          console.log(`Correct answer image uploaded: ${correctAnswerImage}`); // Debug log
        }

        // Shuffle answers
        const shuffledAnswers = [...processedAnswers].sort(() => 0.5 - Math.random());

        return {
          title: q.title,
          titleImage: titleImage,
          answers: shuffledAnswers,
          correctAnswer: {
            text: q.correctAnswer?.text || null,
            image: correctAnswerImage
          }
        };
      })
    );

    console.log("Processed questions:", JSON.stringify(processedQuestions, null, 2)); // Debug log

    const newQuiz = new Quizz({
      title,
      level: foundLevel.name,
      subject: subjectId,
      course: courseId,
      teacher: teacherId,
      duration: Number(duration),
      questions: processedQuestions,
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
    console.error("Error uploading quiz:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};