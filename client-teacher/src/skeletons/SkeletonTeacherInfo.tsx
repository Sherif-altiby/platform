
const SkeletonTeacherInfo = () => {
  return (
    <div>
      <div className='flex items-center gap-10 max-w-[700px] mx-auto mt-10 p-4 rounded-md bg-sectionbg animate-pulse'>
        <div className='w-[200px]'>
          <div className='w-[150px] h-[150px] rounded-full border-[3px] border-white bg-gray-300'></div>
        </div>
        <div className='flex-1'>
          <div className='h-6 bg-gray-300 rounded w-full mb-2'></div>
          <div className='h-6 bg-gray-300 rounded w-3/4'></div>
        </div>
      </div>

      <div className='max-w-[700px] mx-auto mt-16 flex justify-center gap-3'>
        {[...Array(3)].map((_, index) => (
          <div key={index} className='flex-1 bg-gray-100 text-center h-[100px] rounded-lg p-3 animate-pulse'>
            <div className='flex justify-center mb-4'>
              <div className='w-10 h-10 bg-gray-300 rounded'></div>
            </div>
            <div className='h-6 bg-gray-300 rounded w-1/2 mx-auto'></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkeletonTeacherInfo