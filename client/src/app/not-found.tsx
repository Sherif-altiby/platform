"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 1, // 1-3px
    top: `${Math.random() * 50}%`,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 3 + 4,
    delay: Math.random() * 4,
    direction: Math.random() > 0.5 ? "topLeft" : "topRight",
  }));
};

const Notfound = () => {

  const [stars, setStars] = useState<any[]>([]);

  useEffect(() => {
    setStars(generateStars(30));

    const interval = setInterval(() => {
      setStars((prev) => [...prev.slice(-20), ...generateStars(10)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black text-white flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-space"
        style={{
          background: `url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9770934.jpg-Wl31ERQfbntJABIblVId5PIBjqP5Gx.jpeg") no-repeat center center/cover`,
        }}
      ></div>

      {/* Falling Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute ${
              star.direction === "topLeft" ? "animate-fall-topLeft" : "animate-fall-topRight"
            }`}
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          >
            <div className="h-full w-full rounded-full bg-white opacity-80" />
          </div>
        ))}
      </div>

      {/* UFO */}
      <div
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-float animate-tilt"
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8794272-p5k6GdbD8O2RIat5GWtUGJGkDgXoxf.png"
          alt="UFO"
          width={300}
          height={150}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-2 text-7xl font-bold text-white">404</h1>
        <p className="mb-8 text-xl text-gray-300"> عفواً! يبدو أن هذه الصفحة ليست موجدة. </p>
        <Link href="/">
          <span className="px-6 py-3 text-white bg-purple-600 rounded-lg cursor-pointer hover:bg-purple-700">
           العودة للرئيسئة
          </span>
        </Link>
      </div>
    </div>
  )
}

export default Notfound