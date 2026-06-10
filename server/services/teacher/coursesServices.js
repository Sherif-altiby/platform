import { Level } from "../../models/levelModel.js";
import { Course, Subject } from "../../models/model.js";
import { Teacher } from "../../models/teacherModel.js";
import uploadImageClodinary from "../../utils/uploadImages.js";

export const createCourseService = async ( teacherId, data, file ) => {
    if (!file) { throw new AppError( "Course image file is required", 400 ); }
  
    const { title, subjectId, price, offer, offerExpirt, level, status, } = data;
  
    const [teacher, subject, foundLevel] =
      await Promise.all([
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
  
    if (!foundLevel) { throw new AppError( "المستوى الدراسي غير موجود", 404 ); }
  
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