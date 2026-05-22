import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // 生产部署到 Vercel 时自动静态导出，无需本地配置
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
