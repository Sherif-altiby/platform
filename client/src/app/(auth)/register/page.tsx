"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterInputs,
  registerSchema,
} from "@/validations/registerValidation";
import { useAuthUser } from "@/store/authStore";
import ButtonLoader from "@/components/ButtonLoader";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useLevelStore } from "@/store/levelStore";

const Page = () => {
  const router = useRouter();
  const { userRegister, isRegister } = useAuthUser();

  const levels = useLevelStore((s) => s.levels);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterInputs>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      const res = await userRegister(
        data.name,
        data.email,
        data.password,
        data.level || "",
        data.phone,
        data.parentPhone
      );
      if (res.status) {
        router.push("/login");
      }
      reset();
    } catch {
      toast.error("حاول مرة اخري");
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-sm bg-slate-50 text-slate-700 placeholder-slate-400
     outline-none transition-all duration-200
     focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100
     ${hasError ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100" : "border-slate-200"}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center px-4 py-12">
      {/* Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        {/* Card top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400" />

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="mb-8 text-right">
            <h1 className="text-2xl font-bold text-slate-800 mb-1">
              إنشاء حساب جديد
            </h1>
            <p className="text-sm text-slate-400">
              أدخل بياناتك للبدء في التعلم
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-slate-600 text-right"
                  htmlFor="name"
                >
                  الاسم ثلاثي
                </label>
                <input
                  type="text"
                  id="name"
                  className={inputClass(!!errors.name)}
                  {...register("name")}
                />
                {errors.name && (
                  <span className="text-xs text-red-500 text-right">
                    {errors.name.message}
                  </span>
                )}
              </div>

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
            </div>

            {/* Row 2: Phone + Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-slate-600 text-right"
                  htmlFor="phone"
                >
                  رقم الهاتف
                </label>
                <input
                  type="number"
                  id="phone"
                  className={inputClass(!!errors.phone)}
                  {...register("phone")}
                />
                {errors.phone && (
                  <span className="text-xs text-red-500 text-right">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-slate-600 text-right"
                  htmlFor="parentPhone"
                >
                  رقم هاتف ولي الامر
                </label>
                <input
                  type="number"
                  id="parentPhone"
                  className={inputClass(!!errors.parentPhone)}
                  {...register("parentPhone")}
                />
                {errors.parentPhone && (
                  <span className="text-xs text-red-500 text-right">
                    {errors.parentPhone.message}
                  </span>
                )}
              </div>

              
            </div>

            <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-slate-600 text-right"
                  htmlFor="level"
                >
                  الصف الدراسي
                </label>
                <select
                  id="level"
                  className={inputClass(!!errors.level)}
                  {...register("level")}
                >
                  {levels.map((l) => (
                    <option value={l._id} key={l._id}>
                      {l.name}
                    </option>
                  ))}
                </select>
                {errors.level && (
                  <span className="text-xs text-red-500 text-right">
                    {errors.level.message}
                  </span>
                )}
              </div>

            {/* Row 3: Password + Confirm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-slate-600 text-right"
                  htmlFor="password"
                >
                  كلمة المرور
                </label>
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

              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-slate-600 text-right"
                  htmlFor="pass-confirm"
                >
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  id="pass-confirm"
                  className={inputClass(!!errors.confirmPassword)}
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <span className="text-xs text-red-500 text-right">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100" />

            {/* Submit + login link */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <p>لديك حساب بالفعل؟</p>
                <Link
                  href="/login"
                  className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors duration-150"
                >
                  تسجيل الدخول
                </Link>
              </div>

              {isRegister ? (
                <button
                  disabled
                  className="flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-indigo-600 text-white text-sm font-semibold opacity-75 cursor-not-allowed w-full sm:w-auto"
                >
                  <span>جارٍ التسجيل</span>
                  <ButtonLoader />
                </button>
              ) : (
                <button
                  type="submit"
                  className="h-12 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-200 w-full sm:w-auto"
                >
                  إنشاء الحساب
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
