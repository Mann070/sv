import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  serverRuntimeConfig: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
  webpack(config, { dev }) {
    // Reduce watcher work in development by ignoring build folders and OneDrive paths.
    if (dev && config.watchOptions) {
      config.watchOptions.ignored = [
        /node_modules/,
        /\.next/,
        /\.git/,
        /idx/,
        /\.modified/,
        /.*\\OneDrive.*$/i,
      ];
      // smaller aggregate timeout to coalesce rapid changes
      config.watchOptions.aggregateTimeout = 300;
    }
    return config;
  },
};

export default nextConfig;
