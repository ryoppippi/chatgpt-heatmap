import { ryoppippi } from '@ryoppippi/eslint-config';

export default ryoppippi({
	type: 'app',
	svelte: false,
	react: true,
	typescript: {
		tsconfigPath: './tsconfig.json',
	},
});
