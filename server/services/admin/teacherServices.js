
import { Subject } from "../../models/model.js";
import { Teacher } from "../../models/teacherModel.js";
import { AppError } from "../../utils/appError.js";
import { hashPassword } from "../../utils/hashPassword.js";
import uploadImageClodinary from "../../utils/uploadImages.js";


export const createTeacherService = async (data, file) => {
  const {name,email,password,phone,subId,about,instaPayNumber,instaPayName,vCashNumber,vCashName,} = data;

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

export const updateTeacherService = async (teacherId, data, file) => {
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

  const teacher = await Teacher.findById(teacherId);

  if (!teacher) {
    throw new AppError("Teacher not found", 404);
  }

  // Update subject if changed
  if (subId) {
    const subject = await Subject.findById(subId);

    if (!subject) {
      throw new AppError("Subject not found", 404);
    }

    const oldSubjectId = teacher.subjects[0]?.toString();

    if (oldSubjectId !== subId) {
      // Remove teacher from old subject
      if (oldSubjectId) {
        await Subject.findByIdAndUpdate(oldSubjectId, {
          $pull: { teachers: teacher._id },
        });
      }

      // Add teacher to new subject
      await Subject.findByIdAndUpdate(subId, {
        $addToSet: { teachers: teacher._id },
      });

      teacher.subjects = [subId];
    }
  }

  if (name) teacher.name = name;
  if (phone) teacher.phone = phone;
  if (about) teacher.about = about;

  // Update password if provided
  if (password) {
    teacher.password = await hashPassword(password);
  }

  // Update image if uploaded
  if (file) {
    const uploaded = await uploadImageClodinary(file.buffer);
    teacher.avatar = uploaded.secure_url;
  }

  // Update VCash
  teacher.vCash = {
    number: vCashNumber ?? teacher.vCash?.number,
    walletName: vCashName ?? teacher.vCash?.walletName,
  };

  // Update InstaPay
  teacher.instaPay = {
    number: instaPayNumber ?? teacher.instaPay?.number,
    instaPayName: instaPayName ?? teacher.instaPay?.instaPayName,
  };

  await teacher.save();

  return teacher;
};


export const updateTeacherPasswordService = async (teacherId, password) => {
  if (!password) {
    throw new AppError("Password is required", 400);
  }

  const teacher = await Teacher.findById(teacherId);

  if (!teacher) {
    throw new AppError("Teacher not found", 404);
  }

  console.log(password)

  teacher.password = await hashPassword(password);

  await teacher.save();

  return teacher;
};

export const getAllTeachersService = async ({
    page = 1,
    limit = 10,
    search = "",
}) => {
    const skip = (page - 1) * limit;

    const query = {};

   
    if (search) {
        query.name = { $regex: search, $options: "i" };
        
    }


    const [teachers, total] = await Promise.all([
        Teacher.find(query)
            .select("name email phone about avatar vCash instaPay subjects")
            .populate("subjects", "name")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),

        Teacher.countDocuments(query),
    ]);

    return {
        teachers,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit),
        },
    };
};