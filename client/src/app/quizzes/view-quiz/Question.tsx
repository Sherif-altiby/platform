import { QuestionTypes } from "@/types/Types";

interface Props {
  question: QuestionTypes;
  index: number;
  selectedAnswer: string;
  onAnswerChange: (val: string) => void;
}

const Question = ({ question, index, selectedAnswer, onAnswerChange }: Props) => {
  return (
    <div className="bg-white rounded-lg p-8 border border-gray-100   transition-all  ">
      <div className="flex items-start gap-4 mb-8">
        <span className="w-12 h-12 shrink-0 flex items-center justify-center rounded-lg bg-gray-900 text-white   text-lg ">
          {index + 1}
        </span>
        <h3 className="text-xl text-gray-800 leading-relaxed pt-1">
          {question.title}
        </h3>
      </div>

      <div className="grid gap-4">
        {question.answers.map((answer, aIdx) => {
          const isSelected = selectedAnswer === answer;
          return (
            <button
              key={aIdx}
              onClick={() => onAnswerChange(answer)}
              className={`
                group relative flex items-center gap-4 p-3 rounded-lg border-2 text-right transition-all duration-300
                ${isSelected 
                  ? "border-emerald-500 bg-emerald-50 ring-4 ring-emerald-50" 
                  : "border-gray-200 bg-gray-50/50 hover:border-gray-200 hover:bg-white"
                }
              `}
            >
              <div className={`
                w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
                ${isSelected ? "border-emerald-500 bg-emerald-500" : "border-gray-300 bg-white"}
              `}>
                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              
              <span className={`text-base font-bold transition-colors ${isSelected ? "text-emerald-900" : "text-gray-600"}`}>
                {answer}
              </span>

              {isSelected && (
                <div className="absolute left-6 text-emerald-200 opacity-20">
                   <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
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