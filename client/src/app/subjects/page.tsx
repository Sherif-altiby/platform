"use client";

import SubHeader from "../../components/SubHeader";
import SubjectCard from "./SubjectCard";
import { SubjectTypes } from "@/types/Types";
import Spiner from "@/components/Spiner";
import { useQuery } from "@tanstack/react-query";
import { getSubjects } from "../utils/subjectFearuers";

const Page = () => {

  const {data: subjects, isLoading} = useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      const res = await getSubjects();
      return res.data as SubjectTypes[]
    }
  })

  return (
    <div className="ctm-height mb-10">
      <SubHeader currentTitle="المواد الدراسية" />
      <div className="container">
        {isLoading ? (
          <div className="flex items-center justify-center mt-5">
            <Spiner />
          </div>
        ) : (
          <div className="mt-10 mb-10 grid grid-flow-row xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-3">
            {subjects?.map((s) => (
              <SubjectCard
                link={`/subjects/sub-details?subId=${s._id}&subName=${s.name}`}
                key={s._id}
                name={s.name}
                length={s.teachers.length}
                avatar={s.image}
              />
            ))}

            {subjects?.length === 0 &&  ( <div className="text-center text-lg text-primary1" > لا يوجد مواد دراسية</div> )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
