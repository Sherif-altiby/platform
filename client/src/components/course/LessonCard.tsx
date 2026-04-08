import Link from "next/link";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { Lesson } from "@/types/Types";

 

// Helper function to extract YouTube ID from full URL
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  // Returns ID (e.g., dQw4w9WgXcQ) or null
  return (match && match[2].length === 11) ? match[2] : null; 
};

const LessonCard = ({ lesson, teacherId }: {lesson: Lesson, teacherId: string}) => {
  const videoId = getYouTubeId(lesson.videoUrl);
  const encodedUrl = encodeURIComponent(lesson.videoUrl);

  // Define dynamic href for both the image link and the button link
  const watchHref = `watch?v=${encodedUrl}&title=${encodeURIComponent(lesson.title)}`;

  // Construct the maximum resolution thumbnail URL from YouTube
  // Structure: https://img.youtube.com/vi/[VIDEO_ID]/maxresdefault.jpg
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` 
    : "/images/placeholder-lesson.jpg"; // Fallback image if ID fails

  return (
    <div className="group relative flex flex-col bg-white border border-slate-100 rounded-xl p-2 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
      
      {/* 1. Thumbnail Area (With Next.js Image) */}
      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100 mb-5">
        
        <Image 
          src={thumbnailUrl}
          alt={`Thumbnail for ${lesson.title}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false} // Use false since these are cards in a grid
        />

        {/* 2. Overlays */}
        {/* Subtle dark gradient for badge readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent z-10" />
        
        {/* Centered Play Button Overlay (Clickable Image Area) */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div 
            className="size-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl group-hover:bg-[#0066FF] group-hover:scale-110 transition-all duration-500"
          >
            <FaPlay className="text-[#0066FF] group-hover:text-white ml-1 text-xl"  size={12}/>
          </div>
        </div>
      </div>

      {/* 3. Lesson Content */}
      <div className="flex flex-col flex-1 px-2 text-right" dir="rtl">
         

        <h3 className="text-md font-black text-slate-800 leading-snug group-hover:text-[#0066FF] transition-colors duration-300 line-clamp-1">
          {lesson.title}
        </h3>
        
        <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed font-medium">
           {lesson.description || "استمتع بمشاهدة هذا الدرس التعليمي الشامل ضمن منهج العبقري."}
        </p>

        {/* 4. Footer: Internal Watch Button */}
        <div className="mt-auto pt-6">
          <Link 
             href={`/watch/${lesson._id}?teacherId=${teacherId}`}
             className="w-full py-4 rounded-2xl bg-slate-50 text-slate-900 text-xs font-black flex items-center justify-center gap-2 group-hover:bg-[#0066FF] group-hover:text-white transition-all duration-300 shadow-sm"
          >
            بدء مشاهدة الحصة
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;