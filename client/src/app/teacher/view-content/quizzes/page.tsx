"use client"

import { useQuizStore } from "@/store/quizStore";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteQuizeCard from "@/components/DeleteQuizeCard";
import { useAuthUser } from "@/store/authStore";
import Link from "next/link";
import Spiner from "@/components/Spiner";

const Page = () => {
  const params = useSearchParams();
  const level = params.get("level") || "first";
  const levelText = level === "first" ? "الاول" : level === "second" ? "الثاني" : "الثالث";

  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [quizID, setQuizID] = useState("");

  const { getQuizzes, isFetchingQuize, quizzes } = useQuizStore();
  const { user } = useAuthUser();

  useEffect(() => {
    if (user?._id) {
      getQuizzes(level, user._id);
    }
  }, [user, level, getQuizzes]);

  return (
    <div>
      <h1 className="text-2xl text-primary1 mb-6">اختبارات الصف {levelText} الثانوي</h1>

        {isFetchingQuize ? (
          <div className="flex items-center justify-center" > <Spiner /> </div>
        ) : quizzes && quizzes.length > 0 ? (
          <div className="mt-5 mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="bg-white shadow-lg rounded-lg p-4 relative">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{quiz.title}</h3>
              <p className="text-sm text-gray-500 mb-4">الصف: {levelText} الثانوي</p>

              <div className="flex justify-end items-center gap-3">
                <Link href={`/teacher/preview-quiz?id=${quiz._id}`}>
                  <IoEyeOutline className="text-xl text-gray-600 hover:text-blue-600 cursor-pointer" title="عرض الاختبار" />
                </Link>

                <Link href={`/teacher/edit-quiz?id=${quiz._id}`}>
                  <CiEdit className="text-xl text-gray-600 hover:text-green-600 cursor-pointer" title="تعديل الاختبار" />
                </Link>

                <button onClick={() => { setQuizID(quiz._id); setShowDeleteCard(true); }}>
                  <AiOutlineDelete className="text-xl text-gray-600 hover:text-red-600 cursor-pointer" title="حذف الاختبار" />
                </button>
              </div>
            </div>
          ))}
      </div>
        ) : (
          <p className="text-gray-600 text-lg">لا يوجد اختبارات لهذا الصف حتى الآن.</p>
        )}

      {showDeleteCard && (
        <DeleteQuizeCard quizId={quizID} setShow={setShowDeleteCard} level={level} teacherId={user?._id || ""} />
      )}
    </div>
  );
};

export default Page;
