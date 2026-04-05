import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaRegClock, FaLayerGroup } from "react-icons/fa";
import { MdOutlineSubject, MdQuestionAnswer } from "react-icons/md";

// تعريف الواجهة لتطابق البيانات القادمة من السيرفر
interface QuizProps {
  quiz: {
    _id: string;
    title: string;
    level: string;
    subject: {
      name: string;
    };
    course?: {
      title: string;
    };
    questions: any[];
    createdAt: string;
  };
}

const Quiz = ({ quiz }: QuizProps) => {
  return (
    <div className="group bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500 hover:-translate-y-2 flex flex-col gap-4 relative overflow-hidden">
      
      {/* Badge للمادة الدراسية */}
      <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
        <MdOutlineSubject className="text-sm" />
        {quiz.subject?.name || "عام"}
      </div>

      {/* Quiz Icon & Meta */}
      <div className="flex items-start gap-4 mt-6">
        
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {quiz.title}
          </h3>
          <span className="text-[11px] text-gray-400 flex items-center gap-1">
            <FaLayerGroup className="text-emerald-500" />
            {quiz.level}
          </span>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-2 py-3 border-y border-gray-50 my-1">
        <div className="flex items-center gap-2 text-gray-500">
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
            <MdQuestionAnswer className="text-emerald-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400">الأسئلة</span>
            <span className="text-xs font-bold text-gray-700">{quiz.questions.length} سؤال</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-gray-500">
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
            <FaRegClock className="text-emerald-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400">تاريخ النشر</span>
            <span className="text-xs font-bold text-gray-700">
              {new Date(quiz.createdAt).toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' })}
            </span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <Link
        href={`/quizzes/view-quiz?quiz=${quiz._id}`}
        className="relative flex items-center justify-center gap-3 w-full py-3 rounded-2xl bg-emerald-600 text-white text-sm font-bold overflow-hidden transition-all duration-300 hover:bg-emerald-700 active:scale-95 shadow-lg shadow-emerald-200"
      >
        <span>ابدأ الاختبار الآن</span>
        <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
        
        {/* Light flash effect on hover */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
      </Link>
    </div>
  );
};

export default Quiz;