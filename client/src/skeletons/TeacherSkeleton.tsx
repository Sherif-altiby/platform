const TeacherCardSkeleton = () => {
  return (
    <div className="relative flex flex-col bg-white rounded-[2.5rem] p-4 border border-slate-100 overflow-hidden animate-pulse">
      
      {/* Image Section */}
      <div className="relative h-64 w-full rounded-[2rem] overflow-hidden bg-slate-200 mb-6">
        {/* Badge */}
        <div className="absolute top-4 right-4 z-20 h-8 w-24 rounded-xl bg-slate-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-2 pb-2">
        
        {/* Subjects */}
        <div className="flex justify-end gap-2 mb-4">
          <div className="h-6 w-20 rounded-lg bg-slate-200" />
          <div className="h-6 w-16 rounded-lg bg-slate-200" />
        </div>

        {/* Teacher Name */}
        <div className="h-7 w-40 rounded-md bg-slate-200 mb-4 ml-auto" />

        {/* About */}
        <div className="space-y-2 mb-6">
          <div className="h-3 w-full rounded bg-slate-200" />
          <div className="h-3 w-5/6 rounded bg-slate-200" />
        </div>

        {/* Footer */}
        <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
          
          {/* View Profile */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-slate-200" />
            <div className="h-4 w-24 rounded bg-slate-200" />
          </div>

          {/* Avatars */}
          <div className="flex -space-x-2 space-x-reverse">
            <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white" />
            <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white" />
            <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white" />
            <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCardSkeleton;