"use client";

import { FaArrowLeft, FaFilePdf } from "react-icons/fa6"; // أيقونات أحدث
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNoteWatchHistoryApi } from "../utils/watchListFeatures";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface NoteProps {
  id: string;
  name: string;
  pdf: string;
  teacherId: string;
  courseId: string;
}

const Note = ({ id, name, pdf, teacherId, courseId }: NoteProps) => {
  const queryClient = useQueryClient();

  const { mutate: updateHistory, isPending } = useMutation({
    mutationFn: updateNoteWatchHistoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latest-notes"] });
      window.open(pdf, "_blank");
    },
    onError: (error) => {
      console.error("History Update Failed:", error);
      window.open(pdf, "_blank");
    },
  });

  const handleViewNote = () => {
    updateHistory({
      noteId: id,
      teacherId,
      courseId,
    });
  };

  return (
    <div className="group relative bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center gap-4 overflow-hidden">
      
      {/* 1. خلفية زخرفية علوية (Decorative Background) */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* 2. أيقونة الملف البديلة للصورة */}
      <div className="relative">
        <div className="w-20 h-20 rounded-[1.8rem] bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 group-hover:rotate-6 transition-all duration-500 shadow-inner">
          <FaFilePdf size={38} className="text-rose-500 group-hover:text-indigo-600 transition-colors duration-500" />
        </div>
        {/* شارة PDF صغيرة */}
        <div className="absolute -bottom-1 -right-1 bg-white shadow-sm border border-slate-100 px-2 py-0.5 rounded-lg">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">PDF</span>
        </div>
      </div>

      {/* 3. النصوص */}
      <div className="flex flex-col items-center gap-1 w-full mt-2">
        <h3 className="text-sm font-black text-slate-800 text-center leading-relaxed line-clamp-2 min-h-[40px] group-hover:text-indigo-600 transition-colors">
          {name}
        </h3>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">مذكرة تعليمية</p>
      </div>

      <div className="w-full h-px bg-slate-50 my-1" />

      {/* 4. زر التفاعل */}
      <button
        disabled={isPending}
        onClick={handleViewNote}
        className={`group/btn relative flex items-center justify-center gap-3 w-full py-3.5 rounded-[1.2rem] text-white text-xs font-black transition-all duration-300 overflow-hidden ${
          isPending
            ? "bg-slate-400 cursor-not-allowed"
            : "bg-slate-900 hover:bg-indigo-600 shadow-lg shadow-slate-200 hover:shadow-indigo-200"
        }`}
      >
        <span className="relative z-10">
            {isPending ? "جاري التحضير..." : "تصفح المذكرة الآن"}
        </span>
        
        {isPending ? (
          <AiOutlineLoading3Quarters className="animate-spin text-sm" />
        ) : (
          <FaArrowLeft className="text-[10px] group-hover/btn:-translate-x-1 transition-transform" />
        )}

        {/* تأثير لمعان عند التحويم */}
        {!isPending && (
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
        )}
      </button>

      {/* لمسة جمالية في الخلفية */}
      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl" />
    </div>
  );
};

export default Note;