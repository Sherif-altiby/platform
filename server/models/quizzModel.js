import mongoose from "mongoose";

const quizzSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    level: {
        type: String,
        required: true,
    },
    duration: {
        type: Number, 
        required: true,
        default: 10 
    },
    questions: [
        {
            _id: false, 
            title: { type: String, required: true },
            answers: [{ type: String, required: true }],
            correctAnswer: { type: String, required: true }
        }
    ]
}, { timestamps: true });

export const Quizz =  mongoose.model("Quizz", quizzSchema);
