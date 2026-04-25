import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa6";
import { HiPhotograph } from "react-icons/hi";
import Image from "next/image";

export interface QuizResultData {
  score: number;
  totalQuestions: number;
  correctAnswersCount: number;
  answers: Array<{
    questionTitle: string;
    questionImage?: string;
    userAnswer: string | {
      text?: string;
      image?: string;
    };
    correctAnswer: string | {
      text?: string;
      image?: string;
    };
    isCorrect: boolean;
  }>;
}

const QuizResult = ({ result }: { result: QuizResultData }) => {
  
  // دالة لتحديد الاتجاه بناءً على النص
  const getDirection = (text: string) => {
    if (!text) return "rtl";
    const isEnglish = /^[a-zA-Z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~-]/.test(text.trim());
    return isEnglish ? "ltr" : "rtl";
  };

  // دالة لعرض الإجابة (نص و/أو صورة)
  const renderAnswer = (answer: any, isCorrect: boolean = false) => {
    // Handle old format (string)
    if (typeof answer === 'string') {
      const dir = getDirection(answer);
      return (
        <span 
          style={{ direction: dir }}
          className={`font-bold inline-block ${
            isCorrect ? "text-emerald-600" : "text-red-600"
          } ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
        >
          {answer}
        </span>
      );
    }

    // Handle new format (object with text and/or image)
    if (typeof answer === 'object' && answer !== null) {
      const hasText = Boolean(answer.text);
      const hasImage = Boolean(answer.image);

      return (
        <div className="inline-flex flex-col gap-2 mt-1">
          {/* Display text if exists */}
          {hasText && (
            <span 
              style={{ direction: getDirection(answer.text) }}
              className={`font-bold ${
                isCorrect ? "text-emerald-600" : "text-red-600"
              } ${getDirection(answer.text) === 'rtl' ? 'text-right' : 'text-left'}`}
            >
              {answer.text}
            </span>
          )}

          {/* Display image if exists */}
          {hasImage && (
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50 group">
              <Image
                src={answer.image}
                alt="إجابة"
                fill
                className="object-contain p-1"
              />
              <div className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-sm text-white px-1.5 py-0.5 rounded text-[9px] font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <HiPhotograph className="text-[10px]" />
                صورة
              </div>
            </div>
          )}

          {/* If neither text nor image */}
          {!hasText && !hasImage && (
            <span className="text-gray-400 text-sm italic">
              لا يوجد إجابة
            </span>
          )}
        </div>
      );
    }

    return <span className="text-gray-400 text-sm italic">لا يوجد إجابة</span>;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Result Summary Card */}
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

      {/* Questions Review */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-700 px-2">مراجعة الأسئلة</h3>
        {result.answers.map((item, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-3xl border transition-all ${
              item.isCorrect
                ? "bg-white border-emerald-100 shadow-sm"
                : "bg-red-50/50 border-red-100"
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Check/Cross Icon */}
              <div
                className={`mt-1 shrink-0 ${item.isCorrect ? "text-emerald-500" : "text-red-500"}`}
              >
                {item.isCorrect ? (
                  <FaCheckCircle size={22} />
                ) : (
                  <FaTimesCircle size={22} />
                )}
              </div>

              <div className="flex-1 space-y-4">
                {/* Question Title */}
                <div>
                  <p 
                    style={{ direction: getDirection(item.questionTitle) }}
                    className={`text-gray-800 font-bold mb-3 text-base md:text-lg ${
                      getDirection(item.questionTitle) === 'rtl' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {item.questionTitle}
                  </p>

                  {/* Question Image if exists */}
                  {item.questionImage && (
                    <div className="relative w-full h-40 md:h-48 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 mb-3">
                      <Image
                        src={item.questionImage}
                        alt="صورة السؤال"
                        fill
                        className="object-contain p-2"
                      />
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-[10px] font-medium flex items-center gap-1">
                        <HiPhotograph className="text-xs" />
                        صورة السؤال
                      </div>
                    </div>
                  )}
                </div>

                {/* Answers Section */}
                <div className="space-y-3 text-sm">
                  {/* User Answer */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-gray-600 mb-2 font-medium text-xs">
                      إجابتك:
                    </p>
                    {renderAnswer(item.userAnswer, item.isCorrect)}
                  </div>

                  {/* Correct Answer (only show if user was wrong) */}
                  {!item.isCorrect && (
                    <div className="bg-emerald-50 p-4 rounded-xl">
                      <p className="text-gray-600 mb-2 font-medium text-xs">
                        الإجابة الصحيحة:
                      </p>
                      {renderAnswer(item.correctAnswer, true)}
                    </div>
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

export default QuizResult;