/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "127.0.0.1",
      "localhost",
      "cars-listing-strapi.onrender.com",
      "server.mekina.net",
      "mekina.s3.eu-west-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
