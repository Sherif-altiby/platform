"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6"; // Using Fa6 for a cleaner look

interface SubjectCardProps {
  link: string;
  name: string;
  avatar: string;
}

const SubjectCard = ({ link, name, avatar }: SubjectCardProps) => {
  return (
    <Link
      href={link}
      className="group relative flex flex-col bg-white border border-slate-200/60 rounded-[2rem] p-5 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] hover:-translate-y-2 overflow-hidden"
    >
      {/* Interactive Background Glow */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/5 blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-500" />
      
      <div className="flex flex-col items-center relative z-10">
        {/* Image Container with "Squircle" shape */}
        <div className="relative w-24 h-24 p-1 rounded-[1.8rem] bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-100 shadow-inner overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
          {avatar?.startsWith("http") ? (
            <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden shadow-sm">
              <Image
                src={avatar}
                alt={`${name} subject`}
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                sizes="96px"
              />
            </div>
          ) : (
            <div className="text-3xl font-black text-indigo-500/40">
              {name.charAt(0)}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="mt-6 text-center">
          <h3 className="text-xl font-extrabold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors duration-300">
            {name}
          </h3>
          <p className="mt-1.5 text-xs text-slate-400 font-medium uppercase tracking-widest">
            المنهج التعليمي
          </p>
        </div>

        {/* Action Bar */}
        <div className="mt-6 w-full flex items-center justify-between px-2 py-3 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 transition-colors duration-500">
          <span className="text-xs font-bold text-slate-500 group-hover:text-indigo-600 transition-colors">
            استكشف الدروس
          </span>
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-white text-indigo-500 shadow-sm border border-slate-100 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
             <FaArrowLeft className="text-[10px] group-hover:-translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SubjectCard;