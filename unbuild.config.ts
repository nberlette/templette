import { defineBuildConfig } from 'unbuild';
import pkg from './package.json';

export default defineBuildConfig({
	declaration: false,
	entries: [
		'src/index.ts',
		'!package.json'
	],
	externals: ['./package.json'],
	outDir: 'dist',
	clean: true,
	rollup: {
		dts: {
			compilerOptions: {
				baseUrl: '.',
				paths: {
					'~': ['./'],
					'~/*': ['./src/*'],
					'@': ['./'],
					'@/*': ['./src/*']
				}
			}
		},
		emitCJS: true,
		cjsBridge: true,
		commonjs: {
			transformMixedEsModules: false,
			requireReturnsDefault: 'preferred',
		},
		esbuild: {
			banner: `/**\n * ${pkg.name}\n * @version {${pkg.version}}\n * @author {${pkg.author}}\n */\n`,
		},
	},
	// hooks: {
	// 	'rollup:options'(ctx, options) {
	// 		// extract only the array type from options param. since it's external and non-importable,
	// 		// the only alternative is to add rollup typedefs to devDependencies just for this one type.
	// 		type RollupOutputOptions = Extract<typeof options.output, any[]>;
	// 		type OriginalOutputOptions = typeof options.output;

	// 		// coerce andmutate the build options object
	// 		options.output = (
	// 			[
	// 				// first coerce options.out into its array form
	// 				...(options.output as RollupOutputOptions),
	// 				{
	// 					file: './dist/index.umd.js',
	// 					format: 'umd',
	// 					generatedCode: {
	// 						symbols: true,
	// 						arrowFunctions: false,
	// 						reservedNamesAsProps: false,
	// 						objectShorthand: true
	// 					}
	// 				}
	// 			] as RollupOutputOptions
	// 		).flatMap((output) => {
	// 			return ({
	// 				...output,
	// 				// conver .cjs -> .js
	// 				...(['commonjs', 'cjs'].includes(output.format) ? { file: './dist/index.js' } : {}),
	// 				// minify
	// 				compact: true,
	// 			} as typeof output)
	// 		}) as OriginalOutputOptions;

	// 		ctx.options.
	// 	}
	// }
})
