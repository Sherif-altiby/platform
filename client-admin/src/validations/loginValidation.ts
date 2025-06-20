import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("يرجى ادخال بريد الكتروني صحيح ")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "يرجى ادخال بريد الكتروني صحيح "
    ),

  password: z
    .string()
    .min(8, "يرجى ادخال كلمة مرور صحيحة")
    .regex(
      /[A-Za-z\d]{8,}$/,
      "يرجى ادخال كلمة مرور صحيحة"
    ),
});

export type LoginInputs = z.infer<typeof loginSchema>;
