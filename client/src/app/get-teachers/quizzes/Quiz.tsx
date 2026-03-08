import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const Quiz = ({ name, quizId }: { name: string; quizId: string }) => {
  return (
    <div className="group bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center gap-3">

      {/* Quiz icon */}
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors duration-300">
        <Image
          src="/quiz.png"
          alt="quiz"
          width={36}
          height={36}
          className="object-contain"
        />
      </div>

      {/* Title */}
      <p className="text-sm font-medium text-gray-700 text-center leading-relaxed line-clamp-2">
        {name}
      </p>

      {/* Divider */}
      <div className="w-full h-px bg-gray-100" />

      {/* CTA */}
      <Link
        href={`/get-teachers/quizzes/view-quiz?quiz=${quizId}`}
        className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors duration-200"
      >
        <span>ابدأ الاختبار</span>
        <FaArrowLeft className="text-xs" />
      </Link>
    </div>
  );
};

export default Quiz;