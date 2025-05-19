"use client"

import SubHeader from "@/components/SubHeader";
import VideoPlayer from "@/components/VideoPlayer";
import { useSearchParams } from "next/navigation"

const page = () => {
 
    const searchParams = useSearchParams();

    const name = searchParams.get("teacherName");
    const videoId = searchParams.get("videoId")

  return (
    <div className="ctm-height" >
         <SubHeader currentTitle={`أ/ ${name}`} />
         <div className="container">
               <div className="w-full max-w-[800px] h-[500px] mx-auto mt-10 mb-20 rounded-md overflow-hidden" > 
                  <VideoPlayer videoId={videoId || ""} /> 
               </div>
         </div>
    </div>
  )
}

export default page