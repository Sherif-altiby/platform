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
        className={`fixed inset-0 z-[999] bg-indigo-500/10 backdrop-blur-sm transition-all duration-500 ${
          show
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShow(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] z-[1000] bg-white flex flex-col shadow-2xl shadow-indigo-100 border-l border-indigo-50 transition-transform duration-500 ease-in-out ${
          show ? "translate-x-0" : "translate-x-[120%]"
        }`}
      >
        {/* Decorative top bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-violet-400" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-7 pb-5 border-b border-slate-100">
          <Link href="/" onClick={() => setShow(false)}>
            <Image
              src="/main-logo.png"
              width={100}
              height={100}
              alt="logo"
              className="w-[105px]"
            />
          </Link>
          <button
            onClick={() => setShow(false)}
            className="flex items-center justify-center w-[34px] h-[34px] rounded-xl border border-slate-200 bg-slate-50 text-slate-400 hover:border-indigo-200 hover:text-indigo-500 hover:bg-indigo-50 transition-all duration-200"
          >
            <IoClose className="text-[17px]" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-3 pt-5 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setShow(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-200 shrink-0" />
              <span className="text-sm font-medium">{link.link}</span>
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-5 my-4 h-px bg-slate-100" />

        {/* Login CTA */}
        {!user && (
          <div className="px-4 pb-8">
            <Link
              href="/register"
              onClick={() => setShow(false)}
              className="flex items-center justify-center w-full h-[46px] rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-200"
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
