import { Router } from "express";
import auth from "../middlewares/auth.js";
import { deleteNotification, getNotifications } from "../controller/notifications/notificationsController.js";

const notificationRouter = Router();

notificationRouter.get("/", auth,  getNotifications)
notificationRouter.delete("/:id", auth,  deleteNotification)

export default notificationRouter