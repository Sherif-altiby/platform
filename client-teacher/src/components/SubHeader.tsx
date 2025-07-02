import Link from "next/link"

const SubHeader = ( {currentTitle}: {currentTitle: string} ) => {
  return (
    <div className="bg-subheaderBg" >
        <div className= 'container'>
              <div className="flex items-center gap-3 h-[50px]" >
                  <Link href={'/'} className="text-lg text-hoverLinkColor" > الرئيسية </Link>
                  <div className="flex items-center gap-1" > 
                        <span className="w-[5px] h-[5px] rounded-full bg-gray-500" ></span>
                        <p className="text-lg" > {currentTitle} </p>
                   </div>
              </div>
        </div>
    </div>
  )
}

export default SubHeader