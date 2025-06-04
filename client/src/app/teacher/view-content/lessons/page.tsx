"use client";

import { Axios } from "@/axios/Axios";
import Spiner from "@/components/Spiner";
import { useAuthUser } from "@/store/authStore";
import { Video } from "@/types/Types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-toastify";
import EditLesson from "./EditLesson";

const Page = () => {
  const params = useSearchParams();
  const level = params.get("level");

  const levelText =
    level === "first" ? "الاول" : level === "second" ? "الثاني" : "الثالث";

  const { user, checkUser } = useAuthUser();

  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [video, setVideo] = useState<Video>();

  const [showDeletCard, setShowDeleteCard] = useState(false);
  const [videoId, setVideoID] = useState("");

  const [showEdit, setShowEdit] = useState(false)

  useEffect(() => {
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
      } catch (error) {
        error &&  toast.error("حدث خطأ")
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?._id, level]);

  const deleteLessson = async (videoId: string) => {
    setIsDeleting(true);
    const res = await Axios.delete("teacher/delete-video", {
      data: {
        videoId,
      },
    });

    await fetchData();
    setShowDeleteCard(false);
    toast.success(res.data.message);
  };

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
      } catch (error) {
       error &&  toast.error("حدث خطأ")
      } finally {
        setLoading(false);
        setIsDeleting(false);
      }
    };

  const updateLessonFn = async (video: Video) => {
       try {
         const res = await Axios.put('teacher/update-video', video)

         await fetchData()
         toast.success(res.data.message)
         setShowEdit(false)
       } catch (error) {
        error && toast.error("حاول مرة اخري !!")
       }
  }

  return (
    <div className="">
      <h1 className="text-2xl text-primary1 mb-6">
        دروس الصف {levelText} الثانوي
      </h1>

      {/* Video Card */}
      {loading ? (
        <div className="flex items-center justify-center">
          <Spiner />
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-white border rounded-lg shadow-md p-4"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {video.title}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                الصف: <span className="font-medium text-gray-700"> {levelText} </span>
              </p>
              <p className="text-sm text-gray-400 mb-2 truncate">
                {video.description}
              </p>

              <div className="flex gap-3 justify-end">
                <button
                onClick={() => {
                  setVideo(video)
                  setShowEdit(true)
                }}
                >
                  <CiEdit
                    className="text-xl text-gray-600 hover:text-green-600 cursor-pointer"
                    title="تعديل الاختبار"
                  />
                </button>
                <button
                  onClick={() => {
                    setVideoID(video._id);
                    setShowDeleteCard(true);
                  }}
                >
                  <AiOutlineDelete
                    className="text-xl text-gray-600 hover:text-red-600 cursor-pointer"
                    title="حذف الاختبار"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDeletCard && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md text-center relative">
            {/* Optional Close Button in Top-Left */}
            <button
              onClick={() => setShowDeleteCard(false)}
              className="absolute top-3 left-3 text-gray-500 hover:text-gray-700 transition"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-red-600 mb-4">
              هل أنت متأكد من حذف الدرس؟
            </h2>

            <p className="text-gray-700 mb-6 truncate">
              {/* يمكن عرض اسم الدرس هنا */}
            </p>

            <div className="flex justify-center gap-4">
              <button
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => deleteLessson(videoId)}
                disabled={isDeleting} // optional state
              >
                {isDeleting ? "جاري الحذف..." : "نعم، حذف"}
              </button>
              <button
                className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
                onClick={() => setShowDeleteCard(false)}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
      {(showEdit && video) && <EditLesson video={video} closeEdit={setShowEdit} updateLessonFn={updateLessonFn}/>}
    </div>
  );
};

export default Page;
