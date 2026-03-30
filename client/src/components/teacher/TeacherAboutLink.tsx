import Link from "next/link"
import { CiSquareQuestion, CiVideoOff } from "react-icons/ci"
import { PiNotepadThin } from "react-icons/pi"

const TeacherAboutLink = ({teacherId}: {teacherId: string}) => {
  return (
    <div className="max-w-3xl mx-auto mt-8 grid sm:grid-cols-3 gap-4">

              {/* Subjects */}
              <Link
                href={`/get-teachers/${teacherId}/course`}
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1 overflow-hidden opacity-0 animate-fadeInLeft"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl" />
                <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                    <CiVideoOff className="text-2xl text-indigo-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="font-bold text-gray-800 group-hover:text-white transition-colors duration-300">الدروس</p>
                  <p className="text-xs text-gray-400 group-hover:text-white/80 transition-colors duration-300">شاهد الفيديوهات التعليمية</p>
                </div>
              </Link>

              {/* Notes */}
              <Link
                href={`/get-teachers/notes?teacherName=${name}&teacherId=${teacherId}`}
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1 overflow-hidden opacity-0 animate-fadeInUp"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl" />
                <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                    <PiNotepadThin className="text-2xl text-amber-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="font-bold text-gray-800 group-hover:text-white transition-colors duration-300">المذكرات</p>
                  <p className="text-xs text-gray-400 group-hover:text-white/80 transition-colors duration-300">حمّل ملفات المراجعة</p>
                </div>
              </Link>

              {/* Quizzes */}
              <Link
                href={`/get-teachers/quizzes?teacherName=${name}&teacherId=${teacherId}`}
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1 overflow-hidden opacity-0 animate-fadeInRight"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl" />
                <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                    <CiSquareQuestion className="text-2xl text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="font-bold text-gray-800 group-hover:text-white transition-colors duration-300">الاختبارات</p>
                  <p className="text-xs text-gray-400 group-hover:text-white/80 transition-colors duration-300">اختبر مستواك الآن</p>
                </div>
              </Link>

            </div>
  )
}

export default TeacherAboutLink