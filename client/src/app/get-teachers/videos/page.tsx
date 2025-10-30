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
    } catch {
      toast.error("حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (teacherId && user?.level) getVideos();
  }, [teacherId, user?.level]);

  return (
    <div className="ctm-height">
      <SubHeader currentTitle={`أ/ ${name}`} />
      <div className="container">
        <div className="mb-5">
          <h3 className="mt-5 mb-10 text-hoverLinkColor text-2xl">الدروس</h3>

          <div className="grid grid-flow-row xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
            {loading ? (
              <div className="flex items-center justify-center">
                <Spiner />
              </div>
            ) : videos.length > 0 ? (
              videos.map((v) => (
                <VideoCard
                  title={v.title}
                  teacherId={teacherId as string}
                  key={v._id}
                  videoId={v.link}
                  name=""
                />
              ))
            ) : (
              <div className="mt-5 text-xl">لا يوجد دروس حتى الآن</div>
            )}
          </div>
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
      <VideosPageContent />
    </Suspense>
  );
};

export default Page;
