import mongoose from "mongoose";

const StudentLevels = ["first", "second", "third"];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "student",
  },
  level: {
    type: String,
    enum: StudentLevels,
    required: true,
  },
  subscribedTeachers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  ],
  refreshToken: {
    type: String,
  },
  code: {
    type: Number,
  },
  codeExpirt: {
    type: Date,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  notifications: [
    {
      message: {
        type: String,
      },
    },
  ],
  isBlocked: {
    type: Boolean,
    default: false,
  }
});

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  ],
  image: {
    type: String,
  },
});


export const User = mongoose.model("User", userSchema);
export const Subject = mongoose.model("Subject", subjectSchema);

