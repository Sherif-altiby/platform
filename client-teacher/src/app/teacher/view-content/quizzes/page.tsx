"use client"

import { useQuizStore } from "@/store/quizStore";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { CiSquareQuestion } from "react-icons/ci";
import DeleteQuizeCard from "@/components/DeleteQuizeCard";
import { useAuthUser } from "@/store/authStore";
import Link from "next/link";
import Spiner from "@/components/Spiner";

const Page = () => {
  const params = useSearchParams();
  const level = params.get("level") || "first";
  const levelText = level === "first" ? "الأول" : level === "second" ? "الثاني" : "الثالث";

  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [quizID, setQuizID] = useState("");

  const { getQuizzes, isFetchingQuize, quizzes } = useQuizStore();
  const { user, checkUser } = useAuthUser();

  useEffect(() => {
    if (!user) checkUser();
    getQuizzes(level, user?._id as string);
  }, [user, level]);

  return (
    <div>
      {/* Heading */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md">
          <CiSquareQuestion className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">اختبارات الصف {levelText} الثانوي</h1>
          <p className="text-sm text-gray-400">{quizzes?.length ?? 0} اختبار مضاف</p>
        </div>
      </div>

      {/* Content */}
      {isFetchingQuize ? (
        <div className="flex items-center justify-center h-64">
          <Spiner />
        </div>
      ) : quizzes && quizzes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="group bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-200">

              {/* Top row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <CiSquareQuestion className="text-emerald-500 text-lg" />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Link
                    href={`/teacher/preview-quiz?id=${quiz._id}`}
                    className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                  >
                    <IoEyeOutline className="text-lg" />
                  </Link>
                  <Link
                    href={`/teacher/edit-quiz?id=${quiz._id}`}
                    className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                  >
                    <CiEdit className="text-lg" />
                  </Link>
                  <button
                    onClick={() => { setQuizID(quiz._id); setShowDeleteCard(true); }}
                    className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                  >
                    <AiOutlineDelete className="text-lg" />
                  </button>
                </div>
              </div>

              <h3 className="text-sm font-bold text-gray-800 line-clamp-1 mb-2">{quiz.title}</h3>

              <div className="pt-3 border-t border-gray-100">
                <span className="text-xs font-medium bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
                  الصف {levelText}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
          <CiSquareQuestion className="text-5xl opacity-30" />
          <p className="text-lg">لا يوجد اختبارات لهذا الصف حتى الآن</p>
        </div>
      )}

      {showDeleteCard && (
        <DeleteQuizeCard
          quizId={quizID}
          setShow={setShowDeleteCard}
          level={level}
          teacherId={user?._id || ""}
        />
      )}
    </div>
  );
};

export default Page;