import { PiFileText } from "react-icons/pi"

const LatestNote = ({ note }: { note: any }) => {
    return (
        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4 border-r-4 border-r-orange-500 mb-3 group">

            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shrink-0   transition-colors">
                <PiFileText size={24} />
            </div>

            <div className="overflow-hidden">

                <p className="font-bold text-slate-800 truncate" title={note.noteId?.title}>
                    {note.noteId?.title || "مذكرة غير مسمى"}
                </p>


                <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-slate-400 mt-0.5">

                    <span className="text-orange-600">
                        {note.courseId?.title}
                    </span>
                    
                    <span>•</span>
                    

                    <span className="text-slate-500">
                        أ/ {note.teacherId?.name}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default LatestNote