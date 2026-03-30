import { Comment } from "../models/commentsModel.js";

export const getComments = async (req, res) => {
    try {

        const comments = await Comment.find({}).populate('user', 'name email level phone');
        return res.json({
            error: false,
            status: true,
            data: comments
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            status: false,
        });
    }
}


export const showComment = async (req, res) => {
    try {

         const { commentId } = req.body;
         if(!commentId){
            return res.status(500).json({
                message: "Provide comment id",
                error: true,
                status: false,
            });
         }

         const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { $set: { show: true } }, 
            { new: true }  
        );
         if(!updatedComment){
            return res.status(404).json({
                message: "Comment not founded",
                error: true,
                status: false,
            });
         }

         
         return res.status(200).json({
            message: "Comment show is true",
            error: false,
            status: true,
            data: updatedComment
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            status: false,
        });
    }
}


export const deleteComment = async (req, res) => {
    try {

         const { commentId } = req.body;
         if(!commentId){
            return res.status(500).json({
                message: "Provide comment id",
                error: true,
                status: false,
            });
         }

         await Comment.findByIdAndDelete(commentId)

         return res.status(200).json({
            message: "Comment deleted",
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
}
