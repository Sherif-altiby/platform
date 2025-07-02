const StaticsSkeleton = () => {
  return (
    <div className="animate-pulse" >
        <div className="mb-5 bg-gray-100 rounded-lg p-3" >
         
        <div className="bg-white rounded-md p-5 flex items-center gap-5">
              <div className="w-10 h-10 rotate-45 bg-gray-300 flex items-center justify-center rounded-md " >
              </div>
              <p className=" rounded-md  w-[90%] h-7 bg-gray-200 " ></p>
        </div>


        <div className="flex items-end gap-5 mt-5 flex-col md:flex-row flex-wrap lg:flex-nowrap" >

           <div className="bg-white rounded-md w-full md:w-[calc(50%-20px)] lg:w-1/3 p-5 flex items-center gap-5">
               <div className="w-10 h-10 rotate-45 bg-gray-300 flex items-center justify-center rounded-md " >
                   <span className="rotate-[-45deg]" >   </span>
               </div>
               <p className=" rounded-md  w-[90%] h-7 bg-gray-200 " ></p>
           </div>

           <div className="bg-white rounded-md w-full md:w-[calc(50%-20px)] lg:w-1/3 p-5 flex items-center gap-5">
               <div className="w-10 h-10 rotate-45 bg-gray-300 flex items-center justify-center rounded-md " >
                   <span className="rotate-[-45deg]" >    </span>
               </div>
               <p className=" rounded-md  w-[90%] h-7 bg-gray-200 " ></p>
           </div>

           <div className="bg-white rounded-md w-full md:w-[calc(50%-20px)] lg:w-1/3 p-5 flex items-center gap-5">
               <div className="w-10 h-10 rotate-45 bg-gray-300 flex items-center justify-center rounded-md " >
                   <span className="rotate-[-45deg]" >    </span>
               </div>
               <p className=" rounded-md  w-[90%] h-7 bg-gray-200 " ></p>
           </div>

        </div>

    </div>
    </div>
  )
}

export default StaticsSkeleton