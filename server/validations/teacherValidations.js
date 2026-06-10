import { z } from "zod";

export const createTeacherValidations = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(1, "Phone is required"),
  subId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Subject ID"),
  about: z.string().min(1, "About is required"),
  instaPayNumber: z.string().min(1, "InstaPay number is required"),
  instaPayName: z.string().min(1, "InstaPay name is required"),
  vCashNumber: z.string().min(1, "VCash number is required"),
  vCashName: z.string().min(1, "VCash name is required"),
});
