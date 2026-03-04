import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/proxy/:path*',
  //       destination: 'http://10.125.121.184.nip.io:8080/:path*',
  //     },
  //   ];
  // },
};

export default nextConfig;
