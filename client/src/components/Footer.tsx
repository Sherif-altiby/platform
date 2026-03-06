"use client";

import Link from "next/link";

const Footer = () => {
  const date = new Date();

  return (
    <footer className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-teal-900 text-white overflow-hidden">

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-teal-400 opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container relative z-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* Brand */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <Link href="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="520" height="177" viewBox="0 0 520 177" className="w-[160px] brightness-0 invert">
                <path fillRule="evenodd" clipRule="evenodd" d="M52 38.5C52 33.8056 48.1944 30 43.5 30H42.5C37.8056 30 34 33.8056 34 38.5C34 43.1944 37.8056 47 42.5 47H43.5C48.1944 47 52 43.1944 52 38.5ZM70.5 30C75.1944 30 79 33.8056 79 38.5C79 43.1944 75.1944 47 70.5 47H69.5C64.8056 47 61 43.1944 61 38.5C61 33.8056 64.8056 30 69.5 30H70.5ZM166 114.5C166 109.806 169.806 106 174.5 106C179.194 106 183 109.806 183 114.5V115.5C183 120.194 179.194 124 174.5 124C169.806 124 166 120.194 166 115.5V114.5ZM352.5 106C347.806 106 344 109.806 344 114.5V115.5C344 120.194 347.806 124 352.5 124C357.194 124 361 120.194 361 115.5V114.5C361 109.806 357.194 106 352.5 106ZM166 137.5C166 132.806 169.806 129 174.5 129C179.194 129 183 132.806 183 137.5V138.5C183 143.194 179.194 147 174.5 147C169.806 147 166 143.194 166 138.5V137.5ZM40 60C34.4772 60 30 64.4772 30 70V78V96V104C30 109.523 34.4772 114 40 114H47H66H67H73C78.5228 114 83 109.523 83 104V96V78V70C83 64.4772 78.5228 60 73 60H67H66H47H40ZM37 96C42.5228 96 47 100.477 47 106C47 100.477 51.4772 96 57 96C61.4292 96 65.1859 98.8796 66.5 102.869C67.8141 98.8796 71.5708 96 76 96H75C70.0294 96 66 91.9706 66 87C66 82.0294 70.0294 78 75 78H76C71.5708 78 67.8141 75.1204 66.5 71.1312C65.1859 75.1204 61.4292 78 57 78C51.4772 78 47 73.5228 47 68C47 73.5228 42.5228 78 37 78H38C42.9706 78 47 82.0294 47 87C47 91.9706 42.9706 96 38 96H37ZM267 40C261.477 40 257 44.4772 257 50V56.9995V57V74.9995H265.25C270.221 74.9995 274.25 70.9701 274.25 65.9995C274.25 61.0289 270.221 56.9995 265.25 56.9995H264.35C269.827 56.9459 274.25 52.4895 274.25 47V48.8824C274.25 53.3656 277.884 57 282.368 57C286.851 57 290.485 53.3656 290.485 48.8824V47.8676C290.485 52.9113 294.574 57 299.618 57C304.661 57 308.75 52.9113 308.75 47.8676V47C308.75 52.4895 313.173 56.9459 318.65 56.9995H317.75C312.779 56.9995 308.75 61.0289 308.75 65.9995C308.75 70.9701 312.779 74.9995 317.75 74.9995H326V57V56.9995V50C326 44.4772 321.523 40 316 40H308.75H290.485H274.25H267ZM174.5 57C169.806 57 166 60.8056 166 65.5V75H164H148H132H128H122C116.477 75 112 79.4772 112 85V93V111V129H104C99.0294 129 95 133.029 95 138C95 142.971 99.0294 147 104 147H112H119C124.523 147 129 142.523 129 137V129V111V93H132H148H164H168H184H202H219H239H257H274H291H309H326H343H361H368C373.523 93 378 88.5229 378 83V75V65.5C378 60.8056 374.194 57 369.5 57C364.806 57 361 60.8056 361 65.5V75H343H326H319C313.477 75 309 79.4771 309 85V84C309 79.0294 304.971 75 300 75C295.029 75 291 79.0294 291 84V83.5C291 78.8056 287.194 75 282.5 75C277.806 75 274 78.8056 274 83.5V85C274 79.4772 269.523 75 264 75H257H239H236V65.5C236 60.8056 232.194 57 227.5 57C222.806 57 219 60.8056 219 65.5V75H202H184H183V65.5C183 60.8056 179.194 57 174.5 57Z" fill="white"/>
              </svg>
            </Link>
            <p className="text-sm text-white/60 leading-7 max-w-md">
              منصة بصيرة التعليمية هي وجهتك الأولى نحو التعلم المبتكر والمتميز.
              نسعى إلى تقديم دروس تفاعلية مصممة لتناسب احتياجات الطلاب في جميع
              المراحل والمواد الدراسية.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-white/40">الصفحات</p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "الرئيسية", href: "/" },
                { label: "المدرسون", href: "/get-teachers" },
                { label: "المواد الدراسية", href: "/subjects" },
                { label: "الملف الشخصي", href: "/profile" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <span>© {date.getFullYear()} منصة بصيرة — جميع الحقوق محفوظة</span>
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