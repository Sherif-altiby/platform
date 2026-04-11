import { FaClock, FaListOl } from "react-icons/fa6";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const QuizHeader = ({answers, quiz, timeLeft}: {answers: string[], quiz: any, timeLeft: number}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
            <FaListOl />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">التقدم</p>
            <p className="text-sm font-bold text-gray-700">
              {answers.filter(Boolean).length} / {quiz?.questions.length}
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
          <p className="text-xs text-gray-400 font-medium">الوقت المتبقي</p>
          <p
            className={`text-xl font-black ${timeLeft < 60 ? "text-red-600" : "text-gray-700"}`}
          >
            {formatTime(timeLeft)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;
