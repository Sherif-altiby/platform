import { z } from "zod";

export const lessonschema = z.object({
  title: z
    .string()
    .min(5, " يرجى ادخال العنوان "),

  link: z
    .string()
    .url({ message: " يرجى ادخال اللينك   " })
    .refine(
      (url) => /^https?:\/\/(www\.)?youtube\.com\/watch\?v=/.test(url) || /^https?:\/\/youtu\.be\//.test(url),
      { message: " يرجى ادخال لينك يوتيوب " }
    ),

  level: z.enum(["first", "second", "third"], {
        errorMap: () => ({ message: "يرجى ادخال صف صحيح " }),
      }),

  description: z
      .string()
      .optional(),
});

export type LessonInputs = z.infer<typeof lessonschema>;
