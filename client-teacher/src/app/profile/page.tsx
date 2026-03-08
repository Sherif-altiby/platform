"use client"

import { Axios } from "@/axios/Axios"
import { useAuthUser } from "@/store/authStore"
import { useState } from "react"
import { toast } from "react-toastify"
import ChangePassword from "./ChangePassword"
import AddComment from "@/components/addComment"
import { CiUser } from "react-icons/ci"

const inputClass = "border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 block w-full text-gray-800 text-sm transition-all duration-200 focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-50";
const labelClass = "block text-sm font-medium text-gray-600 mb-1.5";

const Page = () => {
  const { user, checkUser } = useAuthUser()
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [phone, setPhone] = useState(user?.phone)
  const [level, setLevel] = useState(user?.level)
  const [loading, setLoading] = useState(false)

  const levels = [
    { label: "الصف الأول الثانوي", value: "first" },
    { label: "الصف الثاني الثانوي", value: "second" },
    { label: "الصف الثالث الثانوي", value: "third" },
  ]

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await Axios.post('user/update-profile', { name, phone, email, level })
      await checkUser()
      toast.success(res.data.message)
    } catch {
      toast.error("حدث خطأ")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ctm-height bg-gray-50">
      <div className="container py-12 flex flex-col gap-6 max-w-2xl mx-auto">

        {/* Profile Info Card */}
        <form onSubmit={updateProfile} className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
              <CiUser className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">الملف الشخصي</h2>
              <p className="text-sm text-gray-400">تعديل بياناتك الشخصية</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className={labelClass} htmlFor="name">الاسم</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="email">البريد الإلكتروني</label>
              <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div>
              <label className={labelClass} htmlFor="phone">رقم الهاتف</label>
              <input type="number" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
            </div>
            {user?.role === "student" && (
              <div>
                <label className={labelClass} htmlFor="level">الصف الدراسي</label>
                <select id="level" value={level} onChange={(e) => setLevel(e.target.value)} className={inputClass}>
                  {levels.map((l) => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full h-11 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-sm shadow-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
          </button>
        </form>

        <ChangePassword />
        <AddComment />
      </div>
    </div>
  )
}

export default Page