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
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<HTMLDivElement>(null);

  const data = [
    {
      text: "لو بتدور على مكان تتعلم فيه صح وتطور مهاراتك، بصيرة التعليمية هي الاختيار الصح، لأن الدعم اللي بيوفره الفريق والشرح الممتاز بيخلوك تكمل وتنجح من غير تعب.",
      name: "محمود السيد",
    },
    {
      text: "أنا بحب في منصة بصيرة إنها بتقدم محتوى تعليمي متنوع ومش ممل خالص، وكل موضوع متقسم بطريقة تخليك تركز وتفهم من أول مرة من غير تعقيد.",
      name: "عبد الله ابراهيم",
    },
    {
      text: "بصراحة منصة بصيرة التعليمية غيرتلي نظرتي للتعلم أونلاين، الدروس فيها بسيطة وسلسة، والشرح واضح جدًا، حسيت إني بدرس مع مدرسين بيهتموا فعلاً بيا وبفهمي.",
      name: "احمد المرغني",
    },
    {
      text: "المنصة دي مش بس بتعلمك، دي بتديك حافز تحب تتعلم أكتر وتطور من نفسك، وبجد حسيت إن التعليم معاهم بقى رحلة ممتعة مش عبء.",
      name: "السيد ابراهيم",
    },
    {
      text: "حبيت التصميم السهل والبسيط بتاع بصيرة، بتقدر تلاقي اللي عايزه بسرعة ومش بتتوه، وكمان المواد التعليمية متجددة وبتغطي كل اللي أنا محتاجه.",
      name: "محمد حاتم",
    },
    {
      text: "بصيرة التعليمية بالنسبة لي مش بس منصة، دي شريك نجاح في تطوير مهاراتي، سواء كنت مبتدئ أو عايز أرفع مستوايا، هتلاقي فيها كل الدعم والمحتوى اللي محتاجه",
      name: "عبد الله صلاح",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Heading: drops from top with bounce
      gsap.from(headingRef.current, {
        opacity: 0,
        y: -60,
        duration: 1,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 90%",
        },
      });

      // Swiper: zoom in + fade
      gsap.from(swiperRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: swiperRef.current,
          start: "top 85%",
        },
      });

      // Background blob pulse
      gsap.to(".tesmonials-blob", {
        scale: 1.2,
        opacity: 0.5,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="sectionbg pb-[50px] pt-[10px] bg-primary5 relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="tesmonials-blob absolute -top-16 -left-16 w-72 h-72 rounded-full bg-hoverLinkColor/10 blur-3xl pointer-events-none" />
      <div className="tesmonials-blob absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-primary3/10 blur-3xl pointer-events-none" />

      <div className="container mt-[50px] relative z-10">

        {/* Heading */}
        <div ref={headingRef}>
          <Heading title="اراء الطلاب" />
        </div>

        {/* Swiper */}
        <div ref={swiperRef}>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={3}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {data.map((d) => (
              <SwiperSlide className="p-2" key={d.text}>
                <TestmonialsCard name={d.name} text={d.text} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Tesmonils;