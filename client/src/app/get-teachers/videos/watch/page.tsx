"use client";

import SubHeader from "@/components/SubHeader";
import VideoPlayer from "@/components/VideoPlayer";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Spiner from "@/components/Spiner";

const VideoPageContent = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("teacherName");
  const videoId = searchParams.get("videoId");

  return (
    <div className="ctm-height">
      <SubHeader currentTitle={`أ/ ${name}`} />
      <div className="container">
        <div className="w-full max-w-[800px] h-[500px] mx-auto mt-10 mb-20 rounded-md overflow-hidden">
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
