import Image from "next/image"

const Loader = () => {
  return (
    <div className="w-full h-[100vh] bg-white flex items-center justify-center z-10 fixed top-0 left-0"> 
          <div>
              <Image 
                  src={'/scholarly.png'} 
                  alt="Logo Image" 
                  width={100} 
                  height={100} 
                  className="w-[200px] h-[80px]"
              />

              <div className="loader-div" ></div>
          </div>
    </div>
  )
}

export default Loader