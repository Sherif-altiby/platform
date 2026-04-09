"use client";
import SubjectCard from "@/app/subjects/SubjectCard";
import { getTeacherSubjects } from "@/app/utils/subjectFearuers";
import SectionHeading from "@/components/common/SectionHeading";
import Spiner from "@/components/Spiner";
import SubHeader from "@/components/SubHeader";
import SubjectSkeleton from "@/skeletons/SubjectSkeleton";
import { SubjectTypes } from "@/types/Types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { PiBookOpenTextLight } from "react-icons/pi";

const page = () => {
  const params = useParams();
  const teacherId = params?.teacherId as string;

  const { data, isLoading } = useQuery({
    queryKey: ["teacher-subjects"],
    queryFn: () => getTeacherSubjects(teacherId),
  });

  return (
    <div className="ctm-height bg-gray-50">
      <SubHeader currentTitle="المواد الدراسية" />

      <div className="container py-12">
        <SectionHeading
          title="المواد الدراسية"
          description="اختر المادة لعرض المدرسين المتاحين"
          icon={PiBookOpenTextLight}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-5">
          {isLoading
            ? [1, 2, 3, 4].map((__, index) => <SubjectSkeleton key={index}/>)
            : data.map((sub: SubjectTypes) => (
                <SubjectCard
                  key={sub._id}
                  link={`subjects/${sub._id}`}
                  name={sub.name}
                  avatar={sub.image}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default page;
