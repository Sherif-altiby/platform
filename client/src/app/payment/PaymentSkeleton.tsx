export default function PaymentSkeleton() {
    return (
      <div className="p-6 md:p-8 space-y-4 animate-pulse">
        {/* Title */}
        <div className="h-6 w-48 bg-slate-200 rounded mx-auto mb-6" />
  
        {/* Accordion Item 1 */}
        <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-slate-200" />
  
              <div className="space-y-2">
                <div className="h-4 w-32 bg-slate-200 rounded" />
                <div className="h-3 w-48 bg-slate-100 rounded" />
              </div>
            </div>
  
            <div className="h-4 w-4 bg-slate-200 rounded" />
          </div>
  
          {/* Content skeleton */}
          <div className="border-t border-slate-100 p-6 space-y-3">
            <div className="h-10 w-full bg-slate-100 rounded" />
            <div className="h-10 w-full bg-slate-100 rounded" />
            <div className="h-10 w-3/4 bg-slate-100 rounded" />
          </div>
        </div>
  
        {/* Accordion Item 2 */}
        <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-slate-200" />
  
              <div className="space-y-2">
                <div className="h-4 w-36 bg-slate-200 rounded" />
                <div className="h-3 w-52 bg-slate-100 rounded" />
              </div>
            </div>
  
            <div className="h-4 w-4 bg-slate-200 rounded" />
          </div>
  
          {/* Content skeleton */}
          <div className="border-t border-slate-100 p-6 space-y-3">
            <div className="h-10 w-full bg-slate-100 rounded" />
            <div className="h-10 w-full bg-slate-100 rounded" />
            <div className="h-10 w-2/3 bg-slate-100 rounded" />
          </div>
        </div>
      </div>
    );
  }