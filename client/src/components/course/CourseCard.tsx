import Image from "next/image";
import Link from "next/link"
import { FaArrowLeft, FaPlay, FaRegClock, FaUsers } from "react-icons/fa6"
import { MdSlowMotionVideo } from "react-icons/md";

interface CourseCardProps {
  title: string;
  subject: string;
  price: number;
  image: string;
  students: number;
  length: string;
  link: string;
}

const CourseCard = ({ title, subject, price, image, students, length, link }: CourseCardProps) => {
  return (
     <Link
      href={link}
      className="group relative flex flex-col bg-white border border-gray-100 rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
    >
      {/* Course Image & Play Overlay */}
      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gray-100 mb-4">
        <Image
          src={ image }
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-500">
            <FaPlay className="text-indigo-600 ml-1 text-sm" />
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="flex flex-col flex-1 px-2">
        <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-wider mb-1">
          {subject}
        </span>
        <h3 className="text-sm font-bold text-gray-700 leading-tight group-hover:text-indigo-600 transition-colors duration-300">
          {title}
        </h3>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 text-xs border-y border-gray-50 py-3">
          <span className="flex items-center gap-1.5 font-medium">
            <MdSlowMotionVideo  className="text-indigo-400" /> {length}
          </span>
        </div>

        {/* Footer: Price & CTA */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through">240 ج.م</span>
            <span className="text-sm font-bold text-gray-900">{price} ج.م</span>
          </div>
          <div className="size-8 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            <FaArrowLeft className="text-sm" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard