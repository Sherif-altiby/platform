import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // optional: restrict to specific path structure if needed
      },
      {
        protocol: "https",
        hostname: "undraw.co",
        pathname: "/**", // optional: restrict to specific path structure if needed
      },
    ],
  },
};

export default nextConfig;
