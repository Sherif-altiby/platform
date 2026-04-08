import { CiLock } from "react-icons/ci";
import { FaPlayCircle } from "react-icons/fa";

const LatestLesson = ({ lesson }: { lesson: any }) => {
  const formattedDate = new Date(lesson.updatedAt).toLocaleDateString("ar-EG", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-100    ">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg   transition-colors">
          <FaPlayCircle size={20} />
        </div>
        <span className="text-[10px] font-black text-slate-400 flex items-center gap-1">
          <CiLock size={12} /> {formattedDate}
        </span>
      </div>

      <h3
        className="font-bold text-slate-800 line-clamp-1 mb-1"
        title={lesson.lessonId?.title}
      >
        {lesson.lessonId?.title || "درس غير معروف"}
      </h3>

      <p className="text-[11px] font-medium text-indigo-600 mb-1">
        {lesson.courseId?.title}
      </p>

      <p className="text-xs text-slate-500 mb-4">
        مدرس: {lesson.teacherId?.name}
      </p>

      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div className="bg-indigo-600 h-full rounded-full w-full" />
      </div>
    </div>
  );
};

export default LatestLesson;
