const LatestTeacherSkeleton = () => {
    return (
      <div className="flex items-center justify-between animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 shadow-sm"></div>
          
          <div className="space-y-2">
            <div className="h-3 w-24 bg-slate-200 rounded"></div>
            <div className="h-2 w-16 bg-slate-100 rounded"></div>
          </div>
        </div>
        
        <div className="p-2">
          <div className="w-5 h-5 bg-slate-100 rounded-full"></div>
        </div>
      </div>
    );
  };
  
  export default LatestTeacherSkeleton;