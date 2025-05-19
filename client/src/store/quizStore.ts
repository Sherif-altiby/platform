import { Axios } from '@/axios/Axios'
import { useQuizInterface } from '@/types/Types';
import { create } from 'zustand'

export const useQuizStore = create<useQuizInterface>((set) => ({
    isFetchingQuize: false,
    quizzes: null,

    getQuizzes: async (level: string, teacherId: string) => {
        set(() => ({
            isFetchingQuize: true
        }))

        try {
            const res = await Axios.post('teacher/get-quiz-by-level', {
                level,
                teacherId
            });
    
            set(() => ({
                quizzes: res.data.data
            }))
        } catch (error) {
            console.log(error)
        } finally {
            set(() => ({
                isFetchingQuize: false
            }))
        }
    }
}))