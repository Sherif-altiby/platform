"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import SubHeader from "@/components/SubHeader";
import Spiner from "@/components/Spiner";
import { getSubjectDetails } from "@/app/utils/subjectFearuers";
import { FaArrowLeft, FaUserTie, FaGraduationCap } from "react-icons/fa6";

const SubjectPageContent = () => {
  const params = useSearchParams();
  const subName = params.get("subName") || "";
  const subId = params.get("subId");

  const {
    data: subject,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["subject-details", subId],
    queryFn: () => getSubjectDetails(subId as string),
    enabled: !!subId,
  });

  if (isLoading) return <div className="flex justify-center items-center h-[60vh]"><Spiner /></div>;

  if (isError || !subject) {
    return (
      <div className="text-center py-20 animate-pulse">
        <p className="text-red-500 font-bold">فشل في تحميل البيانات. يرجى المحاولة لاحقاً.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 min-h-screen font-kufi" dir="rtl">
      <SubHeader currentTitle={subName} />

      <div className="container mx-auto px-4 py-12">
        {/* --- Hero Section --- */}
        <div className="relative mb-16 flex flex-col items-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-400/10 blur-[100px] -z-10" />
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1.5 bg-white shadow-2xl border border-slate-100">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-50">
                {subject.image?.startsWith("http") ? (
                  <Image src={subject.image} alt={subject.name} fill className="object-cover" priority />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-300"><FaGraduationCap size={40} /></div>
                )}
              </div>
            </div>
          </div>

          <h2 className="mt-8 text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
            مادة {subject.name}
          </h2>
          
          <div className="mt-4 flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
            <FaUserTie className="text-blue-500 text-sm" />
            <span className="text-slate-600 font-bold text-sm">
              {subject.teachers?.length || 0} معلمين متميزين
            </span>
          </div>
        </div>

        {/* --- Grid Section --- */}
        {subject.teachers && subject.teachers.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {subject.teachers.map((t: any) => (
              <Link
                key={t._id}
                href={`/get-teachers/${t._id}?name=${t.name}`}
                className="group relative flex flex-col bg-white border border-slate-200/60 rounded-[2rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2"
              >
                {/* Visual Accent */}
                <div className="h-24 bg-slate-50 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-colors" />
                </div>

                {/* Teacher Avatar */}
                <div className="absolute top-8 right-6">
                  <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-md overflow-hidden bg-white group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    {t.avatar?.startsWith("http") ? (
                      <Image src={t.avatar} alt={t.name} width={80} height={80} className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold bg-indigo-50 text-indigo-400">
                        {t.name.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-8 pb-6 px-6 flex flex-col items-start gap-1">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">نخبة المعلمين</span>
                  <h3 className="text-slate-800 font-black text-xl mt-1">
                    أ/ {t.name}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-1">
                    خبير في تدريس منهج {subject.name} للثانوية العامة
                  </p>

                  <div className="mt-6 w-full flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-blue-600">
                      <span>عرض الصفحة</span>
                      <FaArrowLeft className="text-[10px] group-hover:-translate-x-2 transition-transform duration-300" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <FaArrowLeft className="text-[10px]" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
             <p className="text-slate-400 font-bold">لا يوجد معلمين متاحين حالياً لهذه المادة.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<div className="flex justify-center items-center h-[80vh]"><Spiner /></div>}>
    <SubjectPageContent />
  </Suspense>
);

export default Page;