"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaStar } from "react-icons/fa";

const TestmonialsCard = ({ text, name }: { text: string; name: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Card: fade + slide up on mount
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });

      // Text: fade in with slight delay
      gsap.from(textRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.3,
        ease: "power2.out",
      });

      // Name: slide in from right
      gsap.from(nameRef.current, {
        opacity: 0,
        x: 30,
        duration: 0.6,
        delay: 0.5,
        ease: "power2.out",
      });

      // Stars: stagger pop in one by one
      gsap.from(".star-icon", {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        stagger: 0.1,
        delay: 0.7,
        ease: "back.out(2)",
      });

    }, cardRef);

    // Hover animations
    const card = cardRef.current;

    const onEnter = () => {
      gsap.to(card, {
        y: -10,
        scale: 1.03,
        boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(".star-icon", {
        rotation: 20,
        scale: 1.3,
        color: "#facc15",
        stagger: 0.05,
        duration: 0.3,
        ease: "back.out(2)",
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(".star-icon", {
        rotation: 0,
        scale: 1,
        stagger: 0.05,
        duration: 0.3,
      });
    };

    card?.addEventListener("mouseenter", onEnter);
    card?.addEventListener("mouseleave", onLeave);

    return () => {
      ctx.revert();
      card?.removeEventListener("mouseenter", onEnter);
      card?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-2xl p-6 border-t-4 border-primary3 cursor-pointer"
      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
    >
      <p
        ref={textRef}
        className="text-gray-600 text-center text-base mb-4 leading-relaxed italic"
      >
        {`"${text}"`}
      </p>

      <div className="text-center mt-4">
        <h4
          ref={nameRef}
          className="text-lg font-semibold text-primary3 mb-2"
        >
          {name}
        </h4>

        <div ref={starsRef} className="flex justify-center gap-1 text-yellow-400">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} className="star-icon" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestmonialsCard;