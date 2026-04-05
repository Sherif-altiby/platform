import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(8, "    يرجى ادخال اسم صحيح   "),
    email: z
      .string()
      .email("يرجى ادخال بريد الكتروني صحيح ")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "يرجى ادخال بريد الكتروني صحيح ",
      ),
    phone: z.string().min(10, "يرجى ادخال رقم تلفون صحيح "),
    parentPhone: z.string().min(10, "يرجى ادخال رقم تلفون صحيح "),
    level: z.string().optional(),
    password: z
      .string()
      .min(8, "يرجى ادخال كلمة مرور صحيحة")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "يرجى ادخال كلمة مرور صحيحة",
      ),
    confirmPassword: z.string().min(8, ""),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "",
    path: ["confirmPassword"],
  });

export type RegisterInputs = z.infer<typeof registerSchema>;
