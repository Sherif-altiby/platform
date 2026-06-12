import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      enum: ["instaPay", "vCash"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const List = mongoose.model("List", listSchema);
