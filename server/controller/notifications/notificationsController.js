import Notification from "../../models/notificationModel.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getNotifications = asyncHandler(async (req, res) => {
    const userId = req.userId;
  
    const notifications = await Notification.find({
      recipient: userId,
    })
      .sort({ createdAt: -1 })
      .limit(50);
  
    res.status(200).json({
      success: true,
      data: notifications,
    });
  });



  export const deleteNotification = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    const notification = await Notification.findByIdAndDelete(id);
  
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }
  
    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
      data: notification,
    });
  });