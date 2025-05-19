"use client"
import Link from "next/link"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInputs, loginSchema } from "@/validations/loginValidation";
import { useAuthUser } from "@/store/authStore";
import ButtonLoader from "@/components/ButtonLoader";
import { useRouter } from "next/navigation";


const Login = () => {

      const router = useRouter()
      const { isLogin, isRegister, userLogin } = useAuthUser()

      const { register, handleSubmit, formState: { errors },} = useForm<LoginInputs>({
        mode: "onBlur",
        resolver: zodResolver(loginSchema)
      })
    
      const onSubmit: SubmitHandler<LoginInputs> = async (data) =>  {
        const res = await userLogin(data.email, data.password);

        

        if (res.status){
          router.push('/')
        }
      }

  return (
    <div className="flex items-center justify-center defualt-height" >
    <form className="w-[90%] shadow-lg max-w-[700px] mt-10 mb-10 p-5 rounded-lg" onSubmit={handleSubmit(onSubmit)} >
        <div className="text-2xl text-hoverLinkColor mb-5" >  تسجيل الدخول </div>

        <div className="flex items-start flex-col md:flex-row gap-5 mb-5" >
             

             <div className="w-full md:w-1/2" >
               <label className="block text-grayColor text-lg mb-2" htmlFor="email"> البريد الالكتروني</label>
               <input 
                 type="text" 
                 id="email" 
                 className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor ${errors.email && 'border-red-700'} `} 
                 {...register("email")}
                 />
                 <span className="text-red-500 text-sm" > { errors.email?.message } </span>
             </div>
  
             <div className="w-full md:w-1/2" >
                 <label className="block text-grayColor text-lg mb-2" htmlFor="password">   كلمة المرور </label>
                 <input 
                    type="password" 
                    id="password" 
                    className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor ${errors.password && 'border-red-700'} `} 
                    {...register("password")}
                    />
                    <span className="text-red-500 text-sm" > {errors.password?.message} </span>
             </div>

             
        </div>

        {isLogin ? (
           <button className="flex items-center justify-center md:text-lg  h-[50px] rounded-xl w-full sm:w-[170px] bg-hoverLinkColor border border-hoverLinkColor text-white transition-all duration-500 hover:rounded-[50px] gap-2" disabled >
              <p> تسجيل الدخول  </p>
             <ButtonLoader />
       </button>
        ) : (
          
         <button className="flex items-center justify-center md:text-lg   h-[50px] rounded-xl w-full sm:w-[170px] bg-hoverLinkColor border border-hoverLinkColor text-white transition-all duration-500 hover:rounded-[50px] hover:bg-white hover:text-hoverLinkColor" >
              تسجيل الدخول 
          </button>
        )}

        <div className="flex items-center justify-center gap-1 mt-5 text-lg" >
             <p> ليس لديك حساب ؟ </p>
             <Link href={"/register"} className="text-hoverLinkColor" >   انشاء حساب </Link>
        </div>

        <Link  className="text-center block text-lg underline text-hoverLinkColor" href={'/forgot-password'} > نسيت كلمة المرور ؟</Link>
    </form>
</div>
  )
}

export default Login