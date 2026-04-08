"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNoteWatchHistoryApi } from "../utils/watchListFeatures";

interface NoteProps {
  id: string; // حقل الـ noteId
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
    <div className="group bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center gap-3">
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors duration-300">
        <Image
          src="/pdf.png"
          alt="pdf"
          width={36}
          height={36}
          className="object-contain"
        />
      </div>

      <p className="text-sm font-medium text-gray-700 text-center leading-relaxed line-clamp-2">
        {name}
      </p>

      <div className="w-full h-px bg-gray-100" />

      <button
        disabled={isPending}
        className={`flex items-center justify-center gap-2 w-full py-2 rounded-xl text-white text-sm font-semibold transition-colors duration-200 ${
          isPending
            ? "bg-indigo-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
        onClick={handleViewNote}
      >
        <span>{isPending ? "جاري الفتح..." : "عرض المذكرة"}</span>
        <FaArrowLeft className="text-xs" />
      </button>
    </div>
  );
};

export default Note;
