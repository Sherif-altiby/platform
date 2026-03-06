"use client";

import { Suspense } from "react";
import SubHeader from "@/components/SubHeader";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { CiVideoOff } from "react-icons/ci";
import { PiNotepadThin } from "react-icons/pi";
import { CiSquareQuestion } from "react-icons/ci";
import SkeletonTeacherInfo from "../../../skeletons/SkeletonTeacherInfo";
import { useQuery } from "@tanstack/react-query";
import { getTeacherById } from "@/app/utils/teacherFeatuers";
import { TeacherTypes } from "@/types/Types";

function TeacherContent() {
  const { teacherId } = useParams();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const { data: teacher, isLoading } = useQuery({
    queryKey: ["teacher", teacherId],
    queryFn: async () => {
      const res = await getTeacherById(teacherId as string);
      return res.data as TeacherTypes;
    },
  });

  return (
    <div className="ctm-height bg-gray-50">
      <SubHeader currentTitle={`أ/ ${name}`} />

      <div className="container max-w-screen-lg mx-auto px-4 py-12">
        {isLoading ? (
          <SkeletonTeacherInfo />
        ) : (
          <>
            {/* Teacher Info Card */}
            <div className="relative max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden opacity-0 animate-fadeInUp">
              {/* Top gradient band */}
              <div className="h-28 bg-gradient-to-br from-indigo-600 via-blue-500 to-teal-400 relative">
                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10" />
                <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/10" />
              </div>

              <div className="px-8 pb-8">
                {/* Avatar overlapping band */}
                <div className="flex flex-col md:flex-row gap-6 -mt-14">
                  <div className="shrink-0">
                    <div className="w-28 h-28 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-indigo-100 rotate-2 hover:rotate-0 transition-transform duration-500">
                      {teacher?.avatar?.startsWith("http") ? (
                        <Image
                          src={teacher.avatar}
                          alt={`صورة ${teacher.name}`}
                          width={112}
                          height={112}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-indigo-400">
                          {name?.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name + subjects */}
                  <div className="pt-16 md:pt-4 flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-gray-900">أ/ {name}</h2>
                    <div className="flex flex-wrap gap-2">
                      {teacher?.subjects?.map((sub) => (
                        <span
                          key={sub._id}
                          className="text-xs font-medium bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-100"
                        >
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-100 my-6" />

                {/* About */}
                <p className="text-gray-600 text-base leading-relaxed text-right">
                  {teacher?.about}
                </p>
              </div>
            </div>

            {/* Action Cards */}
            <div className="max-w-3xl mx-auto mt-8 grid sm:grid-cols-3 gap-4">

              {/* Videos */}
              <Link
                href={`/get-teachers/videos?teacherName=${name}&teacherId=${teacherId}`}
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1 overflow-hidden opacity-0 animate-fadeInLeft"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl" />
                <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                    <CiVideoOff className="text-2xl text-indigo-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="font-bold text-gray-800 group-hover:text-white transition-colors duration-300">الدروس</p>
                  <p className="text-xs text-gray-400 group-hover:text-white/80 transition-colors duration-300">شاهد الفيديوهات التعليمية</p>
                </div>
              </Link>

              {/* Notes */}
              <Link
                href={`/get-teachers/notes?teacherName=${name}&teacherId=${teacherId}`}
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1 overflow-hidden opacity-0 animate-fadeInUp"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl" />
                <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                    <PiNotepadThin className="text-2xl text-amber-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="font-bold text-gray-800 group-hover:text-white transition-colors duration-300">المذكرات</p>
                  <p className="text-xs text-gray-400 group-hover:text-white/80 transition-colors duration-300">حمّل ملفات المراجعة</p>
                </div>
              </Link>

              {/* Quizzes */}
              <Link
                href={`/get-teachers/quizzes?teacherName=${name}&teacherId=${teacherId}`}
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1 overflow-hidden opacity-0 animate-fadeInRight"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl" />
                <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                    <CiSquareQuestion className="text-2xl text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="font-bold text-gray-800 group-hover:text-white transition-colors duration-300">الاختبارات</p>
                  <p className="text-xs text-gray-400 group-hover:text-white/80 transition-colors duration-300">اختبر مستواك الآن</p>
                </div>
              </Link>

            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64 text-gray-400">
        جارٍ تحميل الصفحة...
      </div>
    }>
      <TeacherContent />
    </Suspense>
  );
}