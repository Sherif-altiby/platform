"use client";

import { Axios } from "@/axios/Axios";
import Spiner from "@/components/Spiner";
import { useAuthUser } from "@/store/authStore";
import { NoteType } from "@/types/Types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { PiNotepadThin } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

const NotesPage = () => {
  const params = useSearchParams();
  const level = params.get("level");
  const levelText = level === "first" ? "الأول" : level === "second" ? "الثاني" : "الثالث";

  const { user, checkUser } = useAuthUser();

  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [noteId, setNoteID] = useState("");

  const fetchNotes = async () => {
    if (!user?._id || !level) return;
    setLoading(true);
    await checkUser();
    try {
      const res = await Axios.post("teacher/get-pdf-by-level", { level, teacherId: user._id });
      setNotes(res.data.data);
    } catch {
      toast.error("حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotes(); }, [user?._id, level]);

  const deleteNote = async (noteId: string) => {
    setIsDeleting(true);
    try {
      const res = await Axios.delete("teacher/delete-pdf", { data: { pdfId: noteId } });
      toast.success(res.data.message);
      setShowDeleteCard(false);
      await fetchNotes();
    } catch {
      toast.error("حدث خطأ أثناء حذف المذكرة.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      {/* Heading */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-md">
          <PiNotepadThin className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">مذكرات الصف {levelText} الثانوي</h1>
          <p className="text-sm text-gray-400">{notes.length} مذكرة مضافة</p>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Spiner />
        </div>
      ) : notes.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="group bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <PiNotepadThin className="text-amber-500 text-lg" />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">
                    <CiEdit className="text-lg" />
                  </button>
                  <button
                    onClick={() => { setNoteID(note._id); setShowDeleteCard(true); }}
                    className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                  >
                    <AiOutlineDelete className="text-lg" />
                  </button>
                </div>
              </div>

              <h2 className="text-sm font-bold text-gray-800 line-clamp-2 mb-3">{note.title}</h2>

              <div className="pt-3 border-t border-gray-100">
                <span className="text-xs font-medium bg-amber-50 text-amber-600 px-3 py-1 rounded-full">
                  الصف {levelText}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
          <PiNotepadThin className="text-5xl opacity-30" />
          <p className="text-lg">لا يوجد مذكرات لهذا الصف حتى الآن</p>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteCard && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center relative">
            <button
              onClick={() => setShowDeleteCard(false)}
              className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
            >
              <IoClose className="text-xl" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
              <AiOutlineDelete className="text-red-500 text-2xl" />
            </div>

            <h2 className="text-lg font-bold text-gray-900 mb-2">حذف المذكرة</h2>
            <p className="text-sm text-gray-400 mb-6">هل أنت متأكد من حذف هذه المذكرة؟ لا يمكن التراجع.</p>

            <div className="flex gap-3">
              <button
                onClick={() => deleteNote(noteId)}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? "جاري الحذف..." : "نعم، احذف"}
              </button>
              <button
                onClick={() => setShowDeleteCard(false)}
                className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-colors duration-200"
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