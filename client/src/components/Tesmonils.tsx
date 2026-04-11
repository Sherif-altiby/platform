"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import TestmonialsCard from "./TestmonialsCard";
import Heading from "./Heading";

gsap.registerPlugin(ScrollTrigger);

const Tesmonils = () => {
  const data = [
    {
      text: "لو بتدور على مكان تتعلم فيه صح وتطور مهاراتك، العبقري التعليمية هي الاختيار الصح، لأن الدعم اللي بيوفره الفريق والشرح الممتاز بيخلوك تكمل وتنجح من غير تعب.",
      name: "محمود السيد",
    },
    {
      text: "أنا بحب في منصة العبقري إنها بتقدم محتوى تعليمي متنوع ومش ممل خالص، وكل موضوع متقسم بطريقة تخليك تركز وتفهم من أول مرة من غير تعقيد.",
      name: "عبد الله ابراهيم",
    },
    {
      text: "بصراحة منصة العبقري التعليمية غيرتلي نظرتي للتعلم أونلاين، الدروس فيها بسيطة وسلسة، والشرح واضح جدًا، حسيت إني بدرس مع مدرسين بيهتموا فعلاً بيا وبفهمي.",
      name: "احمد المرغني",
    },
    {
      text: "المنصة دي مش بس بتعلمك، دي بتديك حافز تحب تتعلم أكتر وتطور من نفسك، وبجد حسيت إن التعليم معاهم بقى رحلة ممتعة مش عبء.",
      name: "السيد ابراهيم",
    },
    {
      text: "حبيت التصميم السهل والبسيط بتاع العبقري، بتقدر تلاقي اللي عايزه بسرعة ومش بتتوه، وكمان المواد التعليمية متجددة وبتغطي كل اللي أنا محتاجه.",
      name: "محمد حاتم",
    },
    {
      text: "العبقري التعليمية بالنسبة لي مش بس منصة، دي شريك نجاح في تطوير مهاراتي، سواء كنت مبتدئ أو عايز أرفع مستوايا، هتلاقي فيها كل الدعم والمحتوى اللي محتاجه",
      name: "عبد الله صلاح",
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // انيميشن العنوان: ظهور ناعم من الأسفل
      gsap.from(".heading-wrapper", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".heading-wrapper",
          start: "top 90%",
        },
      });

      // انيميشن السلايدر
      gsap.from(".swiper-container-custom", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".swiper-container-custom",
          start: "top 85%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#f8fafc] relative overflow-hidden"
    >
      {/* دوائر خلفية بتدرجات ناعمة جداً */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-orange-50/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">










      <div className="heading-wrapper mb-20 text-center relative">
  {/* عنصر ديكور خلفي - علامة اقتباس ضخمة وباهتة */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none select-none">
    <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V5C14.017 4.44772 14.4647 4 15.017 4H20.017C21.1216 4 22.017 4.89543 22.017 6V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8C8.55228 16 9 15.5523 9 15V9C9 8.44772 8.55228 8 8 8H4C3.44772 8 3 7.55228 3 7V5C3 4.44772 3.44772 4 4 4H9C10.1046 4 11 4.89543 11 6V15C11 18.3137 8.31371 21 5 21H3Z" />
    </svg>
  </div>

  {/* العنوان الفرعي مع خطين جانبيين */}
  <div className="flex items-center justify-center gap-4 mb-4">
    <span className="h-px w-8 bg-blue-600/30 hidden sm:block"></span>
    <span className="text-blue-600 font-black tracking-[0.2em] uppercase text-sm">
      آراء المبدعين
    </span>
    <span className="h-px w-8 bg-blue-600/30 hidden sm:block"></span>
  </div>

  {/* العنوان الرئيسي الضخم */}
  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
    ماذا يقول <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">طلابنا؟</span>
  </h2>

  {/* الوصف مع تحسين التباين والقراءة */}
  <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
    نحن نفخر بكوننا جزءاً من رحلة نجاح <span className="text-slate-900 font-bold">آلاف الطلاب</span>، إليك بعض قصصهم الملهمة التي تعكس شغفنا بالتميز.
  </p>

  {/* خط ديكور سفلي صغير */}
  <div className="mt-8 flex justify-center gap-1.5">
    <div className="w-12 h-1.5 bg-blue-600 rounded-full"></div>
    <div className="w-2 h-1.5 bg-orange-500 rounded-full"></div>
    <div className="w-2 h-1.5 bg-orange-500 rounded-full"></div>
  </div>
</div>
        















        <div className="swiper-container-custom px-4">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-16"
          >
            {/* نفس الداتا السابقة */}
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <TestmonialsCard name={item.name} text={item.text} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Tesmonils;
