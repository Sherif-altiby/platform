import { memo } from "react";

const HeroIllustration = () => {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-2xl"
    >
      {/* 1. الخلفية الديناميكية للـ SVG (The Portal) */}
      <circle
        cx="250"
        cy="250"
        r="230"
        fill="url(#portalGrad)"
        fillOpacity="0.05"
      />
      <circle
        cx="250"
        cy="250"
        r="229"
        stroke="url(#portalGrad)"
        strokeWidth="1"
        strokeDasharray="15 15"
        opacity="0.2"
        className="animate-spin-slow"
      />

      {/* 2. تدفق المعرفة المتفجر (The Genius Flow) */}
      <path
        d="M250 250C250 250 300 150 400 100C500 50 450 250 400 300C350 350 250 250 250 250Z"
        fill="url(#geniusGrad)"
        opacity="0.2"
        className="animate-pulse-slow"
      />

      {/* 3. عناصر هندسية عائمة ( floating particles) */}
      <rect
        x="50"
        y="80"
        width="30"
        height="30"
        rx="8"
        fill="#3B82F6"
        className="animate-bounce-slow"
      />
      <circle
        cx="420"
        cy="60"
        r="10"
        fill="#F97316"
        className="animate-pulse"
      />
      <path d="M40 380L60 410L20 410Z" fill="#10B981" />

      {/* 4. المشهد المركزي: الطالب الطموح (The Visionary) */}
      <g className="animate-float-slow">
        {/* رأس الطالب */}
        <circle cx="250" cy="180" r="35" fill="#E2E8F0" />
        {/* جسم الطالب (في وضعية قفز/طموح) */}
        <path
          d="M250 215C220 215 190 240 190 280V380C190 395 205 410 220 410H280C295 410 310 395 310 380V280C310 240 280 215 250 215Z"
          fill="#E2E8F0"
        />
        {/* الكتاب المفتوح (The Source) */}
        <rect
          x="180"
          y="320"
          width="140"
          height="90"
          rx="15"
          fill="white"
          stroke="#3B82F6"
          strokeWidth="3"
          shadow-lg="true"
        />
        <rect x="200" y="350" width="100" height="8" rx="4" fill="#E2E8F0" />
        <rect x="200" y="370" width="80" height="8" rx="4" fill="#E2E8F0" />
        <rect x="200" y="390" width="60" height="8" rx="4" fill="#F97316" />

        {/* تأثير انفجار المعرفة من الكتاب */}
        <path
          d="M250 320C250 320 300 250 350 280C400 310 400 350 350 380C300 410 250 320 250 320Z"
          fill="url(#explosionGrad)"
          opacity="0.4"
          className="animate-pulse"
        />
      </g>

      {/* رموز علمية عائمة (floating icons) */}
      <text
        x="100"
        y="100"
        fontSize="24"
        fill="#3B82F6"
        opacity="0.5"
        className="animate-float"
      >
        Σ
      </text>
      <text
        x="400"
        y="150"
        fontSize="24"
        fill="#F97316"
        opacity="0.5"
        className="animate-float-slow"
      >
        A+
      </text>
      <text
        x="100"
        y="350"
        fontSize="24"
        fill="#10B981"
        opacity="0.5"
        className="animate-float"
      >
        π
      </text>

      <defs>
        <linearGradient
          id="portalGrad"
          x1="0"
          y1="0"
          x2="500"
          y2="500"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#60A5FA" />
        </linearGradient>
        <linearGradient
          id="geniusGrad"
          x1="0"
          y1="0"
          x2="500"
          y2="500"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3B82F6" stopOpacity="0" />
          <stop offset="0.5" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#60A5FA" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="explosionGrad"
          x1="0"
          y1="0"
          x2="500"
          y2="500"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F97316" stopOpacity="0" />
          <stop offset="0.5" stopColor="#F97316" />
          <stop offset="1" stopColor="#FCD34D" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default memo(HeroIllustration);
