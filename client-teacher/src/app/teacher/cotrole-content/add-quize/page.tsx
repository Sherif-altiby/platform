"use client"

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import MainButton from "@/components/MainButton";
import ButtonLoader from "@/components/ButtonLoader";
import { Axios } from "@/axios/Axios";
import { QuestionTypes, QuizTypes } from "@/types/Types";
import Question from "../../components/Question";

const Page = () => {
  const [title, setTitle] = useState<string>("");
  const [level, setLevel] = useState<string>("first");
  const [questions, setQuestions] = useState<QuestionTypes[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddQuestion = () => {
    const newQuestion: QuestionTypes = {
      title: "",
      answers: ["", "", "", ""],
      correctAnswer: "",
      num: uuidv4(),
    };
    setQuestions((prev) => [...prev, newQuestion]);
  };

  const handleQuestionChange = (id: string, updatedQuestion: QuestionTypes) => {
    setQuestions((prev) =>
      prev.map((q) => (q.num === id ? updatedQuestion : q))
    );
  };

  const handleSaveQuiz = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const quiz: QuizTypes = {
      title,
      level,
      questions,
    };

    if (title.trim() === "" || questions.length === 0) {
      toast.error("يرجى إدخال عنوان وإضافة أسئلة قبل الحفظ.");
      return;
    }

    handleUploadQuiz(quiz);
  };

  const handleUploadQuiz = async (quiz: QuizTypes) => {
    setLoading(true);
    try {
      const res = await Axios.post("teacher/upload-quiz", quiz);
      toast.success(res.data.message);
      setTitle("");
      setLevel("first");
      setQuestions([]);
    } catch  {
       toast.error( "حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        className="shadow-lg p-5 rounded-lg bg-white"
        onSubmit={handleSaveQuiz}
      >
        <div className="text-2xl text-hoverLinkColor mb-5">إضافة اختبار</div>

        <div className="flex items-start flex-col md:flex-row gap-5 mb-5">
          <div className="w-full md:w-1/2">
            <label
              className="block text-grayColor text-lg mb-2"
              htmlFor="name"
            >
              عنوان الاختبار
            </label>
            <input
              type="text"
              id="name"
              className="border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="w-full md:w-1/2">
            <label
              className="block text-grayColor text-lg mb-2"
              htmlFor="level"
            >
              الصف الدراسي
            </label>
            <select
              id="level"
              className="border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="first">الصف الأول الثانوي</option>
              <option value="second">الصف الثاني الثانوي</option>
              <option value="third">الصف الثالث الثانوي</option>
            </select>
          </div>
        </div>

        <div>
          {questions.map((question) => (
            <Question
              key={question.num}
              question={question}
              onChange={handleQuestionChange}
            />
          ))}
        </div>

        <div className="flex items-center gap-5 mt-4">
          <div
            onClick={handleAddQuestion}
            className="flex items-center justify-center text-lg cursor-pointer h-[50px] rounded-xl w-full sm:w-[170px] bg-hoverLinkColor border border-hoverLinkColor text-white transition-all duration-500 hover:rounded-[50px] hover:bg-white hover:text-hoverLinkColor"
          >
            أضف سؤال
          </div>

          {!loading ? (
            <MainButton text="حفظ" />
          ) : (
            <button
              disabled
              className="flex items-center justify-center md:text-lg h-[50px] rounded-xl w-full sm:w-[170px] bg-hoverLinkColor border border-hoverLinkColor text-white transition-all duration-500 hover:rounded-[50px] gap-2"
            >
              <p>حفظ</p>
              <ButtonLoader />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Page;
