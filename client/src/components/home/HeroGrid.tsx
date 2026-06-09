import { memo } from "react";

const HeroGrid = () => {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="premiumGrid"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 60 0 L 0 0 0 60"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#premiumGrid)" />
    </svg>
  );
};

export default memo(HeroGrid);
