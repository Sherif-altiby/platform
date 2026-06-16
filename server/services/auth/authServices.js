import sendEmail from "../../config/sendEmail.js";
import { User } from "../../models/model.js";
import { AppError } from "../../utils/appError.js";
import forgotPasswordTemplate from "../../utils/forgotPasswordTemplate.js";
import  generateCode  from "../../utils/generateCode.js";
import bcrypt from "bcrypt";

export const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email });

  if (!user) { throw new AppError("هذا الحساب غير موجود", 404)}

  const otp = generateCode().toString();

  const hashedOtp = await bcrypt.hash(otp, 10);

  user.code = hashedOtp;
  user.codeExpirt = Date.now() + 60 * 60 * 1000; // 1 hour
 
  await user.save();

  await sendEmail({
    sendTo: user.email,
    subject: "منصة العبقري التعليمية",
    html: forgotPasswordTemplate({
      name: user.name,
      code: otp,
    }),
  });

  return {
    message: "يرجى مراجعة البريد الإلكتروني",
  };
};



export const verifyOtpService = async (email, otp) => {
    const user = await User.findOne({ email }).select("-password ");
  
    if (!user) { throw new AppError("المستخدم غير موجود", 404); }
  
    if ( !user.code || user.codeExpirt < Date.now() ) { throw new AppError("انتهت صلاحية الكود", 400); }
  
    const isMatch = await bcrypt.compare( otp, user.code );
  
    if (!isMatch) { throw new AppError("الكود غير صحيح", 400);}

    user.code = undefined;
    user.codeExpirt = undefined;

    await user.save();
  
    return user;
  };


  export const logoutService = async (userId) => {
    const user = await User.findById(userId);
  
    if (!user) {
      throw new AppError("المستخدم غير موجود", 404);
    }
  
    user.refreshToken = null;
  
    await user.save();
  
    return {
      message: "تم تسجيل الخروج بنجاح",
    };
  };