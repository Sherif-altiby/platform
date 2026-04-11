import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // Make sure this matches your backend route structure!
        destination: "https://platform-gamma-one.vercel.app/:path*",
      },
    ];
  },

  // You can remove CORS headers since you're using proxy
  // The backend handles CORS, not Next.js
};

export default nextConfig;