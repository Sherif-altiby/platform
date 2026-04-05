"use client";

import { getSubjectCourses } from "@/app/utils/subjectFearuers";
import ContentNotFound from "@/components/common/ContentNotFound";
import SectionHeading from "@/components/common/SectionHeading";
import CourseCard from "@/components/course/CourseCard";
import Spiner from "@/components/Spiner";
import SubHeader from "@/components/SubHeader";
import { Course } from "@/types/Types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { PiGraduationCapLight } from "react-icons/pi";

const CoursesSection = () => {
  const params = useParams();
  const teacherId = params?.teacherId as string;
  const subjectId = params?.subId as string;

  const { data, isLoading } = useQuery({
    queryKey: ["teacher-subject-course"],
    queryFn: () => getSubjectCourses(teacherId, subjectId),
  });

  return (
    <section className="ctm-height bg-gray-50">
      <SubHeader currentTitle="الكورسات المتاحة" />
      <div className="container py-12 ">
        {/* Section Heading */}

        <SectionHeading
          title="الكورسات المتاحة"
          description="ابدأ رحلة التعلم مع أفضل المدرسين"
          icon={PiGraduationCapLight}
        />

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Spiner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data?.length > 0 ? (
              data.map((course: Course) => (
                <CourseCard course={course} key={course._id} />
              ))
            ) : (
               <ContentNotFound text="لا يوجد كورسات حاليا" />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
