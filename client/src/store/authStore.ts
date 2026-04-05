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
          const res = await Axios.post("user/login", { email, password });
          
          // سيتم حفظ المستخدم تلقائياً في localStorage بفضل persist
          set(() => ({
            user: res.data.data.user,
          }));

          toast.success("تم تسجيل الدخول بنجاح");
          return res.data;
        } catch (error) {
          if (error instanceof AxiosError) {
            toast.error(error?.response?.data.message);
          } else {
            toast.error("البريد الالكتروني او كلمة المرور خطأ");
          }
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
        parentPhone: string
      ) => {
        set(() => ({ isRegister: true }));
        try {
          const res = await Axios.post("user/register", {
            name, email, password, level, phone, parentPhone
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
        user: state.user 
      }), 
    }
  )
);