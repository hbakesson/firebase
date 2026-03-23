/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AUTH_TRUST_HOST: "true",
  },
  serverExternalPackages: ["firebase-admin"],
};
export default nextConfig;
