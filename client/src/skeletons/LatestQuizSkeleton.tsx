const LatestQuizSkeleton = () => {
    return (
      <div className="relative flex items-center justify-between p-4 bg-white rounded-3xl shadow-sm mb-4 animate-pulse border border-slate-50">
        
        <div className="flex items-center gap-4">
          {/* Skeleton للأيقونة */}
          <div className="relative">
            <div className="w-12 h-12 bg-slate-200 rounded-2xl"></div>
            {/* نقطة الحالة الوهمية */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-slate-100 border-2 border-white rounded-full"></div>
          </div>
  
          <div className="flex flex-col gap-2">
            {/* Skeleton لاسم الاختبار */}
            <div className="h-4 bg-slate-200 rounded-md w-32"></div>
            
            {/* Skeleton لتفاصيل الكورس والمعلم */}
            <div className="flex items-center gap-2">
              <div className="h-3 bg-slate-100 rounded-md w-16"></div>
              <div className="w-1 h-1 bg-slate-100 rounded-full"></div>
              <div className="h-3 bg-slate-100 rounded-md w-20"></div>
            </div>
          </div>
        </div>
  
        {/* Skeleton لعرض النتيجة */}
        <div className="flex items-center gap-3 pr-2">
          <div className="flex flex-col items-end gap-2">
            <div className="h-5 bg-slate-200 rounded-md w-6"></div>
            <div className="h-2 bg-slate-100 rounded-md w-10"></div>
          </div>
        </div>
  
      </div>
    );
  };
  
  export default LatestQuizSkeleton;