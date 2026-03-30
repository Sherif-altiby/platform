"use client";
import SubjectCard from "@/app/subjects/SubjectCard";
import SectionHeading from "@/components/common/SectionHeading";
import Spiner from "@/components/Spiner";
import SubHeader from "@/components/SubHeader";
import { useState } from "react";
import { PiBookOpenTextLight } from "react-icons/pi";

const page = () => {

    const [isLoading, setIsLoading] = useState(false);

  return (
     <div className="ctm-height bg-gray-50">
      <SubHeader currentTitle="المواد الدراسية" />

      <div className="container py-12">
      
        <SectionHeading title="المواد الدراسية" description="اختر المادة لعرض المدرسين المتاحين" icon={PiBookOpenTextLight} />

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Spiner />
          </div>
        ) :  (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
           
              <SubjectCard
                link={"course/courseId"}
                name={'s.name'}
                length={2}
                avatar={'s.image'}
              />
        
          </div>
        ) 
        // : (
        //   <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
        //     <PiBookOpenTextLight className="text-5xl opacity-30" />
        //     <p className="text-lg">لا يوجد مواد دراسية</p>
        //   </div>
        // )
        }
      </div>
    </div>
  )
}

export default page