import { QuestionTypes } from "@/types/Types";

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
    // فحص إذا كان النص يبدأ بحروف إنجليزية أو أرقام أو رموز برمجية
    const isEnglish = /^[a-zA-Z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~-]/.test(text.trim());
    return isEnglish ? "ltr" : "rtl";
  };

  return (
    <div className="bg-white rounded-lg p-8 border border-gray-100 transition-all shadow-sm">
      <div className="flex items-start gap-4 mb-8">
        <span className="w-12 h-12 shrink-0 flex items-center justify-center rounded-lg bg-gray-900 text-white text-lg font-bold">
          {index + 1}
        </span>
        
        {/* عنوان السؤال مع اتجاه تلقائي */}
        <h3 
          style={{ direction: getDirection(question.title) }}
          className={`text-xl text-gray-800 leading-relaxed pt-1 whitespace-pre-wrap font-medium w-full ${getDirection(question.title) === 'rtl' ? 'text-right' : 'text-left'}`}
        >
          {question.title}
        </h3>
      </div>

      <div className="grid gap-4">
        {question.answers.map((answer, aIdx) => {
          const isSelected = selectedAnswer === answer;
          const dir = getDirection(answer);

          return (
            <button
              key={aIdx}
              onClick={() => onAnswerChange(answer)}
              style={{ direction: dir }} // ضبط اتجاه الزر بالكامل
              className={`
                group relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-300
                ${isSelected 
                  ? "border-emerald-500 bg-emerald-50 ring-4 ring-emerald-50" 
                  : "border-gray-100 bg-gray-50/50 hover:border-gray-200 hover:bg-white"
                }
                ${dir === 'rtl' ? 'text-right' : 'text-left'}
              `}
            >
              {/* دائرة الاختيار */}
              <div className={`
                mt-1 w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all
                ${isSelected ? "border-emerald-500 bg-emerald-500" : "border-gray-300 bg-white"}
              `}>
                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              
              {/* نص الإجابة مع اتجاه تلقائي */}
              <span className={`text-base font-bold transition-colors whitespace-pre-wrap flex-1 ${isSelected ? "text-emerald-900" : "text-gray-600"}`}>
                {answer}
              </span>

              {/* أيقونة الصح تظهر فقط في الجهة المقابلة لاتجاه النص */}
              {isSelected && (
                <div className={`absolute ${dir === 'rtl' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-emerald-500 opacity-30 hidden md:block`}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
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