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
            <div className="relative max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden opacity-0 animate-fadeInUp">

              <TeacherCardGradient />

              <div className="px-8 pb-8">
                  <TeacherAboutAvatar avatar={teacher?.avatar || ""} name={teacher?.name || ""} subjects={teacher?.subjects || []} />

                <div className="w-full h-px bg-gray-100 my-6" />

                <p className="text-gray-600 text-base leading-relaxed text-right">
                  {teacher?.about}
                </p>
              </div>
            </div>

            <TeacherAboutLink teacherId={teacherId as string} />
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