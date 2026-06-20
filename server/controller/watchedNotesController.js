import { NoteHistory } from "../models/watchedNotesModel.js";

export const addNoteToHistory = async (req, res) => {
  try {
    const { noteId, teacherId, courseId } = req.body;

    const userId = req.userId; 
    if (!noteId || !teacherId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "جميع المعرفات (noteId, teacherId, courseId) مطلوبة.",
      });
    }

    const history = await NoteHistory.findOneAndUpdate(
      { userId, noteId }, 
      {
        userId,
        teacherId,
        courseId,
        noteId,
        updatedAt: new Date(), 
      },
      {
        upsert: true, 
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "تم تحديث تاريخ المذكرات بنجاح",
      data: history,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "خطأ داخلي أثناء حفظ تاريخ المذكرة",
      error: error.message,
    });
  }
};



export const getWatchNotesList = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ status: false, message: "غير مصرح لك بالوصول" });
    }

    const latestWatched = await NoteHistory.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(3)

      .populate({
        path: "teacherId",
        select: "name",
      })

      .populate({
        path: "noteId",
        select: "title",
      })

      .populate({
        path: "courseId",
        select: "title",
      });

    res.status(200).json({
      status: true,
      data: latestWatched,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
