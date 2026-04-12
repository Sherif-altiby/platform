"use client";

import { getCourseLessons } from "@/app/utils/subjectFearuers";
import ContentNotFound from "@/components/common/ContentNotFound";
import SectionHeading from "@/components/common/SectionHeading";
import LessonCard from "@/components/course/LessonCard";
import Spiner from "@/components/Spiner";
import SubHeader from "@/components/SubHeader";
import { useLessonStore } from "@/store/LessonsStore";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { MdSlowMotionVideo } from "react-icons/md";

const page = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("course_id");
  const { teacherId } = useParams();

  const setLessons = useLessonStore((state) => state.setLessons);

  const { data, isLoading } = useQuery({
    queryKey: ["lessons", courseId],
    queryFn: () => getCourseLessons(courseId as string),

    retry: false,
  });

  useEffect(() => {
    if (data) {
      setLessons(data);
    }
  }, [data, setLessons]);

  return (
    <section className="ctm-height bg-gray-50">
      <SubHeader currentTitle="دروس الدورة التدريبية" />
      <div className="container py-12">
        {/* Section Heading */}
        <SectionHeading
          title="محتوى الكورس"
          description="شاهد الدروس وابدأ التطبيق العملي"
          icon={MdSlowMotionVideo}
        />

        {isLoading ? (
          <div className="flex  flex-center justify-center" > <Spiner /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.map((lesson: any) => (
              <LessonCard key={lesson._id} lesson={lesson} teacherId={teacherId as string}/>
            ))}
          </div>
        )}

        {data?.length === 0 && <ContentNotFound text="لا يوجد دروس حتى الان" />}
      </div>
    </section>
  );
};

export default page;
