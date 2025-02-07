const nextConfig = {
  experimental: {
    // appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
