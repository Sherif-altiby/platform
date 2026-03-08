"use client"

import { Axios } from "@/axios/Axios";
import { useQuizStore } from "@/store/quizStore";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

interface DeleteQuizeCardProps {
  quizId: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  level: string;
  teacherId: string;
}

const DeleteQuizeCard = ({ quizId, setShow, level, teacherId }: DeleteQuizeCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { getQuizzes } = useQuizStore();

  const deleteQuize = async () => {
    setIsDeleting(true);
    try {
      const res = await Axios.delete("teacher/delete-quiz", { data: { quizId } });
      await getQuizzes(level, teacherId);
      toast.success(res.data.message);
    } catch {
      toast.error("حدث خطأ أثناء حذف الاختبار");
    } finally {
      setIsDeleting(false);
      setShow(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center relative">

        {/* Close button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
        >
          <IoClose className="text-xl" />
        </button>

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
          <AiOutlineDelete className="text-red-500 text-2xl" />
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-2">حذف الاختبار</h2>
        <p className="text-sm text-gray-400 mb-6">هل أنت متأكد من حذف هذا الاختبار؟ لا يمكن التراجع.</p>

        <div className="flex gap-3">
          <button
            onClick={deleteQuize}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? "جاري الحذف..." : "نعم، احذف"}
          </button>
          <button
            onClick={() => setShow(false)}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-colors duration-200"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteQuizeCard;