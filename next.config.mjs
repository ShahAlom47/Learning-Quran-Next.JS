/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.pixabay.com"], // বাহ্যিক ইমেজ ব্যবহারের জন্য অনুমোদিত ডোমেইন

    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io", // সঠিকভাবে hostname যুক্ত করা হয়েছে
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com", // অন্য ডোমেইনের জন্য আলাদা এন্ট্রি
        port: "",
      },
    ],
  },
};

export default nextConfig;
