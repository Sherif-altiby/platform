"use client"

import { Axios } from "@/axios/Axios"
import ButtonLoader from "@/components/ButtonLoader"
import { LessonInputs, lessonschema } from "@/validations/lessonValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"
import { CiVideoOn } from "react-icons/ci"

const inputClass = "border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 block w-full text-gray-800 text-sm transition-all duration-200 focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-50";
const labelClass = "block text-sm font-medium text-gray-600 mb-1.5";

const Page = () => {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<LessonInputs>({
    mode: "onBlur",
    resolver: zodResolver(lessonschema)
  })

  const onSubmit: SubmitHandler<LessonInputs> = async (data) => {
    await uploadLesson(data)
    reset()
  }

  const uploadLesson = async (lesson: LessonInputs) => {
    setLoading(true)
    try {
      const res = await Axios.post('teacher/upload-video', lesson)
      toast.success(res.data.message)
    } catch (error) {
      if (error instanceof AxiosError) toast.error(error?.response?.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center py-8">
      <form
        className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl shadow-sm p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
            <CiVideoOn className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">إضافة درس جديد</h2>
            <p className="text-sm text-gray-400">أدخل بيانات الدرس أدناه</p>
          </div>
        </div>

        {/* Title + Link */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className={labelClass} htmlFor="title">عنوان الدرس</label>
            <input type="text" id="title" className={inputClass} {...register("title")} />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label className={labelClass} htmlFor="link">لينك اليوتيوب</label>
            <input type="text" id="link" className={inputClass} {...register("link")} />
            {errors.link && <p className="text-red-500 text-xs mt-1">{errors.link.message}</p>}
          </div>
        </div>

        {/* Level */}
        <div className="mb-5">
          <label className={labelClass} htmlFor="level">الصف الدراسي</label>
          <select id="level" className={inputClass} {...register("level")}>
            <option value="first">الصف الأول الثانوي</option>
            <option value="second">الصف الثاني الثانوي</option>
            <option value="third">الصف الثالث الثانوي</option>
          </select>
          {errors.level && <p className="text-red-500 text-xs mt-1">{errors.level.message}</p>}
        </div>

        {/* Description */}
        <div className="mb-8">
          <label className={labelClass} htmlFor="desc">الشرح (اختياري)</label>
          <textarea id="desc" rows={3} className={inputClass} {...register("description")} />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-sm shadow-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? <><ButtonLoader /> <span>جاري الرفع...</span></> : "أضف الدرس"}
        </button>
      </form>
    </div>
  )
}

export default Page