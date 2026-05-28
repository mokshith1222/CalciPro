import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  transpilePackages: ['recharts', 'react-smooth'],
};

export default nextConfig;
