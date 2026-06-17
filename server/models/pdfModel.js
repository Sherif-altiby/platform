import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    required: false,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    required: true,
  },
  pdf: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export const PdfModel = mongoose.model("PdfModel", pdfSchema);
