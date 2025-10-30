"use client";

import SubHeader from '@/components/SubHeader';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { CiVideoOff } from "react-icons/ci";
import { PiNotepadThin } from "react-icons/pi";
import { CiSquareQuestion } from "react-icons/ci";
import SkeletonTeacherInfo from '../../../skeletons/SkeletonTeacherInfo';
import { useQuery } from '@tanstack/react-query';
import { getTeacherById } from '@/app/utils/teacherFeatuers';
import { TeacherTypes } from '@/types/Types';

const Page = () => {
  const { teacherId } = useParams();
  const searchParams = useSearchParams();

  const name = searchParams.get('name');


  const {data: teacher, isLoading} = useQuery({
    queryKey: ['teacher'],
    queryFn: async () => {
      const res = await getTeacherById(teacherId as string)
      return res.data as TeacherTypes
    }
  })

  return (
    <div className="ctm-height bg-white">
      <SubHeader currentTitle={`أ/ ${name}`} />
      <div className="container max-w-screen-lg mx-auto px-4">
        {isLoading ? (
          <SkeletonTeacherInfo />
        ) : (
          <>
            <div className="flex flex-col md:flex-row items-center gap-5 max-w-3xl mx-auto mt-10 p-6 rounded-xl bg-white shadow-xl opacity-0 animate-fadeInUp">
              <div className="w-[200px]">
                { teacher?.avatar?.startsWith("http") &&  <Image
                  src={teacher?.avatar}
                  alt="Teacher Image "
                  height={300}
                  width={300}
                  className="w-full md:min-w-[150px] h-[200px] rounded-lg border-4 border-gradient-to-r from-blue-500 to-green-400 object-cover shadow-xl transition-all duration-500 ease-in-out transform hover:scale-110"
                />}
              </div>
              <div className="flex-1">
                <p className="text-gray-700 text-sm md:text-lg text-justify">{teacher?.about}</p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto mt-16 mb-10 grid sm:grid-cols-3 gap-6">
              <Link
                href={`/get-teachers/videos?teacherName=${name}&teacherId=${teacherId}`}
                className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center h-[120px] rounded-xl p-4 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-xl hover:shadow-2xl opacity-0 animate-fadeInLeft"
              >
                <div>
                  <div className="text-4xl mb-4">
                    <CiVideoOff />
                  </div>
                  <p className="font-semibold">الدروس</p>
                </div>
              </Link>

              <Link
                href={`/get-teachers/notes?teacherName=${name}&teacherId=${teacherId}`}
                className="flex items-center justify-center bg-gradient-to-r from-yellow-500 to-orange-400 text-white text-center h-[120px] rounded-xl p-4 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-xl hover:shadow-2xl opacity-0 animate-fadeInUp"
              >
                <div>
                  <div className="text-4xl mb-4">
                    <PiNotepadThin />
                  </div>
                  <p className="font-semibold">المذكرات</p>
                </div>
              </Link>

              <Link
                href={`/get-teachers/quizzes?teacherName=${name}&teacherId=${teacherId}`}
                className="flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-400 text-white text-center h-[120px] rounded-xl p-4 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-xl hover:shadow-2xl opacity-0 animate-fadeInRight"
              >
                <div>
                  <div className="text-4xl mb-4">
                    <CiSquareQuestion />
                  </div>
                  <p className="font-semibold">الاختبارات</p>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
