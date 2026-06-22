import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },

    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "recipientModel",
    },

    recipientModel: {
      type: String,
      required: true,
      enum: ["User", "Teacher"],
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      refPath: "senderModel",
    },

    senderModel: {
      type: String,
      enum: ["User", "Teacher"],
      default: null,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    readAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);

export default Notification;