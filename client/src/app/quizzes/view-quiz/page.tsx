"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getQuiz } from "@/app/utils/quizFeatures";
import SubHeader from "@/components/SubHeader";
import Spiner from "@/components/Spiner";
import Question from "./Question";
import { toast } from "react-toastify";
import { FaListOl, FaClock } from "react-icons/fa";
import { QuizResultData } from "@/types/Types";
import QuizRezult from "@/components/results/QuizRezult";

const QuizContent = () => {
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quiz");

  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<QuizResultData | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(600);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const { data: quiz, isLoading } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: async () => {
      const res = await getQuiz(quizId as string);
      setTimeLeft(res.data.duration * 60);
      return res.data;
    },
    enabled: !!quizId,
  });

  useEffect(() => {
    if (result || isLoading || isTimeUp) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [result, isLoading, isTimeUp]);

  const handleAutoSubmit = () => {
    toast.info("انتهى الوقت! يتم الآن تصحيح إجاباتك...");
    handleSubmit();
  };

  const handleSubmit = async () => {
    if (
      !isTimeUp &&
      answers.filter(Boolean).length < (quiz?.questions.length || 0)
    ) {
      return toast.warn("يرجى الإجابة على جميع الأسئلة أولاً");
    }

    try {
      const finalAnswers = quiz?.questions.map((_: any, index: number) => {
        return answers[index] && answers[index].trim() !== ""
          ? answers[index]
          : "لا يوجد إجابة";
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}user/check-quiz`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({quizId, answers})
      })

      const data = await res.json()

      setResult(data.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      toast.error("حدث خطأ أثناء التصحيح");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spiner />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#eee] pb-10">
      <SubHeader currentTitle={quiz?.title || "الاختبار"} />

      <div className="container max-w-4xl mx-auto px-4 mt-10">
        {!result ? (
          <div className="space-y-6">
            {/* Header Cards (Timer & Progress) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                    <FaListOl />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">التقدم</p>
                    <p className="text-sm font-bold text-gray-700">
                      {answers.filter(Boolean).length} /{" "}
                      {quiz?.questions.length}
                    </p>
                  </div>
                </div>
                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{
                      width: `${(answers.filter(Boolean).length / (quiz?.questions.length || 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div
                className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4 transition-colors ${timeLeft < 60 ? "border-red-200 bg-red-50" : ""}`}
              >
                <div
                  className={`p-3 rounded-2xl ${timeLeft < 60 ? "bg-red-500 text-white animate-pulse" : "bg-blue-50 text-blue-600"}`}
                >
                  <FaClock />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">
                    الوقت المتبقي
                  </p>
                  <p
                    className={`text-xl font-black ${timeLeft < 60 ? "text-red-600" : "text-gray-700"}`}
                  >
                    {formatTime(timeLeft)}
                  </p>
                </div>
              </div>
            </div>

            {/* Questions Section */}
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
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 active:scale-95"
                }`}
            >
              {isTimeUp ? "جاري المعالجة..." : "إنهاء الاختبار"}
            </button>
          </div>
        ) : (

          <QuizRezult result={result} />
        )}
      </div>
    </div>
  );
};

export default QuizContent;
