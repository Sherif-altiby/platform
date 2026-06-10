"use client";

import Link from "next/link";
import Image from "next/image";
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useMemo } from "react";
 
const Footer = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  // ✅ memoized nav links
  const navLinks = useMemo(
    () => [
      { label: "الرئيسية", href: "/" },
      { label: "المدرسون", href: "/get-teachers" },
      { label: "المواد الدراسية", href: "/subjects" },
      { label: "الملف الشخصي", href: "/profile" },
    ],
    []
  );

  const socialLinks = useMemo(
    () => [
      { icon: <FaLinkedinIn />, color: "hover:bg-blue-600" },
      { icon: <FaInstagram />, color: "hover:bg-pink-600" },
      { icon: <FaFacebookF />, color: "hover:bg-blue-700" },
      { icon: <FaWhatsapp />, color: "hover:bg-green-600" },
    ],
    []
  );

  return (
    <footer className="relative bg-[#0F172A] text-white pt-24 pb-10 overflow-hidden">
      
      {/* --- طبقات الخلفية (Aura Effects) --- */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Pattern خفيف جداً متوافق مع باقي الصفحات */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="footerPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#footerPattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
       

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* 1. البراند والوصف */}
          <div className="md:col-span-1 space-y-6 text-right order-last md:order-first">
            <Link href="/" className="inline-block transform hover:scale-105 transition-transform">
              <Image src="/main-logo-footer.png" alt="Logo" width={140} height={60} className="brightness-125" />
            </Link>
            <p className="text-slate-400 leading-relaxed font-medium">
                نحن في "العبقري" نؤمن أن القمة تتسع للجميع. مهمتنا هي تمكينك بأفضل الأدوات التعليمية للوصول لهدفك بذكاء.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((s, i) => (
                <a key={i} href="#" className={`w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 transition-all ${s.color} hover:text-white hover:-translate-y-1`}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 2. روابط التنقل */}
          <div className="text-right">
            <h4 className="text-white font-black text-xl mb-8 flex items-center  gap-2">
                خريطة الموقع
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-all flex items-center  gap-2 group">
                    <span className="group-hover:mr-2 transition-all">{link.label}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-blue-500 transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          

          {/* 4. قسم مميز (Trust) */}
          <div className="bg-gradient-to-br from-blue-600/20 to-orange-600/10 p-6 rounded-3xl border border-white/5 text-right flex flex-col items-end justify-center">
             <div className="text-3xl font-black text-white mb-2 tracking-tighter">99.9%</div>
             <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">رضا الطلاب</p>
             <p className="text-xs text-slate-300 leading-relaxed opacity-70">نحن نحدث فرقاً حقيقياً في حياة آلاف الطلاب سنوياً من خلال جودة التعليم.</p>
          </div>

        </div>

        {/* --- الفوتر السفلي --- */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-6">
            <p className="text-slate-500 text-sm font-medium">
               © {year} منصة العبقري. جميع الحقوق محفوظة
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span> تطوير  </span>
              <Link href="https://www.linkedin.com/in/sherif-altiby-38b350229/" target="_blank" className="text-white font-bold hover:text-orange-500 transition-colors">
                 Sherif Altiby
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;