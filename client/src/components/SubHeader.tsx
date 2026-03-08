import Link from "next/link";
import { FaChevronLeft, FaHouse } from "react-icons/fa6";

const SubHeader = ({ currentTitle }: { currentTitle: string }) => {
  return (
    <div className="bg-gray-100 border-b border-gray-200">
      <div className="container">
        <div className="flex items-center gap-3 h-[54px]">
          {/* Home */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors duration-200"
          >
            <div className="w-6 h-6 rounded-md bg-white shadow-sm flex items-center justify-center">
              <FaHouse className="text-[10px] text-gray-400" />
            </div>
            <span>الرئيسية</span>
          </Link>

          {/* Separator */}
          <FaChevronLeft className="text-gray-300 text-[10px]" />

          {/* Current page */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            <span className="text-sm font-semibold text-gray-700 tracking-wide">
              {currentTitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;