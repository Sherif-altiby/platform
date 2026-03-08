"use client";

import { CardStaticsTypes } from "@/types/Types";
import Link from "next/link";
import CountUp from "react-countup";
import { FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const CardStatics = ({
  title,
  allLength,
  firstLevel,
  subTitle,
  secondLevel,
  thirdLevel,
  link,
  href,
  contentView,
}: CardStaticsTypes) => {
  const levels = [
    { label: "الصف الأول الثانوي", value: firstLevel, level: "first" },
    { label: "الصف الثاني الثانوي", value: secondLevel, level: "second" },
    { label: "الصف الثالث الثانوي", value: thirdLevel, level: "third" },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 mb-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
            <FaChalkboardTeacher className="text-white text-sm" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        </div>
        <Link
          href={`/teacher/cotrole-content/${href}`}
          className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 shadow-sm shadow-indigo-200"
        >
          {link}
          <FaArrowLeft className="text-xs" />
        </Link>
      </div>

      {/* Total count */}
      <div className="flex items-center gap-4 p-5 bg-indigo-50 rounded-2xl border border-indigo-100 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-md shrink-0">
          <FaBookOpen className="text-white text-base" />
        </div>
        <div>
          <p className="text-xs text-indigo-400 font-medium mb-0.5">
            عدد {title} التي قمت بإضافتها
          </p>
          <h3 className="text-3xl font-bold text-indigo-700">
            <CountUp start={0} end={allLength} duration={2} />
          </h3>
        </div>
      </div>

      {/* Level cards */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {levels.map(({ label, value, level }, i) => (
          <Link
            key={level}
            href={`/teacher/view-content/${contentView}?level=${level}`}
            className="group flex items-center gap-4 bg-gray-50 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-100 p-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-base font-bold shrink-0 transition-colors duration-200
              ${i === 0 ? "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200" :
                i === 1 ? "bg-blue-100 text-blue-600 group-hover:bg-blue-200" :
                          "bg-teal-100 text-teal-600 group-hover:bg-teal-200"}`}
            >
              <CountUp start={0} end={value} duration={2} />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">عدد {subTitle}</p>
              <p className="text-sm font-semibold text-gray-700">{label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardStatics;