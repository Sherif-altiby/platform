"use client";

import SubHeader from "../../components/SubHeader";
import TeacherCard from "./TeacherCard";
import Spiner from "@/components/Spiner";
import { useQuery } from "@tanstack/react-query";
import { getTeachers } from "../utils/teacherFeatuers";
import { TeacherTypes } from "@/types/Types";
import { FaChalkboardTeacher } from "react-icons/fa";
import SectionHeading from "@/components/common/SectionHeading";
import SectionNotfound from "@/components/common/SectionNotfound";
import TeacherSkeleton from "@/skeletons/TeacherSkeleton";

const Page = () => {
  const { data: teachers, isLoading } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const res = await getTeachers();
      return res.data as TeacherTypes[];
    },
  });

  return (
    <div className="ctm-height bg-gray-50">
      <SubHeader currentTitle="المدرسين" />

      <div className="container py-12">
        {/* Section heading */}
        <SectionHeading
          title="المدرسون"
          description="اختر مدرسك وابدأ رحلتك التعليمية"
          icon={FaChalkboardTeacher}
        />

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
           {  [1, 2, 3, 4].map((__, index) => <TeacherSkeleton key={index}/>)}
          </div>
        ) : teachers?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {teachers.map((teacher) => (
              <TeacherCard key={teacher._id} teacher={teacher} />
            ))}
          </div>
        ) : (
          <SectionNotfound
            icon={FaChalkboardTeacher}
            content="لا يوجد مدرسين حتى الآن"
          />
        )}
      </div>
    </div>
  );
};

export default Page;
