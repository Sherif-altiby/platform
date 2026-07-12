import { Teacher } from "../../models/teacherModel.js";
import { comparePassword } from "../../utils/hashPassword.js";
import generateRefreshToken from "../../utils/generateRefreshToken.js";
import { AppError } from "../../utils/appError.js";

export const loginTeacherService = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("يرجى تقديم البريد الإلكتروني وكلمة المرور", 400);
  }

  const teacher = await Teacher.findOne({ email });

  if (!teacher) {
    throw new AppError("المستخدم غير موجود", 404);
  }

  const isMatch = await comparePassword(password, teacher.password);

  if (!isMatch) {
    throw new AppError("البريد الإلكتروني أو كلمة المرور غير صحيحة", 400);
  }

  const refreshToken = await generateRefreshToken(
    teacher._id,
    teacher.role
  );

  const { password: _, ...accountData } = teacher.toObject();

  return {
    refreshToken,
    teacher: accountData,
  };
};