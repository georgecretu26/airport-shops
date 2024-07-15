/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["fakeimg.pl"],
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
