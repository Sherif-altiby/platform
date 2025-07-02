"use client"
import { Video } from "@/types/Types"
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface EditLessonProps {
  video: Video;
  closeEdit: Dispatch<SetStateAction<boolean>>
  updateLessonFn: (data: Video) => void
}

const EditLesson = ({ video,  closeEdit, updateLessonFn}: EditLessonProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Video>({
    defaultValues: video,
  });

  const onSubmit = async (data: Video) => {
    updateLessonFn({...data, videoId: data._id})
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-center">تعديل الدرس</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700">  لينك اليوتيوب  </label>
            <input
              {...register("link", { required: "Link is required" })}
              type="text"
              className="w-full p-2 border rounded-md"
            />
            {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700"> العنوان </label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              className="w-full p-2 border rounded-md"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700"> الشرح </label>
            <textarea
              {...register("description")}
              className="w-full p-2 border rounded-md"
              rows={3}
            />
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Level</label>
            <select
              {...register("level", { required: "Level is required" })}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select level</option>
              <option value="first"> الصف الاول الثانوي </option>
              <option value="second"> الصف الثاني الثانوي </option>
              <option value="third"> الصف الثالث الثانوي </option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              حفظ
            </button>
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              onClick={() => closeEdit(false)}
            >
              الغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLesson;
