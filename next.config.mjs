/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
=======
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = false;
    }
    return config;
  },
  turbopack: {},
  experimental: {
    webpackMemoryOptimizations: true,
  },
>>>>>>> 0bfbd42 (some changes)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "panel.eraasoft.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
