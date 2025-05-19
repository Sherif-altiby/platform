"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TeacherTypes, UserTypes } from "@/types/Types";
import { BsPersonCircle } from "react-icons/bs";
import { Axios } from "@/axios/Axios";
import { toast } from "react-toastify";
import { useTeacherStore } from "@/store/teacherStore";
import Spiner from "@/components/Spiner";

const SERVER_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGES_URL;

const BlocksPage = () => {
  const [view, setView] = useState<"teachers" | "users">("teachers");
  const [blockedUsers, setBlockedUsers] = useState<UserTypes[]>([]);

  const { getTeachers, isFetchingTeachers, teachers } = useTeacherStore();

  useEffect(() => {
    getTeachers();
  }, []);

  const fetchBlockedUsers = async () => {
    try {
      const response = await Axios.get("user/get-users");
      const users: UserTypes[] = response.data.data;
      const blocked = users.filter(user => !user.isBlocked);
      setBlockedUsers(blocked);
    } catch (error) {
      toast.error("فشل في جلب المستخدمين المحظورين.");
    }
  };
  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  const handleUnBlockTeacher = async (id: string) => {
    try {
      const res = await Axios.post("admin/unblock-teacher", { teacherId: id });
      await getTeachers();
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء محاولة فك الحظر.");
    }
  };

  const handleUnBlockUser = async (id: string) => {
    try {
      const res = await Axios.post("admin/unblock-user", { userId: id });
      await fetchBlockedUsers();
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء محاولة فك الحظر.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">المحظورون</h2>

      {/* Toggle */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setView("teachers")}
          className={`px-4 py-2 rounded-l-full border border-gray-300 ${
            view === "teachers" ? "bg-blue-600 text-white" : "bg-white text-gray-600"
          }`}
        >
          المعلمون
        </button>
        <button
          onClick={() => setView("users")}
          className={`px-4 py-2 rounded-r-full border border-gray-300 ${
            view === "users" ? "bg-blue-600 text-white" : "bg-white text-gray-600"
          }`}
        >
          المستخدمون
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 gap-4">
        {view === "teachers" ?
         ( isFetchingTeachers ? ( <div> <Spiner /> </div> ) : (
            teachers && (
                teachers
            .filter((teacher) => teacher.isBlocked)
            .map((teacher) => (
              <div
                key={teacher._id}
                className="flex items-center justify-between bg-white p-4 rounded-xl shadow border"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300">
                    {teacher.avatar ? (
                      <Image
                        src={`${SERVER_IMAGE_URL}/${teacher.avatar}`}
                        alt={teacher.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <BsPersonCircle className="w-full h-full text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{teacher.name}</p>
                    <p className="text-sm text-gray-500">
                      {teacher.subjects?.[0]?.name ?? "بدون مادة"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleUnBlockTeacher(teacher._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                >
                  فك الحظر
                </button>
              </div>
            ))
            )
          )) : (null)
        }

        {view === "users" &&
          blockedUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow border"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300">
                    <BsPersonCircle className="w-full h-full text-gray-400" />
                </div>
                <p className="font-medium text-gray-800">{user.name}</p>
              </div>
              <button
                  onClick={() => handleUnBlockUser(user._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                >
                  فك الحظر
                </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlocksPage;
