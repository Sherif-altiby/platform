import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";

const LatestTeacher = ({ teacher }: { teacher: any }) => {
  return (
    <Link href={`/get-teachers/${teacher._id}`} aria-label='  المدرس  ' className="flex items-center justify-between group bg-white rounded-xl p-4 my-4">
      <div className="flex items-center gap-3">
        <Image
        //   src={teacher.image}
        src={teacher.avatar}
          alt={teacher.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          width={100}
          height={100}
        />
        <div>
          <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
            {teacher.name}
          </p>
          <p className="text-[10px] text-slate-400 font-bold">
            {teacher.subject}
          </p>
        </div>
      </div>
      <button className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
        <FaChevronLeft size={20} />
      </button>
    </Link>
  );
};

export default LatestTeacher;
