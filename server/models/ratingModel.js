import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "يجب تحديد المستخدم"],
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: [true, "يجب تحديد المعلم"],
    },
    rating: {
      type: Number,
      required: [true, "يجب وضع تقييم"],
      min: [1, "التقييم لا يمكن أن يقل عن 1"],
      max: [5, "التقييم لا يمكن أن يزيد عن 5"],
    },
    },
  {
    timestamps: true,
  },
);

export const Rating = mongoose.model("Rating", ratingSchema);
