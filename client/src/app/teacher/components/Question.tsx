"use client"

import { QuestionTypes } from "@/types/Types";

interface QuestionComponentProps {
  question: QuestionTypes;
  onChange: (id: string, updatedQuestion: QuestionTypes) => void;
}

const Question: React.FC<QuestionComponentProps> = ({ question, onChange }) => {
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestion = { ...question, title: e.target.value };
    onChange(question.num, updatedQuestion);
  };

  const handleAnswerChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAnswers = [...question.answers];
    updatedAnswers[index] = e.target.value;
    const updatedQuestion = {
      ...question,
      answers: updatedAnswers,
      correctAnswer: updatedAnswers[3], // always bind the last input as correct answer
    };
    onChange(question.num, updatedQuestion);
  };

  return (
    <div className="mb-5 bg-gray-100 rounded-lg p-3">
      <div className="mb-3">
        <label className="block text-grayColor text-lg mb-2">السؤال :</label>
        <input
          type="text"
          className="border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor"
          value={question.title}
          onChange={handleQuestionChange}
        />
      </div>
      <div>
        <label className="block text-grayColor text-lg mb-2">الإجابات :</label>
        <div className="flex items-center gap-4 flex-col md:flex-row">
          {question.answers.map((answer, index) => (
            <div key={index} className="w-full">
              <input
                type="text"
                value={answer}
                className="border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor"
                onChange={(e) => handleAnswerChange(index, e)}
                placeholder={
                  index === 0
                    ? "الإجابة الأولى"
                    : index === 1
                    ? "الإجابة الثانية"
                    : index === 2
                    ? "الإجابة الثالثة"
                    : "الإجابة الصحيحة"
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
