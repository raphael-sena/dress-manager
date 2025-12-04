const urlApi = process.env.NEXT_PUBLIC_API_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignora erros do ESLint durante o build
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  async rewrites() {
    return [
      {
        source: '/usuarios',
        destination: `${urlApi}/usuarios`, // Redireciona para o backend
      },
    ];
  },
};

export default nextConfig;
