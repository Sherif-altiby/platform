"use client";

import Link from "next/link";
import { HiOutlinePlay } from "react-icons/hi2";
import { RiBookletLine, RiQuestionAnswerLine } from "react-icons/ri";

const TeacherAboutLink = ({
  teacherId,
  name,
  level,
}: {
  teacherId: string;
  name: string;
  level: string;
}) => {
  const actions = [
    {
      title: "الدروس",
      subtitle: "محتوى مرئي تفاعلي",
      href: `/get-teachers/${teacherId}/subjects`,
      icon: <HiOutlinePlay />,
      theme: "blue",
      shadow: "hover:shadow-blue-500/20",
    },
    {
      title: "المذكرات",
      subtitle: "ملخصات جاهزة للتحميل",
      href: `/notes?teacherName=${name}&teacherId=${teacherId}`,
      icon: <RiBookletLine />,
      theme: "orange",
      shadow: "hover:shadow-orange-500/20",
    },
    {
      title: "الاختبارات",
      subtitle: "تحديات لتقييم مستواك",
      href: `/quizzes?teacherName=${name}&teacherId=${teacherId}&level=${level}`,
      icon: <RiQuestionAnswerLine />,
      theme: "emerald",
      shadow: "hover:shadow-emerald-500/20",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {actions.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            aria-label={item.title}
            className={`group relative p-1 rounded-[2.5rem] transition-all duration-500 hover:scale-[1.03] active:scale-95 ${item.shadow}`}
          >
            {/* الخلفية المتدرجة للحواف (Animated Border) */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-white to-slate-200 rounded-[2.5rem] group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-emerald-400 transition-all duration-500 opacity-50" />

            {/* محتوى الكارت الرئيسي */}
            <div className="relative bg-white/90 backdrop-blur-xl rounded-[2.4rem] p-8 h-full flex flex-col items-center justify-between border border-white">
              
              {/* قسم الأيقونة العلوي */}
              <div className="relative">
                <div className="absolute inset-0 bg-slate-100 rounded-full blur-2xl group-hover:bg-blue-200 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="relative w-20 h-20 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-4xl text-slate-700 group-hover:bg-white group-hover:text-blue-600 group-hover:border-blue-100 shadow-sm transition-all duration-500">
                  {item.icon}
                </div>
              </div>

              {/* النصوص */}
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-[13px] font-medium text-slate-400 leading-relaxed px-4">
                  {item.subtitle}
                </p>
              </div>

              {/* زر "استكشف" مدمج */}
              <div className="mt-8 px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-bold tracking-widest uppercase transition-all duration-500 group-hover:bg-blue-600 group-hover:px-10 shadow-lg shadow-slate-200 group-hover:shadow-blue-200">
                استكشف
              </div>

              {/* زخرفة هندسية جانبية */}
              <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-blue-400 transition-colors" />
              <div className="absolute top-11 right-8 w-1.5 h-1.5 rounded-full bg-slate-100 group-hover:bg-blue-300 transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeacherAboutLink;