import { IconType } from "react-icons"

const SectionNotfound = ({icon: Icon, content}: {icon: IconType, content: string}) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
                <Icon className="text-5xl opacity-30" />
                <p className="text-lg">{content}</p>
              </div>
  )
}

export default SectionNotfound