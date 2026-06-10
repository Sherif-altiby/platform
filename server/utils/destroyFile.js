import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

/**
 * دالة مخصصة لحذف ملفات PDF فقط من Cloudinary
 * @param {string} pdfUrl - الرابط الكامل لملف الـ PDF
 */
const destroyPdfCloudinary = async (pdfUrl) => {
  if (!pdfUrl) return null;

  try {
    // 1. تحليل الرابط لاستخراج المجلد واسم الملف
    const parts = pdfUrl.split("/");
    
    // الحصول على اسم الملف كاملاً مع الامتداد (مثال: file_123.pdf)
    // هذا ضروري جداً لملفات الـ raw في كلاوديناري
    const fileNameWithExtension = parts.pop(); 
    
    // الحصول على اسم المجلد (مثال: teacher_notes)
    const folderName = parts.pop(); 

    // 2. دمج المجلد مع الاسم لتكوين الـ Public ID الصحيح
    const publicId = `${folderName}/${fileNameWithExtension}`;

    // 3. تنفيذ عملية الحذف مع تحديد نوع المورد كـ "raw"
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
      invalidate: true,
    });

    return result;
  } catch (error) {
    console.error("Cloudinary PDF Delete Error:", error);
    return null;
  }
};

export default destroyPdfCloudinary;