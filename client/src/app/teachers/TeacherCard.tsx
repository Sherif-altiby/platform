import { TeacherTypes } from "@/types/Types";
import Image from "next/image";
import Link from "next/link";
import { FaChalkboardTeacher } from "react-icons/fa";

const SERVER_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGES_URL;

const TeacherCard = ({ teacher }: { teacher: TeacherTypes }) => {
  return (
    <Link
      href={`/teachers/${teacher._id}?name=${teacher.name}`}
      className="group bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl p-6 w-full hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:rotate-3"
    >
      <div className="flex items-center gap-6">
        {/* Teacher Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-500 ease-in-out relative">
          <Image
            src={`${SERVER_IMAGE_URL}/${teacher.avatar}`}
            alt={`صورة ${teacher.name}`}
            width={96}
            height={96}
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <div className="absolute bottom-0 left-0 right-0 p-2 text-white bg-black bg-opacity-40 text-sm rounded-b-full text-center">
            <span className="font-semibold">{teacher.name.split(" ")[0]}</span>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col gap-2 text-white">
          <h3 className="text-xl font-semibold group-hover:text-gray-100 transition-all duration-300 ease-in-out">
            أ/ {teacher.name}
          </h3>
          <div className="flex gap-2 flex-wrap">
            {teacher.subjects.map((sub) => (
              <span
                key={sub._id}
                className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-md group-hover:bg-gray-100 transition-all transform hover:scale-110 duration-300"
              >
                {sub.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Button */}
      <div className="mt-4 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
        <button
          className="flex items-center gap-2 px-5 py-2 bg-white text-gray-800 rounded-full shadow-xl hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <FaChalkboardTeacher className="text-xl transform group-hover:rotate-180 transition-transform duration-300 ease-in-out" />
          مشاهدة التفاصيل
        </button>
      </div>
    </Link>
  );
};

export default TeacherCard;
