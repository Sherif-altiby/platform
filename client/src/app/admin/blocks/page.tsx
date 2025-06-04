"use client";

import { useEffect, useState } from "react";
import { UserTypes } from "@/types/Types";
import { BsPersonCircle } from "react-icons/bs";
import { Axios } from "@/axios/Axios";
import { toast } from "react-toastify";
import Spiner from "@/components/Spiner";

const BlocksPage = () => {
  const [allUsers, setAllUsers] = useState<UserTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<"blocked" | "active">("blocked");

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await Axios.get("user/get-users");
      setAllUsers(response.data.data || []);
    } catch (error) {
      error && toast.error("فشل في جلب المستخدمين.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnblockUser = async (id: string) => {
    try {
      const res = await Axios.post("admin/unblock-user", { userId: id });
      toast.success(res.data.message);
      fetchUsers();
    } catch (error) {
      error && toast.error("حدث خطأ أثناء محاولة فك الحظر.");
    }
  };

  const handleBlockUser = async (id: string) => {
    try {
      const res = await Axios.post("admin/block-user", { userId: id });
      toast.success(res.data.message);
      fetchUsers();
    } catch (error) {
     error &&  toast.error("حدث خطأ أثناء محاولة حظر المستخدم.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers =
    view === "blocked"
      ? allUsers.filter((user) => user.isBlocked)
      : allUsers.filter((user) => !user.isBlocked);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        إدارة المستخدمين
      </h2>

      {/* Toggle Buttons */}
      <div className="flex justify-center mb-8 gap-4">
        <button
          onClick={() => setView("blocked")}
          className={`px-4 py-2 rounded-full border ${
            view === "blocked"
              ? "bg-red-600 text-white"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          المستخدمون المحظورون
        </button>
        <button
          onClick={() => setView("active")}
          className={`px-4 py-2 rounded-full border ${
            view === "active"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          المستخدمون المفعلون
        </button>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spiner />
        </div>
      ) : filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500">
          {view === "blocked"
            ? "لا يوجد مستخدمون محظورون."
            : "لا يوجد مستخدمون مفعلون."}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white p-6 rounded-xl shadow border flex flex-col gap-4"
            >
              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-300 bg-gray-100 flex justify-center items-center">
                  <BsPersonCircle className="w-10 h-10 text-gray-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">
                    {user.email || "لا يوجد بريد إلكتروني"}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 mt-2">
                {/* WhatsApp */}
                {user.phone && (
                  <a
                    href={`https://wa.me/${user.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-1.5 rounded transition"
                  >
                    واتساب
                  </a>
                )}

                {/* Block / Unblock */}
                {user.isBlocked ? (
                  <button
                    onClick={() => handleUnblockUser(user._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1.5 rounded transition"
                  >
                    فك الحظر
                  </button>
                ) : (
                  <button
                    onClick={() => handleBlockUser(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1.5 rounded transition"
                  >
                    حظر المستخدم
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlocksPage;
