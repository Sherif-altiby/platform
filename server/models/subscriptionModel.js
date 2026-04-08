import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    studentId: {
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
  },
  {
    timestamps: true,
  },
);

subscriptionSchema.index(
  { studentId: 1, teacherId: 1, courseId: 1 },
  { unique: true },
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
