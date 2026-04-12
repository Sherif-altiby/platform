"use client";

import { Axios } from "@/axios/Axios";
import MainButton from "@/components/MainButton";
import SubHeader from "@/components/SubHeader";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ChangePassword from "./ChangePassword";
import AddComment from "@/components/addComment";
import { FaUser, FaGraduationCap, FaPhone, FaEnvelope } from "react-icons/fa";
import { useLevelStore } from "@/store/levelStore";
import { useAuthUser } from "@/store/authStore";

const Page = () => {
  const user = useAuthUser((s) => s.user);
  const levels = useLevelStore((s) => s.levels);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<number | string>("");
  const [parentPhone, setParentPhone] = useState<number | string>("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);

  // مزامنة البيانات ومعالجة مشكلة عدم تطابق الـ Select
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setParentPhone(user.parentPhone || "");

      // معالجة ذكية للـ Level لضمان المطابقة
      if (user.level) {
        // إذا كان الـ level يأتي كـ Object نأخذ الـ _id، وإذا كان نصاً نأخذه كما هو
        const userLevelId = typeof user.level === 'object' 
          ? (user.level as any)._id 
          : String(user.level);
        
        setLevel(userLevelId);
      }
    }
  }, [user]);

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await Axios.post("user/update-profile", {
        name,
        phone,
        email,
        level,
        parentPhone,
      });
      toast.success(res.data.message || "تم تحديث البيانات بنجاح");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "حدث خطأ أثناء التحديث");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "border border-slate-200 bg-slate-50 rounded-2xl px-5 py-3 block w-full text-slate-800 text-sm transition-all duration-300 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50/50 placeholder:text-slate-300";
  const labelClass = "flex items-center gap-2 text-[13px] font-black text-slate-600 mb-2 mr-1 uppercase tracking-wide";

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      <SubHeader currentTitle="إعدادات الحساب" />

      <div className="container max-w-4xl py-12 flex flex-col items-center gap-10 mx-auto px-4">
        
        {/* بطاقة تعديل الملف الشخصي الرئيسية */}
        <div className="w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          
          {/* رأس الكارت */}
          <div className="flex items-center gap-4 px-8 py-7 border-b border-slate-50 bg-slate-50/30">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
              <FaUser className="text-white text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">تعديل الملف الشخصي</h2>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Personal Information</p>
            </div>
          </div>

          <form onSubmit={updateProfile} className="p-8 flex flex-col gap-8">
            {/* الحقول الأساسية في شبكة */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              <div className="space-y-1">
                <label className={labelClass} htmlFor="name">
                  <FaUser className="text-blue-500 text-xs" /> الاسم بالكامل
                </label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="أدخل اسمك الثلاثي" />
              </div>

              <div className="space-y-1">
                <label className={labelClass} htmlFor="email">
                  <FaEnvelope className="text-blue-500 text-xs" /> البريد الإلكتروني
                </label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="student@example.com" />
              </div>

              <div className="space-y-1">
                <label className={labelClass} htmlFor="phone">
                  <FaPhone className="text-blue-500 text-xs" /> رقم هاتفك
                </label>
                <input type="number" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="01xxxxxxxxx" />
              </div>

              <div className="space-y-1">
                <label className={labelClass} htmlFor="parentPhone">
                  <FaPhone className="text-orange-400 text-xs" /> رقم هاتف ولي الأمر
                </label>
                <input type="number" id="parentPhone" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} className={inputClass} placeholder="01xxxxxxxxx" />
              </div>

            </div>

            {/* حقل الصف الدراسي - معالجة الشكل والوظيفة */}
            <div className="w-full pt-2">
              <label className={labelClass} htmlFor="level">
                <FaGraduationCap className="text-blue-500 text-sm" /> الصف الدراسي الحالي
              </label>
              <div className="relative">
                <select
                  id="level"
                  value={String(level)} // نضمن دائماً أنها String للمطابقة
                  onChange={(e) => setLevel(e.target.value)}
                  className={`${inputClass} appearance-none cursor-pointer pr-12`}
                >
                  <option value="" disabled>-- اختر صفك الدراسي من القائمة --</option>
                  {levels.map((l) => (
                    <option value={String(l._id)} key={l._id}>
                      {l.name}
                    </option>
                  ))}
                </select>
                {/* أيقونة سهم مخصصة */}
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {/* عرض القيمة المخزنة للتأكد (اختياري للـ Debug) */}
              <p className="mt-2 text-[10px] text-slate-300 font-bold mr-2">
                قيمة المستخدم الحالية: {user?.level ? (typeof user.level === 'object' ? (user.level as any).name : user.level) : "غير محدد"}
              </p>
            </div>

            {/* زر الحفظ */}
            <div className="pt-6 border-t border-slate-50 flex justify-end">
              <div className="w-full md:w-64">
                <MainButton loading={loading} text="حفظ التغييرات الجديدة" />
              </div>
            </div>
          </form>
        </div>

        {/* الأقسام الجانبية في شبكة متوازنة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="h-full">
                <ChangePassword />
            </div>
            <div className="h-full">
                <AddComment />
            </div>
        </div>

      </div>
    </div>
  );
};

export default Page;