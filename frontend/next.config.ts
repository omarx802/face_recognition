import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Add the allowedDevOrigins key directly at the top level
  allowedDevOrigins: ['http://192.168.92.80'],
};

export default nextConfig;
