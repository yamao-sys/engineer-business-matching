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
      {
        protocol: "http",
        hostname: "localstack",
        port: "4566",
        pathname: "/engineer-business-matching-test/store/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "4566",
        pathname: "/engineer-business-matching-test/store/**",
      },
    ],
  },
};

export default nextConfig;
