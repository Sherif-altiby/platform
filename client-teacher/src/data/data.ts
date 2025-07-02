import { GiOpenBook } from "react-icons/gi";
import { MdQuiz } from "react-icons/md";
import { PiNotepadFill } from "react-icons/pi";


export const navLinks = [
    {
        link: "الرئيسية",
        path: "/"
    },
    {
        link: "المدرسين",
        path: "/get-teachers"
    },
    {
        link: "المواد الدراسية",
        path: "/subjects"
    },
    {
        link: "الملف الشخصي",
        path: "/profile"
    },
    {
        link: "الاشعارات",
        path: "/notifications"
    },
]

export const teacherMenuLinks = [
    {
         link: "الدروس",
         paht: "/teacher/cotrole-content/add-lesson",
         icon: GiOpenBook
    },
    {
        link: "الاختبارات",
        paht: "/teacher/cotrole-content/add-quize",
        icon: MdQuiz
    },
    {
         link: "المذكرات",
         paht: "/teacher/cotrole-content/add-note",
         icon: PiNotepadFill
    },
]

export const adminMenuLinks = [
    {
         link: "المدرسين",
         paht: "/admin/teachers",
         icon: GiOpenBook
    },
    {
        link: "المواد الدراسية",
        paht: "/admin/subjects",
        icon: GiOpenBook
    },
    {
        link: " الطلاب ",
        paht: "/admin/users",
        icon: GiOpenBook
    },
    {
         link: "البلوكات",
         paht: "/admin/blocks",
         icon: GiOpenBook
    },
    {
         link: "التعليقات",
         paht: "/admin/comments",
         icon: GiOpenBook
    },
]