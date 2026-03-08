"use client";
import { Video } from "@/types/Types";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

interface EditLessonProps {
  video: Video;
  closeEdit: Dispatch<SetStateAction<boolean>>;
  updateLessonFn: (data: Video) => void;
}

const EditLesson = ({ video, closeEdit, updateLessonFn }: EditLessonProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Video>({ defaultValues: video });

  const onSubmit = (data: Video) => {
    updateLessonFn({ ...data, videoId: data._id });
  };

  const inputClass = "border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 block w-full text-gray-800 text-sm transition-all duration-200 focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-50";
  const labelClass = "block text-sm font-medium text-gray-600 mb-1.5";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
              <CiEdit className="text-white text-lg" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">تعديل الدرس</h2>
          </div>
          <button
            type="button"
            onClick={() => closeEdit(false)}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
          >
            <IoClose className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-4">

          <div>
            <label className={labelClass}>لينك اليوتيوب</label>
            <input {...register("link", { required: "مطلوب" })} type="text" className={inputClass} />
            {errors.link && <p className="text-red-500 text-xs mt-1">{errors.link.message}</p>}
          </div>

          <div>
            <label className={labelClass}>العنوان</label>
            <input {...register("title", { required: "مطلوب" })} type="text" className={inputClass} />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className={labelClass}>الشرح</label>
            <textarea {...register("description")} className={inputClass} rows={3} />
          </div>

          <div>
            <label className={labelClass}>الصف الدراسي</label>
            <select {...register("level", { required: "مطلوب" })} className={inputClass}>
              <option value="">اختر الصف</option>
              <option value="first">الصف الأول الثانوي</option>
              <option value="second">الصف الثاني الثانوي</option>
              <option value="third">الصف الثالث الثانوي</option>
            </select>
            {errors.level && <p className="text-red-500 text-xs mt-1">{errors.level.message}</p>}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors duration-200"
            >
              حفظ التغييرات
            </button>
            <button
              type="button"
              onClick={() => closeEdit(false)}
              className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-colors duration-200"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLesson;