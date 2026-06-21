"use client";

import Link from "next/link";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineSubject, MdQuestionAnswer } from "react-icons/md";

interface QuizRowProps {
  quiz: any;
}

const QuizRow = ({ quiz }: QuizRowProps) => {
  return (
    <Link href={`/quizzes/view-quiz?quiz=${quiz._id}`} className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 transition-all duration-300 hover:shadow-md hover:border-indigo-200">

      {/* Left */}
      <div className="flex items-center gap-4 min-w-0">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <MdOutlineSubject className="text-xl" />
        </div>

        <div className="min-w-0">
          <h3 className="font-bold text-slate-800 truncate">
            {quiz.title}
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            اختبار تقييم
          </p>
        </div>

      </div>

      {/* Right info */}
      <div className="flex items-center gap-6 text-xs text-slate-500">

        <div className="flex items-center gap-2">
          <MdQuestionAnswer />
          <span>{quiz.questionsCount} سؤال</span>
        </div>

        <div className="flex items-center gap-2">
          <FaRegClock />
          <span>{quiz.duration} دقيقة</span>
        </div>

      </div>

    </Link>
  );
};

export default QuizRow;