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
import { FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuthUser();

  const pathname = usePathname();

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
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-sm"
            : "bg-white/80 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled ? "h-[70px]" : "h-[80px]"
            }`}
          >
            {/* Logo Section */}
            <Link href="/" className="relative group shrink-0">
              <div className="relative transform transition-all duration-300 group-hover:scale-105">
                <Image
                  src="/main-logo.png"
                  alt="العبقري"
                  width={120}
                  height={40}
                  className="object-contain w-[90px] md:w-[100px]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-xl" />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1.5 bg-gradient-to-br from-slate-50 to-slate-100/50 p-1.5 rounded-2xl border border-slate-200/60 shadow-sm">
              {navLinks.map((link, index) => {
                if (index >= 4) return null;

                // Check if the current path matches the link path
                const isActive = pathname === link.path;

                return (
                  <Link
                    key={link.link}
                    href={link.path}
                    className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 group
            ${isActive ? "text-blue-600" : "text-slate-700 hover:text-blue-600"}`}
                  >
                    <span className="relative z-10 tracking-tight">
                      {link.link}
                    </span>

                    {/* Background Effect (Visible on Hover OR if Active) */}
                    <div
                      className={`absolute inset-0 bg-white rounded-xl shadow-md transition-all duration-300
              ${
                isActive
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100"
              }`}
                    />

                    {/* Underline Indicator (Visible on Hover OR if Active) */}
                    <div
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 rounded-full
              ${isActive ? "w-3/4" : "w-0 group-hover:w-3/4"}`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Logged In User */}
              {user ? (
                <div className="flex items-center gap-2">
                  {/* Notifications */}
                  <Link
                    href="/notifications"
                    className="relative w-10 h-10 flex items-center justify-center rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-300 group"
                  >
                    <IoIosNotificationsOutline className="text-[22px] group-hover:scale-110 transition-transform" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-full border-2 border-white animate-pulse" />
                  </Link>

                  {/* Settings */}
                  <Link
                    href="/settings"
                    className="hidden md:flex w-10 h-10 items-center justify-center rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-300 group"
                  >
                    <CiSettings className="text-[22px] group-hover:rotate-90 transition-transform duration-500" />
                  </Link>

                  {/* Profile */}
                  <Link
                    href="/profile"
                    className="flex items-center gap-2.5 pr-1.5 pl-4 py-1.5 bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300/50 transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-sm group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                      <CiUser className="text-xl" />
                    </div>
                    <span className="text-sm font-bold text-slate-700 hidden xl:block group-hover:text-blue-600 transition-colors">
                      حسابي
                    </span>
                  </Link>
                </div>
              ) : (
                /* Guest User */
                <div className="hidden lg:flex items-center gap-3">
                  <Link
                    href="/login"
                    className="relative px-5 py-2.5 text-sm font-bold text-slate-700 hover:text-blue-600 transition-all duration-300 group"
                  >
                    <span className="relative z-10">تسجيل دخول</span>
                    <div className="absolute inset-0 bg-slate-100 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg" />
                  </Link>

                  <Link
                    href="/register"
                    className="relative overflow-hidden flex items-center justify-center text-sm font-bold h-11 rounded-xl px-7 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-md hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 group active:scale-95"
                  >
                    <span className="relative z-10">انضم إلينا مجاناً</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className={`flex lg:hidden items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br transition-all duration-300 ${
                  showMenu
                    ? "from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200"
                    : "from-slate-50 to-slate-100 border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600"
                }`}
                onClick={() => setShowMenu(!showMenu)}
              >
                {showMenu ? (
                  <FaTimes className="text-lg transition-transform duration-300 rotate-90" />
                ) : (
                  <FaBars className="text-lg transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content jump */}
      <div className={isScrolled ? "h-[70px]" : "h-[80px]"} />

      <ResponsiveMenu show={showMenu} setShow={setShowMenu} />
    </>
  );
};

export default Nav;
