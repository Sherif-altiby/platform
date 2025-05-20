"use client";

import { Axios } from "@/axios/Axios";
import SubHeader from "@/components/SubHeader";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { QuizTypes } from "@/types/Types";
import Spiner from "@/components/Spiner";

const Page = () => {
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quiz");

  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<QuizTypes>();
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);

  const getQuiz = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(`teacher/get-quiz-by-id/${quizId}`);
      setQuiz(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quizId) getQuiz();
  }, [quizId]);

  const handleAnswerChange = (index: number, selected: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = selected;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      const res = await Axios.post("/user/check-quiz", {
        quizId,
        answers,
      });
      setResult(res.data.results);
      console.log("Result:", res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ctm-height">
      <SubHeader currentTitle={quiz?.title || ""} />
      <div className="container">
        <div className="pt-3 pb-3">
          {loading ? (
            <div className="flex items-center justify-center" > <Spiner /> </div>
          ) : (
            quiz?.questions.map((q, idx) => (
              <div key={q.title} className="mb-5">
                <h3 className="text-lg font-medium mb-2">{q.title}</h3>
                {q.answers.map((a) => (
                  <div key={a} className="flex items-center gap-2 mb-1">
                    <input
                      type="radio"
                      name={`question-${idx}`}
                      value={a}
                      onChange={() => handleAnswerChange(idx, a)}
                    />
                    <label>{a}</label>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {quiz && (
          <div className="pt-5">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary1 text-white rounded hover:bg-primary2 hover:bg-blue-800"
            >
              Submit Answers
            </button>
          </div>
        )}
        {result && (
          <div className="pt-5 overflow-x-auto">
            <h2 className="text-xl font-bold mb-4"> النتيجة </h2>

            <table className="min-w-[500px] w-full text-center border-collapse border border-gray-300 mb-5">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 font-medium p-2">#</th>
                  <th className="border border-gray-300 font-medium p-2">  السؤال </th>
                  <th className="border border-gray-300 font-medium p-2">  الاجابة الصحيحة </th>
                  <th className="border border-gray-300 font-medium p-2">  اجابتك  </th>
                  <th className="border border-gray-300 font-medium p-2">  النتيجة  </th>
                </tr>
              </thead>
              <tbody>
                {result.map((resItem: any, idx: number) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">{idx + 1}</td>
                    <td className="border border-gray-300 p-2">
                      {resItem.title}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {resItem.correctAnswer}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {answers[idx] || "Not Answered"}
                    </td>
                    <td
                      className={`border border-gray-300 p-2 font-semibold ${
                        resItem.success ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {resItem.success ? "صح" : "خطأ"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
