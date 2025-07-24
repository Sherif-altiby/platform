"use client";

import Link from "next/link";
import { navLinks } from "../data/data";
import { FaBars } from "react-icons/fa6";
import Image from "next/image";
import { useEffect, useState } from "react";
import ResponsiveMenu from "./ResponsiveMenu";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import BlockedPage from "./blocked";
import { UserTypes } from "@/types/Types";
import { useRouter } from 'next/navigation'


const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState<UserTypes>();
  const [block, setBlock] = useState(false);

  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const isLogin = localStorage.getItem("isLogin");

    if(isLogin && !JSON.parse(isLogin)){
         router.push('/login')
    }

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setBlock(parsedUser?.isBlocked);
    }
  }, []);

  if (block) {
    return <BlockedPage />;
  }



  return (
    <>
      <nav className="shadow-md sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between h-[80px] container">

          <Link href={'/'} > <Image src={'/basira.svg'} alt="Logo" width={150}  height={100} /> </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) =>
              index < 3 ? (
                <Link
                  className="md:text-lg xl:text-xl text-grayColor transition duration-200 hover:text-hoverLinkColor"
                  href={link.path}
                  key={link.link}
                >
                  {link.link}
                </Link>
              ) : null
            )}
          </div>

          <div>
            {!user && (
              <Link
                className="hidden lg:flex items-center justify-center md:text-lg xl:text-xl h-[50px] rounded-xl w-[170px] bg-hoverLinkColor border border-hoverLinkColor text-white transition-all duration-500 hover:rounded-[50px] hover:bg-white hover:text-hoverLinkColor"
                href="/register"
              >
                تسجيل الدخول
              </Link>
            )}

            <div className="flex gap-4">
              {user && (
                <div className="hidden lg:flex items-center gap-4">
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

              <div
                className="flex lg:hidden items-center justify-center border border-hoverLinkColor rounded-md cursor-pointer text-hoverLinkColor w-9 h-8 text-xl transition-all duration-300 hover:text-white hover:bg-hoverLinkColor"
                onClick={() => setShowMenu(!showMenu)}
              >
                <FaBars />
              </div>
            </div>
          </div>
        </div>

        <ResponsiveMenu show={showMenu} setShow={setShowMenu} />
      </nav>
    </>
  );
};

export default Nav;
