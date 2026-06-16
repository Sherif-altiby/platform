"use client";
import { Course } from "@/types/Types";
import Image from "next/image";
import { CiLock } from "react-icons/ci";
import { FaPlayCircle } from "react-icons/fa";
import { FaChevronLeft, FaHourglass } from "react-icons/fa6";
import Link from "next/link";
import { usePaymentStore } from "@/store/PaymentStore";
import { useParams, useRouter } from "next/navigation";
import { useLevelStore } from "@/store/levelStore";
import { useEffect, useState } from "react";

const CourseCard = ({ course }: { course: Course }) => {

  const params = useParams();
 
  const isClosed = course.status === "close";
  const isPending = course.status === "pending";
  const isOpen = course.status === "open";

  const courseLevel = useLevelStore((s) => s.levels);

  const [currentLevelCourse, setCurrentLevelCourse] = useState("");

  const router = useRouter();

  useEffect(() => {
    const currentLevel = courseLevel.find((l) => l._id === course.level);
    setCurrentLevelCourse(currentLevel?.name as string);
  }, [course]);

  return (
    <div
      className={`relative bg-white rounded-3xl  p-4 border transition-all duration-300 group
        ${isClosed ? "grayscale-[0.8] opacity-90 border-slate-200" : "border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1"}
        ${isPending ? "border-amber-200 shadow-amber-50" : ""}
      `}
    >
      {/* 1. Image & Overlay Status */}
      <div className="relative h-52 w-full rounded-3xl overflow-hidden mb-5">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className={`object-cover transition-transform duration-700 ${isOpen ? "group-hover:scale-105" : ""}`}
        />

        {/* Status Overlays */}
        {isClosed && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md mb-2">
              <CiLock size={24} />
            </div>
            <span className="text-xs font-black">المحتوى مقفل</span>
          </div>
        )}

        {isPending && (
          <div className="absolute inset-0 bg-amber-500/20 backdrop-blur-[1px] flex flex-col items-center justify-center text-amber-900">
            <div className="bg-amber-100/80 p-3 rounded-2xl backdrop-blur-md mb-2 animate-pulse">
              <FaHourglass size={24} />
            </div>
            <span className="text-xs font-black">قيد المراجعة</span>
          </div>
        )}

        {/* Level Badge (Top Right) */}
        <div
          className={`absolute top-3 right-3 px-4 py-1.5 rounded-xl text-[10px] font-black text-white shadow-lg
          ${isClosed ? "bg-slate-500" : isPending ? "bg-amber-500" : "bg-[#0066FF]"}
        `}
        >
          {currentLevelCourse || "عام"}
        </div>
      </div>

      {/* 2. Info Section */}
      <div className="px-1 text-right" dir="rtl">
        <h3
          className={`text-lg font-black mb-3 leading-tight transition-colors
          ${isClosed ? "text-slate-500" : "text-slate-900 group-hover:text-[#0066FF]"}
        `}
        >
          {course.title}
        </h3>

        
        {/* Pricing/Status Row */}
        <div className="flex items-center justify-start flex-row-reverse gap-3 mb-4">
          {isPending ? (
            <div className="text-sm font-bold px-3 py-1 rounded-lg bg-amber-100 text-amber-700">
              طلبك قيد التنفيذ
            </div>
          ) : (
            <>
              <span
                className={`text-2xl ml-auto font-black ${
                  isOpen ? "text-[#0066FF]" : "text-slate-700"
                }`}
              >
                {course.price - course.offer}
                <span className="text-xs text-slate-400 font-medium"> ج.م</span>
              </span>

              {course.offer > 0 && (
                <span className="text-sm text-slate-400 line-through">
                  {course.price} ج.م
                </span>
              )}
            </>
          )}
        </div>

        {/* 3. Action Button (Dynamic based on status) */}
        <div className="mt-4 pt-4 border-t border-slate-50">
          {isOpen ? (
            <Link
              href={`/lessons?course_id=${course._id}&teacher_id=${course.teacherId}`}
              className="w-full bg-[#0066FF] text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
            >
              <span>دخول الكورس</span>
              <FaPlayCircle size={18} />
            </Link>
          ) : isPending ? (
            <button
              disabled
              className="w-full bg-amber-50 text-amber-600 py-3 rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              <span>انتظر التفعيل</span>
              <FaHourglass size={18} className="animate-spin" />
            </button>
          ) : (
            <button
              onClick={() => {
                router.push(`/payment?q=${course._id}`);
              }}
              className="w-full bg-slate-900 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
            >
              <span> اشترك الان </span>
              <FaChevronLeft size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
