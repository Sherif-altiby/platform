import { Level } from "../../models/levelModel.js";
import { Course, Subject } from "../../models/model.js";
import { Teacher } from "../../models/teacherModel.js";
import { AppError } from "../../utils/appError.js";
import destroyImageCloudinary from "../../utils/destroyImage.js";
import uploadImageClodinary from "../../utils/uploadImages.js";

export const createCourseService = async (teacherId, data, file) => {
  if (!file) {
    throw new AppError("Course image file is required", 400);
  }

  const { title, subjectId, price, offer, offerExpirt, level, status } = data;

  const [teacher, subject, foundLevel] = await Promise.all([
    Teacher.findById(teacherId),
    Subject.findById(subjectId),
    Level.findById(level),
  ]);

  if (!teacher) {
    throw new AppError("Teacher not found", 404);
  }

  if (!subject) {
    throw new AppError("Subject not found", 404);
  }

  if (!foundLevel) {
    throw new AppError("المستوى الدراسي غير موجود", 404);
  }

  const uploaded = await uploadImageClodinary(file.buffer);

  const course = await Course.create({
    title,
    subject: subjectId,
    teacher: teacherId,
    image: uploaded.secure_url,
    price,
    offer,
    offerExpirt,
    level: foundLevel._id,
    status,
  });

  subject.courses.push(course._id);

  await subject.save();

  return course;
};

export const updateCourseService = async ({ courseId, body, file }) => {
  const { title, subjectId, price, offer, offerExpirt, level, status } = body;

  if (!courseId) {
    throw new AppError("Course ID is required", 400);
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new AppError("الكورس غير موجود", 404);
  }

  const offerValue = Number(offer);
  const priceValue = Number(price);

  if (
    offerValue &&
    priceValue &&
    offerValue >= priceValue &&
    status !== "open"
  ) {
    throw new AppError(
      `Offer ${offerValue} cannot be greater than or equal to price ${priceValue}`,
      400,
    );
  }

  // ================= IMAGE =================
  let imageUrl = course.image;

  if (file) {
    if (course.image) {
      await destroyImageCloudinary(course.image);
    }

    const uploaded = await uploadImageClodinary(file.buffer);
    imageUrl = uploaded.secure_url;
  }

  // ================= SUBJECT RELATION =================
  if (subjectId && subjectId !== course.subject.toString()) {
    await Subject.findByIdAndUpdate(course.subject, {
      $pull: { courses: courseId },
    });

    await Subject.findByIdAndUpdate(subjectId, {
      $push: { courses: courseId },
    });
  }

  // ================= LEVEL =================
  let levelId = course.level;

  if (level) {
    const foundLevel = await Level.findById(level);
    if (foundLevel) {
      levelId = foundLevel._id;
    }
  }

  // ================= UPDATE =================
  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    {
      title: title ?? course.title,
      subject: subjectId ?? course.subject,
      image: imageUrl,
      price: price ?? course.price,
      offer: offer ?? course.offer,
      offerExpirt: offerExpirt ?? course.offerExpirt,
      level: levelId,
      status: status ?? course.status,
    },
    { new: true },
  );

  return updatedCourse;
};
