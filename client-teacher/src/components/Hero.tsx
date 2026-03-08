import Image from "next/image";
import "animate.css";

const Hero = () => {
  return (
    <>
      <section className="bg-hoverLinkColor text-white py-16 min-h-[calc(100vh-100px)] flex items-center animate__animated animate__fadeIn">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 px-4">
          
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-right space-y-6">
            <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-white to-primary3 bg-clip-text text-transparent leading-snug animate__animated animate__fadeInRight">
              منصة العبقري التعليمية
            </h1>
            <p className="text-sm md:text-lg lg:text-xl text-justify md:text-right text-gray-100 leading-relaxed animate__animated animate__fadeInRight animate__delay-1s">
              منصة تعليمية مبتكرة تهدف إلى توفير تجربة تعليمية متكاملة وشاملة للمستخدمين من جميع الأعمار والخلفيات. تعتمد على أحدث التقنيات التعليمية لخلق بيئة تعلم تفاعلية وجذابة، حيث يمكن للمتعلمين الوصول إلى مجموعة متنوعة من الموارد والدورات التدريبية المصممة بعناية لتلبية احتياجاتهم التعليمية.
            </p>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center animate__animated animate__fadeInLeft">
            <Image
              src="/intro.png"
              width={450}
              height={450}
              alt="Intro image"
              className="w-[250px] md:w-[350px] lg:w-[400px] xl:w-[450px] hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        </div>
      </section>

      {/* Optional Wave Divider */}
      {/* <div className="wave wave-1 hidden md:block"></div> */}
    </>
  );
};

export default Hero;
