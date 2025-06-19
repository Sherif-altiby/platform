import sendEmail from "../config/sendEmail.js";
import { Subject, User } from "../models/model.js";
import { Comment } from "../models/commentsModel.js";
import { Teacher } from "../models/teacherModel.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import generatedAccessToken from "../utils/generateAccessToken.js";
import generateCode from "../utils/generateCode.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { validationResult } from "express-validator";
import { VideoModel } from "../models/videoModel.js";
import { generateRegistrationEmail } from "../utils/registerEmailTemplate.js";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        error: true,
        status: false,
      });
    }

    const { name, email, password, level, phone } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
        error: true,
        status: false,
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      level,
      phone,
    });

    await newUser.save();

    await sendEmail({
      sendTo: email,
      subject: "مرحبا بك في منصة بصيرة",
      html: generateRegistrationEmail(newUser.name, process.env.FRONTEMD_URL),
    });

    return res.status(201).json({
      message: "تم التسجيل بنجاح. رجاءا مراجعة البريد الالكتروني",
      error: false,
      status: true,
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      status: false,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(500).json({
        message: "Provide the all data",
        error: true,
        status: false,
      });
    }

    const user = await User.findOne({ email });
    const teacher = await Teacher.findOne({ email });

    if (!user && !teacher) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        status: false,
      });
    }

    if (user) {
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }

      const accessToken = await generatedAccessToken(user._id, user.role);
      const refreshToken = await generateRefreshToken(user._id, user.role);

      user.refreshToken = refreshToken;

      await user.save();

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const { password: _, ...accountData } = user.toObject();

      res.status(200).json({
        message: "User login successfully",
        error: false,
        status: true,
        data: {
          accessToken,
          refreshToken,
          user: accountData,
        },
      });
    }

    if (teacher) {
      const isMatch = await comparePassword(password, teacher.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }

      const accessToken = await generatedAccessToken(teacher._id, teacher.role);
      const refreshToken = await generateRefreshToken(
        teacher._id,
        teacher.role
      );

      teacher.refreshToken = refreshToken;

      await teacher.save();

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const { password: _, ...accountData } = teacher.toObject();

      res.status(200).json({
        message: "User login successfully",
        error: false,
        status: true,
        data: {
          accessToken,
          refreshToken,
          teacher: accountData,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      status: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        status: false,
      });
    }

    user.refreshToken = null;
    await user.save();

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      message: "User logged out successfully",
      error: false,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      status: false,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Provide email",
        error: true,
        status: false,
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "هذا الحساب ليس موجودا",
        error: true,
        status: false,
      });
    }

    const code = generateCode();
    const expireTime = new Date() + 60 * 60 * 1000; // 1hr

    const udateUser = await User.findByIdAndUpdate(user._id, {
      code: code,
      codeExpirt: new Date(expireTime).toISOString(),
    });

    await sendEmail({
      sendTo: email,
      subject: "منصة بصيرة التعليمية",
      html: forgotPasswordTemplate({
        name: user.name,
        code: code,
      }),
    });

    return res.json({
      message: "يرجي متابعة البريد الالكتروني",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      status: false,
    });
  }
};

export async function verifyForgotPasswordCode(req, res) {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        message: "Provide email and code",
        error: true,
        status: false,
      });
    }

    const user = await User.findOne({ email });
    const teacher = await Teacher.findOne({ email });

    if (!user && !teacher) {
      return res.status(400).json({
        message: "These email not found",
        error: true,
        status: false,
      });
    }

    const currentTime = new Date().toISOString();

    if (user) {
      if (user.codeExpirt < currentTime) {
        return res.status(400).json({
          message: "code is expired",
          error: true,
          status: false,
        });
      }

      if (code !== user.code) {
        return res.status(400).json({
          message: "Invalid code",
          error: true,
          status: false,
        });
      }

      const updatedUser = await User.findByIdAndUpdate(user._id, {
        codeExpirt: "",
        code: "",
      });

      const refreshToken = await generateRefreshToken(user._id, user.role);

      user.refreshToken = refreshToken;

      await user.save();

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: "/",
      });
    }

    if (teacher) {
      if (teacher.codeExpirt < currentTime) {
        return res.status(400).json({
          message: "code is expired",
          error: true,
          status: false,
        });
      }

      if (code !== teacher.code) {
        return res.status(400).json({
          message: "Invalid code",
          error: true,
          status: false,
        });
      }

      const updatedTeacher = await Teacher.findByIdAndUpdate(user._id, {
        codeExpirt: "",
        code: "",
      });

      const refreshToken = await generateRefreshToken(
        teacher._id,
        teacher.role
      );

      teacher.refreshToken = refreshToken;

      await teacher.save();

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: "/",
      });
    }

    return res.json({
      message: "Verify code successfuly",
      error: false,
      status: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      error: true,
      status: false,
    });
  }
}

export const ressetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Provide email and Password and Confirm pasword",
        error: true,
        success: false,
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "These email not found",
        error: true,
        status: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "the newPassword and confirmPasword not same",
        error: true,
        status: false,
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    const updatePassword = await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });

    return res.json({
      message: "Password updated successfully",
      error: false,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: err.message,
      error: true,
      status: false,
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
      return res.status(500).json({
        message: "User not found",
        error: true,
        status: false,
      });
    }

    return res.json({
      message: "User details",
      data: user,
      error: false,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: err.message,
      error: true,
      status: false,
    });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, password, mobile } = req.body;

    if (!name && !email && !password && !mobile) {
      return res.status(400).json({
        message: "No fields provided for update",
        error: true,
        status: false,
      });
    }

    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (mobile) updateFields.mobile = mobile;

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      updateFields.password = await bcryptjs.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        status: false,
      });
    }

    return res.status(200).json({
      message: "User details updated successfully",
      error: false,
      status: true,
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}).select("-password -refreshToken");
    const data = allUsers.filter((user) => user.role !== "admin");

    return res.json({
      error: false,
      status: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const getAllTeachers = async (req, res) => {
  try {
    const allTeachers = await Teacher.find({})
      .select("-password -refreshToken")
      .populate("subjects");

    return res.json({
      error: false,
      status: true,
      data: allTeachers,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const getAllSubjects = async (req, res) => {
  try {
    const allSubs = await Subject.find({});

    return res.json({
      error: false,
      status: true,
      data: allSubs,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const getSubjectDetails = async (req, res) => {
  try {
    const { subId } = req.body;

    if (!subId) {
      return res.status(400).json({
        message: "Provide sub Id",
        error: true,
        status: false,
      });
    }

    const subDetails = await Subject.findById(subId).populate(
      "teachers",
      "name avatar about"
    );

    if (!subDetails) {
      return res.status(404).json({
        message: "Not found",
        error: true,
        status: false,
      });
    }

    return res.json({
      error: false,
      status: true,
      data: subDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const getVideo = async (req, res) => {
  try {
    const { teacherId, level, videoId } = req.body;
    if (!teacherId || !level || !videoId) {
      return res.status(400).json({
        message: "Complete all data",
        error: true,
        status: false,
      });
    }

    const teacherVideo = await VideoModel.findOne({ teacher: teacherId });
    if (!teacherVideo) {
      return res.status(404).json({
        message: "Teacher not found",
        error: true,
        status: false,
      });
    }

    if (!teacherVideo.level[level]) {
      return res.status(404).json({
        message: "Level not found",
        error: true,
        status: false,
      });
    }

    const video = teacherVideo.level[level].find(
      (item) => item._id.toString() === videoId.toString()
    );
    if (!video) {
      return res.status(404).json({
        message: "Video not found",
        error: true,
        status: false,
      });
    }

    return res.status(200).json({
      message: "video loaded successfully",
      error: false,
      status: true,
      data: video,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const getVideoByLevel = async (req, res) => {
  try {
    const { level, teacherId } = req.body;
    if (!level || !teacherId) {
      return res.status(400).json({
        message: "Provide level and teacher id",
        error: true,
        status: false,
      });
    }

    const teacherVideo = await VideoModel.find({ teacher: teacherId, level });
    if (!teacherVideo) {
      return res.status(404).json({
        message: "Teacher not found",
        error: true,
        status: false,
      });
    }

    return res.status(200).json({
      message: "Videos loaded successfully",
      error: false,
      status: true,
      data: teacherVideo,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { rate, comment } = req.body;
    const userId = req.userId;
    if (!rate) {
      return res.status(400).json({
        message: "Provide user rate",
        error: true,
        status: false,
      });
    }

    if (!comment) {
      return res.status(400).json({
        message: "Provide comment",
        error: true,
        status: false,
      });
    }

    const isExist = await Comment.findOne({ user: userId });
    if (isExist) {
      isExist.comment = comment;
      isExist.rate = rate;

      await isExist.save();

      return res.json({
        message: "comment updated successfully",
        error: false,
        status: true,
        data: isExist,
      });
    }

    const userComment = {
      user: userId,
      comment,
      rate,
      show: false,
    };

    const newComment = new Comment(userComment);
    await newComment.save();

    return res.json({
      message: "comment added successfully",
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

export const getAvilableComments = async (req, res) => {
  try {
    const comments = await Comment.find({ show: true }).populate(
      "user",
      "name email level phone"
    );
    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: "No visible comments found" });
    }

    return res.json({
      error: false,
      status: true,
      data: comments,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.json({
        message: "Unautheraized",
        error: true,
        status: false,
      });
    }

    const user = await User.findById(userId).select("-password");
    const teacher = await Teacher.findById(userId).select("-password");

    if (user) {
      return res.json({
        message: "User loaded succfully",
        error: false,
        status: true,
        user,
      });
    }

    if (teacher) {
      return res.json({
        message: "User loaded succfully",
        error: false,
        status: true,
        user: teacher,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const userUpdateProfile = async (req, res) => {
  try {
    const { name, email, phone, level } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    const teacher = await Teacher.findById(userId);

    if (!user && !teacher) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        status: false,
      });
    }

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.phone = phone || user.phone;
      user.level = level || user.level;

      await user.save();

      return res.status(200).json({
        message: "تم حفظ البيانات بنجاح",
        error: false,
        status: true,
        user,
      });
    }

    if (teacher) {
      teacher.name = name || teacher.name;
      teacher.email = email || teacher.email;
      teacher.phone = phone || teacher.phone;
      teacher.level = level || teacher.level;

      await teacher.save();

      return res.status(200).json({
        message: "تم حفظ البيانات بنجاح",
        error: false,
        status: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const userChangePassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const userId = req.userId;

    if (!password || !confirmPassword) {
      return res.status(400).json({
        message: "Provide All data",
        error: true,
        status: false,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and new Confirm password must be same",
        error: true,
        status: false,
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.findById(userId);
    const teacher = await Teacher.findById(userId);

    if (!user && !teacher) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        status: false,
      });
    }

    if (user) {
      user.password = hashedPassword;

      await user.save();

      return res.status(200).json({
        message: "تم حفظ البيانات بنجاح",
        error: false,
        status: true,
      });
    }

    if (teacher) {
      teacher.password = hashedPassword;

      await teacher.save();

      return res.status(200).json({
        message: "تم حفظ البيانات بنجاح",
        error: false,
        status: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      status: false,
    });
  }
};

export const getPlatformStatics = async (req, res) => {
  try {
    const teacherCount = await Teacher.countDocuments();
    const videoCount = await VideoModel.countDocuments();
    const userCount = await User.countDocuments();

    return res.status(200).json({
      status: true,
      error: false,
      message: "تم جلب الإحصائيات بنجاح",
      data: {
        teachers: teacherCount,
        lessons: videoCount,
        users: userCount,
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
