const LatestLessonSkeleton = () => {
    return (
        <div className="bg-white p-5 rounded-3xl border border-slate-100 animate-pulse">
            {/* Header: Icon and Date */}
            <div className="flex justify-between items-start mb-4">
                <div className="w-9 h-9 bg-slate-200 rounded-lg"></div>
                <div className="w-16 h-3 bg-slate-200 rounded"></div>
            </div>

            {/* Lesson Title */}
            <div className="h-5 bg-slate-200 rounded-md w-3/4 mb-2"></div>

            {/* Course Title */}
            <div className="h-3 bg-slate-200 rounded-md w-1/2 mb-2"></div>

            {/* Teacher Name */}
            <div className="h-3 bg-slate-200 rounded-md w-1/3 mb-5"></div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-slate-200 h-full w-full" />
            </div>
        </div>
    )
}

export default LatestLessonSkeleton