import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
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
    pdf: {
      type: String,
      required: true
    }
});

export const PdfModel = mongoose.model("PdfModel", pdfSchema);
