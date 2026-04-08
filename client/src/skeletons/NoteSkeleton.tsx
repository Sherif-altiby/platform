const NoteSkeleton = () => {
    return (
      <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm flex flex-col items-center gap-3 animate-pulse">
        
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
          <div className="w-9 h-9 bg-slate-200 rounded-md"></div>
        </div>
  
        <div className="w-full flex flex-col items-center gap-2">
          <div className="h-3 bg-slate-200 rounded-full w-3/4"></div>
          <div className="h-3 bg-slate-200 rounded-full w-1/2"></div>
        </div>
  
        <div className="w-full h-px bg-gray-100 my-1" />
  
        <div className="w-full h-9 bg-slate-200 rounded-xl"></div>
        
      </div>
    );
  };
  
  export default NoteSkeleton;