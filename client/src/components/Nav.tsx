"use client";

import Link from "next/link";
import { navLinks } from "../data/data";
import { FaBars } from "react-icons/fa6";
import Image from "next/image";
import { useState, useEffect } from "react";
import ResponsiveMenu from "./ResponsiveMenu";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSettings, CiUser } from "react-icons/ci";
import { useAuthUser } from "@/store/authStore";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuthUser();

  // تأثير عند التمرير لتغيير شفافية الـ Nav
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-[100] transition-all duration-300 border-b ${
          isScrolled 
          ? "bg-white/80 backdrop-blur-lg border-slate-200 shadow-sm h-[70px]" 
          : "bg-white border-transparent h-[85px]"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between h-full">

          {/* 1. Logo بتأثير Hover لطيف */}
          <Link href="/" className="nav-logo shrink-0 transform hover:scale-105 transition-transform duration-300">
            <Image src="/main-logo.png" alt="العبقري" width={120} height={40} className="object-contain" />
          </Link>

          {/* 2. روابط التنقل (Desktop) - تصميم الـ Pills */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            {navLinks.map((link, index) =>
              index < 4 ? ( // زدنا العدد قليلاً لمرونة أكثر
                <Link
                  key={link.link}
                  href={link.path}
                  className="relative px-5 py-2 rounded-xl text-[13px] font-black text-slate-600 hover:text-blue-600 transition-all duration-300 group overflow-hidden"
                >
                  <span className="relative z-10">{link.link}</span>
                  <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-300 -z-0 rounded-lg shadow-sm" />
                </Link>
              ) : null
            )}
          </div>

          {/* 3. الإجراءات (Actions) */}
          <div className="flex items-center gap-3">
            
            {/* في حالة المستخدم مسجل دخول */}
            {user ? (
              <div className="flex items-center gap-2 bg-slate-50/50 p-1 rounded-2xl border border-slate-100">
                <Link
                  href="/notifications"
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:text-blue-600 hover:bg-white hover:shadow-sm transition-all text-xl relative"
                >
                  <IoIosNotificationsOutline />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
                </Link>
                <Link
                  href="/settings"
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:text-blue-600 hover:bg-white hover:shadow-sm transition-all text-xl"
                >
                  <CiSettings />
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 pr-1 pl-3 py-1 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-300 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-lg">
                    <CiUser />
                  </div>
                  <span className="text-xs font-black text-slate-700 hidden xl:block">حسابي</span>
                </Link>
              </div>
            ) : (
              /* في حالة الزائر */
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-bold text-slate-600 hover:text-blue-600 px-4 transition-colors"
                >
                  تسجيل دخول
                </Link>
                <Link
                  href="/register"
                  className="flex items-center justify-center text-[13px] font-black h-[44px] rounded-xl px-7 bg-slate-900 text-white transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 active:scale-95"
                >
                  انضم إلينا مجاناً
                </Link>
              </div>
            )}

            {/* Menu الـ Mobile - تصميم عصري */}
            <button
              className="flex lg:hidden items-center justify-center w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-blue-600 transition-all"
              onClick={() => setShowMenu(!showMenu)}
            >
              <FaBars className={showMenu ? "rotate-90 transition-transform" : "transition-transform"} />
            </button>
          </div>
        </div>
      </nav>

      <ResponsiveMenu show={showMenu} setShow={setShowMenu} />
    </>
  );
};

export default Nav;