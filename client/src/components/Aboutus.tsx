"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiCheckCircle, HiOutlineRocketLaunch } from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger);

// ✅ Fix 1: moved outside component — allocated once, not on every render
const FEATURES = [
  { title: "تعلم تفاعلي", color: "bg-blue-500" },
  { title: "نخبة الخبراء", color: "bg-orange-500" },
  { title: "متابعة ذكية", color: "bg-indigo-500" },
  { title: "محتوى حصري", color: "bg-teal-500" },
];

const Aboutus = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ✅ Fix 2: merged two SVG triggers into one to save an observer registration
      gsap.from([svgRef.current, ".svg-element"], {
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".about-text-item", {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
      });
    }, sectionRef);

    // ✅ Fix 3: refresh after layout is painted so trigger positions are accurate
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#F8FAFC] relative overflow-hidden text-slate-900"
    >
      {/* ✅ Fix 4: pointer-events-none already present — added will-change + translateZ to isolate blur layer */}
      <div
        className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none"
        style={{ willChange: "filter", transform: "translateZ(0)" }}
      />
      <div
        className="absolute top-1/2 right-0 w-64 h-64 bg-orange-100/40 rounded-full blur-3xl pointer-events-none"
        style={{ willChange: "filter", transform: "translateZ(0)" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row-reverse items-center gap-16">

          <div ref={textRef} className="w-full md:w-1/2 space-y-8 text-right">
            <div className="about-text-item inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 text-blue-700 font-bold text-sm border border-blue-200">
              <HiOutlineRocketLaunch size={18} className="animate-pulse" />
              <span>اكتشف عالم العبقري</span>
            </div>

            <h2 className="about-text-item text-4xl md:text-5xl font-black leading-[1.2] text-slate-800">
              نجمع بين <span className="text-blue-600">الإبداع</span> <br />
              و{" "}
              <span className="relative">
                <span className="relative z-10 text-orange-500">التكنولوجيا</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-orange-200 z-0"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>{" "}
              لتغيير مستقبلك
            </h2>

            <div className="about-text-item space-y-6">
              <p className="text-slate-600 text-lg leading-relaxed">
                في منصة العبقري، نؤمن أن التعليم لا يجب أن يكون مملاً. لقد
                صممنا بيئة تجمع بين{" "}
                <span className="font-bold text-blue-600">متعة التعلم</span>{" "}
                وقوة الأدوات الرقمية، لنمنحك القدرة على التفوق في دراستك
                بأسلوب لم تعهده من قبل.
              </p>
            </div>

            <div className="about-text-item grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {FEATURES.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-end gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
                >
                  <span className="text-slate-700 font-bold group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </span>
                  <div className={`${item.color} p-1.5 rounded-lg text-white`}>
                    <HiCheckCircle size={18} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={svgRef} className="w-full md:w-1/2 relative p-4">
            <div className="relative group">
              <div className="absolute -top-8 -right-8 w-48 h-48 bg-blue-600/10 rounded-3xl rotate-12 -z-10 transition-transform group-hover:rotate-45 duration-700" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-orange-500/10 rounded-3xl -rotate-12 -z-10 transition-transform group-hover:-rotate-45 duration-700" />

              <div className="relative z-10 rounded-[2rem] p-6 bg-white shadow-2xl shadow-blue-900/10 drop-shadow-lg">
                <svg
                  viewBox="0 0 500 400"
                  className="w-full h-auto"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true" // ✅ Fix 5: decorative SVG hidden from a11y tree
                >
                  <circle cx="250" cy="200" r="180" fill="#E2E8F0" opacity="0.3" className="svg-element" />
                  <g className="animate-float" style={{ willChange: "transform" }}> {/* ✅ Fix 6 */}
                    <circle cx="180" cy="140" r="30" fill="#E2E8F0" className="svg-element" />
                    <path d="M120 180C120 163.431 133.431 150 150 150H210C226.569 150 240 163.431 240 180V250H120V180Z" fill="#E2E8F0" className="svg-element" />
                    <rect x="160" y="200" width="140" height="90" rx="10" fill="white" stroke="#3B82F6" strokeWidth="3" className="svg-element" />
                    <rect x="180" y="225" width="100" height="6" rx="3" fill="#E2E8F0" className="svg-element" />
                    <rect x="180" y="240" width="80" height="6" rx="3" fill="#E2E8F0" className="svg-element" />
                    <rect x="180" y="255" width="60" height="6" rx="3" fill="#3B82F6" className="svg-element" />
                  </g>
                  <rect x="350" y="100" width="40" height="40" rx="10" fill="#F97316" className="svg-element" />
                  <circle cx="100" cy="100" r="15" fill="#3B82F6" className="svg-element" />
                  <path d="M420 280L440 310H400L420 280Z" fill="#10B981" className="svg-element" />
                  <circle cx="250" cy="200" r="220" stroke="#3B82F6" strokeWidth="1" opacity="0.1" className="svg-element" />
                  <circle cx="250" cy="200" r="150" stroke="#F97316" strokeWidth="1" opacity="0.2" strokeDasharray="5 5" className="svg-element" />
                </svg>

                {/* ✅ Fix 6: will-change on animated float cards */}
                <div
                  className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-white flex flex-col items-center animate-float"
                  style={{ willChange: "transform" }}
                >
                  <span className="text-2xl font-black text-blue-600">98%</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">نسبة النجاح</span>
                </div>

                <div className="absolute bottom-6 right-6 bg-orange-500 text-white px-5 py-3 rounded-xl shadow-xl transform rotate-3 hover:rotate-0 transition-all cursor-default">
                  <p className="text-xs font-medium italic">"العبقرية تبدأ بخطوة"</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ✅ Fix 7: move @keyframes to globals.css — removed styled-jsx entirely */}
    </section>
  );
};

export default Aboutus;