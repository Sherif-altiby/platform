"use client"

import { Axios } from "@/axios/Axios"
import MainButton from "@/components/MainButton"
import SubHeader from "@/components/SubHeader"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ChangePassword from "./ChangePassword"
import AddComment from "@/components/addComment"
import { useQueryClient } from "@tanstack/react-query"
import { UserTypes } from "@/types/Types"
import { FaUser } from "react-icons/fa"

const Page = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]) as UserTypes

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<number | string>("");
  const [level, setLevel] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setLevel(user.level || "");
    }
  }, [user]);

  const [loading, setLoading] = useState(false)

  const levels = [
    { level: "الصف الأول الثانوي", value: "first" },
    { level: "الصف الثاني الثانوي", value: "second" },
    { level: "الصف الثالث الثانوي", value: "third" },
  ]

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await Axios.post('user/update-profile', { name, phone, email, level })
      toast.success(res.data.message)
    } catch {
      toast.error("حدث خطأ")
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 block w-full text-gray-800 text-sm transition-all duration-300 focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-50"
  const labelClass = "block text-sm font-medium text-gray-600 mb-1.5"

  return (
    <div className="ctm-height bg-gray-50">
      <SubHeader currentTitle="الملف الشخصي" />

      <div className="container py-12 flex flex-col items-center gap-6">

        {/* Update Profile */}
        <div className="w-full max-w-[700px] bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Card header */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
              <FaUser className="text-white text-sm" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">تعديل الملف الشخصي</h2>
          </div>

          <form onSubmit={updateProfile} className="p-6 flex flex-col gap-5">
            <div className="flex items-start flex-col md:flex-row gap-5">
              <div className="w-full md:w-1/2">
                <label className={labelClass} htmlFor="name">الاسم</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
              </div>
              <div className="w-full md:w-1/2">
                <label className={labelClass} htmlFor="email">البريد الإلكتروني</label>
                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
              </div>
            </div>

            <div className="flex items-start flex-col md:flex-row gap-5">
              <div className="w-full md:w-1/2">
                <label className={labelClass} htmlFor="phone">رقم الهاتف</label>
                <input type="number" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
              </div>
              <div className="w-full md:w-1/2">
                <label className={labelClass} htmlFor="level">الصف الدراسي</label>
                <select id="level" value={level} onChange={(e) => setLevel(e.target.value)} className={inputClass}>
                  {levels.map((l) => (
                    <option value={l.value} key={l.value}>{l.level}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-1">
              <MainButton loading={loading} text="حفظ التغييرات" />
            </div>
          </form>
        </div>

        {/* Change Password */}
        <ChangePassword />

        {/* Add Comment */}
        <AddComment />

      </div>
    </div>
  )
}

export default Page