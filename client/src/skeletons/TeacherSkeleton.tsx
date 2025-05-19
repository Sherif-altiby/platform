const TeacherSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="bg-teacherCardBg p-5 rounded-xl border border-teacherCardBg transition-all duration-300 hover:bg-white w-full animate-pulse"
        >
          <div className="bg-gray-300 rounded-md w-full h-[200px]"></div>
          <div className="mt-4 h-6 bg-gray-300 w-3/4 mx-auto rounded"></div>
          <div className="mt-3 h-5 bg-gray-300 w-1/2 mx-auto rounded"></div>
        </div>
      ))}
    </>
  );
};

export default TeacherSkeleton;
