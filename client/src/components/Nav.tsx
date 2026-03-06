"use client";

import Link from "next/link";
import { navLinks } from "../data/data";
import { FaBars } from "react-icons/fa6";
import Image from "next/image";
import { useState, useRef } from "react";
import ResponsiveMenu from "./ResponsiveMenu";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { useAuthUser } from "@/store/authStore";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useAuthUser();
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const nav = navRef.current;
    if (!nav) return;

    ScrollTrigger.create({
      start: "top-=80 top",
      onEnter: () => {
        gsap.to(nav, {
          backgroundColor: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 4px 24px 0 rgba(99,102,241,0.10)",
          duration: 0.4,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(nav, {
          backgroundColor: "rgba(255,255,255,1)",
          backdropFilter: "blur(0px)",
          boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
          duration: 0.4,
          ease: "power2.out",
        });
      },
    });
  }, { scope: navRef });

  return (
    <>
      <nav
        ref={navRef}
        className="sticky top-0 z-50 border-b border-gray-100"
        style={{ willChange: "background-color, backdrop-filter, box-shadow", backgroundColor: "rgba(255,255,255,1)" }}
      >
        <div className="flex items-center justify-between h-[70px] container">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image src="/basira.svg" alt="Logo" width={130} height={100} />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) =>
              index < 3 ? (
                <Link
                  key={link.link}
                  href={link.path}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                >
                  {link.link}
                </Link>
              ) : null
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">

            {/* Guest CTA */}
            {!user && (
              <Link
                href="/register"
                className="hidden lg:flex items-center justify-center text-sm font-semibold h-[40px] rounded-xl px-6 bg-indigo-600 text-white transition-all duration-300 hover:bg-indigo-700 shadow-sm shadow-indigo-200"
              >
                تسجيل الدخول
              </Link>
            )}

            {/* Logged-in icons */}
            {user && (
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  href="/notifications"
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 text-xl"
                >
                  <IoIosNotificationsOutline />
                </Link>
                <Link
                  href="/profile"
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 text-xl"
                >
                  <CiUser />
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="flex lg:hidden items-center justify-center w-9 h-9 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 text-lg"
              onClick={() => setShowMenu(!showMenu)}
            >
              <FaBars />
            </button>
          </div>
        </div>

        <ResponsiveMenu show={showMenu} setShow={setShowMenu} />
      </nav>
    </>
  );
};

export default Nav;