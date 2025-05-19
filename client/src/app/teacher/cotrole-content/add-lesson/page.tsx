"use client"

import { Axios } from "@/axios/Axios"
import ButtonLoader from "@/components/ButtonLoader"
import MainButton from "@/components/MainButton"
import { LessonInputs, lessonschema } from "@/validations/lessonValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"


const page = () => {

  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset} = useForm<LessonInputs>({
        mode: "onBlur",
        resolver: zodResolver(lessonschema)
  })

  const onSubmit: SubmitHandler<LessonInputs> = async (data) => {
   await uploadLesson(data)
   reset()
  }

  const uploadLesson = async ( lesson: LessonInputs ) => {
      setLoading(true);
      try {
         
        const res = await Axios.post('teacher/upload-video', lesson);
        toast.success(res.data.message);

        

      } catch (error: any) {
        console.log(error.response)
          toast.error(error.response.data.message)
      } finally {
        setLoading(false);
      }
  }

  return (
    <div className="flex items-center justify-center" >
         <form className="w-[90%] shadow-lg max-w-[700px] p-5 rounded-lg bg-white" onSubmit={handleSubmit(onSubmit)} >
             <div className="text-2xl text-hoverLinkColor mb-5" >  اضافة درس جديد  </div>

             <div className="flex items-start flex-col md:flex-row gap-5 mb-5" >
                  <div className="w-full md:w-1/2" >
                      <label className="block text-grayColor text-lg mb-2" htmlFor="name">   عنوان الدرس </label>
                      <input 
                        type="text" 
                        id="name" 
                        className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor`} 
                        {...register("title")}
                        />
                        <span className="text-red-500 text-sm"> { errors.title?.message } </span>
                  </div>

                  <div className="w-full md:w-1/2" >
                    <label className="block text-grayColor text-lg mb-2" htmlFor="link">  لينك اليوتيوب  </label>
                    <input 
                      type="text" 
                      id="link" 
                      className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor`} 
                      {...register("link")}
                      />
                      <span className="text-red-500 text-sm"> { errors.link?.message } </span>
                  </div>
             </div>

             <div className="flex items-start flex-col md:flex-row gap-5 mb-5" >
                  <div className="w-full" >
                    <label className="block text-grayColor text-lg mb-2" htmlFor="level"> الصف الدراسي </label>
                     <select 
                       id="level" 
                       className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor `}
                       {...register("level")}
                       >
                         <option value="first"> الصف الاول الثانوي </option>
                         <option value="second"> الصف الثاني الثانوي </option>
                         <option value="third"> الصف الثالث الثانوي </option>
                     </select>
                     <span className="text-red-500 text-sm"> { errors.level?.message } </span>
                  </div>
             </div>

             <div className="flex items-start flex-col md:flex-row gap-5 mb-5" >
                   <div className="w-full" >
                      <label className="block text-grayColor text-lg mb-2" htmlFor="desc">  الشرح (اختياري) </label>
                      <textarea 
                        id="desc" 
                        className={`border rounded-md p-2 block h-[100px] w-full transition-all duration-300 focus:border-hoverLinkColor`} 
                        {...register("description")}
                        >
                      </textarea>
                      <span className="text-red-500 text-sm"> { errors.description?.message } </span>
                  </div>
             </div>
             {!loading ? (<MainButton text=" أضف"/> ) : (
                  <>
                      <button className="flex items-center justify-center md:text-lg  h-[50px] rounded-xl w-full sm:w-[170px] bg-hoverLinkColor border border-hoverLinkColor text-white transition-all duration-500 hover:rounded-[50px] gap-2" disabled >
                            <p> أضف </p>
                          <ButtonLoader />
                    </button>
                  </>
            )}
         </form>
    </div>
  )
}

export default page