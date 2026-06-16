import { CourseAccess } from "../../models/courseAccessModel.js";
import { List } from "../../models/listModel.js";
import { Course } from "../../models/model.js";
import { AppError } from "../../utils/appError.js";
import uploadImageClodinary from "../../utils/uploadImages.js";

export const getPaymentInfoService = async (courseId) => {
  const course = await Course.findById(courseId)
    .select("title teacher price offer _id")
    .populate({
      path: "teacher",
      select: "name vCash instaPay _id",
    })
    .lean();

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  if (!course.teacher) {
    throw new AppError("Teacher not found", 404);
  }

  const coursePrice = course.price - course.offer

  return {
    courseTitle: course.title,
    coursePrice,
    courseId: course._id,
    teacherName: course.teacher.name,
    teacherId: course.teacher._id,

    vCash: {
      number: course.teacher.vCash.number,
      walletName: course.teacher.vCash.walletName,
    },

    instaPay: {
      number: course.teacher.instaPay?.number,
      instaPayName: course.teacher.instaPay?.instaPayName,
    },
  };
};


export const requestCourseAccessService = async (userId, file, data) => {

  const { courseId, method, teacherId } = data;

  if (!file) {throw new AppError("يرجى إرفاق صورة إيصال الدفع",400);}

  const course = await Course.findById(courseId);

  if (!course) {throw new AppError("الكورس غير موجود", 404);}

  const alreadyRequested = await CourseAccess.findOne({ student: userId, course: courseId, });

  if (alreadyRequested) {
    let message = "";

    if (alreadyRequested.status === "pending") {
      message = "طلبك قيد الانتظار حالياً";
    } else if (alreadyRequested.status === "open") {
      message =
        "لديك صلاحية الوصول لهذا الكورس بالفعل";
    } else {
      message =
        "تم رفض طلبك مسبقاً، يرجى التواصل مع الدعم";
    }

    throw new AppError(message, 400);
  }

  const uploaded = await uploadImageClodinary( file.buffer );

  const newAccessRequest = await CourseAccess.create({ student: userId, course: courseId, status: "pending", teacher: teacherId , receiptImage: uploaded.secure_url, });

  const newList = await List.create({ user: userId, course: courseId, method, image: uploaded.secure_url, teacher: teacherId });

  return newList;
};

export const getListsService = async ({
  page = 1,
  limit = 10,
  method,
  level,
  search,
  teacherId,
}) => {
  const query = {
    teacher: teacherId,
  };

  // filter by method
  if (method) {
    query.method = method;
  }

  // filter by level
  if (level) {
    query.level = level;
  }

  // search (example: user name or email)
  if (search) {
    query.$or = [
      { "user.name": { $regex: search, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;

  const [lists, total] = await Promise.all([
    List.find(query)
      .populate("user", "name email level")
      .populate("course", "title image")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

    List.countDocuments(query),
  ]);

  return {
    lists,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};