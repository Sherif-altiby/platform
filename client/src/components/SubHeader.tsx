import Link from "next/link";
import { FaChevronLeft, FaHouse } from "react-icons/fa6";

const SubHeader = ({ currentTitle }: { currentTitle: string }) => {
  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="container">
        <div className="flex items-center gap-2 h-[52px]">
          {/* Home */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-indigo-500 hover:text-indigo-700 transition-colors duration-200"
          >
            <FaHouse className="text-xs" />
            <span>الرئيسية</span>
          </Link>

          {/* Separator */}
          <FaChevronLeft className="text-gray-300 text-xs" />

          {/* Current page */}
          <span className="text-sm font-semibold text-gray-700">
            {currentTitle}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;