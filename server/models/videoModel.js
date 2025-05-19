import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
   
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
    link: {
            type: String,
            required: true,
        },
    description: {
         type: String,
    }
  
});

export const VideoModel = mongoose.model("VideoModel", videoSchema);
