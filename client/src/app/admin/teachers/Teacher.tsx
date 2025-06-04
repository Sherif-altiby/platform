import { Axios } from "@/axios/Axios";
import { TeacherTypes } from "@/types/Types";
import Image from "next/image";
import { toast } from "react-toastify";
import { HiOutlineBan, HiOutlineTrash } from "react-icons/hi";
import { BsPersonCircle } from "react-icons/bs";
import { FaLock, FaUnlock } from "react-icons/fa6";

const Teacher = ({
  teacher,
  handleBlockTeacher,
  handleUnBlockTeacher,
}: {
  teacher: TeacherTypes;
  handleBlockTeacher: (id: string) => void;
  handleUnBlockTeacher: (id: string) => void;
}) => {

  return (
    <div className="border rounded-xl p-4 shadow bg-white">
      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm">
        {teacher.avatar ? (
          teacher.avatar?.startsWith("http") && (
            <Image
              src={teacher.avatar}
              alt={teacher.name}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          )
        ) : (
          <BsPersonCircle className="w-full h-full text-gray-400" />
        )}
      </div>

      <p className="font-semibold text-lg">{teacher.name}</p>
      <p>{teacher.email}</p>
      <p>{teacher.phone}</p>
      <p
        className={`mt-2 font-medium ${
          teacher.isBlocked ? "text-red-600" : "text-green-600"
        }`}
      >
        {teacher.isBlocked ? "محظور" : "نشط"}
      </p>

      {teacher.isBlocked ? (
        <button
          onClick={() => handleUnBlockTeacher(teacher._id)}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700"
        >
          <FaUnlock />
          فك الحظر
        </button>
      ) : (
        <button
          onClick={() => handleBlockTeacher(teacher._id)}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700"
        >
          <FaLock />
          حظر
        </button>
      )}
    </div>
  );
};

export default Teacher;
