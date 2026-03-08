"use client";

import { Axios } from "@/axios/Axios";
import SubHeader from "@/components/SubHeader";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { QuizTypes } from "@/types/Types";
import Spiner from "@/components/Spiner";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { getQuiz } from "@/app/utils/quizFeatures";

type ResultTypes = {
  title: string;
  correctAnswer: string;
  success: boolean;
};

const QuizContent = () => {
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quiz");

  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<ResultTypes[] | null>(null);

  const { data: quiz, isLoading } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: async () => {
      const res = await getQuiz(quizId as string);
      return res.data as QuizTypes;
    },
    enabled: !!quizId,
  });

  const handleAnswerChange = (index: number, selected: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = selected;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      const res = await Axios.post("/user/check-quiz", { quizId, answers });
      setResult(res.data.results);
    } catch {
      toast.error("حدث خطأ");
    }
  };

  const score = result
    ? Math.round((result.filter((r) => r.success).length / result.length) * 100)
    : 0;

  return (
    <>
      <SubHeader currentTitle={quiz?.title || ""} />

      <div className="container py-10 max-w-3xl mx-auto px-4">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <Spiner />
          </div>
        ) : (
          <>
            {/* Questions */}
            {!result && (
              <div className="space-y-5">
                {quiz?.questions.map((q, idx) => (
                  <div
                    key={q.title}
                    className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
                  >
                    {/* Question header */}
                    <div className="flex items-start gap-3 mb-4">
                      <span className="min-w-[32px] h-8 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-200">
                        {idx + 1}
                      </span>
                      <h3 className="text-base font-semibold text-gray-800 leading-snug pt-1">
                        {q.title}
                      </h3>
                    </div>

                    {/* Answer options */}
                    <div className="space-y-2 pr-10">
                      {q.answers.map((a) => {
                        const isSelected = answers[idx] === a;
                        return (
                          <label
                            key={a}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-150
                              ${
                                isSelected
                                  ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                                  : "border-gray-200 bg-gray-50 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50/40"
                              }`}
                          >
                            <input
                              type="radio"
                              name={`question-${idx}`}
                              value={a}
                              checked={isSelected}
                              onChange={() => handleAnswerChange(idx, a)}
                              className="accent-emerald-600 w-4 h-4"
                            />
                            <span className="text-sm">{a}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Submit */}
                {quiz && (
                  <button
                    onClick={handleSubmit}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors duration-150 shadow-md shadow-emerald-100 mt-2"
                  >
                    تسليم الإجابات
                  </button>
                )}
              </div>
            )}

            {/* Results */}
            {result && (
              <div className="space-y-6">
                {/* Score card */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-5">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-4 shrink-0
                    ${
                      score >= 60
                        ? "border-emerald-400 text-emerald-600 bg-emerald-50"
                        : "border-red-400 text-red-600 bg-red-50"
                    }`}
                  >
                    {score}%
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-800">
                      {score >= 60 ? "أحسنت! 🎉" : "حاول مرة أخرى 💪"}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      أجبت على{" "}
                      <span className="font-semibold text-emerald-600">
                        {result.filter((r) => r.success).length}
                      </span>{" "}
                      من {result.length} سؤال بشكل صحيح
                    </p>
                  </div>
                </div>

                {/* Results table */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-base font-bold text-gray-800">
                      تفاصيل الإجابات
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-center">
                      <thead>
                        <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                          <th className="px-4 py-3 font-medium">#</th>
                          <th className="px-4 py-3 font-medium text-right">
                            السؤال
                          </th>
                          <th className="px-4 py-3 font-medium">
                            الإجابة الصحيحة
                          </th>
                          <th className="px-4 py-3 font-medium">إجابتك</th>
                          <th className="px-4 py-3 font-medium">النتيجة</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {result.map((resItem, idx) => (
                          <tr
                            key={idx}
                            className={`transition-colors ${
                              resItem.success ? "bg-white" : "bg-red-50/40"
                            }`}
                          >
                            <td className="px-4 py-3 text-gray-400 font-medium">
                              {idx + 1}
                            </td>
                            <td className="px-4 py-3 text-right text-gray-700">
                              {resItem.title}
                            </td>
                            <td className="px-4 py-3 text-emerald-700 font-medium">
                              {resItem.correctAnswer}
                            </td>
                            <td
                              className={`px-4 py-3 font-medium ${
                                resItem.success
                                  ? "text-emerald-600"
                                  : "text-red-500"
                              }`}
                            >
                              {answers[idx] || (
                                <span className="text-gray-400 italic text-xs">
                                  لم يُجب
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold
                                ${
                                  resItem.success
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-red-100 text-red-600"
                                }`}
                              >
                                {resItem.success ? "✓" : "✗"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

const Page = () => {
  return (
    <div className="ctm-height bg-gray-50">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-[80vh]">
            <Spiner />
          </div>
        }
      >
        <QuizContent />
      </Suspense>
    </div>
  );
};

export default Page;