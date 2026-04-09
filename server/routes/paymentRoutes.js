import { Router } from "express";
import auth from "../middlewares/auth.js";
import { createPayment } from "../controller/paymobController.js";

const paymentRouter = Router();

paymentRouter.post('/pay', auth, createPayment)

export default paymentRouter