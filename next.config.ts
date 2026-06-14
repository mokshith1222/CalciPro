import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  turbopack: {
    root: process.cwd(),
  },
  transpilePackages: ['recharts', 'react-smooth'],
};

export default nextConfig;
