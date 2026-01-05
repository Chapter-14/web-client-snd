import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ch14-mvp.b-cdn.net", // Allows all Supabase storage domains
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
