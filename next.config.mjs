/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AUTH_TRUST_HOST: "true",
    AUTH_SECRET: "8eGGCFoXkGc53uWwM7QdRp547eq1fVAUPY/P85IElVQ=",
    AUTH_URL: "https://testapp-4f81d.web.app",
    NEXTAUTH_URL: "https://testapp-4f81d.web.app",
  },
  serverExternalPackages: ["firebase-admin"],
};
export default nextConfig;
