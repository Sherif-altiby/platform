"use client";

import React from "react";
import SubHeader from "../../components/SubHeader";
import TeacherCard from "./TeacherCard";
import Spiner from "@/components/Spiner";
import { useQuery } from "@tanstack/react-query";
import { getTeachers } from "../utils/teacherFeatuers";
import { TeacherTypes } from "@/types/Types";
import { FaChalkboardTeacher } from "react-icons/fa";

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
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
            <FaChalkboardTeacher className="text-white text-lg" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">المدرسون</h2>
            <p className="text-sm text-gray-400">اختر مدرسك وابدأ رحلتك التعليمية</p>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Spiner />
          </div>
        ) : teachers?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {teachers.map((teacher) => (
              <TeacherCard key={teacher._id} teacher={teacher} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
            <FaChalkboardTeacher className="text-5xl opacity-30" />
            <p className="text-lg">لا يوجد مدرسين حتى الآن</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;