import { validationResult } from "express-validator";
import { Teacher } from "../models/teacherModel.js";
import { PdfModel } from "../models/pdfModel.js";
import { VideoModel } from "../models/videoModel.js";
import { Quizz } from "../models/quizzModel.js";
import cloudinary from "../utils/uploadPdf.js";
import { Course } from "../models/model.js";
import { Subject } from "../models/model.js";
import uploadImageClodinary from "../utils/uploadImages.js";

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

export const teacherUploadQuiz = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        error: true,
        status: false,
      });
    }

    const teacherId = req.userId;
    const { title, level, questions } = req.body;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
        error: true,
        status: false,
      });
    }

    const isQuizeExist = await Quizz.findOne({ title });
    if (isQuizeExist) {
      return res.status(400).json({
        message: "Quiz already exists",
        error: true,
        status: false,
      });
    }

    // Shuffle answers for each question
    const shuffledQuestions = questions.map((question) => {
      const { answers, correctAnswer, title } = question;

      // Add a flag to each answer to identify the correct one
      const answersWithFlag = answers.map((answer) => ({
        text: answer,
        isCorrect: answer === correctAnswer,
      }));

      // Shuffle the answers array
      const shuffled = answersWithFlag.sort(() => 0.5 - Math.random());

      // Remove isCorrect flag and just keep answers array
      const shuffledAnswers = shuffled.map((item) => item.text);

      // Update correctAnswer with the new position
      const newCorrectAnswer = shuffled.find((item) => item.isCorrect).text;

      return {
        title,
        answers: shuffledAnswers,
        correctAnswer: newCorrectAnswer,
      };
    });

    const quiz = {
      title,
      level,
      teacher,
      questions: shuffledQuestions,
    };

    const newQuiz = new Quizz(quiz);
    await newQuiz.save();

    return res.status(200).json({
      message: "Quiz added successfully",
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
    if (!teacherId || !level) {
      return res.status(400).json({
        message: "Complete all data",
        error: true,
        status: false,
      });
    }

    const quizzes = await Quizz.find({ level, teacher: teacherId });
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

export const uploadPdf = async (req, res) => {
  try {
    const { level, title } = req.body;
    const teacherId = req.userId;

    // Validate input
    if (!level || !title) {
      return res.status(400).json({
        success: false,
        message: "Level and title are required",
      });
    }

    // Check for existing PDF
    const existingPdf = await PdfModel.findOne({ title });
    if (existingPdf) {
      return res.status(409).json({
        success: false,
        message: "PDF with this title already exists",
      });
    }

    // Validate file upload
    if (!req.file?.buffer) {
      return res.status(400).json({
        success: false,
        message: "No PDF file uploaded",
      });
    }

    // Upload to Cloudinary using buffer
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          format: "pdf",
          folder: "pdf_uploads",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    // Create new PDF record
    const newPdf = new PdfModel({
      teacher: teacherId,
      title,
      level,
      pdf: result.secure_url,
    });

    await newPdf.save();

    return res.status(201).json({
      success: true,
      message: "PDF uploaded successfully",
      data: {
        id: newPdf._id,
        title: newPdf.title,
        level: newPdf.level,
        url: newPdf.pdf,
        directUrl: newPdf.pdfDirectUrl,
        createdAt: newPdf.createdAt,
      },
    });
  } catch (error) {
    console.error("PDF upload error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const getPdfByLevel = async (req, res) => {
  try {
    const { level, teacherId } = req.body;
    if (!teacherId) {
      return res.status(400).json({
        message: "Complete all data",
        error: true,
        status: false,
      });
    }

    const pdf = await PdfModel.find({ teacher: teacherId, level });
    if (!pdf) {
      return res.status(404).json({
        message: "Pdf not found",
        error: true,
        status: false,
      });
    }

    return res.status(200).json({
      error: false,
      status: true,
      data: pdf,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const deletePdf = async (req, res) => {
  try {
    const { pdfId } = req.body;
    const teacherId = req.userId;

    if (!pdfId) {
      return res.status(400).json({
        message: "Provide video id",
        error: true,
        status: false,
      });
    }

    const deletedPdf = await PdfModel.findOneAndDelete({
      teacher: teacherId,
      _id: pdfId,
    });
    if (!deletedPdf) {
      return res.status(404).json({
        message: "Pdf not found",
        error: true,
        status: false,
      });
    }

    return res.json({
      message: "Pdf deleted successfully",
      error: true,
      status: false,
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
      (video) => video.level === "first"
    ).length;
    const secondLevelVideosLength = teacherVideos.filter(
      (video) => video.level === "second"
    ).length;
    const thirdLevelVideosLength = teacherVideos.filter(
      (video) => video.level === "third"
    ).length;

    const teacherQuizzes = await Quizz.find({ teacher: teacherId });

    const teacherQuizzesLength = teacherQuizzes.length;
    const firstLevelQuizzesLength = teacherQuizzes.filter(
      (quiz) => quiz.level === "first"
    ).length;
    const secondLevelQuizzesLength = teacherQuizzes.filter(
      (quiz) => quiz.level === "second"
    ).length;
    const thirdLevelQuizzesLength = teacherQuizzes.filter(
      (quiz) => quiz.level === "third"
    ).length;

    const teacherNotes = await PdfModel.find({ teacher: teacherId });

    const teacherNotesLength = teacherNotes.length;
    const firstLevelNotesLength = teacherNotes.filter(
      (note) => note.level === "first"
    ).length;
    const secondLevelNotesLength = teacherNotes.filter(
      (note) => note.level === "second"
    ).length;
    const thirdLevelNotesLength = teacherNotes.filter(
      (note) => note.level === "third"
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

export const teacherAddCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        error: true,
        status: false,
        details: errors.array(),
      });
    }

    // 1. Manually check if the file exists (since express-validator didn't)
    if (!req.file) {
      return res.status(400).json({
        message: "Course image file is required",
        error: true,
        status: false,
      });
    }

    const { title, subjectId, price, offer, offerExpirt, level } = req.body;
    const teacherId = req.userId;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found", error: true, status: false });
    }

    const isSubjectExist = await Subject.findById(subjectId);
    if (!isSubjectExist) {
      return res.status(404).json({ message: "Subject not found", error: true, status: false });
    }

    // 2. Upload to Cloudinary
    const uploaded = await uploadImageClodinary(req.file.buffer);

    const course = new Course({
      title,
      subject: subjectId,
      image: uploaded.secure_url, // Use the URL from Cloudinary
      price,
      offer,
      offerExpirt,
      level,
    });

    await course.save();

    isSubjectExist.courses.push(course);
    
    await isSubjectExist.save();

    return res.status(201).json({
      message: "Course added successfully",
      error: false,
      status: true,
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};