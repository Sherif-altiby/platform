"use client";

import SubHeader from "../../components/SubHeader";
import SubjectCard from "./SubjectCard";
import { SubjectTypes } from "@/types/Types";
import Spiner from "@/components/Spiner";
import { useQuery } from "@tanstack/react-query";
import { getSubjects } from "../utils/subjectFearuers";
import { PiBookOpenTextLight } from "react-icons/pi";

const Page = () => {
  const { data: subjects, isLoading } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const res = await getSubjects();
      return res.data as SubjectTypes[];
    },
  });

  return (
    <div className="ctm-height bg-gray-50">
      <SubHeader currentTitle="المواد الدراسية" />

      <div className="container py-12">

        {/* Section heading */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
            <PiBookOpenTextLight className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">المواد الدراسية</h2>
            <p className="text-sm text-gray-400">اختر المادة لعرض المدرسين المتاحين</p>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Spiner />
          </div>
        ) : subjects?.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {subjects.map((s) => (
              <SubjectCard
                link={`/subjects/sub-details?subId=${s._id}&subName=${s.name}`}
                key={s._id}
                name={s.name}
                length={s.teachers.length}
                avatar={s.image}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
            <PiBookOpenTextLight className="text-5xl opacity-30" />
            <p className="text-lg">لا يوجد مواد دراسية</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;