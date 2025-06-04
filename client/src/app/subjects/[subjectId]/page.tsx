"use client";

import SubHeader from "@/components/SubHeader";
import { useSearchParams } from "next/navigation";
import { Axios } from "@/axios/Axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SubjectTypes } from "@/types/Types";
import Image from "next/image";
import Link from "next/link";
import Spiner from "@/components/Spiner";

const Page = () => {
  const params = useSearchParams();
  const subName = params.get("subName") || "";
  const subId = params.get("subId");

  const [subject, setSubject] = useState<SubjectTypes>();

  const getSubDetails = async () => {
    try {
      const res = await Axios.post("user/get-subject-details", { subId });
      setSubject(res.data.data);
    } catch (error) {
      toast.error("فشل في جلب بيانات المادة");
    }
  };

  useEffect(() => {
    if (subId) getSubDetails();
  }, [subId]);

  return (
    <div className="ctm-height">
      <SubHeader currentTitle={subName} />

      <div className="container py-10">
        {subject ? (
          <div className="flex flex-col items-center animate-fadeIn">
            {/* Subject Image */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-blue-200 shadow-md transition-transform duration-500 hover:scale-105">
             {subject.image?.startsWith("http") &&  <Image
                src={subject.image}
                alt={subject.name}
                fill
                className="object-cover"
              />}
            </div>

            {/* Subject Name */}
            <h2 className="mt-6 text-3xl font-extrabold text-gray-800 tracking-tight">
              {subject.name}
            </h2>

            {/* Teacher Count */}
            <p className="text-gray-500 mt-2 mb-8 text-lg">
              {subject.teachers.length} معلم
            </p>

            {/* Teachers Grid */}
            {subject.teachers.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
                {subject.teachers.map((t) => (
                  <Link
                    href={`/get-teachers/${t._id}?name=${t.name}`}
                    key={t._id}
                    className="group bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Avatar */}
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-100 shadow-sm mb-4 transition-transform duration-300 group-hover:scale-105">
                        <img
                          src={
                            t.avatar
                              ? `${t.avatar}`
                              : "/default-avatar.png"
                          }
                          alt={t.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Name */}
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {t.name}
                      </h3>

                      {/* CTA */}
                      <button className="mt-4 text-sm px-4 py-1.5 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300">
                        عرض التفاصيل
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-10">
                لا يوجد معلمين متاحين حالياً.
              </p>
            )}
          </div>
        ) : (
          <p className="flex items-center justify-center"> <Spiner/> </p>
        )}
      </div>
    </div>
  );
};

export default Page;
