
import { Subject } from "../../models/model.js";
import { Teacher } from "../../models/teacherModel.js";
import { AppError } from "../../utils/appError.js";
import { hashPassword } from "../../utils/hashPassword.js";
import uploadImageClodinary from "../../utils/uploadImages.js";


export const createTeacherService = async (data, file) => {
  const {
    name,
    email,
    password,
    phone,
    subId,
    about,
    instaPayNumber,
    instaPayName,
    vCashNumber,
    vCashName,
  } = data;

  const subject = await Subject.findById(subId);

  if (!subject) {
    throw new AppError("Subject not found", 404);
  }

  if(!file) {
    throw new AppError("Teacher Image is required", 400);
  }

  const isTeacherExist = await Teacher.findOne({ email });

  if (isTeacherExist) {
    throw new AppError("teacher is already exist", 400);
  }

  const hashedPass = await hashPassword(password);

  const uploaded = await uploadImageClodinary(file.buffer);

  const teacher = new Teacher({
    name,
    email,
    phone,
    password: hashedPass,
    avatar: uploaded.secure_url,
    about,
    subjects: [subject._id],

    vCash: {
      number: vCashNumber,
      walletName: vCashName,
    },

    instaPay: {
      number: instaPayNumber,
      instaPayName,
    },
  });

  await teacher.save();

  subject.teachers.push(teacher._id);

  await subject.save();

  return teacher;
};