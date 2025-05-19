import Image from "next/image";
import Link from "next/link";

const IMAGEURL = process.env.NEXT_PUBLIC_IMAGES_URL


const Note = ( {name, pdf}: {name: string, pdf: string} ) => {
  return (
    <div className="shadow-md rounded-md p-2 text-center flex flex-col items-center">
      <Image
        src={"/pdf.png"}
        alt="pdf image"
        width={80}
        height={100}
        className="mx-auto"
      />

      <p className="text-canter text-lg text-gray-400 mt-2"> {name} </p>

      <Link 
         href={`${IMAGEURL}/${pdf}`} 
         target="_blank"
         className="w-full mx-auto md:w-[90%] rounded-[5px] bg-primary1 text-white text-lg p-1 mt-3 transition-all duration-300 hover:bg-blue-800" > 
         عرض المذكرة  
      </Link>
    </div>
  );
};

export default Note;
