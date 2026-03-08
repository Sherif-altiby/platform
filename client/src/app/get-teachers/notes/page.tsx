"use client";

import { Suspense, useEffect, useState } from "react";
import SubHeader from "@/components/SubHeader";
import { useSearchParams } from "next/navigation";
import Note from "./Note";
import { Axios } from "@/axios/Axios";
import { NoteType } from "@/types/Types";
import { useAuthUser } from "@/store/authStore";
import Spiner from "@/components/Spiner";
import { toast } from "react-toastify";
import { PiNotepadThin } from "react-icons/pi";

function NotesContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("teacherName");
  const teacherId = searchParams.get("teacherId");

  const { user } = useAuthUser();

  const [notes, setNotes] = useState<NoteType[]>([]);
  const [loading, setLoading] = useState(false);

  console.log("user from note",user)

  const getNotes = async () => {
    setLoading(true);
    try {
      const res = await Axios.post("teacher/get-pdf-by-level", {
        teacherId,
        level: user?.level,
      });
      setNotes(res.data.data);
    } catch {
      toast.error("حدث خطأ أثناء تحميل المذكرات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="ctm-height bg-gray-50">
      <SubHeader currentTitle={`أ/ ${name}`} />

      <div className="container py-12">

        {/* Section heading */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
            <PiNotepadThin className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">المذكرات</h2>
            <p className="text-sm text-gray-400">مذكرات أ/ {name}</p>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Spiner />
          </div>
        ) : notes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {notes.map((note) => (
              <Note name={note.title} key={note._id} pdf={note.pdf} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
            <PiNotepadThin className="text-5xl opacity-30" />
            <p className="text-lg">لا يوجد مذكرات حتى الآن</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Pages() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64 text-gray-400">
          جارٍ تحميل الصفحة...
        </div>
      }
    >
      <NotesContent />
    </Suspense>
  );
}