import { Subject } from "../../models/model.js";
import { AppError } from "../../utils/appError.js";
import uploadImageClodinary from "../../utils/uploadImages.js";
import destroyImageCloudinary from "../../utils/destroyImage.js"
import mongoose from "mongoose";

export const getAllSubjectsService = async ({
    page = 1,
    limit = 10,
    search = "",
}) => {
    const skip = (page - 1) * limit;

    const query = {};

   
    if (search) {
        query.name = { $regex: search, $options: "i" };
        
    }

    const [subjects, total] = await Promise.all([
        Subject.find(query)
             .populate("teachers", "name")
             .populate("courses", "title")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),

        Subject.countDocuments(query),
    ]);

    return {
        subjects,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit),
        },
    };
};


export const createSubjectService = async ({ subjectName, file }) => {
  if (!subjectName) {
    throw new AppError("Complete data", 400);
  }

  const isSubjectExist = await Subject.findOne({ name: subjectName });
  if (isSubjectExist) {
    throw new AppError("The subject already exists", 400);
  }

  if (!file?.buffer) {
    throw new AppError("Subject image is required", 400);
  }

  const uploaded = await uploadImageClodinary(file.buffer);

  const newSubject = await Subject.create({
    name: subjectName,
    image: uploaded.secure_url,
  });

  return newSubject;
};


export const updateSubjectService = async ({ subId, name, file }) => {

 
  if (!mongoose.Types.ObjectId.isValid(subId)) {
    throw new AppError("Invalid Subject ID format", 400);
  }

  if (!name && !file) {
    throw new AppError("At least name or image is required", 400);
  }

  const subject = await Subject.findById(subId);
  if (!subject) {
    throw new AppError("Subject not found", 404);
  }

  // Update name
  if (name) {
    subject.name = name;
  }

  // Update image
  if (file?.buffer) {
    // Destroy old image first
    if (subject.image) {
      await destroyImageCloudinary(subject.image);
    }

    const uploaded = await uploadImageClodinary(file.buffer);
    subject.image = uploaded.secure_url;
  }

  await subject.save();
  return subject;
};