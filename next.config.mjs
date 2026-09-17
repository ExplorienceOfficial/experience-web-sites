import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  eslint: {
    // We run our own tooling; don't block production builds on lint.
    ignoreDuringBuilds: true,
  },
};

export default withNextIntl(nextConfig);
