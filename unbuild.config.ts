import { defineBuildConfig } from 'unbuild';
import pkg from './package.json';

export default defineBuildConfig({
	declaration: true,
	entries: [
		'src/index.ts'
	],
	externals: ['./package.json'],
	outDir: 'dist',
	rollup: {
		dts: {
			compilerOptions: {
				baseUrl: '.',
				paths: {
					"~": ["./src"],
					"~/*": ["./*", "./src/*"],
					"@": ["./src"],
					"@/*": ["./*", "./src/*"]
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
