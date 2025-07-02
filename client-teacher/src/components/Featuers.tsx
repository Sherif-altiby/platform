import { GiTeacher } from "react-icons/gi";
import { IoBookSharp } from "react-icons/io5";
import { PiExamFill, PiNotepadFill } from "react-icons/pi";
import Heading from "./Heading";


const Featuers = () => {
  return (
    <div className="bg-cyan-50 pt-10 pb-10" >
         <div className="container">
              <div>
                  <Heading title="ما يميزنا " />

                  <div className="flex gap-5 mt-5 flex-wrap">
                       
                       <div className="bg-white p-5 rounded-md transition-all duration-300 text-center w-full sm:w-[calc(100%/2-20px)] md:w-[calc(100%/3-20px)] lg:w-[calc(100%/4-20px)]" >
                               <div className="w-10 h-10 flex items-center justify-center mx-auto mb-5 rounded-full bg-cyan-400 text-white text-xl" > <GiTeacher /> </div>
                               <div className="text-xl mb-5 text-hoverLinkColor" > المدرسين </div>
                               <p className="text-grayColor" > يوجد كوكبة من افضل المدرسين في جميع المواد التعليمية</p>
                       </div>
                       
                       <div className="bg-white p-5 rounded-md transition-all duration-300 text-center w-full sm:w-[calc(100%/2-20px)] md:w-[calc(100%/3-20px)] lg:w-[calc(100%/4-20px)]" >
                               <div className="w-10 h-10 flex items-center justify-center mx-auto mb-5 rounded-full bg-cyan-400 text-white text-xl" > <IoBookSharp /> </div>
                               <div className="text-xl mb-5 text-hoverLinkColor" > الدروس </div>
                               <p className="text-grayColor" > شرح مبسط عن طريق تقديم فديوهات تعليمية مع نخبة من المدرسين الخبراء </p>
                       </div>
                       
                       <div className="bg-white p-5 rounded-md transition-all duration-300 text-center w-full sm:w-[calc(100%/2-20px)] md:w-[calc(100%/3-20px)] lg:w-[calc(100%/4-20px)]" >
                               <div className="w-10 h-10 flex items-center justify-center mx-auto mb-5 rounded-full bg-cyan-400 text-white text-xl" > <PiExamFill /> </div>
                               <div className="text-xl mb-5 text-hoverLinkColor" > الاختبارات </div>
                               <p className="text-grayColor" > اختبارات تفاعلية و تمارين دورية للتاكد من مدى فهمك و قياس جودة الشرح </p>
                       </div>
                       
                       <div className="bg-white p-5 rounded-md transition-all duration-300 text-center w-full sm:w-[calc(100%/2-20px)] md:w-[calc(100%/3-20px)] lg:w-[calc(100%/4-20px)]" >
                               <div className="w-10 h-10 flex items-center justify-center mx-auto mb-5 rounded-full bg-cyan-400 text-white text-xl" > <PiNotepadFill /> </div>
                               <div className="text-xl mb-5 text-hoverLinkColor" > المذكرات </div>
                               <p className="text-grayColor" > يوجد كوكبة من افضل المدرسين في جميع المواد التعليمية</p>
                       </div>

                  </div>
              </div>
         </div>
    </div>
  )
}

export default Featuers