"use client";

import Image from "next/image";
import { HiCheckBadge } from "react-icons/hi2"; // أيقونة توثيق

interface TeacherAboutAvatarProps {
  avatar: string;
  name: string;
  subjects: { _id: string; name: string }[];
}

const TeacherAboutAvatar = ({
  avatar,
  name,
  subjects,
}: TeacherAboutAvatarProps) => {
  return (
    <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-20 px-4">
      
      {/* 1. حاوية الصورة (Premium Avatar Frame) */}
      <div className="relative group">
        {/* هالة ضوئية خلف الصورة تظهر عند التحويم */}
        <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500" />
        
        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-[2.2rem] border-[6px] border-white shadow-2xl overflow-hidden bg-slate-50 transition-transform duration-700 group-hover:scale-[1.02]">
          {avatar?.startsWith("http") ? (
            <Image
              src={avatar}
              alt={`صورة ${name}`}
              fill
              className="object-cover transform transition-transform duration-700 group-hover:scale-110"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl font-black text-slate-200 bg-gradient-to-br from-slate-100 to-slate-200">
              {name?.charAt(0)}
            </div>
          )}
        </div>
      </div>

      {/* 2. قسم النصوص (Typography & Badges) */}
      <div className="flex flex-col items-center md:items-start mb-4 gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            أ/ {name}
          </h2>
          <HiCheckBadge className="text-blue-500 text-2xl md:text-3xl animate-pulse" />
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {subjects?.map((sub) => (
            <div
              key={sub._id}
              className="group/tag relative px-4 py-1.5 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-blue-300"
            >
              {/* تأثير لون خفيف عند التحويم على المادة */}
              <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover/tag:opacity-100 transition-opacity" />
              
              <span className="relative z-10 text-[13px] font-bold text-slate-600 group-hover/tag:text-blue-600 transition-colors">
                {sub.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. لمسة جمالية خلفية (Optional Decoration) */}
      <div className="absolute -bottom-6 right-10 opacity-[0.03] pointer-events-none hidden lg:block">
        <h1 className="text-9xl font-black italic">{name}</h1>
      </div>
    </div>
  );
};

export default TeacherAboutAvatar;