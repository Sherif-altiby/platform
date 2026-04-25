import mongoose from "mongoose";

const quizzesHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
      index: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quizz",
      required: true,
    },

    score: {
      type: Number,
      required: true,
      default: 0,
    },
    percentage: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

quizzesHistorySchema.index({ userId: 1, quizId: 1 }, { unique: true });

export const QuizzesHistory = mongoose.model(
  "QuizzesHistory",
  quizzesHistorySchema,
);
