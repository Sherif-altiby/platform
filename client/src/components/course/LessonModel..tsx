import {  MdSlowMotionVideo } from "react-icons/md";
import SubHeader from "@/components/SubHeader";


 


 

export default function LessonModel({title, embedUrl, }: {title: string, embedUrl: string}) {
 
  return (
    <main className="ctm-height bg-gray-50 flex flex-col font-kufi">
      {/* 1. Slim Header / Breadcrumbs */}
      <SubHeader currentTitle={title}   />

      {/* 2. Main Content Grid (RTL) */}
      <div className="flex-1 w-full max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 py-8 grid grid-cols-1 xl:grid-cols-[1fr,360px] gap-8">
        
        {/* --- LEFT SIDE: Video Player & Description --- */}
        <section className="flex flex-col gap-6">
          
          {/* Video Player Section with cinematic backdrop */}
          <div className="bg-white p-2 rounded-3xl shadow-lg border border-gray-100 overflow-hidden group">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-900 shadow-inner">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                // Error state if videoUrl is invalid
                <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gray-900/90 text-red-300">
                    <MdSlowMotionVideo className="text-6xl mb-4" />
                  <p className="text-sm font-medium">خطأ: رابط الفيديو غير صالح أو غير مدعوم.</p>
                </div>
              )}
            </div>
          </div>

           
        </section>

        {/* --- RIGHT SIDE: Course Playlist/Sidebar --- */}
        {/* <aside className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 xl:sticky xl:top-24 h-fit">
          <SectionHeading 
            title="محتوى الدورة" 
            description="جميع الدروس والتمارين" 
            icon={FaBars}
           />


          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map((item, index) => {
              const isActive = index === 0; // Highlight the current lesson
              return (
                <div 
                  key={item}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                    isActive 
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-lg" 
                      : "bg-white border-gray-100 hover:border-indigo-100 hover:bg-indigo-50 text-gray-700"
                  }`}
                >
                  <div className={`size-10 rounded-lg flex items-center justify-center font-bold text-sm shadow-md ${isActive ? 'bg-white text-indigo-600' : 'bg-gray-100 text-gray-900'}`}>
                    {index + 1}
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className={`text-xs font-bold leading-tight ${isActive ? 'text-white' : 'text-gray-900'}`}>
                      {index === 0 ? lessonData.title : `الدرس رقم ${item}`}
                    </span>
                    <span className={`text-[10px] ${isActive ? 'text-indigo-100' : 'text-gray-400'}`}>
                      15:32 دقيقة
                    </span>
                  </div>
                  {isActive ? (
                    <FaPlay className="text-white text-sm" />
                  ) : (
                    <div className="size-6 rounded-md bg-white border border-gray-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                       <FaArrowLeft className="text-xs" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

           
        </aside> */}

      </div>
    </main>
  );
}