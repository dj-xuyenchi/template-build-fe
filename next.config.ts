import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cdn.cdnstep.com"], // Thêm hostname tại đây
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;
