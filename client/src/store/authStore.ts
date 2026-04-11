import { Axios } from "@/axios/Axios";
import { useAuthInterface } from "@/types/Types";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; // استيراد persist

export const useAuthUser = create<useAuthInterface>()(
  persist(
    (set) => ({
      user: null,
      isLogin: false,
      isRegister: false,
      isChecking: false,
      isForgetting: false,
      redirectUser: false,
      isVerifingCode: false,

      setUser: (user) => set(() => ({ user })),

      userLogin: async (email: string, password: string) => {
        set(() => ({ isLogin: true }));

        try {

          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            throw new Error(data.message || "فشل تسجيل الدخول");
          }
      
          set(() => ({ user: data.data.user }));
          toast.success("تم تسجيل الدخول");
        } catch (error: any) {
          toast.error(error.message);
        } finally {
          set(() => ({ isLogin: false }));
        }
      },

      userRegister: async (
        name: string,
        email: string,
        password: string,
        level: string,
        phone: string,
        parentPhone: string,
      ) => {
        set(() => ({ isRegister: true }));
        try {
          const res = await Axios.post("user/register", {
            name,
            email,
            password,
            level,
            phone,
            parentPhone,
          });
          toast.success(res.data.message);
          return res.data;
        } catch (error) {
          if (error instanceof AxiosError) {
            toast.error(error?.response?.data.message);
          }
        } finally {
          set(() => ({ isRegister: false }));
        }
      },

      userForgotPassword: async (email: string) => {
        set(() => ({ isForgetting: true }));
        try {
          const res = await Axios.post("user/forgot-password", { email });
          window.location.replace(`/verification-code?email=${email}`);
          toast.success(res.data.message);
        } catch {
          toast.error("هذا الحساب ليس موجودا");
        } finally {
          set(() => ({ isForgetting: false }));
        }
      },

      userVerifyCode: async (email: string, code: number) => {
        set(() => ({ isVerifingCode: true }));
        try {
          const res = await Axios.post("user/verify-code", { email, code });
          toast.success(res.data.message);
          window.location.replace(`/`);
        } catch {
          toast.error("حدث خطأ");
        } finally {
          set(() => ({ isVerifingCode: false }));
        }
      },

      // دالة لتسجيل الخروج ومسح البيانات
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // الاسم الذي سيظهر في localStorage
      storage: createJSONStorage(() => localStorage), // تحديد نوع التخزين
      // اختيارياً: يمكنك تحديد الحقول التي تريد حفظها فقط
      partialize: (state) => ({
        user: state.user,
      }),
    },
  ),
);
