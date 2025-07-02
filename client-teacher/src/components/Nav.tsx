"use client";

import Link from "next/link";
import Image from "next/image";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import BlockedPage from "./blocked";
import { useAuthUser } from "@/store/authStore";
import { useEffect } from "react";


const Nav = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : ''

  const { checkUser} = useAuthUser()

  useEffect(() => {
    checkUser()
  }, [])
  

  if (parsedUser.isBlocked) {
    return <BlockedPage />;
  }



  return (
    <>
      <nav className="shadow-md sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between h-[80px] container">

          <Link href={'/'} > <Image src={'/basira.svg'} alt="Logo" width={150}  height={100} /> </Link>


          <div>
            {!parsedUser.name && (
              <Link
                className="hidden lg:flex items-center justify-center md:text-lg xl:text-xl h-[50px] rounded-xl w-[170px] bg-hoverLinkColor border border-hoverLinkColor text-white transition-all duration-500 hover:rounded-[50px] hover:bg-white hover:text-hoverLinkColor"
                href="/register"
              >
                تسجيل الدخول
              </Link>
            )}

            <div className="flex gap-4">
              {parsedUser.name && (
                <div className="flex items-center gap-4">
                  <Link
                    href="/notifications"
                    className="w-9 h-8 text-xl lg:text-3xl lg:w-[40px] lg:h-[40px] border border-hoverLinkColor flex items-center justify-center rounded-lg text-hoverLinkColor transition-all duration-300 hover:bg-hoverLinkColor hover:text-white"
                  >
                    <IoIosNotificationsOutline />
                  </Link>
                  <Link
                    href="/profile"
                    className="w-9 h-8 text-xl lg:text-3xl lg:w-[40px] lg:h-[40px] border border-hoverLinkColor flex items-center justify-center rounded-lg text-hoverLinkColor transition-all duration-300 hover:bg-hoverLinkColor hover:text-white"
                  >
                    <CiUser />
                  </Link>
                </div>
              )}

              
            </div>
          </div>
        </div>

      </nav>
    </>
  );
};

export default Nav;
