import { Axios } from '@/axios/Axios';
import MainButton from '@/components/MainButton'
import React, { useState } from 'react'
import { GoEyeClosed } from 'react-icons/go';
import { toast } from 'react-toastify';

const ChangePassword = () => {

     const [loading, setLoading] = useState(false);
     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("")

     const [showPassword, setShowPassword] = useState(false)
     const [showConfirmPassword, setShowConfirmPassword] = useState(false)

     const changePassword = async (e: React.FormEvent) => {
             e.preventDefault()
             setLoading(true)
     
             try {
                if(confirmPassword.length >= 8 && password.length >= 8){
                    const res = await Axios.post('user/change-password', {
                        password,
                        confirmPassword
                     })
        
                     toast.success(res.data.message)
                     setPassword("")
                     setConfirmPassword("")
                }
             } catch (error: any) {
                  console.log(error)
                  toast.error(error.response.data.message)
             } finally{
                 setLoading(false)
             }
         }

  return (
     <form className="w-[90%] shadow-lg max-w-[700px] mt-10 mb-10 p-5 rounded-lg ml-auto mr-auto" onSubmit={changePassword} >
                 <p className='text-xl text-center border-b pb-3 text-gray-500 mb-4' > تغيير كلمة المرور </p>
                 <div className="flex items-start flex-col md:flex-row gap-5 mb-5" >
                      <div className="w-full md:w-1/2" >
                          <label className="block text-grayColor text-lg mb-2" htmlFor="name"> كلمة المرور </label>
                          <div className='relative' >
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="name" 
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor  `} 
                                />

                                <div 
                                   className='absolute top-1/2 left-2 cursor-pointer -translate-y-1/2'
                                   onClick={() => setShowPassword(!showPassword)}
                                > 
                                    <GoEyeClosed /> 
                                </div>
                          </div>
                      </div>
    
                      <div className="w-full md:w-1/2" >
                        <label className="block text-grayColor text-lg mb-2" htmlFor="email">  تاكيد كلمة المرور </label>
                          <div className="relative">
                                <input 
                                    type={showConfirmPassword ? "text" : "password"}  
                                    id="email" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor  `} 
                                />

                                <div 
                                   className='absolute top-1/2 left-2 cursor-pointer -translate-y-1/2'
                                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                > 
                                    <GoEyeClosed /> 
                                </div>
                          </div>
                      </div>
                 </div>
    
                
    
                 {loading ? ( <MainButton loading text="حفظ" /> ) : ( <MainButton text="حفظ" />) }
             </form>
  )
}

export default ChangePassword