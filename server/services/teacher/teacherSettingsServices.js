import { Teacher } from "../../models/teacherModel.js";
import {AppError} from "../../utils/appError.js"
 

export const updateTeacherProfileService = async ({
  teacherId,
  body,
}) => {
  const {
    name,
    email,
    phone,
    about,
    vCashNumber ,
    vCashName,
    instaNumber,
    instaName,
  } = body;

  const teacher = await Teacher.findById(teacherId);

  if (!teacher) {
    throw new AppError("المعلم غير موجود", 404);
  }

  // ================= BASIC INFO =================
  teacher.name = name || teacher.name;
  teacher.email = email || teacher.email;
  teacher.phone = phone || teacher.phone;
  teacher.about = about || teacher.about;

  // ================= VODAFONE CASH =================
  if (!teacher.vCash) teacher.vCash = {};

  teacher.vCash.number =
  vCashNumber  || teacher.vCash.number;

  teacher.vCash.walletName =
    vCashName || teacher.vCash.walletName;

  // ================= INSTAPAY =================
  if (!teacher.instaPay) teacher.instaPay = {};

  teacher.instaPay.number =
    instaNumber || teacher.instaPay.number;

  teacher.instaPay.instaPayName =
    instaName || teacher.instaPay.instaPayName;

  const updatedTeacher = await teacher.save();

  return updatedTeacher;
};

export const getTeacherInfoService = async (teacherId) => {
    if (!teacherId) {
      throw new AppError("Teacher ID is required", 400);
    }
  
    const teacher = await Teacher.findById(teacherId).select(
      "-password -refreshToken -myStudents -subjects -role -notifications -isBlocked"
    );
  
    if (!teacher) {
      throw new AppError("المعلم غير موجود", 404);
    }
  
    return teacher;
  };