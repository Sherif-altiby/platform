"use client";

import { TeacherTypes } from "@/types/Types";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { BsPatchCheckFill } from "react-icons/bs";

const TeacherCard = ({ teacher }: { teacher: TeacherTypes }) => {
  return (
    <Link
      href={`/get-teachers/${teacher._id}?name=${teacher.name}`}
      className="group relative flex flex-col bg-white rounded-[2.5rem] p-4 border border-slate-100 hover:border-blue-200 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] hover:-translate-y-3 overflow-hidden"
    >
      
      {/* 1. منطقة الصورة الفخمة */}
      <div className="relative h-64 w-full rounded-[2rem] overflow-hidden bg-slate-50 mb-6 border border-slate-50">
        {/* شارة التميز (Badge) */}
        <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-sm border border-white">
          <BsPatchCheckFill className="text-blue-600 text-sm" />
          <span className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">معلم معتمد</span>
        </div>

        {teacher.avatar?.startsWith("http") ? (
          <Image
            src={teacher.avatar}
            alt={`صورة ${teacher.name}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-black text-blue-200 bg-slate-100">
            {teacher.name.charAt(0)}
          </div>
        )}
        
        {/* تدرج لوني ناعم في الأسفل */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* 2. المحتوى المعلوماتي */}
      <div className="flex flex-col flex-1 px-2 pb-2 text-right">
        
        {/* التخصصات بنمط الـ Pills */}
        <div className="flex flex-wrap justify-end gap-1.5 mb-4">
          {teacher?.subjects?.slice(0, 2).map((sub) => (
            <span
              key={sub._id}
              className="text-[11px] font-black text-blue-600 bg-blue-50/50 px-3 py-1 rounded-lg border border-blue-100/50"
            >
              {sub.name}
            </span>
          ))}
        </div>

        {/* الاسم */}
        <h3 className="text-slate-900 font-black text-xl mb-3 group-hover:text-blue-600 transition-colors duration-300">
          أ/ {teacher.name}
        </h3>

        {/* نبذة مختصرة (إذا كانت متوفرة في النوع) */}
        <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-2 min-h-[32px]">
            {teacher.about}
        </p>

        {/* 3. الإجراء السفلي (Footer Area) */}
        <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm group-hover:text-orange-500 transition-colors">
             <HiOutlineArrowNarrowLeft className="text-lg group-hover:-translate-x-2 transition-transform duration-300" />
             <span>الملف الكامل</span>
          </div>

          <div className="flex -space-x-2 space-x-reverse">
              {[1, 2, 3].map((i) => (
               <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
             ))}
             <div className="w-6 h-6 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[8px] text-white font-bold">
               +12
             </div>
          </div>
        </div>

      </div>

      {/* لمسة الديكور الخلفية (تظهر عند الهوفر فقط) */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </Link>
  );
};

export default TeacherCard;