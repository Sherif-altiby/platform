"use client";

import { CardStaticsTypes } from "@/types/Types";
import Link from "next/link";
import CountUp from "react-countup";
import { FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";

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
    <div className="mb-8 p-6 rounded-xl bg-white shadow-md border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaChalkboardTeacher className="text-primary1" />
          {title}
        </h2>
        <Link
          href={`/teacher/cotrole-content/${href}`}
          className="bg-primary1 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary2 transition"
        >
          {link}
        </Link>
      </div>

      {/* Total Items Card */}
      <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-lg shadow-sm border border-gray-100 mb-6 hover:shadow-md transition">
        <div className="w-12 h-12 bg-primary1 text-white rounded-full flex items-center justify-center text-xl">
          <FaBookOpen />
        </div>
        <div>
          <p className="text-gray-600 text-sm">عدد {title} التي قمت بإضافتها</p>
          <h3 className="text-2xl font-semibold text-gray-800">
            <CountUp start={0} end={allLength} duration={2} />
          </h3>
        </div>
      </div>

      {/* Level Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {levels.map(({ label, value, level }) => (
          <Link
            key={level}
            href={`/teacher/view-content/${contentView}?level=${level}`}
            className="flex items-center gap-4 bg-white p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition group"
          >
            <div className="w-12 h-12 bg-primary1 text-white rounded-full flex items-center justify-center text-xl group-hover:bg-primary2 transition">
              <CountUp start={0} end={value} duration={2} />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">عدد {subTitle}</p>
              <p className="text-gray-700 font-medium">{label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardStatics;
