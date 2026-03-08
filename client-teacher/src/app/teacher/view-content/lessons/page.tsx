"use client";

import { Axios } from "@/axios/Axios";
import Spiner from "@/components/Spiner";
import { useAuthUser } from "@/store/authStore";
import { Video } from "@/types/Types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { CiVideoOff } from "react-icons/ci";
import { toast } from "react-toastify";
import EditLesson from "./EditLesson";

const Page = () => {
  const params = useSearchParams();
  const level = params.get("level");

  const levelText =
    level === "first" ? "الأول" : level === "second" ? "الثاني" : "الثالث";

  const { user, checkUser } = useAuthUser();

  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [video, setVideo] = useState<Video>();
  const [showDeletCard, setShowDeleteCard] = useState(false);
  const [videoId, setVideoID] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      await checkUser();
      try {
        const res = await Axios.post("user/get-video-by-level", {
          level,
          teacherId: user?._id,
        });
        setVideos(res.data.data);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchInitial();
  }, [user?._id, level]);

  const fetchData = async () => {
    if (!user?._id || !level) return;
    setLoading(true);
    await checkUser();
    try {
      const res = await Axios.post("user/get-video-by-level", {
        level,
        teacherId: user._id,
      });
      setVideos(res.data.data);
    } catch {
      toast.error("حدث خطأ");
    } finally {
      setLoading(false);
      setIsDeleting(false);
    }
  };

  const deleteLessson = async (videoId: string) => {
    setIsDeleting(true);
    const res = await Axios.delete("teacher/delete-video", { data: { videoId } });
    await fetchData();
    setShowDeleteCard(false);
    toast.success(res.data.message);
  };

  const updateLessonFn = async (video: Video) => {
    try {
      const res = await Axios.put("teacher/update-video", video);
      await fetchData();
      toast.success(res.data.message);
      setShowEdit(false);
    } catch {
      toast.error("حاول مرة أخرى!");
    }
  };

  return (
    <div>
      {/* Heading */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
          <CiVideoOff className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">دروس الصف {levelText} الثانوي</h1>
          <p className="text-sm text-gray-400">{videos.length} درس مضاف</p>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Spiner />
        </div>
      ) : videos.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <div key={v._id} className="group bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
              {/* Top */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                  <CiVideoOff className="text-indigo-500 text-lg" />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => { setVideo(v); setShowEdit(true); }}
                    className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                  >
                    <CiEdit className="text-lg" />
                  </button>
                  <button
                    onClick={() => { setVideoID(v._id); setShowDeleteCard(true); }}
                    className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                  >
                    <AiOutlineDelete className="text-lg" />
                  </button>
                </div>
              </div>

              <h2 className="text-sm font-bold text-gray-800 mb-1 line-clamp-1">{v.title}</h2>
              <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{v.description}</p>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs font-medium bg-indigo-50 text-indigo-500 px-3 py-1 rounded-full">
                  الصف {levelText}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
          <CiVideoOff className="text-5xl opacity-30" />
          <p className="text-lg">لا يوجد دروس حتى الآن</p>
        </div>
      )}

      {/* Delete Modal */}
      {showDeletCard && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-[90%] max-w-sm text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
              <AiOutlineDelete className="text-red-500 text-2xl" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">حذف الدرس</h2>
            <p className="text-sm text-gray-400 mb-6">هل أنت متأكد من حذف هذا الدرس؟ لا يمكن التراجع.</p>
            <div className="flex gap-3">
              <button
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
                onClick={() => deleteLessson(videoId)}
                disabled={isDeleting}
              >
                {isDeleting ? "جاري الحذف..." : "نعم، احذف"}
              </button>
              <button
                className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-colors duration-200"
                onClick={() => setShowDeleteCard(false)}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {showEdit && video && (
        <EditLesson video={video} closeEdit={setShowEdit} updateLessonFn={updateLessonFn} />
      )}
    </div>
  );
};

export default Page;