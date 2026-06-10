import { getPaymentInfoService } from "../../services/payment/paymentServices.js";
import {asyncHandler }  from "../../utils/asyncHandler.js"

export const getPaymentInfo = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
  
    const paymentInfo = await getPaymentInfoService(courseId);
  
    res.status(200).json({ message: "Payment information fetched successfully", error: false, status: true, data: paymentInfo,});
  });