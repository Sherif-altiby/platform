
import mongoose from "mongoose";

const courseAccessSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true  
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ["open", "close", "pending"],
    default: "open"
  },
}, { timestamps: true });


courseAccessSchema.index({ student: 1, course: 1 }, { unique: true });

export const CourseAccess = mongoose.model("CourseAccess", courseAccessSchema);