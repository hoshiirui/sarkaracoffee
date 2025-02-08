import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nqzspgzcbmwdwnzdhbrl.supabase.co",
        port: "",
        // pathname: '/account123/**',
        // search: '',
      },
    ],
  },
};

export default nextConfig;
