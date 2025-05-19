import { Quizz } from "../models/quizzModel.js";

export const checkQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    // Validate quizId
    if (!quizId) {
      return res.status(400).json({
        message: "Quiz ID is required",
        error: true,
        status: false,
      });
    }

    // Fetch the quiz
    const quiz = await Quizz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
        error: true,
        status: false,
      });
    }

    // Validate answers
    if (!answers || answers.length !== quiz.questions.length) {
      return res.status(400).json({
        message: "Please answer all questions",
        error: true,
        status: false,
      });
    }

    // Process answers
    const results = [];

    for (let i = 0; i < answers.length; i++) {
      const question = quiz.questions[i].toObject(); // convert to plain object

      if (answers[i] === question.correctAnswer) {
        results.push({
          ...question,
          success: true,
        });
      } else {
        results.push({
          ...question,
          success: false,
        });
      }
    }

    // Return the results
    return res.status(200).json({
      message: "Answers loaded successfully",
      error: false,
      status: true,
      results,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};
