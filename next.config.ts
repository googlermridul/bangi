import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   /* config options here */
   turbopack: {
      rules: {
         "*.css": {
            loaders: ["@tailwindcss/turbopack"],
            as: "*.css",
         },
      },
   },
   output: "export",
   images: { unoptimized: true },
};

export default nextConfig;
