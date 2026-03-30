"use client";

import Link from "next/link";
import Image from "next/image";


const Footer = () => {
  const date = new Date();

  return (
    <footer  className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-teal-900 text-white overflow-hidden">

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