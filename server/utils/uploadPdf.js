import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
  secure: true,
});

/**
 * Uploads PDF buffer to Cloudinary
 * @param {Buffer} buffer - PDF file buffer
 * @param {string} [folder="Basira"] - Cloudinary folder name
 * @returns {Promise<Object>} Cloudinary upload result
 */
export const uploadPdfToCloudinary = async (buffer) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const uploadOptions = {
        folder: "Basira",
        resource_type: "raw",
        format: "pdf",
        public_id: `pdf_${Date.now()}`,
        type: "upload",
        overwrite: false, // Prevent accidental overwrites
      };

      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      
      uploadStream.end(buffer);
    });

    // Return both Cloudinary response and direct URL
    return {
      ...result,
      directUrl: `https://res.cloudinary.com/${cloudinary.config().cloud_name}/raw/upload/${result.public_id}.pdf`
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload PDF to Cloudinary");
  }
};


export default uploadPdfToCloudinary