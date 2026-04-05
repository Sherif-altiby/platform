import { Lesson } from "@/types/Types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LessonState {
  lessons: Lesson[] | null;
  setLessons: (lessons: Lesson[]) => void;
  clearLessons: () => void;
}

export const useLessonStore = create<LessonState>()(
  persist(
    (set) => ({
      lessons: null,

      setLessons: (newLessons) => set({ lessons: newLessons }),

      clearLessons: () => set({ lessons: null }),
    }),
    {
      name: "al-abqari-lessons-storage", 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);