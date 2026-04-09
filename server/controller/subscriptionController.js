import { Subscription } from "../models/subscriptionModel";

export const addSubscription = async (req, res) => {
  try {
    const { teacherId } = req.body;
    const studentId = req.userId;  

    if (!teacherId) {
      return res.status(400).json({ status: false, message: "معرف المعلم مطلوب" });
    }

    const newSub = await Subscription.create({
      studentId,
      teacherId
    });

    res.status(201).json({
      status: true,
      message: "تم الاشتراك بنجاح",
      data: newSub
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ status: false, message: "أنت مشترك بالفعل مع هذا المعلم" });
    }
    res.status(500).json({ status: false, error: error.message });
  }
};