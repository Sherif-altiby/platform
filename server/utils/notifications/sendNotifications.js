import Notification from "../../models/notificationModel.js";
import { getIO } from "../../socket.js";

export const sendNotificationUtils = async ({ message, sender, senderModel, recipient, recipientModel,}) => {
  
  const notification = await Notification.create({ message, sender, senderModel, recipient, recipientModel, });

  const io = getIO();

  io.to(recipient.toString()).emit("notification", notification);

  return notification;
};
