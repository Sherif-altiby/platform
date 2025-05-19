import Menu from "../../components/Menu";
import { teacherMenuLinks } from "../../data/data";

const TeacherLayout = ( {children}: Readonly<{ children: React.ReactNode;}> ) => {
  return (
    <div className="flex ctm-height" >
         {/* <div className="p-4 w-[250px] relative hidden lg:block" > <Menu data={teacherMenuLinks}/> </div> */}
        <div className="flex-1 p-4" >
            <div className=" p-3 h-full bg-slate-50 rounded-md" >
               {children} 
            </div>
        </div>
    </div>
  )
}

export default TeacherLayout