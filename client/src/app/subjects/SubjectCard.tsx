"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { BsArrowRightCircleFill } from "react-icons/bs";

interface SubjectCardProps {
  link: string;
  name: string;
  avatar: string;
}

const SubjectCard = ({ link, name, avatar }: SubjectCardProps) => {
  return (
    <Link
      href={link}
      className="group relative flex flex-col bg-white border border-slate-200/60 rounded-[2.5rem] p-2 transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden"
    >
      {/* 1. الخلفية الشبكية (Pattern Overlay) */}
      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.826 10.558c1.026 1.312 1.594 2.977 1.594 4.747V44.7c0 1.77-.568 3.435-1.594 4.747m-3.08-31.542c-1.026-1.312-2.39-2.215-3.922-2.584M13.778 44.7c0 1.77.568 3.435 1.594 4.747m31.542-31.542c1.026 1.312 1.594 2.977 1.594 4.747v29.405c0 1.77-.568 3.435-1.594 4.747' fill='%232563eb' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")` }} />

      <div className="relative bg-slate-50/50 rounded-[2.2rem] p-6 border border-white flex flex-col items-center">
        
        {/* 2. Badge علوي صغير */}
        <div className="absolute top-4 left-6 flex items-center gap-1.5 px-3 py-1 bg-white shadow-sm border border-slate-100 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">متاح الآن</span>
        </div>

        {/* 3. حاوية الأفاتار (Floating Geometric Design) */}
        <div className="relative mt-4">
          {/* طبقات خلفية هندسية */}
          <div className="absolute inset-0 bg-blue-600/5 rotate-6 rounded-[2rem] group-hover:rotate-12 transition-transform duration-700" />
          <div className="absolute inset-0 bg-blue-600/5 -rotate-3 rounded-[2rem] group-hover:-rotate-6 transition-transform duration-700" />
          
          <div className="relative w-28 h-28 rounded-[2rem] bg-white p-3 shadow-[0_16px_32px_-8px_rgba(0,0,0,0.06)] flex items-center justify-center z-10">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-50">
              {avatar?.startsWith("http") ? (
                <Image
                  src={avatar}
                  alt={name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="112px"
                />
              ) : (
                <HiOutlineAcademicCap className="w-12 h-12 text-blue-600" />
              )}
            </div>
          </div>
        </div>

        {/* 4. النصوص (Bold & Clean) */}
        <div className="mt-8 mb-4 text-center">
          <h3 className="text-2xl font-black text-slate-900 leading-tight">
            {name}
          </h3>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            استكشف الدروس والاختبارات
          </p>
        </div>

        {/* 5. الزر التفاعلي (Modern Floating Action) */}
        <div className="w-full mt-2 flex items-center justify-center">
          <div className="group/btn relative flex items-center gap-3 py-3 px-8 bg-slate-900 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-500/30">
             <span className="relative z-10 text-sm font-bold text-white tracking-wide">
               عرض المادة
             </span>
             <BsArrowRightCircleFill className="relative z-10 text-white text-lg group-hover/btn:translate-x-1 transition-transform" />
             
             {/* تأثير لمعة عند الحوم */}
             <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:left-[100%] transition-all duration-1000" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SubjectCard;