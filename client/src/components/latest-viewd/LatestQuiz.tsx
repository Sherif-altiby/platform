import { FaGraduationCap } from "react-icons/fa6";

const LatestQuiz = ({ quiz }: { quiz: any }) => {
  const percentage = (quiz.score / quiz.total) * 100;
  const isGoodScore = percentage >= 50;

  return (
    <div className="relative flex items-center justify-between p-4 bg-white rounded-3xl   shadow-sm  group mb-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12    rounded-2xl flex items-center justify-center  bg-indigo-600  text-white transition-all duration-300">
            <FaGraduationCap size={22} />
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
        </div>

        <div className="flex flex-col">
          <h4 className="font-bold   text-[15px] line-clamp-1  text-indigo-600 transition-colors">
            {quiz.quizId?.title || "اختبار غير محدد"}
          </h4>

          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
              {quiz.courseId?.title}
            </span>
            <span className="text-[10px] text-slate-300">•</span>
            <span className="text-[11px] font-medium text-slate-500">
              أ/ {quiz.teacherId?.name}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right flex flex-col justify-center">
          <span
            className={`text-xl font-black leading-none ${isGoodScore ? "text-emerald-500" : "text-rose-500"}`}
          >
            {quiz.score} / {quiz.total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LatestQuiz;
