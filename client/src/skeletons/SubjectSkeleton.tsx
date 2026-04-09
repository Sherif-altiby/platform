const SubjectSkeleton = () => {
    return (
      <div className="flex flex-col bg-white border border-slate-200/60 rounded-[2rem] p-5 animate-pulse">
        {/* Container for the image/icon */}
        <div className="mx-auto w-24 h-24 rounded-[1.8rem] bg-slate-200" />
  
        {/* Title and Subtitle area */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="h-6 w-32 bg-slate-200 rounded-lg" />
          <div className="h-3 w-20 bg-slate-100 rounded-md" />
        </div>
  
        {/* Bottom action bar skeleton */}
        <div className="mt-8 w-full h-14 bg-slate-50 rounded-2xl flex items-center justify-between px-4">
          <div className="h-3 w-24 bg-slate-200 rounded-md" />
          <div className="w-8 h-8 rounded-xl bg-slate-200" />
        </div>
      </div>
    );
  };
  
  export default SubjectSkeleton;