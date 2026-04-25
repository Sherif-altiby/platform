import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quizz",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    correctAnswersCount: {
      type: Number,
      required: true,
    },
    answers: [
      {
        _id: false,
        questionTitle: { type: String, required: true },
        questionImage: { type: String, default: null },
        userAnswer: {
          type: mongoose.Schema.Types.Mixed, // Can be string or object
          required: true,
        },
        correctAnswer: {
          type: mongoose.Schema.Types.Mixed, // Can be string or object
          required: true,
        },
        isCorrect: { type: Boolean, required: true },
      },
    ],
  },
  { timestamps: true },
);

resultSchema.index({ student: 1, quiz: 1 });
resultSchema.index({ course: 1 });

export const Result = mongoose.model("Result", resultSchema);
