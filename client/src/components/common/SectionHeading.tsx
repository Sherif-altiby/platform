import { IconType } from "react-icons"

const SectionHeading = ({icon: Icon, title, description}: {icon: IconType, title: string, description: string}) => {
  return (
   <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
             <Icon className="text-white text-lg" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900"> {title}</h2>
            <p className="text-sm text-gray-400"> {description}</p>
          </div>
        </div>
  )
}

export default SectionHeading