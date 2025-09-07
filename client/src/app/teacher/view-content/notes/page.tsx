"use client";

import { Axios } from "@/axios/Axios";
import Spiner from "@/components/Spiner";
import { useAuthUser } from "@/store/authStore";
import { NoteType, UserTypes } from "@/types/Types";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-toastify";

const NotesPage = () => {
  const params = useSearchParams();
  const level = params.get("level");

  const levelText =
    level === "first" ? "الاول" : level === "second" ? "الثاني" : "الثالث";

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]) as UserTypes

  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notes, setNotes] = useState<NoteType[]>([]);

  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [noteId, setNoteID] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user?._id || !level) return;

      setLoading(true);

      try {
        const res = await Axios.post("teacher/get-pdf-by-level", {
          level,
          teacherId: user._id,
        });

        setNotes(res.data.data);
      } catch  {
          toast.error("حدث خطأ")
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [user?._id, level]);

  const deleteNote = async (noteId: string) => {
    setIsDeleting(true);
    try {
      const res = await Axios.delete("teacher/delete-pdf", {
        data: { pdfId: noteId },
      });

      toast.success(res.data.message);
      setShowDeleteCard(false);

      // Refresh notes
      const updated = await Axios.post("teacher/get-pdf-by-level", {
        level,
        teacherId: user?._id,
      });
      setNotes(updated.data.data);
    } catch   {
       toast.error("حدث خطأ أثناء حذف المذكرة.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-primary1 mb-6">
        مذكرات الصف {levelText} الثانوي
      </h1>

      {loading ? (
        <div className="flex items-center justify-center">
          <Spiner />
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white border rounded-lg shadow-md p-4"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {note.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                المستوى:{" "}
                <span className="font-medium text-gray-700">{note.level}</span>
              </p>
              <a
                href={note.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 mb-4 block underline"
              >
                عرض / تحميل المذكرة
              </a>

              <div className="flex justify-end items-center gap-3">

                <div>
                  <CiEdit
                    className="text-xl text-gray-600 hover:text-green-600 cursor-pointer"
                    title="تعديل الملف"
                  />
                </div>

                <button
                  onClick={() => {
                    setNoteID(note._id);
                    setShowDeleteCard(true);
                  }}
                >
                  <AiOutlineDelete
                    className="text-xl text-gray-600 hover:text-red-600 cursor-pointer"
                    title="حذف الملف"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDeleteCard && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md text-center relative">
            <button
              onClick={() => setShowDeleteCard(false)}
              className="absolute top-3 left-3 text-gray-500 hover:text-gray-700 transition"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-red-600 mb-4">
              هل أنت متأكد من حذف المذكرة؟
            </h2>

            <div className="flex justify-center gap-4">
              <button
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                onClick={() => deleteNote(noteId)}
                disabled={isDeleting}
              >
                {isDeleting ? "جاري الحذف..." : "نعم، حذف"}
              </button>
              <button
                className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
                onClick={() => setShowDeleteCard(false)}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
