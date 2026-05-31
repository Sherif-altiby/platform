import Image from "next/image";
import { HiPhotograph } from "react-icons/hi";

interface QuestionTypes {
  title: string;
  titleImage?: string;
  answers: Array<{
    text?: string;
    image?: string;
  }> | string[];
  correctAnswer: {
    text?: string;
    image?: string;
  } | string;
}

interface Props {
  question: QuestionTypes;
  index: number;
  selectedAnswer: string;
  onAnswerChange: (val: string) => void;
}

const Question = ({ question, index, selectedAnswer, onAnswerChange }: Props) => {
  
  // دالة لتحديد الاتجاه بناءً على أول حرف في النص
  const getDirection = (text: string) => {
    if (!text) return "rtl";
    const isEnglish = /^[a-zA-Z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~-]/.test(text.trim());
    return isEnglish ? "ltr" : "rtl";
  };

  // دالة للتحقق من تطابق الإجابة (نص و/أو صورة)
  const isAnswerSelected = (answer: any) => {
    if (typeof selectedAnswer === 'string' && selectedAnswer !== '') {
      const currentAnswerText = typeof answer === 'string' ? answer : (answer.text || null);
      const currentAnswerImage = typeof answer === 'object' ? (answer.image || null) : null;

      try {
        const parsed = JSON.parse(selectedAnswer);
        return (
          parsed.text === currentAnswerText &&
          parsed.image === currentAnswerImage
        );
      } catch {
        return selectedAnswer === currentAnswerText;
      }
    }
    return false;
  };

  // دالة للتعامل مع اختيار الإجابة
  const handleAnswerSelect = (answer: any) => {
    if (typeof answer === 'object' && (answer.text || answer.image)) {
      onAnswerChange(JSON.stringify({ 
        text: answer.text || null, 
        image: answer.image || null 
      }));
    } else {
      onAnswerChange(answer);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 transition-all shadow-sm hover:shadow-md">
      {/* رأس السؤال */}
      <div className="flex items-start gap-3 md:gap-4 mb-6">
        <span className="w-10 h-10 md:w-12 md:h-12 shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white text-base md:text-lg font-bold shadow-lg shadow-emerald-200">
          {index + 1}
        </span>
        
        {/* عنوان السؤال */}
        <h3 
          style={{ direction: getDirection(question.title) }}
          className={`text-lg md:text-xl text-gray-800 leading-relaxed pt-1 whitespace-pre-wrap font-semibold flex-1 ${getDirection(question.title) === 'rtl' ? 'text-right' : 'text-left'}`}
        >
          {question.title}
        </h3>
      </div>

      {/* صورة السؤال إن وجدت */}
      {question.titleImage && (
        <div className="mb-6 relative w-full h-48 md:h-64 rounded-xl overflow-hidden border-2 border-gray-100 bg-gray-50">
          <Image
            src={question.titleImage}
            alt="صورة السؤال"
            fill
            className="object-contain p-2"
            priority
          />
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[10px] md:text-xs font-bold flex items-center gap-1.5">
            <HiPhotograph className="text-xs md:text-sm" />
            صورة السؤال
          </div>
        </div>
      )}

      {/* الإجابات */}
      <div className="grid gap-3 md:gap-4">
        {question.answers.map((answer: any, aIdx: number) => {
          // التعامل مع الإجابات القديمة (string) والجديدة (object)
          const answerText = typeof answer === 'string' ? answer : (answer.text || '');
          const answerImage = typeof answer === 'object' ? answer.image : null;
          
          const isSelected = isAnswerSelected(answer);
          const dir = answerText ? getDirection(answerText) : 'rtl';

          // حالات العرض:
          // 1. نص فقط
          // 2. صورة فقط
          // 3. نص وصورة معاً
          const hasText = Boolean(answerText && answerText.trim());
          const hasImage = Boolean(answerImage);

          return (
            <button
              key={aIdx}
              onClick={() => handleAnswerSelect(answer)}
              className={`
                group relative flex flex-col gap-3 p-4 md:p-5 rounded-xl border-2 transition-all duration-300 text-right
                ${isSelected 
                  ? "border-emerald-500 bg-emerald-50 ring-2 md:ring-4 ring-emerald-100 shadow-lg" 
                  : "border-gray-200 bg-gray-50/50 hover:border-emerald-300 hover:bg-white hover:shadow-md"
                }
              `}
            >
              {/* رأس الإجابة (الحرف + دائرة الاختيار + النص إن وجد) */}
              <div className="flex items-start gap-3 md:gap-4 w-full">
                {/* حرف الإجابة */}
                <div className={`
                  w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center font-bold text-xs md:text-sm shrink-0
                  ${isSelected ? "bg-emerald-600 text-white shadow-md" : "bg-gray-200 text-gray-600"}
                `}>
                  {String.fromCharCode(65 + aIdx)}
                </div>

                {/* النص (إذا كان موجوداً) */}
                {hasText && (
                  <div className="flex-1">
                    <p 
                      style={{ direction: dir }}
                      className={`text-sm md:text-base font-semibold transition-colors whitespace-pre-wrap leading-relaxed ${
                        isSelected ? "text-emerald-900" : "text-gray-700"
                      } ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                    >
                      {answerText}
                    </p>
                  </div>
                )}

                {/* دائرة الاختيار */}
                <div className={`
                  mt-0.5 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-all
                  ${isSelected ? "border-emerald-500 bg-emerald-500 shadow-md" : "border-gray-300 bg-white"}
                `}>
                  {isSelected && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="w-3 h-3 md:w-3.5 md:h-3.5">
                      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>

              {/* الصورة (إذا كانت موجودة) */}
              {hasImage && (
                <div className={`relative w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50 ${
                  hasText ? 'h-40 md:h-48 mt-2' : 'h-48 md:h-56'
                }`}>
                  <Image
                    src={answerImage}
                    alt={`إجابة ${aIdx + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                  
                  {/* Badge للصورة */}
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1">
                    <HiPhotograph className="text-xs" />
                    صورة
                  </div>
                </div>
              )}

              {/* أيقونة الصح عند التحديد */}
              {isSelected && (
                <div className="absolute top-3 left-3 text-emerald-500 drop-shadow-md">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="md:w-6 md:h-6">
                     <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                   </svg>
                </div>
              )}

              {/* رسالة "لا يوجد محتوى" إذا لم يكن هناك نص ولا صورة */}
              {!hasText && !hasImage && (
                <div className="text-center py-4 text-gray-400 text-sm">
                  لا يوجد محتوى لهذه الإجابة
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Question;