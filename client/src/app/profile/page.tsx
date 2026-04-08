"use client";

import LatestLesson from "@/components/latest-viewd/LatestLesson";
import LatestNote from "@/components/latest-viewd/LatestNote";
import LatestQuiz from "@/components/latest-viewd/LatestQuiz";
import { useQuery } from "@tanstack/react-query";
import { FaPlayCircle, FaUserSlash } from "react-icons/fa";
import { FaArrowRight, FaChevronLeft, FaClipboardCheck } from "react-icons/fa6";
import { PiFileText } from "react-icons/pi";
import {
  getNoteWatchHistoryApi,
  getWatchHistoryApi,
  getWatchQuizzesHistoryApi,
} from "../utils/watchListFeatures";
import LatestLessonSkeleton from "@/skeletons/LatestLessonSkeleton";
import ProfileWelcom from "@/components/profile/ProfileWelcom";
import LatestQuizSkeleton from "@/skeletons/LatestQuizSkeleton";
import LatestNoteSkeleton from "@/skeletons/LatestNoteSkeleton";

const ProfilePage = () => {
  const subscribedTeachers = [
    {
      id: 1,
      name: "د. أحمد زويل",
      subject: "كيمياء",
      image: "https://ui-avatars.com/api/?name=AZ&background=0D8ABC&color=fff",
    },
    {
      id: 2,
      name: "مستر محمد علي",
      subject: "فيزياء",
      image: "https://ui-avatars.com/api/?name=MA&background=6366f1&color=fff",
    },
  ];

  const { data: watchedList, isLoading: isWatchedListLoading } = useQuery({
    queryKey: ["latest-watched"],
    queryFn: getWatchHistoryApi,
  });

  const { data: watchedQuizzesList, isLoading: isWatchedQuizzesListLoading } =
    useQuery({
      queryKey: ["latest-quizzes"],
      queryFn: getWatchQuizzesHistoryApi,
    });

  const { data: watchedNotesList, isLoading: isWatchedNotesListLoading } =
    useQuery({
      queryKey: ["latest-notes"],
      queryFn: getNoteWatchHistoryApi,
    });

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        <ProfileWelcom />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <FaPlayCircle className="text-indigo-600" /> آخر الدروس
                  المشاهدة
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {isWatchedListLoading
                  ? [1, 2, 3].map((__, index) => (
                      <LatestLessonSkeleton key={index} />
                    ))
                  : watchedList.map((lesson: any) => (
                      <LatestLesson lesson={lesson} key={lesson._id} />
                    ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <FaClipboardCheck className="text-emerald-600" /> نتائج
                  الاختبارات الأخيرة
                </h2>
              </div>
              <div className="">
                {isWatchedQuizzesListLoading
                  ? [1, 2, 3].map((__, index) => (
                      <LatestQuizSkeleton key={index} />
                    ))
                  : watchedQuizzesList.map((quiz: any) => (
                      <LatestQuiz quiz={quiz} key={quiz._id} />
                    ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <PiFileText className="text-orange-500" /> أحدث المذكرات
              </h2>
              <div className="space-y-3">
                {isWatchedNotesListLoading
                  ? [1, 2, 3].map((__, index) => (
                      <LatestNoteSkeleton key={index} />
                    ))
                  : watchedNotesList.map((note: any) => (
                      <LatestNote note={note} key={note._id} />
                    ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <FaUserSlash className="text-blue-600" /> معلميك المشترك معهم
              </h2>
              <div className="bg-white p-5 rounded-3xl border border-slate-100 space-y-4">
                {subscribedTeachers.map((teacher) => (
                  <div
                    key={teacher.id}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {teacher.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold">
                          {teacher.subject}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                      <FaChevronLeft size={20} />
                    </button>
                  </div>
                ))}
                <button className="w-full py-3 bg-slate-50 text-slate-500 rounded-xl text-xs font-black hover:bg-slate-100 transition-all">
                  عرض جميع المدرسين
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
