import { FaStar } from "react-icons/fa";

const TestmonialsCard = ( {text, name}: {text: string, name: string} ) => {
  return (
    <div className="bg-white rounded-2xl p-6 border-t-4 border-primary3 transform hover:-translate-y-2 transition-all duration-300 ease-in-out animate__animated animate__fadeInUp">
      <p className="text-gray-600 text-center text-base mb-4 leading-relaxed italic"> {`"${text}"`} </p>
      <div className="text-center mt-4">
        <h4 className="text-lg font-semibold text-primary3 mb-2"> {name} </h4>
        <div className="flex justify-center gap-1 text-yellow-400">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestmonialsCard;
