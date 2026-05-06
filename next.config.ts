import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname), // ✅ forces correct root
  },
};

export default nextConfig;