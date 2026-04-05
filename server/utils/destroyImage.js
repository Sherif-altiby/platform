import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const destroyImageCloudinary = async (imageUrl) => {
  if (!imageUrl) return null;

  try {
    const parts = imageUrl.split("/");
    const lastPart = parts.pop(); // image.jpg
    const folderPart = parts.pop(); // subfolder (أو folder إذا لم يوجد sub)

    const publicId = `${folderPart}/${lastPart.split(".")[0]}`;

    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    return null;
  }
};

export default destroyImageCloudinary;
