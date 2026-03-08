"use client";

import Link from "next/link";
import Image from "next/image";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import BlockedPage from "./blocked";
import { useAuthUser } from "@/store/authStore";
import { useEffect, useState } from "react";
import { UserTypes } from "@/types/Types";

const Nav = () => {
  const [parsedUser, setParsedUser] = useState<UserTypes>();
  const { checkUser } = useAuthUser();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsed = user ? JSON.parse(user) : "";
    setParsedUser(parsed);
    checkUser();
  }, []);

  if (parsedUser?.isBlocked) return <BlockedPage />;

  return (
    <nav
      className="sticky top-0 z-50 border-b border-gray-100 bg-white"
      style={{ boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)" }}
    >
      <div className="flex items-center justify-between h-[70px] container">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image src="/main-logo.png" alt="Logo" width={130} height={100} />
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {!parsedUser?.name && (
            <Link
              href="/register"
              className="hidden lg:flex items-center justify-center text-sm font-semibold h-[40px] rounded-xl px-6 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 shadow-sm shadow-indigo-200"
            >
              تسجيل الدخول
            </Link>
          )}

          {parsedUser?.name && (
            <div className="flex items-center gap-2">
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
        </div>
      </div>
    </nav>
  );
};

export default Nav;