import Link from "next/link"
import { MenuLinksTypes } from "../types/Types"

const Menu = ( {data}: {data: MenuLinksTypes} ) => {
  return (
    <div className="shadow-sm h-full p-3 rounded-lg bg-slate-50  top-[95px] w-[230px] ring-0" >
        {data.map((link) => (
            <Link 
                key={link.link} 
                href={link.paht} 
                className="flex p-3 mb-3 items-center gap-3 shadow-sm rounded-lg bg-white text-grayColor transition-all duration-300 hover:bg-blue-600 hover:text-white"
            > 
                 <div className="text-lg" > <link.icon /> </div>
                 <p className="text-xl font-light" > {link.link}  </p>
            </Link>
        ))}
    </div>
  )
}

export default Menu