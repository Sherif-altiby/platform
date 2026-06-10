"use client";

import { Suspense } from "react";
import SubHeader from "@/components/SubHeader";
import { useSearchParams } from "next/navigation";
import Quiz from "./Quiz";
import Spiner from "@/components/Spiner";
import { toast } from "react-toastify";
import { CiSquareQuestion } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";

function QuizzesContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("teacherName");
  const teacherId = searchParams.get("teacherId");
  const level = searchParams.get("level");



  const { data: quizzes = [], isLoading } = useQuery({
    queryKey: ["quizzesStudents", teacherId, level],
    queryFn: async () => {
  
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}teacher/get-quiz-by-level`;
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          teacherId,
          level,
        }),
      });
  
      return (await response.json()).data;
    },
    enabled: !!teacherId && !!level,
  });


  return (
    <div className="ctm-height bg-gray-50">
      <SubHeader currentTitle={`أ/ ${name}`} />

      <div className="container py-12">
        {/* رأس القسم */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md">
            <CiSquareQuestion className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">الاختبارات</h2>
            <p className="text-sm text-gray-400">اختبارات المدرس: {name}</p>
          </div>
        </div>

        {/* عرض المحتوى بناءً على الحالة */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Spiner />
          </div>
        ) : quizzes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {quizzes.map((quiz: any) => (
              <Quiz quiz={quiz}  key={quiz._id}/>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
            <CiSquareQuestion className="text-5xl opacity-30" />
            <p className="text-lg">لا يوجد اختبارات متاحة لمستواك الدراسي حالياً</p>
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
        <div className="flex items-center justify-center h-screen bg-gray-50 text-gray-400 font-bold">
          <div className="flex flex-col items-center gap-4">
             <Spiner />
             <p>جاري تحضير قائمة الاختبارات...</p>
          </div>
        </div>
      }
    >
      <QuizzesContent />
    </Suspense>
  );
}