"use client";

import { FaArrowLeft, FaFilePdf } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNoteWatchHistoryApi } from "../utils/watchListFeatures";

interface NoteProps {
  id: string;
  name: string;
  pdf: string;
  teacherId: string;
  courseId: string;
}

const Note = ({
  id,
  name,
  pdf,
  teacherId,
  courseId,
}: NoteProps) => {
  const queryClient = useQueryClient();

  const { mutate: updateHistory, isPending } = useMutation({
    mutationFn: updateNoteWatchHistoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["latest-notes"],
      });

      window.open(pdf, "_blank");
    },
    onError: () => {
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
    <div className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 transition-all duration-300 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50">

      {/* Left */}
      <div className="flex items-center gap-4 min-w-0">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 group-hover:bg-indigo-50 transition-colors">
          <FaFilePdf className="text-2xl text-rose-500 group-hover:text-indigo-600 transition-colors" />
        </div>

        <div className="min-w-0">
          <h3 className="font-bold text-slate-800 truncate">
            {name}
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            مذكرة PDF
          </p>
        </div>

      </div>

      {/* Right */}
      <button
        onClick={handleViewNote}
        disabled={isPending}
        className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all

          ${
            isPending
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }

        `}
      >

        {isPending ? (
          <>
            <AiOutlineLoading3Quarters className="animate-spin" />
            جاري التحضير
          </>
        ) : (
          <>
            تصفح
            <FaArrowLeft className="text-xs" />
          </>
        )}

      </button>

    </div>
  );
};

export default Note;