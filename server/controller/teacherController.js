import { validationResult } from "express-validator";
import { Teacher } from "../models/teacherModel.js";
import { PdfModel } from "../models/pdfModel.js";
import { VideoModel } from "../models/videoModel.js";
import { Quizz } from "../models/quizzModel.js";
import uploadImageClodinary from "../utils/uploadImages.js";
import destroyImageCloudinary from "../utils/destroyImage.js";

export const getTeacherById = async (req, res) => {
  try {
    const { teacherId } = req.params;

    if (!teacherId) {
      return res.status(400).json({
        message: "Provide teacher ID",
        error: true,
        status: false,
      });
    }

    const teacher = await Teacher.findById(teacherId)
      .select("-password")
      .populate("subjects");

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
        error: true,
        status: false,
      });
    }

    return res.json({
      message: "Teacher loaded successfullt",
      error: false,
      status: true,
      data: teacher,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const teacherUploadVideo = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        error: true,
        status: false,
      });
    }

    const { link, title, description, level } = req.body;
    const teacherId = req.userId;

    const videoInfo = {
      teacher: teacherId,
      link,
      title,
      description,
      level,
    };

    const lesson = new VideoModel(videoInfo);
    await lesson.save();

    return res.status(200).json({
      message: "Video uploaded successfully",
      error: false,
      status: true,
      data: videoInfo,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const teacherDeleteVideo = async (req, res) => {
  try {
    const { videoId } = req.body;
    if (!videoId) {
      return res.status(400).json({
        message: "Provide video Id",
        error: true,
        status: false,
      });
    }

    const teacherId = req.userId;

    const deletedVideo = await VideoModel.findOneAndDelete({
      _id: videoId,
      teacher: teacherId,
    });
    if (!deletedVideo) {
      return res.status(404).json({
        message: "The lesson not founded",
        error: true,
        status: false,
      });
    }

    return res.status(200).json({
      message: "Video deleted successfully",
      error: false,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const teacherUpdateVideo = async (req, res) => {
  try {
    const teacherId = req.userId;
    const { description, level, title, link, videoId } = req.body;

    if (!videoId) {
      return res.status(500).json({
        message: "Provide video Id",
        error: true,
        status: false,
      });
    }

    const isVideoExist = await VideoModel.findOne({
      _id: videoId,
      teacher: teacherId,
    });
    if (!isVideoExist) {
      return res.status(404).json({
        message: "هذا الدرس ليس موجود",
        error: true,
        status: false,
      });
    }

    const updateFields = {};
    if (description) updateFields.description = description;
    if (level) updateFields.level = level;
    if (title) updateFields.title = title;
    if (link) updateFields.link = link;

    if (Object.keys(updateFields).length > 0) {
      await VideoModel.updateOne({ _id: videoId }, { $set: updateFields });
    }

    return res.status(200).json({
      message: "تم تعديل الدرس بنجاح",
      error: false,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const getTeacherQuizzesByLevel = async (req, res) => {
  try {
    const { teacherId, level } = req.body;
    console.log("teacherId, level", teacherId, level);
    if (!teacherId || !level) {
      return res.status(400).json({
        message: "Complete all data",
        error: true,
        status: false,
      });
    }

    const quizzes = await Quizz.find({ level, teacher: teacherId })
      .populate("course", "title _id")
      .populate("subject", "name _id");
    if (!quizzes) {
      return res.status(404).json({
        message: "No quizzes founded",
        error: true,
        status: false,
      });
    }

    return res.status(200).json({
      error: false,
      status: true,
      data: quizzes,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const getQuizeById = async (req, res) => {
  try {
    const quizId = req.params.id;
    if (!quizId) {
      return res.status(400).json({
        message: "Provide quize Id",
        error: true,
        status: false,
      });
    }

    const quiz = await Quizz.findById(quizId);
    if (!quiz) {
      return res.status(500).json({
        message: "Quiz not found",
        error: true,
        status: false,
      });
    }

    return res.status(200).json({
      error: false,
      status: true,
      data: quiz,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const deleteQuize = async (req, res) => {
  try {
    const { quizId } = req.body;
    if (!quizId) {
      return res.status(400).json({
        message: "Provide Quiz Id",
        error: true,
        status: false,
      });
    }

    const teacherId = req.userId;

    const deletedQuiz = await Quizz.findOneAndDelete({
      _id: quizId,
      teacher: teacherId,
    });

    if (!deletedQuiz) {
      return res.status(404).json({
        message: "Quiz not found or you do not have permission to delete it",
        error: true,
        status: false,
      });
    }

    return res.status(200).json({
      message: "Quiz deleted successfully",
      error: false,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const teacherStatics = async (req, res) => {
  try {
    const teacherId = req.userId;

    const teacherVideos = await VideoModel.find({ teacher: teacherId });

    const teacherVideosLength = teacherVideos.length;
    const firstLevelVideosLength = teacherVideos.filter(
      (video) => video.level === "first",
    ).length;
    const secondLevelVideosLength = teacherVideos.filter(
      (video) => video.level === "second",
    ).length;
    const thirdLevelVideosLength = teacherVideos.filter(
      (video) => video.level === "third",
    ).length;

    const teacherQuizzes = await Quizz.find({ teacher: teacherId });

    const teacherQuizzesLength = teacherQuizzes.length;
    const firstLevelQuizzesLength = teacherQuizzes.filter(
      (quiz) => quiz.level === "first",
    ).length;
    const secondLevelQuizzesLength = teacherQuizzes.filter(
      (quiz) => quiz.level === "second",
    ).length;
    const thirdLevelQuizzesLength = teacherQuizzes.filter(
      (quiz) => quiz.level === "third",
    ).length;

    const teacherNotes = await PdfModel.find({ teacher: teacherId });

    const teacherNotesLength = teacherNotes.length;
    const firstLevelNotesLength = teacherNotes.filter(
      (note) => note.level === "first",
    ).length;
    const secondLevelNotesLength = teacherNotes.filter(
      (note) => note.level === "second",
    ).length;
    const thirdLevelNotesLength = teacherNotes.filter(
      (note) => note.level === "third",
    ).length;

    return res.json({
      error: false,
      success: true,
      data: {
        videosLength: teacherVideosLength,
        firstLevelVideosLength,
        secondLevelVideosLength,
        thirdLevelVideosLength,

        quizzesLength: teacherQuizzesLength,
        firstLevelQuizzesLength,
        secondLevelQuizzesLength,
        thirdLevelQuizzesLength,

        notesLength: teacherNotesLength,
        firstLevelNotesLength,
        secondLevelNotesLength,
        thirdLevelNotesLength,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const teacherUpdateProfile = async (req, res) => {
  try {
    const { name, email, phone, about } = req.body;
    const teacherId = req.userId;

    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({
        message: "المعلم غير موجود",
        error: true,
        status: false,
      });
    }

    teacher.name = name || teacher.name;
    teacher.email = email || teacher.email;
    teacher.phone = phone || teacher.phone;
    teacher.about = about || teacher.about;

    // 3. Save the document
    const updatedTeacher = await teacher.save();

    // 4. Return success
    return res.status(200).json({
      message: "تم حفظ البيانات بنجاح",
      error: false,
      status: true,
      data: {
        name: updatedTeacher.name,
        email: updatedTeacher.email,
        phone: updatedTeacher.phone,
        about: updatedTeacher.about,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      message: "حدث خطأ في الخادم، حاول مرة أخرى",
      error: true,
      status: false,
    });
  }
};

export const teacherUpdateAvatar = async (req, res) => {
  try {
    const teacherId = req.userId;

    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({
        message: "المعلم غير موجود",
        error: true,
        status: false,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Provide avatar image",
        error: true,
        status: false,
      });
    }

    const destroyAvatar = await destroyImageCloudinary(teacher.avatar);

    const uploaded = await uploadImageClodinary(req.file.buffer);

    await Teacher.updateOne(
      { _id: teacherId },
      {
        $set: {
          avatar: uploaded.secure_url,
        },
      },
    );

    return res.status(200).json({
      message: "تم تحديث الصورة الشخصية بنجاح",
      error: false,
      status: true,
      data: { avatar: uploaded.secure_url },
      destroyAvatar
    });
  } catch (error) { }
};
