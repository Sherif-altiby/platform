"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Footer = () => {
  const date = new Date();
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {

      // Logo fades + slides up
      gsap.fromTo(".footer-logo", 
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".footer-logo", start: "top 95%" },
        }
      );

      // Description fades in
      gsap.fromTo(".footer-desc",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.1,
          scrollTrigger: { trigger: ".footer-desc", start: "top 95%" },
        }
      );

      // Links stagger in
      gsap.fromTo(".footer-link",
        { x: 20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5, ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".footer-links", start: "top 95%" },
        }
      );

      // Bottom bar slides up
      gsap.fromTo(".footer-bottom",
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.3,
          scrollTrigger: { trigger: ".footer-bottom", start: "top 100%" },
        }
      );

      // Blobs pulse
      gsap.to(".footer-blob", {
        scale: 1.3,
        opacity: 0.2,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 1.5,
      });

    }, footerRef);

    return () => ctx.revert();
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-teal-900 text-white overflow-hidden">

      {/* Decorative blobs */}
      <div className="footer-blob absolute top-0 left-0 w-72 h-72 bg-indigo-500 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="footer-blob absolute bottom-0 right-0 w-72 h-72 bg-teal-400 opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container relative z-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* Brand */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <Link href="/" className="footer-logo inline-block">
               <Image src="/main-logo-footer.png" alt="Logo" width={130} height={100} />
            </Link>
            <p className="footer-desc text-sm text-white/60 leading-7 max-w-md">
              منصة العبقري التعليمية هي وجهتك الأولى نحو التعلم المبتكر والمتميز.
              نسعى إلى تقديم دروس تفاعلية مصممة لتناسب احتياجات الطلاب في جميع
              المراحل والمواد الدراسية.
            </p>
          </div>

          {/* Links */}
          <div className="footer-links flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-white/40">الصفحات</p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "الرئيسية", href: "/" },
                { label: "المدرسون", href: "/get-teachers" },
                { label: "المواد الدراسية", href: "/subjects" },
                { label: "الملف الشخصي", href: "/profile" },
              ].map((l) => (
                <li key={l.href} className="footer-link">
                  <Link href={l.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="footer-bottom mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <span>© {date.getFullYear()} منصة العبقري — جميع الحقوق محفوظة</span>
          <span>
            تنفيذ وتطوير{" "}
            <a
              href="https://www.linkedin.com/in/sherif-altiby-38b350229/"
              target="_blank"
              className="text-teal-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Sherif Altiby
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;