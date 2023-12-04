/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// const nextConfig = {
//   reactStrictMode: true,
//   async rewrites() {
//     if (process.env.NODE_ENV !== "production") {
//       return [
//         {
//           destination: process.env.DESTINATION_URL,
//           source: process.env.SOURCE_PATH,
//         },
//       ];
//     }
//   },
// };

const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/proxy/api/:path*",
        destination: process.env.NEXT_PUBLIC_ETREND_API_URL,
      },
    ];
  },
};

module.exports = nextConfig;
