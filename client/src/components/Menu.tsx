import Link from "next/link"
import { MenuLinksTypes } from "../types/Types"

const Menu = ({ data }: { data: MenuLinksTypes }) => {
  return (
    <div className="h-full p-3 rounded-2xl bg-white border border-gray-100 shadow-sm w-[230px]">
      {data.map((link) => (
        <Link
          key={link.link}
          href={link.paht}
          aria-label={link.link}
          className="group flex items-center gap-3 px-3 py-2.5 mb-1 rounded-xl text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 group-hover:bg-indigo-100 text-base transition-colors duration-200">
            <link.icon />
          </div>
          <p className="text-sm font-medium">{link.link}</p>
        </Link>
      ))}
    </div>
  )
}

export default Menu