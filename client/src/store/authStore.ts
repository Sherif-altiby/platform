import { Axios } from "@/axios/Axios";
import { useAuthInterface } from "@/types/Types";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import  { create } from "zustand";

export const useAuthUser = create<useAuthInterface>((set) => ({
    user: null ,
    isLogin: false,
    isRegister: false,
    isChecking: false,
    isForgetting: false,
    redirectUser: false,
    isVerifingCode: false,

    checkUser: async () => {
    
        set(() => ({
            isChecking: true
        }))

       try {
          const res = await Axios.get('/user/check');
          
          set(() => ({
            user: res.data.user
          }))      
          
          const user = {
            name: res.data.user.name,
            isBlocked: res.data.user.isBlocked,
            email: res.data.user.email,
            role: res.data.user.role
          }

          localStorage.setItem("user", JSON.stringify(user))
       } catch (error) {
         error &&  toast.error("حدث خطأ")
          set(() => ({
            user: null
          }))
       }  finally {
        set(() => ({
            isChecking: false
        }))
       }
    },

    userLogin: async (email: string, password: string) => {
        
        set(() => ({
            isLogin: true
        }))

        try {
            const res = await Axios.post('user/login', {
                email,
                password
            });
            set(() => ({
                user: res.data.data.user
            }))

            toast.success("تم تسجيل الدخول بنجاح")

            return res.data;
            
        } catch (error) {
            if (error instanceof AxiosError) {
                error && toast.error(error?.response?.data.message);  
            } else {
                toast.error("البريد الالكتروني او كلمة المرور خطأ");
            }
        } finally {
            set(() => ({
                isLogin: false
            }))
        }
    },

    userRegister: async (name: string, email: string, password: string, level: string, phone: string) => {
        set(() => ({
            isRegister: true
        }))

        try {
          const res = await Axios.post('user/register', {
            name,
            email,
            password,
            level,
            phone
          });

          toast.success(res.data.message)

          return res.data
            
        } catch (error: any) {
           error &&  toast.error(error.response.data.message)
        } finally {
            set(() => ({
                isRegister: false
            }))
        }
    },

    userForgotPassword: async (email: string) => {
         set(() => ({
            isForgetting: true
         }))

         try {
            const res = await Axios.post('user/forgot-password', {email});

            window.location.replace(`/verification-code?email=${email}`);
            toast.success(res.data.message);
            
         } catch (error) {
            error && toast.error("هذا الحساب ليس موجودا")
         } finally {
                set(() => ({
                    isForgetting: false
                }))
         }
    },

    userVerifyCode: async (email: string, code: number) => {

        set(() => ({
            isVerifingCode: true
        }))
        try {
            const res = await Axios.post('user/verify-code', {email, code});

            toast.success(res.data.message)
            window.location.replace(`/`);
            
        } catch (error) {
            error &&  toast.error("حدث خطأ")
        } finally {
            set(() => ({
                isVerifingCode: false
            }))
        }
    }
}))