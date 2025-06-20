import { QuestionTypes } from "@/types/Types"

const Question = ({question}: {question: QuestionTypes}) => {
  return (
    <div className="mb-3" >
                <h3 className="text-lg text-gray-600 font-medium mb-1" >   {question.title}    </h3>

                {
                    question.answers.map((a) => (
                        <div className="flex items-center gap-2 pr-2" key={a} >
                                <input type="radio" name={question.title} />
                                <label htmlFor="an-1"> {a} </label>
                        </div>
                    ))
                }   

    </div>
  )
}

export default Question