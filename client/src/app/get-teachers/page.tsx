"use client";

import React, { useEffect } from "react";
import SubHeader from "../../components/SubHeader";
import TeacherCard from "./TeacherCard";
import { useTeacherStore } from "@/store/teacherStore";
import TeacherSkeleton from "../../skeletons/TeacherSkeleton";
import Spiner from "@/components/Spiner";

const page = () => {
  const { teachers, getTeachers, isFetchingTeachers } = useTeacherStore();

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <div className="ctm-height">
      <SubHeader currentTitle="المدرسين" />
      <div className="container">
          {isFetchingTeachers ? (
            <div className="flex items-center justify-center mt-10"> <Spiner /> </div>
          ) : (
            <div className="mt-10 mb-10 grid grid-flow-row xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-3">
                {
                  teachers?.length ? teachers.map((teacher) => (
                    <TeacherCard key={teacher._id} teacher={teacher} />
                  )) : ( <div className="text-center text-lg text-primary1" > لا يوجد مدرسين </div> )
                }
            </div>
          )}
      </div>
    </div>
  );
};

export default page;
