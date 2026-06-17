"use client"

import MainButton from "@/components/MainButton"
import { useAuthUser } from "@/store/authStore"
import { useForm, SubmitHandler } from "react-hook-form"

type EmailT = {
  email: string
}

const Page = () => {
  const { isForgetting, userForgotPassword } = useAuthUser();
  const { register, handleSubmit } = useForm<EmailT>();

  const onSubmit: SubmitHandler<EmailT> = async (data) => {
    if (data.email) {
      await userForgotPassword(data.email);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center px-4 py-12">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">

        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400" />

        <div className="p-8 md:p-10">

          {/* Icon */}
          <div className="flex justify-end mb-6">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8 text-right">
            <h1 className="text-2xl font-bold text-slate-800 mb-1">نسيت كلمة المرور؟</h1>
            <p className="text-sm text-slate-400">أدخل بريدك الإلكتروني وسنرسل لك رمز إعادة التعيين</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-600 text-right" htmlFor="email">
                البريد الإلكتروني
              </label>
              <input
                type="text"
                id="email"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-700 outline-none transition-all duration-200 focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                {...register("email")}
              />
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100" />

            {/* Submit */}
            {isForgetting ? (
              <MainButton ariaLabel="ارسال الكود" text="ارسال الكود" loading />
            ) : (
              <MainButton ariaLabel="ارسال الكود" text="ارسال الكود" />
            )}

          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;