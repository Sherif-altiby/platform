// components/CommentCard.tsx
import { Axios } from "@/axios/Axios";
import React from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

interface Props {
  user: string;
  comment: string;
  rate: number;
  date: string;
  show: boolean;
  id: string;
}

const CommentCard: React.FC<Props> = ({
  user,
  comment,
  rate,
  date,
  show,
  id,
}) => {
  const formattedDate = new Date(date).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleShow = async (commentId: string) => {
    try {
      const res = await Axios.put("admin/show-comment", { commentId });

      toast.success(res.data.message);
    } catch (error) {
      error &&  toast.error("حدث خطأ")
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      const res = await Axios.delete("admin/delete-comment", {
        data: { commentId }, 
      });
  
      toast.success(res.data.message);
    } catch (error) {
      error && toast.error("حدث خطأ أثناء حذف التعليق");
     }
  };
  

  return (
    <div className="bg-white p-5 rounded-lg shadow-md border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-800">{user}</h3>
        <span className="text-sm text-gray-500">{formattedDate}</span>
      </div>

      <p className="text-gray-700 mb-3">{comment}</p>

      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-xl ${
              i < rate ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="flex gap-3">
        {show ? null : (
          <button
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            onClick={() => handleShow(id)}
          >
            عرض
          </button>
        )}

        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          onClick={() => handleDelete(id)}
        >
          حذف
        </button>
      </div>
    </div>
  );
};

export default CommentCard;
