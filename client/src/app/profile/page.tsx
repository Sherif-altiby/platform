"use client";

import LatestLesson from "@/components/latest-viewd/LatestLesson";
import LatestNote from "@/components/latest-viewd/LatestNote";
import LatestQuiz from "@/components/latest-viewd/LatestQuiz";
import { useQuery } from "@tanstack/react-query";
import { FaPlayCircle, FaUserSlash } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa6";
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
import Link from "next/link";
import { getTeachers } from "../utils/teacherFeatuers";
import LatestTeacher from "@/components/latest-viewd/LatestTeacher";
import LatestTeacherSkeleton from "@/skeletons/LatestTeacherSkeleton";
import { TeacherTypes } from "@/types/Types";
import ContentNotFound from "@/components/common/ContentNotFound";

const ProfilePage = () => {
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

  const { data: teachers, isLoading: isLoadingTeachers } = useQuery({
    queryKey: ["teachers-latest"],
    queryFn: async () => {
      const res = await getTeachers();
      return res.data as TeacherTypes[];
    },
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
                {isWatchedListLoading ? (
                  [1, 2, 3].map((__, index) => (
                    <LatestLessonSkeleton key={index} />
                  ))
                ) : (
                  <>
                    {watchedList?.map((lesson: any) => (
                      <LatestLesson lesson={lesson} key={lesson._id} />
                    ))}
                    {(!watchedList || watchedList.length === 0) && (
                      <ContentNotFound text="لا يوجد دروس" />
                    )}
                  </>
                )}
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
                {isWatchedQuizzesListLoading ? (
                  [1, 2, 3].map((__, index) => (
                    <LatestQuizSkeleton key={index} />
                  ))
                ) : (
                  <>
                    {watchedQuizzesList?.map((quiz: any) => (
                      <LatestQuiz quiz={quiz} key={quiz._id} />
                    ))}
                    {(!watchedQuizzesList ||
                      watchedQuizzesList.length === 0) && (
                      <ContentNotFound text="لا يوجد اختبارات" />
                    )}
                  </>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <PiFileText className="text-orange-500" /> أحدث المذكرات
              </h2>
              <div className="space-y-3">
                {isWatchedNotesListLoading ? (
                  [1, 2, 3].map((__, index) => (
                    <LatestNoteSkeleton key={index} />
                  ))
                ) : (
                  <>
                    {watchedNotesList?.map((note: any) => (
                      <LatestNote note={note} key={note._id} />
                    ))}

                    {/* التعديل هنا: التحقق من طول المصفوفة */}
                    {(!watchedNotesList || watchedNotesList.length === 0) && (
                      <ContentNotFound text="لا يوجد مذكرات" />
                    )}
                  </>
                )}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <FaUserSlash className="text-blue-600" /> معلميك المشترك معهم
              </h2>
              <div className="">
                {isLoadingTeachers
                  ? [1, 2, 3].map((__, index) => (
                      <LatestTeacherSkeleton key={index} />
                    ))
                  : teachers?.map(
                      (teacher: any, index) =>
                        index < 2 && (
                          <LatestTeacher teacher={teacher} key={teacher._id} />
                        ),
                    )}

                <Link
                  href={"/get-teachers"}
                  className="w-full flex item-center justify-center py-4 bg-slate-100 text-slate-500 rounded-lg text-xs font-black hover:bg-slate-100 transition-all"
                >
                  عرض جميع المدرسين
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
