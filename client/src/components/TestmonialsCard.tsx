"use client";
import { FaStar, FaQuoteRight } from "react-icons/fa";

const TestmonialsCard = ({ text, name }: { text: string; name: string }) => {
  return (
    <div className="group relative bg-white rounded-3xl p-8 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] border border-slate-100 flex flex-col h-full min-h-[320px]">
      
      {/* أيقونة الاقتباس - لمسة جمالية */}
      <div className="absolute top-6 left-8 opacity-[0.05] group-hover:opacity-10 transition-opacity duration-500">
        <FaQuoteRight size={60} className="text-blue-600" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* التقييم بالنجوم */}
        <div className="flex gap-1 text-orange-400 mb-6">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} size={14} className="group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
          ))}
        </div>

        {/* نص الرأي */}
        <p className="text-slate-600 leading-relaxed text-right text-lg italic mb-8 flex-grow">
          {text}
        </p>

        {/* بيانات الطالب */}
        <div className="flex items-center justify-end gap-4 border-t border-slate-50 pt-6">
          <div className="text-right">
            <h4 className="font-black text-slate-800 group-hover:text-blue-600 transition-colors">
              {name}
            </h4>
            <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">طالب بالمنصة</p>
          </div>
          {/* دائرة افتراضية للصورة (Avatar) */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
            {name.charAt(0)}
          </div>
        </div>
      </div>

      {/* خط ملون يظهر عند الـ Hover في الأسفل */}
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-600 to-orange-500 transition-all duration-500 group-hover:w-[80%] rounded-full" />
    </div>
  );
};
export default TestmonialsCard;