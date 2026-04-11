"use client";

import { FaUsers, FaChalkboardTeacher, FaBook } from "react-icons/fa";

const StatsSection = () => {
  const statsData = [
    {
      label: "إجمالي المستخدمين",
      value: "50K+",
      icon: <FaUsers />,
      desc: "طالب نشط يتعلمون يومياً",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "إجمالي المعلمين",
      value: "120+",
      icon: <FaChalkboardTeacher />,
      desc: "خبير تعليمي معتمد",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      label: "إجمالي الدروس",
      value: "1.5K+",
      icon: <FaBook />,
      desc: "ساعة فيديو عالية الجودة",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ];

  return (
    <section className="py-24 bg-[#F1F5F9] relative overflow-hidden">
      {/* شبكة هندسية خلفية متناسقة مع الهيرو */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="statsGrid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#CBD5E1"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#statsGrid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">
            إحصائياتنا بالأرقام
          </h2>
          <p className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            ثقة تبنى على <span className="text-orange-500">نتائج حقيقية</span>
          </p>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="stat-card group relative bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden text-right"
            >
              {/* تأثير لوني عند الـ Hover */}
              <div
                className={`absolute top-0 right-0 w-2 h-full ${stat.bgColor.replace("bg-", "bg-opacity-10 bg-")} transition-all group-hover:w-full -z-0 opacity-0 group-hover:opacity-100 duration-500`}
              />

              <div className="relative z-10">
                <div
                  className={`${stat.bgColor} ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 transform group-hover:rotate-12 transition-transform duration-500 shadow-sm`}
                >
                  {stat.icon}
                </div>

                <h3 className="text-slate-500 font-bold text-lg mb-2">
                  {stat.label}
                </h3>

                <div className="flex items-baseline gap-2 justify-end mb-4">
                  <p className="text-5xl font-black text-slate-900 tracking-tighter">
                    {stat.value}
                  </p>
                </div>

                <p className="text-slate-400 font-medium leading-relaxed">
                  {stat.desc}
                </p>
              </div>

              {/* زخرفة SVG صغيرة داخل الكارت */}
              <div className="absolute -bottom-4 -left-4 text-slate-100 group-hover:text-slate-200 transition-colors">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                >
                  <circle cx="20" cy="80" r="40" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
