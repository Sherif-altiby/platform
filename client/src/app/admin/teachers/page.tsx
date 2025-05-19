'use client'

import { useTeacherStore } from "@/store/teacherStore"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Axios } from "@/axios/Axios"
import Teacher from "./Teacher"
import MainButton from "@/components/MainButton"
import AddTeacher from "./AddTeacher"
import Spiner from "@/components/Spiner"

const Page = () => {
  const [showModal, setShowModal] = useState(false)
  const [viewBlocked, setViewBlocked] = useState(false)

  const { getTeachers, isFetchingTeachers, teachers } = useTeacherStore()

  useEffect(() => {
    getTeachers()
  }, [])

  const handleBlockTeacher = async (id: string) => {
    try {
      const res = await Axios.post("admin/block-teacher", {
        teacherId: id,
      })
      await getTeachers()
      toast.success(res.data.message)
    } catch (error) {
      console.error(error)
      toast.error("حدث خطأ أثناء محاولة الحظر.")
    }
  }

  const handleUnBlockTeacher = async (id: string) => {
    try {
      const res = await Axios.post("admin/unblock-teacher", {
        teacherId: id,
      })
      await getTeachers()
      toast.success(res.data.message)
    } catch (error) {
      console.error(error)
      toast.error("حدث خطأ أثناء محاولة فك الحظر.")
    }
  }

  const filteredTeachers = teachers?.filter(
    (teacher) => teacher.isBlocked === viewBlocked
  )

  return (
    <div>
      {/* Header Section */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
        <h3 className="text-2xl font-medium text-hoverLinkColor">المدرسين</h3>
        <div onClick={() => setShowModal(true)}>
          <MainButton text="اضف مدرس" />
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setViewBlocked(false)}
          className={`px-4 py-2 rounded ${
            !viewBlocked ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          المدرسين النشطين
        </button>
        <button
          onClick={() => setViewBlocked(true)}
          className={`px-4 py-2 rounded ${
            viewBlocked ? 'bg-red-600 text-white' : 'bg-gray-200'
          }`}
        >
          المدرسين المحظورين
        </button>
      </div>

      {/* Teachers Display */}
      <div>
        {isFetchingTeachers ? (
          <div className="flex items-center justify-center">
            <Spiner />
          </div>
        ) : filteredTeachers && filteredTeachers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeachers.map((teacher) => (
              <Teacher
                key={teacher._id}
                teacher={teacher}
                handleBlockTeacher={handleBlockTeacher}
                handleUnBlockTeacher={handleUnBlockTeacher}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            لا يوجد مدرسين في هذا القسم.
          </p>
        )}
      </div>

      {/* Add Modal */}
      {showModal && <AddTeacher closeModal={setShowModal} />}
    </div>
  )
}

export default Page
