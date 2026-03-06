import { TeacherTypes } from "@/types/Types";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const TeacherCard = ({ teacher }: { teacher: TeacherTypes }) => {
  return (
    <Link
      href={`/get-teachers/${teacher._id}?name=${teacher.name}`}
      className="group relative flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
    >
      {/* Top color band */}
      <div className="relative h-24 bg-gradient-to-br from-indigo-600 via-blue-500 to-teal-400">
        {/* Decorative circles */}
        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/10" />
        <div className="absolute -bottom-2 -left-2 w-16 h-16 rounded-full bg-white/10" />
      </div>

      {/* Avatar — overlapping the band */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2">
        <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-indigo-100 rotate-3 group-hover:rotate-0 transition-transform duration-500">
          {teacher.avatar?.startsWith("http") ? (
            <Image
              src={teacher.avatar}
              alt={`صورة ${teacher.name}`}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-indigo-500">
              {teacher.name.charAt(0)}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="pt-14 pb-5 px-5 flex flex-col items-center gap-3 flex-1">
        {/* Name */}
        <h3 className="text-gray-900 font-bold text-lg text-center leading-tight">
          أ/ {teacher.name}
        </h3>

        {/* Subjects */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {teacher.subjects.map((sub) => (
            <span
              key={sub._id}
              className="text-xs font-medium bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-100"
            >
              {sub.name}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-100 mt-1" />

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-semibold text-indigo-500 group-hover:text-indigo-700 transition-colors duration-300">
          <span>مشاهدة التفاصيل</span>
          <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
};

export default TeacherCard;