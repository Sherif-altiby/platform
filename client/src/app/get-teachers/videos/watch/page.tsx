"use client";

import SubHeader from "@/components/SubHeader";
import VideoPlayer from "@/components/VideoPlayer";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Spiner from "@/components/Spiner";
import { CiVideoOff } from "react-icons/ci";

const VideoPageContent = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("teacherName");
  const videoId = searchParams.get("videoId");
  const title = searchParams.get("title");

  return (
    <div className="ctm-height bg-gray-50">
      <SubHeader currentTitle={`أ/ ${name}`} />

      <div className="container py-12">

        {/* Section heading */}
        <div className="flex items-center gap-3 mb-8 max-w-[860px] mx-auto">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shrink-0">
            <CiVideoOff className="text-white text-lg" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{title || "مشاهدة الدرس"}</h2>
            <p className="text-sm text-gray-400">أ/ {name}</p>
          </div>
        </div>

        {/* Player card */}
        <div className="w-full max-w-[860px] mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-4 mb-12">
          <VideoPlayer videoId={videoId || ""} />
        </div>

      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-[80vh]">
          <Spiner />
        </div>
      }
    >
      <VideoPageContent />
    </Suspense>
  );
};

export default Page;