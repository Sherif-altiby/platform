"use client";

import { HiLightningBolt } from "react-icons/hi";

const Hero = () => {
  return (
    <section className="relative min-h-screen md:min-h-[90vh] flex items-center overflow-hidden bg-[#F1F5F9] text-slate-900">
      {/* --- الطبقات الخلفية الفخمة --- */}
      <div className="absolute top-1/4 -right-24 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-[100px] pointer-events-none" />

      {/* شبكة هندسية دقيقة */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none ">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="premiumGrid"
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
          <rect width="100%" height="100%" fill="url(#premiumGrid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* --- الجانب الأيمن: المحتوى النصي بتصميم حاد --- */}
          <div className="w-full  md:w-1/2  text-right order-2 md:order-1 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-blue-700 text-sm font-bold mb-8 shadow-sm">
              <HiLightningBolt className="text-orange-500 animate-pulse" />
              <span>مرحباً بك في عصر التعلم الذكي</span>
            </div>

            <h1 className="text-4xl xl:text-7xl font-black leading-[1.1] mb-6 tracking-tight text-slate-900">
              حلق بطموحك <br />
              واصنع <span className="text-blue-600">مستقبلك</span> <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-orange-500">بذكاء</span>
                <span className="absolute bottom-3 left-0 w-full h-3 bg-orange-100 -rotate-1 z-0" />
              </span>
            </h1>

            <p className="text-slate-600 text-lg  leading-relaxed md:max-w-xl ml-auto mb-6 xl:mb-12 font-medium">
              في منصة العبقري، نحن لا نكتفي بالشرح، بل{" "}
              <span className="text-slate-900 font-bold">نلهمك</span> لتكتشف
              قدراتك الكامنة من خلال محتوى تفاعلي صمم خصيصاً ليناسب طريقة
              تفكيرك.
            </p>

            <div className="w-full max-w-md p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl shadow-2xl border border-slate-700/50 hover:border-blue-500 transition-all group">
              <div className="flex justify-between items-center direction-rtl">
                <div>
                  <h3 className="text-xl font-bold mb-1 group-hover:text-blue-400 transition-colors">
                    ابدأ رحلة النجاح
                  </h3>
                  <p className="text-sm text-slate-400">اكتشف الفرص المتاحة لك اليوم</p>
                </div>

              </div>
            </div>
          </div>

          {/* --- الجانب الأيسر: الرسوم التوضيحية SVG (The Portal Effect) --- */}
          <div className="md:w-1/2 hidden  relative md:flex justify-center order-1 md:order-2 p-10 mt-10 md:mt-0">
            <div className="relative w-full max-w-[550px] animate-float">
              <svg
                viewBox="0 0 500 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-2xl"
              >
                {/* 1. الخلفية الديناميكية للـ SVG (The Portal) */}
                <circle
                  cx="250"
                  cy="250"
                  r="230"
                  fill="url(#portalGrad)"
                  fillOpacity="0.05"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="229"
                  stroke="url(#portalGrad)"
                  strokeWidth="1"
                  strokeDasharray="15 15"
                  opacity="0.2"
                  className="animate-spin-slow"
                />

                {/* 2. تدفق المعرفة المتفجر (The Genius Flow) */}
                <path
                  d="M250 250C250 250 300 150 400 100C500 50 450 250 400 300C350 350 250 250 250 250Z"
                  fill="url(#geniusGrad)"
                  opacity="0.2"
                  className="animate-pulse-slow"
                />

                {/* 3. عناصر هندسية عائمة ( floating particles) */}
                <rect
                  x="50"
                  y="80"
                  width="30"
                  height="30"
                  rx="8"
                  fill="#3B82F6"
                  className="animate-bounce-slow"
                />
                <circle
                  cx="420"
                  cy="60"
                  r="10"
                  fill="#F97316"
                  className="animate-pulse"
                />
                <path d="M40 380L60 410L20 410Z" fill="#10B981" />

                {/* 4. المشهد المركزي: الطالب الطموح (The Visionary) */}
                <g className="animate-float-slow">
                  {/* رأس الطالب */}
                  <circle cx="250" cy="180" r="35" fill="#E2E8F0" />
                  {/* جسم الطالب (في وضعية قفز/طموح) */}
                  <path
                    d="M250 215C220 215 190 240 190 280V380C190 395 205 410 220 410H280C295 410 310 395 310 380V280C310 240 280 215 250 215Z"
                    fill="#E2E8F0"
                  />
                  {/* الكتاب المفتوح (The Source) */}
                  <rect
                    x="180"
                    y="320"
                    width="140"
                    height="90"
                    rx="15"
                    fill="white"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    shadow-lg="true"
                  />
                  <rect
                    x="200"
                    y="350"
                    width="100"
                    height="8"
                    rx="4"
                    fill="#E2E8F0"
                  />
                  <rect
                    x="200"
                    y="370"
                    width="80"
                    height="8"
                    rx="4"
                    fill="#E2E8F0"
                  />
                  <rect
                    x="200"
                    y="390"
                    width="60"
                    height="8"
                    rx="4"
                    fill="#F97316"
                  />

                  {/* تأثير انفجار المعرفة من الكتاب */}
                  <path
                    d="M250 320C250 320 300 250 350 280C400 310 400 350 350 380C300 410 250 320 250 320Z"
                    fill="url(#explosionGrad)"
                    opacity="0.4"
                    className="animate-pulse"
                  />
                </g>

                {/* رموز علمية عائمة (floating icons) */}
                <text
                  x="100"
                  y="100"
                  fontSize="24"
                  fill="#3B82F6"
                  opacity="0.5"
                  className="animate-float"
                >
                  Σ
                </text>
                <text
                  x="400"
                  y="150"
                  fontSize="24"
                  fill="#F97316"
                  opacity="0.5"
                  className="animate-float-slow"
                >
                  A+
                </text>
                <text
                  x="100"
                  y="350"
                  fontSize="24"
                  fill="#10B981"
                  opacity="0.5"
                  className="animate-float"
                >
                  π
                </text>

                <defs>
                  <linearGradient
                    id="portalGrad"
                    x1="0"
                    y1="0"
                    x2="500"
                    y2="500"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#3B82F6" />
                    <stop offset="1" stopColor="#60A5FA" />
                  </linearGradient>
                  <linearGradient
                    id="geniusGrad"
                    x1="0"
                    y1="0"
                    x2="500"
                    y2="500"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#3B82F6" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#3B82F6" />
                    <stop offset="1" stopColor="#60A5FA" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="explosionGrad"
                    x1="0"
                    y1="0"
                    x2="500"
                    y2="500"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F97316" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#F97316" />
                    <stop offset="1" stopColor="#FCD34D" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* بطاقات معلومات مدمجة (Dynamic Trust Signals) */}
              <div className="absolute right-0 top-1/4 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl border border-slate-100 hidden lg:block animate-pulse-slow">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    A+
                  </div>
                  <p className="text-[10px] font-black text-slate-700">
                    تفوّق مضمون
                  </p>
                </div>
              </div>

              <div className="absolute left-0 bottom-1/4 bg-slate-900 text-white p-4 rounded-2xl shadow-xl hidden lg:block transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <p className="text-xs font-bold tracking-widest uppercase">
                  محتوى تفاعلي
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- شريط الأرقام السفلية (The Stats Bar) --- */}
      <div className="absolute bottom-0 left-0 w-full bg-white/70 border-t border-slate-200 py-8 backdrop-blur-sm hidden md:block z-20">
        <div className="container mx-auto px-6 flex justify-around items-center">
          {["أفضل المعلمين", "محتوى تفاعلي", "دروس يومية ", "تطبيق ذكي"].map(
            (item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 font-bold text-xs text-slate-400 uppercase tracking-[0.2em] transition-colors hover:text-blue-600"
              >
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.6)]" />
                {item}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
