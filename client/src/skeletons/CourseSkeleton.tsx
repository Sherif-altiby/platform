const CourseSkeleton = () => {
    return (
      <div className="relative bg-white rounded-3xl p-4 border border-slate-100 shadow-sm animate-pulse">
        
        {/* 1. Image Placeholder */}
        <div className="relative h-20 w-full rounded-3xl bg-slate-200 mb-5 overflow-hidden">
          {/* Level Badge Placeholder (Top Right) */}
          <div className="absolute top-3 right-3 w-16 h-6 rounded-xl bg-slate-300" />
        </div>
  
        {/* 2. Info Section (RTL Alignment) */}
        <div className="px-1 flex flex-col items-end">
          {/* Title Lines */}
          <div className="h-5 w-3/4 bg-slate-200 rounded-lg mb-2" />
          <div className="h-5 w-1/2 bg-slate-200 rounded-lg mb-4" />
  
          {/* Pricing Placeholder */}
          <div className="flex items-center justify-end w-full mb-4">
            <div className="h-8 w-24 bg-slate-100 rounded-xl" />
          </div>
  
          {/* 3. Action Button Placeholder */}
          <div className="mt-4 pt-4 border-t border-slate-50 w-full">
            <div className="w-full h-12 bg-slate-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  };
  
  export default CourseSkeleton;