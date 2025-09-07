"use client"

import { Axios } from "@/axios/Axios"
import MainButton from "@/components/MainButton"
import SubHeader from "@/components/SubHeader"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ChangePassword from "./ChangePassword"
import AddComment from "@/components/addComment"
import { useQueryClient } from "@tanstack/react-query"
import { UserTypes } from "@/types/Types"

const Page = () => {

    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(["user"]) as UserTypes

    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<number | string>("");
  const [level, setLevel] = useState("");

  // ✅ Update state when user is available
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setLevel(user.level || "");
    }
  }, [user]);

    const [loading, setLoading] = useState(false)

    const levels = [
        {
            level: "الصف الثاني الثانوي ",
            value: "second"
       },
        {
            level: "الصف الاول الثانوي ",
            value: "first"
       },
        {
            level: "الصف الثالث الثانوي ",
            value: "third"
       },
    ]

    const updateProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
             const res = await Axios.post('user/update-profile', {
                name,
                phone,
                email,
                level
             })

            //  await  checkUser()  will update user here

             toast.success(res.data.message)
        } catch  {
               toast.error("حدث خطأ")
        } finally{
            setLoading(false)
        }
    }

  return (
    <div className="ctm-height" >
          <SubHeader currentTitle="الملف الشخصي" />
          <form className="w-[90%] shadow-lg max-w-[700px] mt-10 mb-10 p-5 rounded-lg ml-auto mr-auto" onSubmit={updateProfile} >
             <div className="flex items-start flex-col md:flex-row gap-5 mb-5" >
                  <div className="w-full md:w-1/2" >
                      <label className="block text-grayColor text-lg mb-2" htmlFor="name"> الاسم </label>
                      <input 
                        type="text" 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor  `} 
                      />
                  </div>

                  <div className="w-full md:w-1/2" >
                    <label className="block text-grayColor text-lg mb-2" htmlFor="email"> البريد الالكتروني</label>
                    <input 
                      type="text" 
                      id="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor  `} 
                      />
                  </div>
             </div>

             <div className="flex items-start flex-col md:flex-row gap-5 mb-5" >
                  <div className="w-full md:w-1/2" >
                      <label className="block text-grayColor text-lg mb-2" htmlFor="phone">  رقم التلفون </label>
                      <input 
                        type="number" 
                        id="phone" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor  `} 
                     />
                  </div>

                  <div className="w-full md:w-1/2" >
                    <label className="block text-grayColor text-lg mb-2" htmlFor="level"> الصف الدراسي </label>
                     <select 
                       id="level" 
                       value={level}
                       onChange={(e) => setLevel(e.target.value)}
                       className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor  `}
                       >
                         {levels.map((l) => (
                             
                             <option value={l.value} selected={l.value === level} key={l.level}>  {l.level} </option>
                         ))}
                     </select>
                  </div>
             </div>

             {loading ? ( <MainButton loading text="حفظ" /> ) : ( <MainButton text="حفظ" />) }
         </form>

         <div className="mt-10" >
             <ChangePassword />
         </div>

         <div className="mt-10" >
             <AddComment />
         </div>
    </div>
  )
}

export default Page