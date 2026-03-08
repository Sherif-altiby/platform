"use client";

import { Suspense, useEffect, useState } from "react";
import SubHeader from "@/components/SubHeader";
import { useSearchParams } from "next/navigation";
import { Axios } from "@/axios/Axios";
import { Quize } from "@/types/Types";
import Quiz from "./Quiz";
import Spiner from "@/components/Spiner";
import { toast } from "react-toastify";
import { CiSquareQuestion } from "react-icons/ci";
import { useAuthUser } from "@/store/authStore";

function QuizzesContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("teacherName");
  const teacherId = searchParams.get("teacherId");

  const { user } = useAuthUser();

  const [quizzes, setQuizzes] = useState<Quize[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getQuizzes = async () => {
      if (!teacherId || !user?.level) return;
      setLoading(true);
      try {
        const res = await Axios.post("teacher/get-quiz-by-level", {
          teacherId,
          level: user.level,
        });
        setQuizzes(res.data.data);
        console.log(res)
      } catch {
        toast.error("حدث خطأ أثناء تحميل الاختبارات");
      } finally {
        setLoading(false);
      }
    };

    getQuizzes();
  }, [user, teacherId]);  

  return (
    <div className="ctm-height bg-gray-50">
      <SubHeader currentTitle={`أ/ ${name}`} />

      <div className="container py-12">

        {/* Section heading */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md">
            <CiSquareQuestion className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">الاختبارات</h2>
            <p className="text-sm text-gray-400">اختبارات أ/ {name}</p>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Spiner />
          </div>
        ) : quizzes.length > 0 ? ( // ✅ check length, not truthiness
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {quizzes.map((quiz) => (
              <Quiz name={quiz.title} quizId={quiz._id} key={quiz._id} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
            <CiSquareQuestion className="text-5xl opacity-30" />
            <p className="text-lg">لا يوجد اختبارات حتى الآن</p>
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
        <div className="flex items-center justify-center h-64 text-gray-400">
          جارٍ تحميل الصفحة...
        </div>
      }
    >
      <QuizzesContent />
    </Suspense>
  );
}