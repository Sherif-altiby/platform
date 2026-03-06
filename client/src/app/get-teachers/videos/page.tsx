"use client";

import SubHeader from "@/components/SubHeader";
import { useSearchParams } from "next/navigation";
import VideoCard from "./VideoCard";
import { useEffect, useState, Suspense } from "react";
import { Video } from "@/types/Types";
import { Axios } from "@/axios/Axios";
import { useAuthUser } from "@/store/authStore";
import Spiner from "@/components/Spiner";
import { toast } from "react-toastify";
import { CiVideoOff } from "react-icons/ci";

const VideosPageContent = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("teacherName");
  const teacherId = searchParams.get("teacherId");

  const { user } = useAuthUser();

  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);

  const getVideos = async () => {
    setLoading(true);
    try {
      const res = await Axios.post("user/get-video-by-level", {
        level: user?.level,
        teacherId,
      });
      setVideos(res.data.data);
    } catch (e) {
      toast.error("حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (teacherId && user?.level) getVideos();
  }, [teacherId, user?.level]);

  return (
    <div className="ctm-height bg-gray-50">
      <SubHeader currentTitle={`أ/ ${name}`} />

      <div className="container py-12">

        {/* Section heading */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
            <CiVideoOff className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">الدروس</h2>
            <p className="text-sm text-gray-400">دروس أ/ {name}</p>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Spiner />
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {videos.map((v) => (
              <VideoCard
                title={v.title}
                teacherId={teacherId as string}
                key={v._id}
                videoId={v.link}
                name=""
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
            <CiVideoOff className="text-5xl opacity-30" />
            <p className="text-lg">لا يوجد دروس حتى الآن</p>
          </div>
        )}
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
      <VideosPageContent />
    </Suspense>
  );
};

export default Page;