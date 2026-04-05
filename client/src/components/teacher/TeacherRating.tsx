"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HiStar, HiOutlineStar } from "react-icons/hi2"; // أيقونات أوضح وأجمل
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
        },
      );
      if (!res.ok) throw new Error();
      return res.json();
    },
    onSuccess: () => {
      toast.success("شكراً لتقييمك!");
    },
  });

  const handleRate = (val: number) => {
    if (isPending) return;
    setRating(val);
    mutate(val);
  };

  return (
    <div
      className="relative overflow-hidden max-w-3xl mx-auto 
                   to-blue-50/30 rounded-2xl p-4 mt-10 bg-white border border-gray-10
                     shadow-sm transition-all"
    >
      <div className="relative z-10 ">
        <h4 className="text-slate-800 font-black text-lg mb-1 tracking-tight">
          قم بتقييم المعلم
        </h4>
        <p className="text-slate-400 text-xs font-medium mb-6">
          رأيك يساعدنا في تحسين جودة المحتوى
        </p>
      </div>

      <div className="flex flex-row-reverse items-center justify-center  mb-2">
        {[5, 4, 3, 2, 1].map((star) => {
          const isActive = star <= (hover || rating);
          return (
            <button
              key={star}
              type="button"
              disabled={isPending}
              onClick={() => handleRate(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="group relative p-1 transition-transform active:scale-90 disabled:opacity-50"
            >
              {isActive ? (
                <HiStar
                  size={30}
                  className="text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)] transition-all duration-300"
                />
              ) : (
                <HiOutlineStar
                  size={30}
                  className="text-slate-200 group-hover:text-amber-200 transition-all duration-300"
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="min-h-[30px] flex items-center justify-center">
        {isPending ? (
          <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-blue-50 text-blue-600 text-[11px] font-bold animate-pulse">
            <AiOutlineLoading3Quarters size={12} className="animate-spin" />
            جاري حفظ تقييمك...
          </div>
        ) : rating > 0 ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <span className="bg-emerald-50 text-emerald-600 px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-tighter">
              تم التسجيل بنجاح ✓
            </span>
          </div>
        ) : (
          <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.2em]">
            حدد عدد النجوم
          </p>
        )}
      </div>
    </div>
  );
}
