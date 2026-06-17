"use client";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInputs, loginSchema } from "@/validations/loginValidation";
import { useAuthUser } from "@/store/authStore";
import ButtonLoader from "@/components/ButtonLoader";

const Login = () => {
  const { isLogin, userLogin } = useAuthUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInputs>({
    // 1. Changed mode to "onSubmit" so errors only show after the button is clicked
    mode: "onSubmit",
    // 2. Optional: ensures errors clear or re-validate instantly ONLY after the first submit attempt
    reValidateMode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const res = await userLogin(data.email, data.password);
      reset();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-sm bg-slate-50 text-slate-700
     outline-none transition-all duration-200
     focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100
     ${hasError ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100" : "border-slate-200"}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center px-4 py-12">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400" />

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="mb-8 text-right">
            <h1 className="text-2xl font-bold text-slate-800 mb-1">
              تسجيل الدخول
            </h1>
            <p className="text-sm text-slate-400">
              مرحباً بعودتك، أدخل بياناتك للمتابعة
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-medium text-slate-600 text-right"
                htmlFor="email"
              >
                البريد الإلكتروني
              </label>
              <input
                type="text"
                id="email"
                className={inputClass(!!errors.email)}
                {...register("email")}
              />
              {errors.email && (
                <span className="text-xs text-red-500 text-right">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  className="text-sm font-medium text-slate-600"
                  htmlFor="password"
                >
                  كلمة المرور
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-indigo-500 hover:text-indigo-700 hover:underline transition-colors duration-150"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <input
                type="password"
                id="password"
                className={inputClass(!!errors.password)}
                {...register("password")}
              />
              {errors.password && (
                <span className="text-xs text-red-500 text-right">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100" />

            {/* Submit */}
            {isLogin ? (
              <button
                disabled
                className="flex items-center justify-center gap-2 h-12 w-full rounded-xl bg-indigo-600 text-white text-sm font-semibold opacity-75 cursor-not-allowed"
                aria-label="تسجيل الدخول"
             >
                <span>جارٍ تسجيل الدخول</span>
                <ButtonLoader />
              </button>
            ) : (
              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-200"
                aria-label="تسجيل الدخول"
             >
                تسجيل الدخول
              </button>
            )}

            {/* Register link */}
            <div className="flex items-center justify-center gap-1.5 text-sm text-slate-500 pt-1">
              <p>ليس لديك حساب؟</p>
              <Link
                href="/register"
                className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors duration-150"
              >
                إنشاء حساب
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;