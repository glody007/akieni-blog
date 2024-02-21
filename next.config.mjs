import createJiti from "jiti";
const jiti = createJiti(new URL(import.meta.url).pathname);

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti("./env");

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'utfs.io'
          }
        ],
    },
};

export default nextConfig;
