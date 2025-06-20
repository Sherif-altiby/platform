import Link from "next/link";
import { navLinks } from "../data/data";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { Dispatch, SetStateAction } from "react";
import { useAuthUser } from "@/store/authStore";


interface Props { 
    show: boolean;
    setShow:  Dispatch<SetStateAction<boolean>>;
}

const ResponsiveMenu = ( {show, setShow}: Props ) => {

  const { user } = useAuthUser()

  return (
    <>
        <div className={`fixed top-0  w-full h-full bg-[#0000117a] ${ show ? 'right-0' : 'right-[-100%]' } z-10 transition-all duration-300`} onClick={() => setShow(false)} ></div>
        <div className={`fixed top-0 ${ show ? 'right-0' : 'right-[-100%]' } h-full w-[250px] bg-white z-10  transition-all duration-300` } >

            <div className="w-7 h-7 rounded-full flex items-center justify-center border border-hoverLinkColor text-hoverLinkColor text-lg transition-all duration-300 hover:bg-hoverLinkColor hover:text-white absolute top-3 left-3 cursor-pointer"
              onClick={() => setShow(false)}
             >
                <IoClose />
            </div>

            <Link href={'/'} > 
               <Image 
                   src={'/logo_2.svg'} 
                   width={100} 
                   height={100} 
                   alt="logo image" 
                   className="w-[150px] ml-auto mr-auto mt-14" /> 
                </Link>
             
             <div className="mt-10" >
                {navLinks.map((link) => (
                    <div
                       key={link.path}
                       onClick={() => setShow(false)}
                    >
                        <Link 
                              href={link.path} 
                              className="text-center mb-2 h-10 flex items-center justify-center text-xl transition-all duration-300 hover:bg-hoverLinkColor hover:text-white" > 
                              {link.link} 
                        </Link>
                    </div>
                  ))}
             </div>

             {
                user ? null : (
                  <Link 
                      className="hidden lg:flex items-center justify-center md:text-lg xl:text-xl h-[50px] rounded-xl w-[170px] bg-hoverLinkColor border border-hoverLinkColor text-white transition-all duration-500 hover:rounded-[50px] hover:bg-white hover:text-hoverLinkColor" 
                      href={'/register'} 
                      > تسجيل الدخول 
                  </Link>
                )
              }

        </div>
    </>
  )
}

export default ResponsiveMenu