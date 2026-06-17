"use client";

import MainButton from "@/components/MainButton";
import SubHeader from "@/components/SubHeader";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ChangePassword from "./ChangePassword";
import AddComment from "@/components/addComment";
import { FaUser, FaGraduationCap, FaPhone, FaEnvelope } from "react-icons/fa";
import { useLevelStore } from "@/store/levelStore";
import { useAuthUser } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { PiFigmaLogoDuotone } from "react-icons/pi";

const Page = () => {
  const user = useAuthUser((s) => s.user);
  const levels = useLevelStore((s) => s.levels);

  const { setUser } = useAuthUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<number | string>("");
  const [parentPhone, setParentPhone] = useState<number | string>("");
  const [level, setLevel] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setParentPhone(user.parentPhone || "");

      if (user.level) {
        const userLevelId =
          typeof user.level === "object"
            ? (user.level as any)._id
            : String(user.level);

        setLevel(userLevelId);
      }
    }
  }, [user]);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}user/update-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            email,
            phone,
            parentPhone,
            level,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "حدث خطأ أثناء التحديث");
      }

      return data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "تم تحديث البيانات بنجاح");
      setUser(data.user);
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}user/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "فشل تسجيل الخروج");
      }

      return data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "تم تسجيل الخروج بنجاح");

      setUser(null);

      window.location.href = "/";
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const inputClass =
    "border border-slate-200 bg-slate-50 rounded-2xl px-5 py-3 block w-full text-slate-800 text-sm transition-all duration-300 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50/50 placeholder:text-slate-300";

  const labelClass =
    "flex items-center gap-2 text-[13px] font-black text-slate-600 mb-2 mr-1 uppercase tracking-wide";

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      <SubHeader currentTitle="إعدادات الحساب" />

      <div className="container max-w-4xl py-12 flex flex-col items-center gap-10 mx-auto px-4">
        <div className="w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          <div className="flex items-center gap-4 px-8 py-7 border-b border-slate-50 bg-slate-50/30">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center">
              <FaUser className="text-white text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">
                تعديل الملف الشخصي
              </h2>
            </div>
          </div>

          <form onSubmit={updateProfile} className="p-8 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className={labelClass}>
                  <FaUser /> الاسم بالكامل
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <FaEnvelope /> البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <FaPhone /> رقم الهاتف
                </label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <FaPhone /> رقم ولي الأمر
                </label>
                <input
                  type="number"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                <FaGraduationCap /> الصف الدراسي
              </label>

              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className={`${inputClass} appearance-none`}
              >
                <option value="">اختر الصف الدراسي</option>

                {levels.map((l) => (
                  <option key={l._id} value={String(l._id)}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-6 border-t border-slate-50 flex justify-end">
              <div className="w-full md:w-64">
                <MainButton ariaLabel="حفظ" loading={isPending} text="حفظ التغييرات الجديدة" />
              </div>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <ChangePassword />
          <AddComment />
        </div>

        <button
          type="button"
          onClick={() => logoutMutation.mutate()}
          className="flex ml-auto items-center gap-2 px-6 py-3 rounded-2xl bg-red-50 text-red-600 border border-red-200 font-black hover:bg-red-600 hover:text-white transition-all duration-300"
        >
          <PiFigmaLogoDuotone size={18} />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

export default Page;
