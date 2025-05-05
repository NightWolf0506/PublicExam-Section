/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.pexels.com" },
      { hostname: "res.cloudinary.com" }, // Add Cloudinary's domain here
    ],
  },
  // Enable Fast Refresh
  reactStrictMode: true, // Ensures Fast Refresh works properly
  // Disable TypeScript type checking during builds
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
