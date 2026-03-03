"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Aboutus = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const p3Ref = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Image: zoom in from small + fade
      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.6,
        rotation: -10,
        duration: 1.4,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Glow: expand outward
      gsap.from(glowRef.current, {
        opacity: 0,
        scale: 0.3,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Continuous glow pulse
      gsap.to(glowRef.current, {
        scale: 1.15,
        opacity: 0.6,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.8,
      });

      // Image: slow spin-hover loop
      gsap.to(imageRef.current, {
        rotation: 3,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Title: drop down from top + bounce
      gsap.from(titleRef.current, {
        opacity: 0,
        y: -60,
        duration: 1,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 90%",
        },
      });

      // Paragraphs: slide in from right one by one
      gsap.from(p1Ref.current, {
        opacity: 0,
        x: 100,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: p1Ref.current,
          start: "top 90%",
        },
      });

      gsap.from(p2Ref.current, {
        opacity: 0,
        x: 100,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: p2Ref.current,
          start: "top 95%",
        },
      });

      gsap.from(p3Ref.current, {
        opacity: 0,
        x: 100,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: p3Ref.current,
          start: "top 95%",
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#f9fafb] relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary3/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-hoverLinkColor/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 px-4 relative z-10">

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <div ref={imageRef} className="relative">
            <div
              ref={glowRef}
              className="absolute inset-0 rounded-xl bg-gradient-to-tr from-hoverLinkColor/40 to-primary3/40 blur-3xl pointer-events-none"
            />
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
          <h2
            ref={titleRef}
            className="text-2xl md:text-3xl xl:text-4xl font-bold text-right bg-gradient-to-r from-hoverLinkColor to-primary3 bg-clip-text text-transparent"
          >
            من نحن
          </h2>

          <p ref={p1Ref} className="text-justify text-base md:text-lg xl:text-xl leading-relaxed">
            مرحباً بكم في منصتنا التعليمية، المكان الذي يجتمع فيه المعلمون والطلاب لتحقيق رحلة تعليمية مثمرة. تهدف منصتنا إلى توفير بيئة تعليمية شاملة وآمنة تتيح للطلاب اكتساب المهارات والمعرفة في مختلف التخصصات، وتساعد المعلمين على مشاركة خبراتهم بأسلوب فعّال وشيق.
          </p>

          <p ref={p2Ref} className="text-justify text-base md:text-lg xl:text-xl leading-relaxed">
            نسعى جاهدين لتقديم محتوى تعليمي عالي الجودة يسهم في تطوير قدرات الطلاب. لدينا فريق من المعلمين المتميزين الذين يتمتعون بخبرة وشغف بتعليم طلابهم بأفضل الوسائل الحديثة.
          </p>

          <p ref={p3Ref} className="text-justify text-base md:text-lg xl:text-xl leading-relaxed">
            نؤمن بأهمية التكنولوجيا في تعزيز التعلم، ونطمح إلى جعل التعليم متاحاً للجميع، بغض النظر عن مكانهم. رؤيتنا هي خلق مجتمع تعليمي يزدهر فيه الإبداع والتفكير النقدي، ونسعى دائماً لتقديم تجربة تعليمية تجعل من التعلم رحلة ممتعة وملهمة.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;