import { QuizzesHistory } from "../models/watchedQuizMode.js";

export const getWatchQuizzesList = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ status: false, message: "غير مصرح لك بالوصول" });
    }

    const latestWatched = await QuizzesHistory.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(3)

      .populate({
        path: "teacherId",
        select: "name",
      })

      .populate({
        path: "quizId",
        select: "title _id",
      })

      .populate({
        path: "courseId",
        select: "title",
      })

      .lean();

    res.status(200).json({
      status: true,
      data: latestWatched,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
