"use client";

import { Suspense } from "react";
import SubHeader from "@/components/SubHeader";
import { useParams, useSearchParams } from "next/navigation";
import SkeletonTeacherInfo from "../../../skeletons/SkeletonTeacherInfo";
import { useQuery } from "@tanstack/react-query";
import { getTeacherById } from "@/app/utils/teacherFeatuers";
import { TeacherTypes } from "@/types/Types";
import TeacherCardGradient from "@/components/teacher/TeacherCardGradient";
import TeacherAboutAvatar from "@/components/teacher/TeacherAboutAvatar";
import TeacherAboutLink from "@/components/teacher/TeacherAboutLink";
import TeacherRatingSystem from "@/components/teacher/TeacherRating";
import { useAuthUser } from "@/store/authStore";

function TeacherContent() {
  const { teacherId } = useParams();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const user = useAuthUser((s) => s.user);

  const { data: teacher, isLoading } = useQuery({
    queryKey: ["teacher", teacherId],
    queryFn: async () => {
      const res = await getTeacherById(teacherId as string);
      return res.data as TeacherTypes;
    },
  });

  return (
    <div className="ctm-height bg-[#f8fafc] pb-20">
      {/* 1. رأس الصفحة الهادئ */}
      <SubHeader currentTitle={`أ/ ${name}`} />

      <div className="container max-w-screen-lg mx-auto px-4">
        {isLoading ? (
          <div className="mt-12">
            <SkeletonTeacherInfo />
          </div>
        ) : (
          <div className="animate-in fade-in duration-1000 slide-in-from-bottom-6">
            
            {/* 2. البطاقة التعريفية الرئيسية (The Profile Core) */}
            <div className="relative max-w-4xl mx-auto bg-white rounded-[3rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden mt-12 transition-all hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.08)]">
              
              {/* التدرج اللوني العلوي المصمم سابقاً */}
              <TeacherCardGradient />

              <div className="px-6 md:px-12 pb-12">
                {/* مكون الأفاتار المطور */}
                <TeacherAboutAvatar 
                  avatar={teacher?.avatar || ""} 
                  name={teacher?.name || ""} 
                  subjects={teacher?.subjects || []} 
                />

                {/* فاصل جمالي رفيع */}
                <div className="relative w-full h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent my-10" />

                {/* قسم السيرة الذاتية (Bio Section) */}
                <div className="max-w-2xl">
                  <h5 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-right">
                    نبذة عن المعلم
                  </h5>
                  <p className="text-slate-600 text-lg leading-[1.8] text-right font-medium">
                    {teacher?.about || "لا يوجد وصف متاح حالياً."}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. شبكة الروابط السريعة (Bento Grid Style) */}
            <div className="mt-12">
               <TeacherAboutLink 
                  teacherId={teacherId as string} 
                  name={name || ""} 
                  level={user?.level || ""}
               />
            </div>

            {/* 4. نظام التقييم (Feedback Center) */}
            <div className="mt-8">
               <TeacherRatingSystem teacherId={teacherId as string} />
            </div>

             

          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-slate-50">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 font-bold text-sm animate-pulse tracking-widest uppercase">
            جاري تحضير الصفحة...
          </p>
        </div>
      }
    >
      <TeacherContent />
    </Suspense>
  );
}