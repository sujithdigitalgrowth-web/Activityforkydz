import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Default is 60s, which is what Lighthouse's "efficient cache
    // lifetimes" audit was flagging on our own /_next/image responses.
    // Product photos only change when we replace the source file at
    // deploy time, so a long TTL is safe — Vercel's CDN still revalidates
    // on new deploys.
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
