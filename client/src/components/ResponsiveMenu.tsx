import Link from "next/link";
import { navLinks } from "../data/data";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { Dispatch, SetStateAction } from "react";
import { useAuthUser } from "@/store/authStore";

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const ResponsiveMenu = ({ show, setShow }: Props) => {
  const { user } = useAuthUser();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-[999] backdrop-blur-sm transition-opacity duration-300 ${show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setShow(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[270px] bg-white z-[1000] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${show ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
          <Link href="/" onClick={() => setShow(false)}>
            <Image
              src="/logo_2.svg"
              width={100}
              height={100}
              alt="logo"
              className="w-[110px]"
            />
          </Link>
          <button
            onClick={() => setShow(false)}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
          >
            <IoClose className="text-xl" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-3 pt-5 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setShow(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
            >
              {link.link}
            </Link>
          ))}
        </nav>

        {/* Login CTA */}
        {!user && (
          <div className="px-4 pb-8">
            <Link
              href="/register"
              onClick={() => setShow(false)}
              className="flex items-center justify-center w-full h-11 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-sm shadow-indigo-200"
            >
              تسجيل الدخول
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ResponsiveMenu;