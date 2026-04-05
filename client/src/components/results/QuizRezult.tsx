import { QuizResultData } from "@/types/Types";
import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa6";

const QuizRezult = ({result}: {result: QuizResultData}) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-50 text-center relative overflow-hidden">
        <div
          className={`absolute top-0 left-0 w-full h-2 ${result.score >= 50 ? "bg-emerald-500" : "bg-red-500"}`}
        />
        <div className="inline-flex p-5 rounded-full bg-yellow-50 text-yellow-500 mb-4 text-4xl">
          <FaTrophy />
        </div>
        <h2 className="text-3xl font-black text-gray-800 mb-2">
          {result.score >= 50 ? "ممتاز!" : "حاول مجدداً"}
        </h2>
        <p className="text-gray-500 mb-8 font-bold text-xl">
          درجتك: {result.score}%
        </p>

        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          <div className="bg-emerald-50 p-4 rounded-2xl">
            <p className="text-emerald-600 text-2xl font-black">
              {result.correctAnswersCount}
            </p>
            <p className="text-emerald-700 text-xs font-medium">صحيحة</p>
          </div>
          <div className="bg-red-50 p-4 rounded-2xl">
            <p className="text-red-600 text-2xl font-black">
              {result.totalQuestions - result.correctAnswersCount}
            </p>
            <p className="text-red-700 text-xs font-medium">خاطئة</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-700 px-2">مراجعة الأسئلة</h3>
        {result.answers.map((item, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-3xl border transition-all ${
              item.isCorrect
                ? "bg-white border-emerald-100"
                : "bg-red-50/50 border-red-100"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`mt-1 ${item.isCorrect ? "text-emerald-500" : "text-red-500"}`}
              >
                {item.isCorrect ? (
                  <FaCheckCircle size={22} />
                ) : (
                  <FaTimesCircle size={22} />
                )}
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-bold mb-2">
                  {item.questionTitle}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <p className="text-gray-500">
                    إجابتك:{" "}
                    <span
                      className={
                        item.isCorrect
                          ? "text-emerald-600 font-bold"
                          : "text-red-600 font-bold"
                      }
                    >
                      {item.userAnswer || "لا يوجد إجابة"}
                    </span>
                  </p>
                  {!item.isCorrect && (
                    <p className="text-gray-500">
                      الصحيحة:{" "}
                      <span className="text-emerald-600 font-bold">
                        {item.correctAnswer}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizRezult;
