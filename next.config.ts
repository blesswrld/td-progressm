/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "tdprogressm.ru",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
