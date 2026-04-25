"use client";

import Link from "next/link";
import { HiOutlineAcademicCap, HiOutlineArrowLeft } from "react-icons/hi";
import Image from "next/image";
import { useTeacherStore } from "@/store/teacherStore";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTeachers } from "@/app/utils/teacherFeatuers";
import TeacherCard from "@/app/get-teachers/TeacherCard";

const TeachersSection = () => {
  const { setTeacher, teachers } = useTeacherStore();

  const { data } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });

  useEffect(() => {
    if (data?.data) {
      setTeacher(data.data);
    }
  }, [data, setTeacher]);

  return (
    <section className="py-14 bg-white relative overflow-hidden">
   
      <div className="container mx-auto px-6">
        {/* رأس القسم (Header) */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-20 gap-8 text-center md:text-right">
          
          

          <div className="flex flex-col items-center md:items-end order-1 md:order-2 mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mx-auto rounded-full bg-orange-50 text-orange-600 text-xs font-black uppercase tracking-widest mb-4 border border-orange-100">
              <HiOutlineAcademicCap className="text-lg" />
              <span>نخبة الخبراء</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              تعلم على يد <span className="text-blue-600 relative">الأفضل
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="#2563eb" strokeWidth="4" fill="none" /></svg>
              </span>
            </h2>
          </div>
        </div>

        {/* شبكة المعلمين (Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {teachers.map((teacher) => (
             <TeacherCard teacher={teacher}  key={teacher._id}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeachersSection;