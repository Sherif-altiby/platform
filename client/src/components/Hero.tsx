"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(sectionRef.current, {
      opacity: 0,
      duration: 0.6,
    })
    .from(overlayRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 0.8,
      ease: "power4.inOut",
    }, "-=0.3")
    .from(imageRef.current, {
      opacity: 0,
      x: 120,
      rotation: 8,
      duration: 1,
      ease: "back.out(1.4)",
    }, "-=0.5")
    .from(titleRef.current, {
      opacity: 0,
      x: 80,
      duration: 0.8,
    }, "-=0.6")
    .from(textRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
    }, "-=0.4");

    gsap.to(imageRef.current, {
      y: -16,
      duration: 2.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    gsap.to(titleRef.current, {
      backgroundPosition: "200% center",
      duration: 4,
      ease: "none",
      repeat: -1,
    });

  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="bg-hoverLinkColor text-white py-16 min-h-[calc(100vh-80px)] flex items-center relative overflow-hidden"
      >
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
        />
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-primary3/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 px-4 relative z-10">
          <div className="md:w-1/2 text-center md:text-right space-y-6">
            <h1
              ref={titleRef}
              className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-white to-primary3 bg-clip-text text-transparent leading-snug"
              style={{ backgroundSize: "200% auto" }}
            >
              منصة بصيرة التعليمية
            </h1>
            <p
              ref={textRef}
              className="text-sm md:text-lg lg:text-xl text-justify md:text-right text-gray-100 leading-relaxed"
            >
              منصة تعليمية مبتكرة تهدف إلى توفير تجربة تعليمية متكاملة وشاملة
              للمستخدمين من جميع الأعمار والخلفيات. تعتمد على أحدث التقنيات
              التعليمية لخلق بيئة تعلم تفاعلية وجذابة، حيث يمكن للمتعلمين الوصول
              إلى مجموعة متنوعة من الموارد والدورات التدريبية المصممة بعناية
              لتلبية احتياجاتهم التعليمية.
            </p>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div ref={imageRef}>
              <Image
                src="/intro.png"
                width={450}
                height={450}
                alt="Intro image"
                className="w-[250px] md:w-[350px] lg:w-[400px] xl:w-[450px] drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;