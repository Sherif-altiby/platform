"use client"

import { IoClose } from "react-icons/io5"
import { SubmitHandler, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MainButton from "@/components/MainButton";
import { useTeacherStore } from "@/store/teacherStore";
import { SubjectTypes } from "@/types/Types";
import { Axios } from "@/axios/Axios";
import { toast } from "react-toastify";

 type AddTeacherTypes = {
    name: string;
    phone: string;
    email: string;
    password: string;
    subId: string;
    avatar: string;
    about: string;
 }

const AddTeacher = ( {closeModal}: {closeModal: Dispatch<SetStateAction<boolean>>} ) => {

    const { addTeacher} = useTeacherStore()

    const { register, handleSubmit, reset} = useForm<AddTeacherTypes>({
        mode: "onBlur",
    })

    const onSubmit: SubmitHandler<AddTeacherTypes> = async (data) =>{
         addTeacher(data.name, data.phone, data.email, data.password, data.subId, data.avatar[0], data.about)
         reset();
    }

    const [subjects, setSubjects] = useState<SubjectTypes[]>([]);
    
      const getSubjects = async () => {
        try {
          const res = await Axios.get(`user/get-subjects`);
    
          setSubjects(res.data.data);
        } catch {
            toast.error("حدث خطأ")
        }  
      };
    
      useEffect(() => {
        getSubjects();
      }, []);

  return (
    <div className="fixed top-0 left-0 p-5 min-h-[100vh] w-full z-50 bg-[rgba(223,223,223,0.32)] flex items-center justify-center" >
          <div className="bg-white shadow-xl w-[95%] max-w-[800px] p-3 rounded-md relative">
                 <div className="absolute top-2 right-2 text-3xl text-gray-700 cursor-pointer" onClick={() => closeModal(false)} > <IoClose /> </div>
                 <form className="" onSubmit={handleSubmit(onSubmit)} >
                            <div className="text-2xl text-hoverLinkColor mb-5 text-center" > اضف مدرس </div>

                            <div className="grid grid-cols-2 gap-3 mb-2" >
                                       
                                       <div>
                                            <label htmlFor="teacherName" className="block text-grayColor text-lg mb-2"> اسم المدرس </label>
                                            <input 
                                                type="text" 
                                                id="teacherName" 
                                                className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor `} 
                                                {...register("name")}
                                            />
                                       </div>
                                       
                                       <div>
                                            <label htmlFor="teacherPhone" className="block text-grayColor text-lg mb-2">   رقم التلفون </label>
                                            <input 
                                                type="number" 
                                                id="teacherPhone" 
                                                className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor `} 
                                                {...register("phone")}
                                            />
                                       </div>
                                       
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-2" >
                                       
                                       <div>
                                            <label htmlFor="teacherEmail" className="block text-grayColor text-lg mb-2">  البريد الالكتروني </label>
                                            <input 
                                                type="text" 
                                                id="teacherEmail" 
                                                className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor `} 
                                                {...register("email")}
                                            />
                                       </div>
                                       
                                       <div>
                                            <label htmlFor="teacherPass" className="block text-grayColor text-lg mb-2">  كلمة المرور </label>
                                            <input 
                                                type="password" 
                                                id="teacherPass" 
                                                className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor `} 
                                                {...register("password")}
                                            />
                                       </div>
                                       
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-2" >
                                       
                                       <div>
                                            <label htmlFor="teacherSub" className="block text-grayColor text-lg mb-2"> المادة الدراسية </label>
                                            
                                            <select 
                                                id="teacherSub"
                                                className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor `} 
                                                {...register("subId")}
                                            >
                                                {subjects.map((sub) => (
                                                  <option value={sub._id} key={sub._id}> {sub.name} </option>
                                                ))}
                                            </select>
                                       </div>
                                       
                                       <div>
                                            <label htmlFor="teacherAvatar" className="block text-grayColor text-lg mb-2">  صورةالمدرس </label>
                                            <input 
                                                type="file" 
                                                id="teacherAvatar" 
                                                className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor `} 
                                                {...register("avatar")}
                                            />
                                       </div>
                                       
                            </div>

                            <div className="mb-2" >
                                          <label htmlFor="teacherAbout" className="block text-grayColor text-lg mb-2">  عن المدرس </label>
                                            <textarea 
                                                id="teacherAbout"
                                                className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor `} 
                                                {...register("about")}
                                            ></textarea>
                            </div>

                            <MainButton text="اضف" />
                 </form>
          </div>
    </div>
  )
}

export default AddTeacher