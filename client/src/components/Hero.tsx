"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !titleRef.current ||
      !textRef.current ||
      !overlayRef.current
    ) return;

    const elements = [
      sectionRef.current,
      titleRef.current,
      textRef.current,
      overlayRef.current,
    ].filter(Boolean);

    gsap.set(elements, { clearProps: "all" });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(sectionRef.current, {
      opacity: 0,
      y: 60,
      duration: 0.8,
    })
      .from(overlayRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1,
        ease: "expo.inOut",
      }, "-=0.4")
       
      .from(titleRef.current, {
        opacity: 0,
        scale: 0.5,
        rotation: -5,
        duration: 0.9,
        ease: "back.out(2)",
      }, "-=0.5")
      .from(textRef.current, {
        opacity: 0,
        clipPath: "inset(0 100% 0 0)",
        duration: 1,
        ease: "power4.out",
      }, "-=0.4");

    

    const blob1Anim = blob1Ref.current
      ? gsap.to(blob1Ref.current, {
          x: 40,
          y: 30,
          duration: 5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      : null;

    const blob2Anim = blob2Ref.current
      ? gsap.to(blob2Ref.current, {
          x: -40,
          y: -30,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      : null;

    const titleAnim = gsap.to(titleRef.current, {
      backgroundPosition: "200% center",
      duration: 5,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tl.kill();
      blob1Anim?.kill();
      blob2Anim?.kill();
      titleAnim.kill();
      gsap.set(elements, { clearProps: "all" });
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="bg-hoverLinkColor text-white py-16 min-h-[calc(100vh-70px)] flex items-center relative overflow-hidden"
      >
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
        />

        <div
          ref={blob1Ref}
          className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none"
        />
        <div
          ref={blob2Ref}
          className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-primary3/10 blur-3xl pointer-events-none"
        />

        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 px-4 relative z-10">

          {/* Text */}
          <div className="md:w-1/2 text-center md:text-right space-y-6">
            <h1
              ref={titleRef}
              className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-primary3 bg-clip-text text-transparent leading-snug"
              style={{ backgroundSize: "200% auto" }}
            >
              منصة العبقري التعليمية
            </h1>
            <p
              ref={textRef}
              className="text-sm md:text-lg lg:text-xl text-justify md:text-right text-gray-100 leading-relaxed"
            >
              منصة تعليمية مبتكرة تهدف إلى توفير تجربة تعليمية متكاملة وشاملة
              للمستخدمين من جميع الأعمار والخلفيات. تعتمد على أحدث التقنيات
              التعليمية لخلق بيئة تعلم تفاعلية وجذابة، حيث يمكن للمتعلمين
              الوصول إلى مجموعة متنوعة من الموارد والدورات التدريبية المصممة
              بعناية لتلبية احتياجاتهم التعليمية.
            </p>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            <div>
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