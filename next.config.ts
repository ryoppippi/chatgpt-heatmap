import unTypiaNext from '@ryoppippi/unplugin-typia/next';

export default unTypiaNext({
	output: 'export',
	experimental: {
		reactCompiler: true,
	},
}, {
	cache: false,
});
