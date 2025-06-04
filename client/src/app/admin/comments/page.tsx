"use client";

import { Axios } from "@/axios/Axios";
import CommentCard from "@/components/CommentCard";
import Heading from "@/components/Heading";
import Spiner from "@/components/Spiner";
import { CommentType } from "@/types/Types";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [show, setShow] = useState(true); // true = visible comments

  const getAllComments = async () => {
    setLoading(true);

    try {
      const res = await Axios.get("admin/get-all-comments");
      setComments(res.data.data);
    } catch (error) {
      error &&  toast.error("حدث خطأ")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <div className="p-4">
      <Heading title="التعليقات" />

      <div className="flex gap-4 justify-center mt-4 mb-4">
            <button
              onClick={() => setShow(true)}
              className={`px-4 py-2 rounded text-white ${ show ? "bg-green-600" : "bg-gray-500"}`}
            >
              عرض التعليقات الظاهرة
            </button>

            <button
              onClick={() => setShow(false)}
              className={`px-4 py-2 rounded text-white ${ !show ? "bg-yellow-600" : "bg-gray-500" }`} 
            >
              عرض التعليقات المخفية
            </button>
          </div>

      {loading ? (
        <Spiner />
      ) : comments.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {comments
              .filter((comment) => comment.show === show)
              .map((comment) => (
                <CommentCard
                  key={comment._id}
                  user={comment.user.name}
                  comment={comment.comment}
                  rate={Math.min(comment.rate, 5)}
                  date={"2025-05-07T10:41:32.832Z"}
                  show={comment.show}
                  id={comment._id}
                />
              ))}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 mt-10">لا توجد تعليقات</div>
      )}
    </div>
  );
};

export default Page;
