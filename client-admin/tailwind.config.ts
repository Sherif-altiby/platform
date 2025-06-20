import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
           grayColor: "#939597",
           hoverLinkColor: "#5700ff",
           sectionbg: "#007bff05",
           subheaderBg: "#007bff14",
           teacherCardBg: "rgb(24 57 151 / 9%)",

           primary1: "#5700FF",
           primary5: "#F7F8FF",
           primary3: '#3B82F6',
      },
      boxShadow: {
        'main-shadow': '0 0 5px #939597',
        'ctm-shadow': '0 0 5px #99999940'
      },
       keyframes: {
      shimmer: {
        '100%': { transform: 'translateX(100%)' },
      },
      'fade-in': {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
    animation: {
      shimmer: 'shimmer 1.5s infinite linear',
      'fade-in': 'fade-in 0.6s ease-out forwards',
    },
    },
  },
  plugins: [],
} satisfies Config;
