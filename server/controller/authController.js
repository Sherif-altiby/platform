import { validationResult } from "express-validator";
import { User } from "../models/model.js";
import { generateRegistrationEmail } from "../utils/registerEmailTemplate.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import generatedAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import { Teacher } from "../models/teacherModel.js";
import sendEmail from "../config/sendEmail.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import generateCode from "../utils/generateCode.js";
import { Level } from "../models/levelModel.js";
import { forgotPasswordService, logoutService, verifyOtpService } from "../services/auth/authServices.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError} from "../utils/appError.js"

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        error: true,
        status: false,
      });
    }

    const { name, email, password, level, phone, parentPhone } = req.body;

    const levelExists = await Level.findById(level);

    if (!levelExists) {
      return res.status(404).json({
        message: "المستوى الدراسي المحدد غير موجود",
        error: true,
        status: false,
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
        error: true,
        status: false,
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      level,
      phone,
      parentPhone
    });

    await newUser.save();

    await sendEmail({
      sendTo: email,
      subject: "مرحبا بك في منصة العبقري",
      html: generateRegistrationEmail(newUser.name, process.env.FRONTEMD_URL),
    });

    return res.status(201).json({
      message: "تم التسجيل بنجاح. رجاءا مراجعة البريد الالكتروني",
      error: false,
      status: true,
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      status: false,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. التحقق من وجود البيانات المرسلة
    if (!email || !password) {
      return res.status(400).json({
        message: "يرجى تقديم البريد الإلكتروني وكلمة المرور",
        error: true,
        status: false,
      });
    }

    // 2. البحث عن المستخدم أو المدرس
    const user = await User.findOne({ email });
    const teacher = await Teacher.findOne({ email });

    if (!user && !teacher) {
      return res.status(404).json({
        message: "المستخدم غير موجود",
        error: true,
        status: false,
      });
    }

    // --- حالة تسجيل دخول الطالب (User) ---
    if (user) {
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
          error: true,
          status: false,
        });
      }

      const accessToken = await generatedAccessToken(user._id, user.role);
      const refreshToken = await generateRefreshToken(user._id, user.role);

      // تحديث الـ refreshToken مباشرة لتجنب خطأ الـ Validation (مثل parentPhone)
      await User.updateOne(
        { _id: user._id },
        { $set: { refreshToken: refreshToken } }
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      const { password: _, ...accountData } = user.toObject();

      return res.status(200).json({
        message: "تم تسجيل دخول الطالب بنجاح",
        error: false,
        status: true,
        data: {
          accessToken,
          refreshToken,
          user: accountData,
        },
      });
    }

    // --- حالة تسجيل دخول المدرس (Teacher) ---
    if (teacher) {
      const isMatch = await comparePassword(password, teacher.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
          error: true,
          status: false,
        });
      }

      const accessToken = await generatedAccessToken(teacher._id, teacher.role);
      const refreshToken = await generateRefreshToken(teacher._id, teacher.role);

      // تحديث الـ refreshToken للمدرس
      await Teacher.updateOne(
        { _id: teacher._id },
        { $set: { refreshToken: refreshToken } }
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      const { password: _, ...accountData } = teacher.toObject();

      return res.status(200).json({
        message: "تم تسجيل دخول المدرس بنجاح",
        error: false,
        status: true,
        data: {
          accessToken,
          refreshToken,
          teacher: accountData,
        },
      });
    }

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: error.message || "حدث خطأ داخلي في السيرفر",
      error: true,
      status: false,
    });
  }
};

export const logout = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const result = await logoutService(userId);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
    path: "/",
  });

  return res.status(200).json({
    success: true,
    error: false,
    ...result,
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) { throw new AppError("البريد الإلكتروني مطلوب", 400); }

  const result = await forgotPasswordService(email);

  res.status(200).json({ success: true, error: false, ...result, });

});


 
export const verifyForgotPasswordCode = asyncHandler(async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) { throw new AppError("البريد الإلكتروني والكود مطلوبان", 400);}

  const user = await verifyOtpService(email, code);

  const refreshToken = await generateRefreshToken(user._id, user.role);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  return res.status(200).json({ success: true, error: false, message: "تم التحقق من الكود بنجاح", refreshToken , user});
});



export const ressetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Provide email and Password and Confirm pasword",
        error: true,
        success: false,
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "These email not found",
        error: true,
        status: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "the newPassword and confirmPasword not same",
        error: true,
        status: false,
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    const updatePassword = await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });

    return res.json({
      message: "Password updated successfully",
      error: false,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: err.message,
      error: true,
      status: false,
    });
  }
};

export const userChangePassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const userId = req.userId;

    if (!password || !confirmPassword) {
      return res.status(400).json({
        message: "Provide All data",
        error: true,
        status: false,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and new Confirm password must be same",
        error: true,
        status: false,
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.findById(userId);
    const teacher = await Teacher.findById(userId);

    if (!user && !teacher) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        status: false,
      });
    }

    if (user) {
      user.password = hashedPassword;

      await user.save();

      return res.status(200).json({
        message: "تم حفظ البيانات بنجاح",
        error: false,
        status: true,
      });
    }

    if (teacher) {
      teacher.password = hashedPassword;

      await teacher.save();

      return res.status(200).json({
        message: "تم حفظ البيانات بنجاح",
        error: false,
        status: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};