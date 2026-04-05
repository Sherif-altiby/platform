import { CiSearch } from "react-icons/ci";
import { FaBookOpen } from "react-icons/fa6";

const ContentNotFound = ({text}: {text: string}) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 px-6 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-100 mt-4">
      <div className="relative mb-6">
        {/* Decorative background circle */}
        <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50 animate-pulse" />

        <div className="relative bg-white p-6 rounded-3xl shadow-sm text-slate-300">
          <CiSearch size={48} strokeWidth={1.5} />
        </div>

        <div className="absolute -bottom-2 -right-2 bg-[#0066FF] p-2 rounded-xl shadow-lg text-white">
          <FaBookOpen size={16} />
        </div>
      </div>

      <div className="text-center space-y-2" dir="rtl">
        <h3 className="text-xl font-black text-slate-800">
          {text}
        </h3>
      </div>
    </div>
  );
};

export default ContentNotFound;
