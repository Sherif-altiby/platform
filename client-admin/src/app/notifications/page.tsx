import SubHeader from "@/components/SubHeader"
// import { IoCloseSharp } from "react-icons/io5";
// import { MdNotificationsActive } from "react-icons/md";

const Page = () => {
  return (
    <div className="ctm-height" >
          <SubHeader currentTitle="الاشعارات" />

          <div className="container pb-4 pt-4">
                  {/* <div className="p-3  mb-2  rounded-md shadow-md flex items-start flex-col md:flex-row relative justify-between gap-4" >
                          <div className="text-2xl text-blue-500" > <MdNotificationsActive /> </div>
                          <p className="text-center text-lg text-gray-500" > Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi eaque, maxime dolores eligendi molestias accusantium totam ab consequuntur explicabo obcaecati, culpa odio minus? Praesentium qui iure, est ex quod doloremque. </p>
                          <div className="text-2xl text-red-500 cursor-pointer absolute md:relative top-2 left-2  md:top-auto md:left-auto" > <IoCloseSharp /> </div>
                  </div> */}

                  <p className="text-center text-xl text-gray-600" > لا يوجد اشعارات حاليا </p>
          </div>
    </div>
  )
}

export default Page