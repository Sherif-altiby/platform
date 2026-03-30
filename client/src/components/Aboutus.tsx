"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Aboutus = () => {
  return (
    <section className="py-24 bg-[#f9fafb] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary3/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-hoverLinkColor/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 px-4 relative z-10">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-hoverLinkColor/40 to-primary3/40 blur-3xl pointer-events-none" />
            <Image
              src="/aboutus.png"
              width={500}
              height={500}
              alt="about us"
              className="relative w-[250px] md:w-[350px] lg:w-[400px] xl:w-[500px] rounded-xl shadow-2xl"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 space-y-6 text-gray-700">
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-right bg-gradient-to-r from-hoverLinkColor to-primary3 bg-clip-text text-transparent">
            من نحن
          </h2>

          <p className="text-justify text-base md:text-lg xl:text-xl leading-relaxed">
            مرحباً بكم في منصتنا التعليمية، المكان الذي يجتمع فيه المعلمون
            والطلاب لتحقيق رحلة تعليمية مثمرة. تهدف منصتنا إلى توفير بيئة
            تعليمية شاملة وآمنة تتيح للطلاب اكتساب المهارات والمعرفة في مختلف
            التخصصات، وتساعد المعلمين على مشاركة خبراتهم بأسلوب فعّال وشيق.
          </p>

          <p className="text-justify text-base md:text-lg xl:text-xl leading-relaxed">
            نسعى جاهدين لتقديم محتوى تعليمي عالي الجودة يسهم في تطوير قدرات
            الطلاب. لدينا فريق من المعلمين المتميزين الذين يتمتعون بخبرة وشغف
            بتعليم طلابهم بأفضل الوسائل الحديثة.
          </p>

          <p className="text-justify text-base md:text-lg xl:text-xl leading-relaxed">
            نؤمن بأهمية التكنولوجيا في تعزيز التعلم، ونطمح إلى جعل التعليم
            متاحاً للجميع، بغض النظر عن مكانهم. رؤيتنا هي خلق مجتمع تعليمي يزدهر
            فيه الإبداع والتفكير النقدي، ونسعى دائماً لتقديم تجربة تعليمية تجعل
            من التعلم رحلة ممتعة وملهمة.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
