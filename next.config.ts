import type { NextConfig } from 'next';

const config: NextConfig = {
	output: 'export',
	experimental: {
		reactCompiler: true,
	},
};

export default config;
