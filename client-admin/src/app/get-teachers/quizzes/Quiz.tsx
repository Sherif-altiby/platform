import Image from "next/image";
import Link from "next/link";



const Quiz = ( {name, quizId}: {name: string, quizId: string} ) => {
  return (
    <div className="shadow-md rounded-md p-2 text-center flex flex-col items-center">
      <Image
        src={"/quiz.png"}
        alt="pdf image"
        width={80}
        height={100}
        className="mx-auto"
      />

      <p className="text-canter text-lg text-gray-400 mt-2"> {name} </p>

      <Link 
         href={`/teachers/quizzes/view-quiz?quiz=${quizId}`} 
         className="w-full mx-auto md:w-[90%] rounded-[5px] bg-primary1 text-white text-lg p-1 mt-3 transition-all duration-300 hover:bg-blue-800" > 
           ابدأ الاختبار  
      </Link>
    </div>
  );
};

export default Quiz;
