/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "host.docker.internal",
        port: "4566",
        pathname: "/engineer-business-matching-dev/store/**",
      },
      {
        protocol: "http",
        hostname: "host.docker.internal",
        port: "4566",
        pathname: "/engineer-business-matching-test/store/**",
      },
    ],
  },
};

export default nextConfig;
