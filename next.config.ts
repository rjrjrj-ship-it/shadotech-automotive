import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow SVG files to be served as static assets via next/image
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
