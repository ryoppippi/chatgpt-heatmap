import type { NextConfig } from 'next';

const config: NextConfig = {
	output: 'export',
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		reactCompiler: true,
	},
};

export default config;
