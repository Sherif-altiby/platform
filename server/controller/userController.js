import { Subject, User } from "../models/model.js";
import { Comment } from "../models/commentsModel.js";
import { Teacher } from "../models/teacherModel.js";
import { VideoModel } from "../models/videoModel.js";


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
