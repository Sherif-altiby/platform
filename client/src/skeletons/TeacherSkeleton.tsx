const TeacherSkeleton = () => {
  return (
    <div className="flex flex-col bg-white relative border border-gray-100 w-full rounded-3xl overflow-hidden shadow-sm animate-pulse">
      <div className="relative h-24 bg-gray-200" />

      <div className="absolute top-10 left-1/2 -translate-x-1/2">
        <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg bg-gray-300 rotate-3" />
      </div>

      {/* Body skeleton */}
      <div className="pt-14 pb-5 px-5 flex flex-col items-center gap-4 flex-1">
        {/* Name skeleton */}
        <div className="h-5 w-2/3 bg-gray-200 rounded-md" />

        {/* Subjects skeleton */}
        <div className="flex flex-wrap justify-center gap-1.5 w-full">
          <div className="h-6 w-16 bg-gray-100 rounded-full" />
          <div className="h-6 w-20 bg-gray-100 rounded-full" />
          <div className="h-6 w-14 bg-gray-100 rounded-full" />
        </div>

        <div className="w-full h-px bg-gray-100 mt-1" />

        <div className="h-4 w-24 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
};

export default TeacherSkeleton;