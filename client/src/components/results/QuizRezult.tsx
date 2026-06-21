import { HiPhotograph } from "react-icons/hi";
import { LuCheck, LuX, LuTrophy, LuCircleCheck, LuCircleX } from "react-icons/lu";
import Image from "next/image";

export interface QuizResultData {
  score: number;
  totalQuestions: number;
  correctAnswersCount: number;
  answers: Array<{
    questionTitle: string;
    questionImage?: string;
    userAnswer: string | { text?: string; image?: string };
    correctAnswer: string | { text?: string; image?: string };
    isCorrect: boolean;
  }>;
}

const QuizResult = ({ result }: { result: QuizResultData }) => {
  const passed = result.score >= 50;
  const wrongCount = result.totalQuestions - result.correctAnswersCount;

  const getDirection = (text: string) => {
    if (!text) return "rtl";
    return /^[a-zA-Z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~-]/.test(text.trim())
      ? "ltr"
      : "rtl";
  };

  const renderAnswer = (answer: any, isCorrect: boolean) => {
    const color = isCorrect ? "text-teal-800" : "text-slate-700";

    if (typeof answer === "string") {
      const dir = getDirection(answer);
      return (
        <span style={{ direction: dir }} className={`font-medium text-sm ${color}`}>
          {answer}
        </span>
      );
    }

    if (typeof answer === "object" && answer !== null) {
      const hasText = Boolean(answer.text);
      const hasImage = Boolean(answer.image);

      return (
        <div className="flex flex-col gap-2">
          {hasText && (
            <span
              style={{ direction: getDirection(answer.text) }}
              className={`font-medium text-sm ${color}`}
            >
              {answer.text}
            </span>
          )}
          {hasImage && (
            <div className="relative w-28 h-28 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 group">
              <Image src={answer.image} alt="إجابة" fill className="object-contain p-1" />
              <div className="absolute bottom-1 left-1 bg-black/50 text-white px-1.5 py-0.5 rounded text-[9px] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <HiPhotograph className="text-[10px]" /> صورة
              </div>
            </div>
          )}
          {!hasText && !hasImage && (
            <span className="text-slate-400 text-sm italic">لا يوجد إجابة</span>
          )}
        </div>
      );
    }

    return <span className="text-slate-400 text-sm italic">لا يوجد إجابة</span>;
  };

  return (
    <div className="flex flex-col gap-4">

      {/* Summary Card */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className={`h-0.5 w-full ${passed ? "bg-teal-400" : "bg-red-400"}`} />
        <div className="flex flex-col items-center gap-4 p-6">

          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
            <LuTrophy className="text-amber-600 text-xl" />
          </div>

          <div className="text-center">
            <p className="text-4xl font-medium text-slate-800">{result.score}%</p>
            <p className="text-sm text-slate-400 mt-1">درجتك النهائية</p>
          </div>

          <div className={`flex items-center gap-1.5 text-sm font-medium ${passed ? "text-teal-800" : "text-red-700"}`}>
            {passed
              ? <><LuCircleCheck className="text-base" /> ممتاز! أنت اجتزت الاختبار</>
              : <><LuCircleX className="text-base" /> لم تجتز الاختبار، حاول مجدداً</>
            }
          </div>

          <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
            <div className="bg-teal-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-medium text-teal-800">{result.correctAnswersCount}</p>
              <p className="text-xs text-teal-700 mt-0.5">إجابات صحيحة</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-medium text-red-800">{wrongCount}</p>
              <p className="text-xs text-red-700 mt-0.5">إجابات خاطئة</p>
            </div>
          </div>

        </div>
      </div>

      {/* Section title */}
      <p className="text-sm font-medium text-slate-500 px-1">مراجعة الأسئلة</p>

      {/* Questions */}
      <div className="flex flex-col gap-2.5">
        {result.answers.map((item, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-xl border overflow-hidden ${
              item.isCorrect ? "border-slate-200" : "border-red-200"
            }`}
          >
            {/* Question header */}
            <div className="flex items-start gap-3 px-4 py-3.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  item.isCorrect
                    ? "bg-teal-50 text-teal-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {item.isCorrect
                  ? <LuCheck className="text-sm" />
                  : <LuX className="text-sm" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-slate-400 mb-1">السؤال {idx + 1}</p>
                <p
                  style={{ direction: getDirection(item.questionTitle) }}
                  className="text-sm font-medium text-slate-800 leading-relaxed"
                >
                  {item.questionTitle}
                </p>

                {item.questionImage && (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 mt-3">
                    <Image
                      src={item.questionImage}
                      alt="صورة السؤال"
                      fill
                      className="object-contain p-2"
                    />
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                      <HiPhotograph className="text-xs" /> صورة السؤال
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Answers */}
            <div className="flex flex-col gap-2 px-4 pb-4">
              <div className="bg-slate-50 rounded-lg px-3 py-2.5">
                <p className="text-[11px] text-slate-400 mb-1.5">إجابتك</p>
                {renderAnswer(item.userAnswer, item.isCorrect)}
              </div>

              {!item.isCorrect && (
                <div className="bg-teal-50 rounded-lg px-3 py-2.5">
                  <p className="text-[11px] text-slate-400 mb-1.5">الإجابة الصحيحة</p>
                  {renderAnswer(item.correctAnswer, true)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default QuizResult;