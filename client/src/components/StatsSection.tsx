"use client";

import { getPlatformStatics } from '@/app/utils/userFeatuers';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { FaUsers, FaChalkboardTeacher, FaBook } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const usersNumRef = useRef<HTMLParagraphElement>(null);
  const teachersNumRef = useRef<HTMLParagraphElement>(null);
  const lessonsNumRef = useRef<HTMLParagraphElement>(null);

  // Track previous values to avoid re-animating from 0
  const prevUsers = useRef(0);
  const prevTeachers = useRef(0);
  const prevLessons = useRef(0);

  const { data } = useQuery({
    queryKey: ['usersNum'],
    queryFn: async () => {
      const res = await getPlatformStatics();
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes — prevents refetch on route change
  });

  // Animate counter from previous value to new value
  const animateCounter = (
    ref: React.RefObject<HTMLParagraphElement | null>,
    from: number,
    to: number
  ) => {
    if (!ref.current || to === from) return;
    const obj = { val: from };
    gsap.to(obj, {
      val: to,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.ceil(obj.val).toString();
        }
      },
    });
  };

  useEffect(() => {
    if (!data) return;

    const { users, teachers, lessons } = data;

    animateCounter(usersNumRef, prevUsers.current, users);
    animateCounter(teachersNumRef, prevTeachers.current, teachers);
    animateCounter(lessonsNumRef, prevLessons.current, lessons);

    prevUsers.current = users;
    prevTeachers.current = teachers;
    prevLessons.current = lessons;
  }, [data]);

  // Entrance animations — run once on mount only
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: -60,
        duration: 1,
        ease: 'bounce.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 90%',
        },
      });

      gsap.from([card1Ref.current, card2Ref.current, card3Ref.current], {
        opacity: 0,
        y: 80,
        scale: 0.8,
        duration: 0.9,
        stagger: 0.2,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: card1Ref.current,
          start: 'top 90%',
        },
      });

      gsap.to('.stats-blob', {
        scale: 1.2,
        opacity: 0.4,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    // Hover animations
    const cards = [card1Ref, card2Ref, card3Ref];
    const cleanups: (() => void)[] = [];

    cards.forEach((ref) => {
      const el = ref.current;
      const onEnter = () => gsap.to(el, { y: -12, scale: 1.05, duration: 0.3, ease: 'power2.out' });
      const onLeave = () => gsap.to(el, { y: 0, scale: 1, duration: 0.3, ease: 'power2.inOut' });

      el?.addEventListener('mouseenter', onEnter);
      el?.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        el?.removeEventListener('mouseenter', onEnter);
        el?.removeEventListener('mouseleave', onLeave);
      });
    });

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-20 relative overflow-hidden"
    >
      <div className="stats-blob absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="stats-blob absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto text-center relative z-10">
        <h2 ref={titleRef} className="text-5xl font-bold text-white mb-8">
          عن المنصة
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

          <div ref={card1Ref} className="bg-white text-gray-800 p-8 rounded-xl shadow-lg cursor-pointer">
            <div className="flex items-center justify-center mb-4 text-4xl text-indigo-600">
              <FaUsers />
            </div>
            <h3 className="text-2xl font-semibold mb-2">إجمالي المستخدمين</h3>
            <p ref={usersNumRef} className="text-4xl font-bold">0</p>
            <p className="text-sm text-gray-500">عدد المستخدمين المسجلين في المنصة</p>
          </div>

          <div ref={card2Ref} className="bg-white text-gray-800 p-8 rounded-xl shadow-lg cursor-pointer">
            <div className="flex items-center justify-center mb-4 text-4xl text-teal-600">
              <FaChalkboardTeacher />
            </div>
            <h3 className="text-2xl font-semibold mb-2">إجمالي المعلمين</h3>
            <p ref={teachersNumRef} className="text-4xl font-bold">0</p>
            <p className="text-sm text-gray-500">عدد المعلمين الذين يقدمون دروسًا</p>
          </div>

          <div ref={card3Ref} className="bg-white text-gray-800 p-8 rounded-xl shadow-lg cursor-pointer">
            <div className="flex items-center justify-center mb-4 text-4xl text-purple-600">
              <FaBook />
            </div>
            <h3 className="text-2xl font-semibold mb-2">إجمالي الدروس</h3>
            <p ref={lessonsNumRef} className="text-4xl font-bold">0</p>
            <p className="text-sm text-gray-500">عدد الدروس المتوفرة للطلاب</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatsSection;