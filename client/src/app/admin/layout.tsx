import Menu from "../../components/Menu";
import { adminMenuLinks } from "../../data/data";

const layout = ({children}: Readonly<{ children: React.ReactNode;}> ) => {
  return (
            <div className="flex ctm-height" >
            <div className="p-4 w-[250px] relative hidden lg:block" > <Menu data={adminMenuLinks}/> </div>
                <div className="flex-1 p-4" >
                        <div className=" p-3 h-full bg-slate-50 rounded-md" >
                            {children} 
                        </div>
                </div>
            </div>
)
}

export default layout