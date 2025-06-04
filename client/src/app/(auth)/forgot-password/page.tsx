"use client"

import MainButton from "@/components/MainButton"
import { useAuthUser } from "@/store/authStore"
import { useForm, SubmitHandler } from "react-hook-form"

type EmailT = {
    email: string
}

const Page = () => {

      const { isForgetting, userForgotPassword} = useAuthUser();

      const { register, handleSubmit, formState: { errors },} = useForm<EmailT>()    
      const onSubmit: SubmitHandler<EmailT> = async (data) => {
          if(data.email){
             await  userForgotPassword(data.email);
          }
      }

  return (
    <div className="flex items-center justify-center defualt-height" >
    <form className="w-[90%] shadow-lg max-w-[700px] mt-10 mb-10 p-5 rounded-lg" onSubmit={handleSubmit(onSubmit)} >
        <div className="text-2xl text-hoverLinkColor mb-5" >   نسيت كلمة المرمور   </div>

        <div className="flex items-start flex-col md:flex-row gap-5 mb-5" >
             

             <div className="w-full" >
               <label className="block text-grayColor text-lg mb-2" htmlFor="email"> البريد الالكتروني</label>
               <input 
                 type="text" 
                 id="email" 
                 className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor`} 
                 {...register("email")}
                 />
            </div>
             
        </div>

        {isForgetting ? (
          <MainButton text="ارسال الكود" loading />
           ) : 
          ( <MainButton text=" ارسال الكود " /> )}
     </form>
</div>
  )
}

export default Page