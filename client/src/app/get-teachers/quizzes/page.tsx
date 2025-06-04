"use client";

import SubHeader from "@/components/SubHeader";
import { useSearchParams } from "next/navigation";
import { Axios } from "@/axios/Axios";
import { useEffect, useState } from "react";
import { Quize } from "@/types/Types";
import { useAuthUser } from "@/store/authStore";
import Quiz from "./Quiz";
import Spiner from "@/components/Spiner";

const Pages = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("teacherName");
  const teacherId = searchParams.get("teacherId");

  const { user, checkUser } = useAuthUser();

  const [quizzes, setQuizzes] = useState<Quize[]>([]);
  const [loading, setLoading] = useState(false);

  const getNotes = async () => {
    setLoading(true);

    await checkUser();

    try {
      const res = await Axios.post("teacher/get-quiz-by-level", {
        teacherId,
        level: user?.level,
      });

      setQuizzes(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="ctm-height">
      <SubHeader currentTitle={`أ/ ${name}`} />
      <div className="container">
        <h3 className="mt-5 mb-10 text-hoverLinkColor text-2xl">الاختبارات</h3>

        {loading ? (
          <div className="flex items-center justify-center">
            <Spiner />
          </div>
        ) : quizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-3 mb-3 relative">
            {quizzes.map((quiz) => (
              <Quiz name={quiz.title} quizId={quiz._id} key={quiz._id} />
            ))}
          </div>
        ) : (
          <div className=" mt-5 text-xl"> لا يوجد الاختبارات حتى الان </div>
        )}
      </div>
    </div>
  );
};

export default Pages;
