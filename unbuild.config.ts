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
	}
})
