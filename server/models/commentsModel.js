import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String,
        required: true,
    },
    rate: {
       type: Number,
       required: true
    },
    show: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

export const Comment = mongoose.model('Comment', commentSchema);