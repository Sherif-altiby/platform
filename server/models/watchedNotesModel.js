import mongoose from "mongoose";

const notesHistorySchema = new mongoose.Schema(
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

    noteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PdfModel",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

notesHistorySchema.index({ userId: 1, quizId: 1 }, { unique: true });

export const NoteHistory = mongoose.model("NoteHistory", notesHistorySchema);
