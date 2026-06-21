"use client";

import { Suspense } from "react";
import SubHeader from "@/components/SubHeader";
import { useSearchParams } from "next/navigation";
import Note from "./Note";
import { useAuthUser } from "@/store/authStore";
import Spiner from "@/components/Spiner";
import { PiNotepadThin } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import NoteSkeleton from "@/skeletons/NoteSkeleton";
import NotesAccordion from "@/components/NotesAccordion";

function NotesContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("teacherName");
  const teacherId = searchParams.get("teacherId");

  const { user } = useAuthUser();

  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", teacherId, user?.level],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}teacher/get-pdf-by-level`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ teacherId, level: user?.level }),
        },
      );

      if (!res.ok) throw new Error("Failed to fetch notes");

      const result = await res.json();
      return result.data;
    },
    enabled: !!teacherId && !!user?.level,
  });

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
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((__, i) => (<NoteSkeleton key={i} />))}
          </div>
        ) : isError ? (
          <div className="text-center text-red-500 py-10">
            حدث خطأ أثناء تحميل البيانات
          </div>
        ) : notes && notes.length > 0 ? (
          // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          //   {notes.map((note: any) => (
          //     <Note
          //       key={note._id}
          //       id={note._id}
          //       name={note.title}
          //       pdf={note.pdf}
          //       teacherId={teacherId as string}
          //       courseId={note.course}
          //     />
          //   ))}
          // </div>
          <NotesAccordion data={notes} teacherId={teacherId as string} />
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
        <div className="flex items-center justify-center h-screen text-gray-400">
          <Spiner />
        </div>
      }
    >
      <NotesContent />
    </Suspense>
  );
}
