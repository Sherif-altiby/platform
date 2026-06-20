import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
      required: true,
    },
    note: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PdfModel",
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Lesson = mongoose.model("Lesson", LessonSchema);
