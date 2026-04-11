"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getQuiz } from "@/app/utils/quizFeatures";
import SubHeader from "@/components/SubHeader";
import Spiner from "@/components/Spiner";
import Question from "./Question";
import QuizResult from "@/components/results/QuizRezult";
import QuizHeader from "@/components/quiz/QuizHeader";
import { QuizResultData } from "@/types/Types";

const QuizContent = () => {
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quiz");

  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<QuizResultData | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const { data: quiz, isLoading } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: async () => {
      const res = await getQuiz(quizId as string);
      const durationInSeconds = res.data.duration * 60;

      if (typeof window !== "undefined") {
        const savedEndTime = localStorage.getItem(`quiz_end_time_${quizId}`);
        let endTime;

        if (savedEndTime) {
          endTime = parseInt(savedEndTime);
        } else {
          // أول مرة يفتح فيها الاختبار: نحسب وقت النهاية ونخزنه
          endTime = Date.now() + durationInSeconds * 1000;
          localStorage.setItem(`quiz_end_time_${quizId}`, endTime.toString());
        }

        const remaining = Math.max(
          0,
          Math.floor((endTime - Date.now()) / 1000),
        );
        setTimeLeft(remaining);
      }

      return res.data;
    },
    enabled: !!quizId,
    refetchOnWindowFocus: false, // لمنع إعادة الجلب عند التنقل بين التابات
  });

  // 2. محرك التايمر (يعتمد على الفرق بين الوقت الحالي والوقت المستهدف)
  useEffect(() => {
    if (result || isLoading || isTimeUp || !quizId) return;

    const timer = setInterval(() => {
      const savedEndTime = localStorage.getItem(`quiz_end_time_${quizId}`);
      if (!savedEndTime) return;

      const endTime = parseInt(savedEndTime);
      const now = Date.now();
      const difference = Math.floor((endTime - now) / 1000);

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
        setIsTimeUp(true);
        handleAutoSubmit();
      } else {
        setTimeLeft(difference);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [result, isLoading, isTimeUp, quizId]);

  const handleAutoSubmit = () => {
    toast.info("انتهى الوقت! يتم الآن تصحيح إجاباتك...");
    handleSubmit();
  };

  const handleSubmit = async () => {
    // التحقق من الإجابة على كل الأسئلة (فقط إذا لم ينتهِ الوقت)
    if (
      !isTimeUp &&
      answers.filter(Boolean).length < (quiz?.questions.length || 0)
    ) {
      return toast.warn("يرجى الإجابة على جميع الأسئلة أولاً");
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}user/check-quiz`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quizId, answers }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        setResult(data.data);
        // تنظيف التايمر من المتصفح بعد النجاح
        localStorage.removeItem(`quiz_end_time_${quizId}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.error(data.message || "حدث خطأ أثناء التصحيح");
      }
    } catch (error) {
      toast.error("حدث خطأ في الاتصال بالسيرفر");
    }
  };


  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[60vh]">
          <Spiner />
        </div>
      }
    >
      <div className="min-h-screen bg-[#eee] pb-10">
        <SubHeader currentTitle={quiz?.title || "الاختبار"} />

        <div className="container max-w-4xl mx-auto px-4 mt-10">
          {!result ? (
            <div className="space-y-6">
              {/* عرض التايمر والتقدم */}
              <QuizHeader answers={answers} quiz={quiz} timeLeft={timeLeft} />

              {/* قائمة الأسئلة */}
              <div className="grid gap-6">
                {quiz?.questions.map((q: any, idx: number) => (
                  <Question
                    key={idx}
                    index={idx}
                    question={q}
                    selectedAnswer={answers[idx]}
                    onAnswerChange={(val) => {
                      if (isTimeUp) return;
                      const newAns = [...answers];
                      newAns[idx] = val;
                      setAnswers(newAns);
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleSubmit}
                disabled={isTimeUp}
                className={`w-full py-5 rounded-lg font-semibold text-lg transition-all shadow-xl
                ${
                  isTimeUp
                    ? "bg-gray-300 cursor-not-allowed text-gray-500"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 active:scale-95"
                }`}
              >
                {isTimeUp
                  ? "جاري معالجة الإجابات..."
                  : "إنهاء الاختبار وإظهار النتيجة"}
              </button>
            </div>
          ) : (
            <QuizResult result={result} />
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default QuizContent;
