/** Lets next/image load files uploaded through the admin, wherever the API is hosted. */
function apiImagePattern() {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL ?? '');
    return {
      protocol: url.protocol.replace(':', ''),
      hostname: url.hostname,
      ...(url.port ? { port: url.port } : {}),
      pathname: '/uploads/**',
    };
  } catch {
    return null;
  }
}

const apiPattern = apiImagePattern();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'http', hostname: 'localhost', port: '4001' },
      {
        protocol: 'https',
        hostname: 'api.devstrike.org',
        pathname: '/uploads/**',
      },
      ...(apiPattern ? [apiPattern] : []),
    ],
  },
};

export default nextConfig;
