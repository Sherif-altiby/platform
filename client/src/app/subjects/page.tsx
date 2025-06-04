"use client";

import { useEffect, useState } from "react";
import SubHeader from "../../components/SubHeader";
import SubjectCard from "./SubjectCard";
import { SubjectTypes } from "@/types/Types";
import { Axios } from "@/axios/Axios";
import Spiner from "@/components/Spiner";
import { toast } from "react-toastify";

const Page = () => {
  const [subjects, setSubjects] = useState<SubjectTypes[]>([]);
  const [loading, setLoading] = useState(false);

  const getSubjects = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(`user/get-subjects`);

      setSubjects(res.data.data);
    } catch (error) {
      error &&  toast.error("حدث خطأ")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <div className="ctm-height mb-10">
      <SubHeader currentTitle="المواد الدراسية" />
      <div className="container">
        {loading ? (
          <div className="flex items-center justify-center mt-5">
            <Spiner />
          </div>
        ) : (
          <div className="mt-10 mb-10 grid grid-flow-row xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-3">
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
        )}
      </div>
    </div>
  );
};

export default Page;
