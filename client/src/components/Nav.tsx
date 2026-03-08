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

    const tl = gsap.timeline();

    tl.fromTo(
      nav,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
    )
    .fromTo(
      ".nav-logo",
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(
      ".nav-link",
      { y: -16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.08 },
      "-=0.3"
    )
    .fromTo(
      ".nav-action",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
      "-=0.2"
    );
  }, { scope: navRef });

  return (
    <>
      <nav
        ref={navRef}
        className="sticky top-0 z-50 border-b border-gray-100 opacity-0"
        style={{
          willChange: "background-color, backdrop-filter, box-shadow",
          backgroundColor: "rgba(255,255,255,1)",
        }}
      >
        <div className="flex items-center justify-between h-[70px] container">

          {/* Logo */}
          <Link href="/" className="nav-logo shrink-0">
            <Image src="/main-logo.png" alt="Logo" width={130} height={100} />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) =>
              index < 3 ? (
                <Link
                  key={link.link}
                  href={link.path}
                  className="nav-link px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
                >
                  {link.link}
                </Link>
              ) : null
            )}
          </div>

          {/* Right side actions */}
          <div className="nav-action flex items-center gap-2">

            {/* Guest CTA */}
            {!user && (
              <Link
                href="/register"
                className="hidden lg:flex items-center justify-center text-sm font-semibold h-[40px] rounded-xl px-6 bg-indigo-600 text-white transition-all duration-200 hover:bg-indigo-700 shadow-sm shadow-indigo-200"
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
      </nav>

      <ResponsiveMenu show={showMenu} setShow={setShowMenu} />
    </>
  );
};

export default Nav;