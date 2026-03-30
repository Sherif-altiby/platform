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
  },
  accessedCourses: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
      },
      status: {
        type: String,
        enum: ["open", "close", "pending"],
        default: "close"
      }
    },
  ]
});

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // Adding the courses array here
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
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

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true , unique: true},
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  image: {
    type: String,
  },
   price: {
    type: Number,
    default: 0,
   },
   offer: {
    type: Number,
    default: 0,
   },
   offerExpirt: {
    type: Date,
   },
   level: {
    type: String,
    enum: StudentLevels,
    required: true,
   }
});

export const User = mongoose.model("User", userSchema);
export const Subject = mongoose.model("Subject", subjectSchema);
export const Course = mongoose.model("Course", courseSchema);
