import { Axios } from '@/axios/Axios';
import MainButton from '@/components/MainButton'
import { AxiosError } from 'axios';
import React, { useState } from 'react'
import { GoEye, GoEyeClosed } from 'react-icons/go';
import { toast } from 'react-toastify';
import { FaLock } from 'react-icons/fa';

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (confirmPassword.length >= 8 && password.length >= 8) {
        const res = await Axios.post('user/change-password', { password, confirmPassword })
        toast.success(res.data.message)
        setPassword("")
        setConfirmPassword("")
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 block w-full text-gray-800 text-sm transition-all duration-300 focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-50"
  const labelClass = "block text-sm font-medium text-gray-600 mb-1.5"

  return (
    <div className="w-full bg-white rounded-3xl h-full shadow-sm border border-gray-100 overflow-hidden">
      {/* Card header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
          <FaLock className="text-white text-sm" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">تغيير كلمة المرور</h2>
      </div>

      <form onSubmit={changePassword} className="p-6 flex flex-col gap-5">
        <div className="flex items-start flex-col  gap-5">
          <div className="w-full ">
            <label className={labelClass} htmlFor="password">كلمة المرور الجديدة</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className={inputClass}
              />
              <button
                type="button"
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <GoEye /> : <GoEyeClosed />}
              </button>
            </div>
          </div>

          <div className="w-full">
            <label className={labelClass} htmlFor="confirmPassword">تأكيد كلمة المرور</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass}
              />
              <button
                type="button"
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <GoEye /> : <GoEyeClosed />}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-1">
          <MainButton loading={loading} text="حفظ كلمة المرور" />
        </div>
      </form>
    </div>
  )
}

export default ChangePassword