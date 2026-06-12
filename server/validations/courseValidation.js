import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subjectId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Subject ID"),
  level: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Level ID"),
  status: z.string().min(1, "Status is required"),
  price: z.coerce.number().min(0, "Price must be greater than or equal to 0"),
  offer: z.coerce.number().min(0, "Offer must be greater than or equal to 0").optional(),
  offerExpirt: z.string().optional(),
});


export const requestCourseAccessSchema = z.object({
  courseId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Course ID"),
  teacherId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Teacher ID"),
  method: z.enum(["instaPay", "vCash"], {message: "Method must be instaPay or vCash",}),
});