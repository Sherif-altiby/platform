"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import SubHeader from "@/components/SubHeader";
import Spiner from "@/components/Spiner";
import { getSubjectDetails } from "@/app/utils/subjectFearuers";
import { FaUserTie, FaGraduationCap } from "react-icons/fa6";
import TeacherCard from "@/app/get-teachers/TeacherCard";
import CourseCard from "@/components/course/CourseCard";
import CourseSkeleton from "@/skeletons/CourseSkeleton";

const SubjectPageContent = () => {
  const params = useSearchParams();
  const subName = params.get("subName") || "";
  const subId = params.get("subId");

  const {
    data: courses,
    isLoading,
  } = useQuery({
    queryKey: ["subject-details", subId],
    queryFn: () => getSubjectDetails(subId as string),
    enabled: !!subId,
  });

   

  return (
    <div className="bg-slate-50/50 min-h-screen font-kufi" dir="rtl">
      <SubHeader currentTitle={subName} />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading  ? [1, 2, 3, 4].map((__, index) => (
             <CourseSkeleton key={index} />
          )) : (courses.map((course: any) => (
            <CourseCard course={course}  key={course._id}/>
          )))}
         </div>
      </div>
    </div>
  );
};

const Page = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center h-[80vh]">
        <Spiner />
      </div>
    }
  >
    <SubjectPageContent />
  </Suspense>
);

export default Page;
