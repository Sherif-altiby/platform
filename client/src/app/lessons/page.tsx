"use client";

import { Suspense } from "react";
import { getCourseLessons } from "@/app/utils/subjectFearuers";
import ContentNotFound from "@/components/common/ContentNotFound";
import SectionHeading from "@/components/common/SectionHeading";
import LessonCard from "@/components/course/LessonCard";
import Spiner from "@/components/Spiner";
import SubHeader from "@/components/SubHeader";
import { useLessonStore } from "@/store/LessonsStore";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { MdSlowMotionVideo } from "react-icons/md";

// 1. المكون الذي يحتوي على المنطق (Logic Component)
const LessonsList = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("course_id");
  const teacherId = searchParams.get("teacher_id");

  const setLessons = useLessonStore((state) => state.setLessons);

  const { data, isLoading } = useQuery({
    queryKey: ["lessons", courseId],
    queryFn: () => getCourseLessons(courseId as string),
    enabled: !!courseId, // لا يبدأ الجلب إلا عند توفر الـ ID
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setLessons(data);
    }
  }, [data, setLessons]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spiner />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.map((lesson: any) => (
          <LessonCard
            key={lesson._id}
            lesson={lesson}
            teacherId={teacherId as string}
          />
        ))}
      </div>
      {data?.length === 0 && <ContentNotFound text="لا يوجد دروس حتى الان" />}
    </>
  );
};

// 2. المكون الأساسي الذي سيتم تصديره (Main Page)
const LessonsPage = () => {
  return (
    <section className="ctm-height bg-gray-50 pb-20">
      <SubHeader currentTitle="دروس الدورة التدريبية" />
      
      <div className="container py-12">
        <SectionHeading
          title="محتوى الكورس"
          description="شاهد الدروس وابدأ التطبيق العملي"
          icon={MdSlowMotionVideo}
        />

        {/* تغليف المكون بـ Suspense لحل خطأ الـ Build */}
        <Suspense 
          fallback={
            <div className="flex items-center justify-center py-20">
              <Spiner />
            </div>
          }
        >
          <LessonsList />
        </Suspense>
      </div>
    </section>
  );
};

export default LessonsPage;