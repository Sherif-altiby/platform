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
    lessons: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Lesson",
        },
      ],
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
            title: { 
                type: String, 
                required: true 
            },
            titleImage: { 
                type: String,  // URL or path to the image
                required: false 
            },
            answers: [
                {
                    _id: false,
                    text: { 
                        type: String, 
                        required: false 
                    },
                    image: { 
                        type: String,  // URL or path to the image
                        required: false 
                    }
                }
            ],
            correctAnswer: {
                text: { 
                    type: String, 
                    required: false 
                },
                image: { 
                    type: String,  // URL or path to the image
                    required: false 
                }
            }
        }
    ]
}, { timestamps: true });

export const Quizz = mongoose.model("Quizz", quizzSchema);