import { existsSync as exists } from 'node:fs';
import { copyFile as copy, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

(async () => {
	const src = resolve(__dirname, './src/index.esnext.js');
	const dist = resolve(__dirname, './dist/index.esnext.mjs');

	await Promise.allSettled([
		...((!exists(dirname(dist)))
				? [mkdir(dirname(dist), { recursive: true })]
					: []),
		copy(src, dist),
		writeFile(
			resolve(__dirname, './dist/index.js'),
			`#!/usr/bin/env node\nmodule.exports = require('./index.cjs');\n`,
			'utf8'
		)
	]).then(() => {
		console.log('Postbuild process completed successfully.')
	}).catch(console.error)
})();
