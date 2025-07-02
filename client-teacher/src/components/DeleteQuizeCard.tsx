"use client"

import { Axios } from "@/axios/Axios";
import { useQuizStore } from "@/store/quizStore";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";

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
      const res = await Axios.delete("teacher/delete-quiz", {
        data: { quizId },
      });

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md px-6 py-8 text-center">
        {/* Close Icon */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 transition"
        >
          <AiOutlineClose size={20} />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          هل أنت متأكد أنك تريد حذف هذا الاختبار؟
        </h2>

        <div className="flex justify-center gap-4 mt-6">
          <button
            type="button"
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setShow(false)}
            disabled={isDeleting}
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={deleteQuize}
            disabled={isDeleting}
            className={`px-6 py-2 rounded-lg text-white font-semibold transition ${
              isDeleting
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {isDeleting ? "جاري الحذف..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteQuizeCard;
