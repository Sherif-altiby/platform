import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

interface SubjectCardProps {
  link: string;
  name: string;
  avatar: string;
}

const SubjectCard = ({ link, name, avatar }: SubjectCardProps) => {
  return (
    <Link
      href={link}
      className="group relative flex flex-col items-center bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl" />

      {/* Avatar */}
      <div className="relative w-20 h-20 rounded-2xl border-4 border-white shadow-md overflow-hidden bg-indigo-50 rotate-2 group-hover:rotate-0 transition-transform duration-500">
        {avatar?.startsWith("http") ? (
          <Image
            src={avatar}
            alt={`${name} subject`}
            fill
            className="object-cover"
            sizes="80px"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-indigo-400">
            {name.charAt(0)}
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="mt-4 text-lg font-bold text-gray-900 text-center group-hover:text-indigo-600 transition-colors duration-300">
        {name}
      </h3>

      {/* Divider */}
      <div className="w-full h-px bg-gray-100 my-4" />

      {/* CTA */}
      <div className="flex items-center gap-2 text-sm font-semibold text-indigo-400 group-hover:text-indigo-600 transition-colors duration-300">
        <span>عرض التفاصيل</span>
        <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform duration-300" />
      </div>
    </Link>
  );
};

export default SubjectCard;