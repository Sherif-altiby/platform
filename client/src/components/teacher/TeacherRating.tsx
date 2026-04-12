"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { HiStar } from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

interface Props {
  teacherId: string;
}

export default function TeacherRatingSystem({ teacherId }: Props) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const { mutate, isPending } = useMutation({
    mutationFn: async (val: number) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}user/rate-teacher`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ teacher: teacherId, rating: val }),
        }
      );
      if (!res.ok) throw new Error();
      return res.json();
    },
    onSuccess: () => {
      toast.success("تم إرسال تقييمك بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إرسال التقييم");
    }
  });

  const handleRate = (val: number) => {
    if (isPending) return;
    setRating(val);
    mutate(val);
  };

  return (
    <div className="max-w-md mx-auto mt-12 group relative">
      {/* خلفية جمالية مشعة */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-200 to-yellow-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      
      <div className="relative bg-white border border-slate-100 rounded-[2.2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
        
        {/* نصوص العنوان */}
        <div className="text-center mb-8">
          <h4 className="text-slate-900 font-black text-xl mb-2 tracking-tight">
            ما رأيك في المعلم؟
          </h4>
          <p className="text-slate-400 text-xs font-medium px-6 leading-relaxed">
            تقييمك يساعد زملاءك في اختيار المحتوى الأفضل دائماً
          </p>
        </div>

        {/* منطقة النجوم */}
        <div className="flex flex-row-reverse items-center justify-center gap-2 mb-8">
          {[5, 4, 3, 2, 1].map((star) => {
            const isFilled = star <= (hover || rating);
            const isCurrentHover = star === hover;

            return (
              <button
                key={star}
                type="button"
                disabled={isPending}
                onClick={() => handleRate(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className={`group/star relative p-1 transition-all duration-300 
                  ${isPending ? 'cursor-not-allowed' : 'hover:scale-125 active:scale-90'}`}
              >
                <HiStar
                  className={`text-4xl transition-all duration-500 
                    ${isFilled 
                      ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]' 
                      : 'text-slate-100 group-hover/star:text-amber-200'
                    } 
                    ${isCurrentHover ? 'animate-pulse' : ''}`}
                />
                
                {/* تأثير نقطي تحت النجمة عند الاختيار */}
                {rating === star && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* شريط الحالة السفلي */}
        <div className="flex flex-col items-center justify-center h-12">
          {isPending ? (
            <div className="flex items-center gap-3 text-blue-600 bg-blue-50/50 px-6 py-2 rounded-2xl border border-blue-100/50 animate-pulse">
              <AiOutlineLoading3Quarters className="animate-spin text-sm" />
              <span className="text-[11px] font-bold">جاري معالجة رأيك...</span>
            </div>
          ) : rating > 0 ? (
            <div className="flex items-center gap-2 text-emerald-600">
               <span className="w-8 h-[1px] bg-emerald-100" />
               <p className="text-[11px] font-black uppercase tracking-widest italic">
                  تم الحفظ بنجاح
               </p>
               <span className="w-8 h-[1px] bg-emerald-100" />
            </div>
          ) : (
            <div className="px-5 py-2 bg-slate-50 rounded-xl">
               <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
                 اضغط على النجوم
               </p>
            </div>
          )}
        </div>

        {/* عناصر زخرفية في الزوايا */}
        <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
          <HiStar size={80} className="-rotate-12" />
        </div>
      </div>
    </div>
  );
}