"use client";

import { useAuthUser } from "@/store/authStore";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6"; // استبدال السهم ليتناسب مع الاتجاه العربي
import { HiSparkles } from "react-icons/hi2";

const ProfileWelcome = () => {
  const user = useAuthUser((s) => s.user);

  return (
    <div className="relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-2 md:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-50 group">
      
      {/* لمسة خلفية جمالية (Decorative Blur) */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-50 group-hover:bg-blue-100 transition-colors duration-700" />
      
      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-right">
        
        {/* أفاتار مطور (Enhanced Avatar) */}
        <div className="relative">
          <div className="size-16 md:size-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[1.8rem] flex items-center justify-center text-white text-2xl md:text-3xl font-black shadow-xl shadow-indigo-100 transform group-hover:rotate-6 transition-transform duration-500">
            {user?.name?.[0] || "👤"}
          </div>
          {/* أيقونة Sparkles صغيرة فوق الأفاتار */}
          <div className="absolute -top-2 -right-2 bg-yellow-400 p-1.5 rounded-lg shadow-sm">
            <HiSparkles className="text-white text-xs" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            أهلاً بك، <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{user?.name}</span> 👋
          </h1>
          <p className="text-slate-500 text-sm md:text-lg font-bold leading-relaxed opacity-80">
            واصل رحلة تعلمك، أنت تبلي بلاءً حسناً اليوم!
          </p>
        </div>
      </div>

      {/* زر أكشن عصري (CTA Button) */}
      <Link 
        href={'/subjects'} 
        aria-label=' المواد الدراسية  '
        className="relative group/btn flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm md:text-base shadow-xl shadow-slate-200 hover:bg-blue-600 hover:shadow-blue-200 transition-all duration-300 active:scale-95 overflow-hidden"
      >
        <span className="relative z-10">اكتشف كورسات جديدة</span>
        <FaArrowLeft className="relative z-10 transition-transform group-hover/btn:-translate-x-2" />
        
        {/* تأثير الوميض عند التحويم */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
      </Link>

    </div>
  );
};

export default ProfileWelcome;