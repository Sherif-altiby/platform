import watchHistoryModel from "../models/watchHistoryModel.js";

export const updateWatchHistory = async (req, res) => {
    try {
        const { lessonId, teacherId, courseId } = req.body;
        
        const userId = req.userId; 

        if (!userId || !lessonId || !teacherId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "جميع المعرفات (User, Lesson, Teacher, Course) مطلوبة لتحديث السجل."
            });
        }

        const result = await watchHistoryModel.findOneAndUpdate(
            { userId, lessonId }, 
            { 
                userId, 
                teacherId, 
                courseId, 
                lessonId,
                updatedAt: new Date() 
            },
            { 
                upsert: true,          
                new: true,            
                runValidators: true    
            }
        );

        return res.status(200).json({
            success: true,
            message: "تم تحديث سجل المشاهدة بنجاح",
            data: result
        });

    } catch (error) {
        // 6. التعامل مع الأخطاء
        console.error("Error in updateWatchHistory Controller:", error.message);
        
        return res.status(500).json({
            success: false,
            message: "حدث خطأ داخلي أثناء تحديث سجل المشاهدة",
            error: error.message
        });
    }
};


export const getWatchList = async (req, res) => {
    try {

      const userId = req.userId  
  
      if (!userId) {
        return res.status(401).json({ status: false, message: "غير مصرح لك بالوصول" });
      }

      const latestWatched = await watchHistoryModel.find({ userId })
        .sort({ updatedAt: -1 }) 
        .limit(3)
        .populate({
          path: "lessonId",
          select: "title thumbnail", 
        })

        .populate({
          path: "teacherId",
          select: "name",
        })

        .populate({
          path: "courseId",
          select: "title", 
        });
  
      res.status(200).json({ 
        status: true, 
        data: latestWatched 
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
};