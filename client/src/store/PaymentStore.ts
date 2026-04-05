import { create } from "zustand";

interface PaymentCourse {
  _id: string;
  title: string;
  price: number;
  phone: number
}

interface PaymentState {
  courseToPay: PaymentCourse | null;
  setCourseToPay: (course: PaymentCourse) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  courseToPay: null,

  setCourseToPay: (course) =>
    set({
      courseToPay: course,
    }),
}));
