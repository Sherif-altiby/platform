import { Axios } from '@/axios/Axios'
import { useTeacherInterface } from '@/types/Types'
import { toast } from 'react-toastify'
import { create } from 'zustand'

export const useTeacherStore = create<useTeacherInterface>((set) => ({
     teachers: null,
     isFetchingTeachers: false,
     teacher: null,
     isFetchingTeacher: false,

     teacherStatics: null,
     isFetchingTeacherStatics : false,

     getTeachers: async () => {
        try {
            set(() => ({
                isFetchingTeachers: true
            }))

            const res = await Axios.get('user/get-teachers');
            console.log(res.data.data)

            set(() => ({
                teachers: res.data.data
            }))
            
        } catch  {
             toast.error("حدث خطأ")
        } finally {
            set(() => ({
                isFetchingTeachers: false
            }))
        }
     },

     getTeacherById: async (teacherId: string) => {
        set(() => ({
            isFetchingTeacher: true
        }))
        try {
             const res = await Axios.get(`teacher/get-teacher/${teacherId}`)
             set(() => ({
                teacher: res.data.data
             }))
        } catch {
              toast.error("حدث خطأ")
        } finally {
            set(() => ({
                isFetchingTeacher: false
            }))
        }
     },

     getTeacherStatics: async () => {
        set(() => ({
            isFetchingTeacherStatics: true
        }))

        try {
            const res = await Axios.get('teacher/statics');
            set(() => ({
                teacherStatics: res.data.data
            }))
            
        } catch  {
              toast.error("حدث خطأ")
        } finally {
            set(() => ({
                isFetchingTeacherStatics: false
            }))
        }
     },

     addTeacher: async (name: string, phone: string, email: string, password: string, subId: string, avatar: string, about: string) => {

         const formData = new FormData();
         formData.append('name', name)
         formData.append('phone', phone)
         formData.append('email', email)
         formData.append('password', password)
         formData.append('subId', subId)
         formData.append('avatar', avatar)
         formData.append('about', about)

         try {
            const res = await Axios.post('admin/add-teacher', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            } )

            toast.success(res.data.message)
         } catch {
             toast.error("Errorrr")
         }
     }
     
}))