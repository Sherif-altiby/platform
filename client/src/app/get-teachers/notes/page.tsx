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

function NotesContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("teacherName");
  const teacherId = searchParams.get("teacherId");

  const { user } = useAuthUser();

  const [notes, setNotes] = useState<NoteType[]>([]);
  const [loading, setLoading] = useState(false);

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
    <div className="ctm-height">
      <SubHeader currentTitle={`أ/ ${name}`} />

      <div className="container">
        <h3 className="mt-5 mb-10 text-hoverLinkColor text-2xl">المذكرات</h3>

        {loading ? (
          <div className="flex items-center justify-center">
            <Spiner />
          </div>
        ) : notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-3 mb-3 relative">
            {notes.map((note) => (
              <Note name={note.title} key={note._id} pdf={note.pdf} />
            ))}
          </div>
        ) : (
          <div className="mt-5 text-xl text-center text-gray-600">
            لا يوجد مذكرات حتى الآن
          </div>
        )}
      </div>
    </div>
  );
}

export default function Pages() {
  return (
    <Suspense fallback={<div className="text-center py-10">جارٍ تحميل الصفحة...</div>}>
      <NotesContent />
    </Suspense>
  );
}
