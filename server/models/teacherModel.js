import mongoose from "mongoose";

const teacherScema = new mongoose.Schema({
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
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: "teacher",
  },
  myStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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
  vCash: {
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    walletName: {
      type: String,
      required: true,
    },
  },
  instaPay: {
    number: {
      type: Number,
      required: false,
      unique: true,
    },
    instaPayName: {
      type: String,
      required: true,
    },
  },
  about: {
    type: String,
    required: true,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
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
});

export const Teacher = mongoose.model("Teacher", teacherScema);
