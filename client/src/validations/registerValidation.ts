import { z } from "zod";

// تعبير نمطي (Regex) للتحقق من أرقام الهواتف المصرية
// 11 رقم، يبدأ بـ 010 أو 011 أو 012 أو 015
const egyptPhoneRegex = /^(010|011|012|015)\d{7}$/;

export const registerSchema = z
  .object({
    name: z.string().min(8, "يرجى ادخال اسم صحيح"),
    email: z
      .string()
      .email("يرجى ادخال بريد الكتروني صحيح")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "يرجى ادخال بريد الكتروني صحيح",
      ),
    phone: z.string().length(11, "يجب أن يتكون رقم الهاتف من 11 رقم"),
    parentPhone: z.string().length(11, "يجب أن يتكون رقم الهاتف من 11 رقم"),
    level: z.string().optional(),
    password: z
      .string()
      .min(8, "يرجى ادخال كلمة مرور صحيحة")
       ,
    confirmPassword: z.string().min(8, "يرجى تأكيد كلمة المرور"),
  })
  // التحقق من تطابق كلمة المرور
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  })
  // التحقق من أن رقم ولي الأمر لا يساوي رقم الطالب
  .refine((data) => data.phone !== data.parentPhone, {
    message: "رقم ولي الأمر لا يمكن أن يكون نفس رقم الطالب",
    path: ["parentPhone"],
  });

export type RegisterInputs = z.infer<typeof registerSchema>;
