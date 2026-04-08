"use client";

import { MdSlowMotionVideo } from "react-icons/md";
import SubHeader from "@/components/SubHeader";
import { useLessonStore } from "@/store/LessonsStore";
import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import SectionHeading from "@/components/common/SectionHeading";
import { FaBars, FaPlay, FaArrowLeft } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // New
import { updateWatchHistoryApi } from "@/app/utils/watchListFeatures";
import { useAuthUser } from "@/store/authStore";

const getEmbedUrl = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&modestbranding=1&rel=0`
    : null;
};

export default function LessonPage() {
  const params = useParams();
  const id = params.id as string;

  const searchParams = useSearchParams();
  const teacherId = searchParams.get("teacherId");

  const router = useRouter();
  const queryClient = useQueryClient();

  const lessons = useLessonStore((state) => state.lessons);
  const user = useAuthUser(s => s.user)

  const currentLesson = useMemo(() => 
    lessons?.find((lesson) => lesson._id === id), 
  [id, lessons]);

  const [embedUrl, setEmbedUrl] = useState<string | null>(null);

  const { mutate: updateHistory } = useMutation({
    mutationFn:  updateWatchHistoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latest-watched"] });
    }
  });

  useEffect(() => {
    if (currentLesson) {
      setEmbedUrl(getEmbedUrl(currentLesson.videoUrl));
      
      updateHistory({
        userId: user?._id || "",
        lessonId: currentLesson._id,
        courseId: currentLesson.course,
        teacherId: teacherId || ""
      });
    }
  }, [currentLesson, updateHistory]);
  

  return (
    <main className="ctm-height bg-gray-50 flex flex-col font-kufi" dir="rtl">
      <SubHeader currentTitle={currentLesson?.title || "جاري التحميل..."} />
      
      <div className="flex-1 w-full max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 py-8 grid grid-cols-1 xl:grid-cols-[1fr,400px] gap-8">
        
        {/* Video Section */}
        <section className="flex flex-col gap-6">
          <div className="bg-white p-2 rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-900 shadow-inner">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={currentLesson?.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gray-900 text-red-300">
                  <MdSlowMotionVideo className="text-6xl mb-4 opacity-20" />
                  <p className="text-sm font-bold">جاري التحميل...</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="px-4">
            <h1 className="text-2xl font-black text-slate-800">{currentLesson?.title}</h1>
            <p className="text-slate-500 mt-2 leading-relaxed">{currentLesson?.description}</p>
          </div>
        </section>

        {/* Sidebar Content */}
        <aside className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 xl:sticky xl:top-24 h-[calc(100vh-150px)] flex flex-col">
          <SectionHeading 
            title="محتوى الدورة" 
            description="جميع حصص المنهج" 
            icon={FaBars}
          />

          <div className="flex flex-col gap-3 mt-6 overflow-y-auto custom-scrollbar pr-2">
            {lessons?.map((lesson, index) => {
              const isActive = lesson._id === id;
              return (
                <button
                  key={lesson._id}
                  onClick={() => router.push(`/watch/${lesson._id}`)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-right ${
                    isActive 
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-md" 
                      : "bg-white border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/50 text-gray-700"
                  }`}
                >
                  <div className={`size-10 shrink-0 rounded-xl flex items-center justify-center font-black text-sm ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <span className={`text-sm font-bold truncate ${isActive ? 'text-white' : 'text-slate-800'}`}>
                      {lesson.title}
                    </span>
                    <span className={`text-[10px] mt-1 ${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>
                      مشاهدة الآن
                    </span>
                  </div>

                  {isActive ? (
                    <FaPlay className="text-white text-xs animate-pulse" />
                  ) : (
                    <FaArrowLeft className="text-slate-300 text-xs" />
                  )}
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </main>
  );
}