import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface PaymentCourse {
  _id: string;
  title: string;
  price: number;
  phone: number;
}

interface PaymentState {
  courseToPay: PaymentCourse | null;
  setCourseToPay: (course: PaymentCourse) => void;
  clearCourse: () => void; // Good practice to clear after payment
}

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set) => ({
      courseToPay: null,

      setCourseToPay: (course) =>
        set({
          courseToPay: course,
        }),

      clearCourse: () => set({ courseToPay: null }),
    }),
    {
      name: "payment-course-price", 
      storage: createJSONStorage(() => localStorage),  
    }
  )
);