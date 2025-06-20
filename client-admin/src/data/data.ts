import { GiOpenBook } from "react-icons/gi";


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