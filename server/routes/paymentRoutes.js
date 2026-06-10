import { Router } from "express";
import auth from "../middlewares/auth.js";
import { createPayment } from "../controller/paymobController.js";
import { getPaymentInfo } from "../controller/payment/paymentController.js";

const paymentRouter = Router();

paymentRouter.post('/pay', auth, createPayment)
paymentRouter.get("/:courseId", auth, getPaymentInfo)

export default paymentRouter