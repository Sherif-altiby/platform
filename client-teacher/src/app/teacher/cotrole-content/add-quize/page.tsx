"use client"

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import ButtonLoader from "@/components/ButtonLoader";
import { Axios } from "@/axios/Axios";
import { QuestionTypes, QuizTypes } from "@/types/Types";
import Question from "../../components/Question";
import { CiSquareQuestion } from "react-icons/ci";

const inputClass = "border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 block w-full text-gray-800 text-sm transition-all duration-200 focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-50";
const labelClass = "block text-sm font-medium text-gray-600 mb-1.5";

const Page = () => {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("first");
  const [questions, setQuestions] = useState<QuestionTypes[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, { title: "", answers: ["", "", "", ""], correctAnswer: "", num: uuidv4() }]);
  };

  const handleQuestionChange = (id: string, updatedQuestion: QuestionTypes) => {
    setQuestions((prev) => prev.map((q) => (q.num === id ? updatedQuestion : q)));
  };

  const handleSaveQuiz = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === "" || questions.length === 0) {
      toast.error("يرجى إدخال عنوان وإضافة أسئلة قبل الحفظ.");
      return;
    }
    handleUploadQuiz({ title, level, questions });
  };

  const handleUploadQuiz = async (quiz: QuizTypes) => {
    setLoading(true);
    try {
      const res = await Axios.post("teacher/upload-quiz", quiz);
      toast.success(res.data.message);
      setTitle(""); setLevel("first"); setQuestions([]);
    } catch {
      toast.error("حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <form
        className="w-full bg-white border border-gray-100 rounded-3xl shadow-sm p-8"
        onSubmit={handleSaveQuiz}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md">
            <CiSquareQuestion className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">إضافة اختبار</h2>
            <p className="text-sm text-gray-400">أدخل بيانات الاختبار وأضف الأسئلة</p>
          </div>
        </div>

        {/* Title + Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div>
            <label className={labelClass} htmlFor="title">عنوان الاختبار</label>
            <input type="text" id="title" className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label className={labelClass} htmlFor="level">الصف الدراسي</label>
            <select id="level" className={inputClass} value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="first">الصف الأول الثانوي</option>
              <option value="second">الصف الثاني الثانوي</option>
              <option value="third">الصف الثالث الثانوي</option>
            </select>
          </div>
        </div>

        {/* Questions */}
        {questions.length > 0 && (
          <div className="flex flex-col gap-4 mb-6">
            {questions.map((question) => (
              <Question key={question.num} question={question} onChange={handleQuestionChange} />
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="flex-1 h-11 rounded-xl border-2 border-dashed border-emerald-300 text-emerald-600 text-sm font-semibold hover:bg-emerald-50 transition-colors duration-200"
          >
            + أضف سؤال
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 h-11 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <><ButtonLoader /><span>جاري الحفظ...</span></> : "حفظ الاختبار"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;