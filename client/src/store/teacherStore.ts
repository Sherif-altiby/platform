import { TeacherTypes } from "@/types/Types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TeacherState {
  teachers: TeacherTypes[];
  setTeacher: (teachers: TeacherTypes[]) => void;
}

export const useTeacherStore = create<TeacherState>()(
    persist(
      (set) => ({
        teachers: [],
        setTeacher: (teachersData) => set({ teachers: teachersData }),
      }),
      {
        name: "teachers-cache",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
