import { Axios } from "@/axios/Axios";
import { TeacherTypes } from "@/types/Types";
import Image from "next/image";
import { toast } from "react-toastify";
import { HiOutlineBan, HiOutlineTrash } from "react-icons/hi";
import { BsPersonCircle } from "react-icons/bs";
import { FaLock, FaUnlock } from "react-icons/fa6";

const SERVER_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGES_URL;

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
    // <div className="group bg-white border border-gray-200 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-lg transition duration-300">
    //   {/* Avatar and Name */}
    //   <div className="flex items-center gap-4">
    //     <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm">
    //       {teacher.avatar ? (
    //         <Image
    //           src={`${SERVER_IMAGE_URL}/${teacher.avatar}`}
    //           alt={teacher.name}
    //           width={56}
    //           height={56}
    //           className="w-full h-full object-cover"
    //         />
    //       ) : (
    //         <BsPersonCircle className="w-full h-full text-gray-400" />
    //       )}
    //     </div>
    //     <div>
    //       <h3 className="text-lg font-semibold text-gray-800">
    //         {teacher.name}
    //       </h3>
    //       <p className="text-sm text-gray-500 mt-1">
    //         {teacher.subjects?.[0]?.name || "—"}
    //       </p>
    //     </div>
    //   </div>

    //   {/* Actions */}
    //   <div className="flex gap-3 text-xl">
    //     <button
    //       onClick={() => handleBlockTeacher(teacher._id)}
    //       className="text-yellow-600 hover:text-yellow-700 transition"
    //       title="حظر المعلم"
    //     >
    //       <HiOutlineBan />
    //     </button>
    //     <button
    //       className="text-red-500 hover:text-red-600 transition"
    //       title="حذف المعلم"
    //     >
    //       <HiOutlineTrash />
    //     </button>
    //   </div>
    // </div>

    <div className="border rounded-xl p-4 shadow bg-white">
      


     <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm">
          {teacher.avatar ? (
            <Image
              src={`${SERVER_IMAGE_URL}/${teacher.avatar}`}
              alt={teacher.name}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          ) : (
            <BsPersonCircle className="w-full h-full text-gray-400" />
          )}
        </div>


      <p className="font-semibold text-lg">{teacher.name}</p>
      <p>{teacher.email}</p>
      <p>{teacher.phone}</p>
      <p className={`mt-2 font-medium ${teacher.isBlocked ? 'text-red-600' : 'text-green-600'}`}>
        {teacher.isBlocked ? 'محظور' : 'نشط'}
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
