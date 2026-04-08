const LatestNoteSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4 border-r-4 border-r-slate-200 animate-pulse mb-3">
      <div className="w-12 h-12 bg-slate-100 rounded-xl shrink-0 flex items-center justify-center">
        <div className="w-6 h-6 bg-slate-200 rounded"></div>
      </div>

      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-200 rounded-md w-3/4"></div>

        <div className="flex items-center gap-3">
          <div className="h-3 bg-slate-100 rounded-md w-20"></div>

          <div className="w-1 h-1 bg-slate-100 rounded-full"></div>

          <div className="h-3 bg-slate-100 rounded-md w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default LatestNoteSkeleton;
