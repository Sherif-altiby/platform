import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const uploadImageClodinary = async (arrayBuffer) => {

  const buffer = Buffer.from(arrayBuffer);

  try {
    const uploadImage = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "Basira",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(buffer); 
    });

    return uploadImage;
  } catch (err) {
    throw err;
  }
};

export default uploadImageClodinary;
