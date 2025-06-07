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
        pathname: "/**", // optional: restrict to specific path structure if needed
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ This line disables ESLint check during build
  },
};

export default nextConfig;
