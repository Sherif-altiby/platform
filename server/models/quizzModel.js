import mongoose from "mongoose";

const quizzSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
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
        enum: ["first", "second", "third"],  
    },
    questions: [
        {
            _id: false, 
            title: {
                type: String,
                required: true,
            },
            answers: [
                {
                    _id: false,  
                    type: String,
                    required: true
                }
            ],
            correctAnswer: {
                type: String,  
                required: true
            }
        }
    ]
});

export const Quizz =  mongoose.model("Quizz", quizzSchema);
