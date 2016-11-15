'use strict';

const join = require('path').join;
const bs = require('browser-sync');
const rollup = require('rollup');

let isWatch = 0;
let isServer = 0;

const reload = () => isWatch && isServer && bs.reload();

const doc = 'docs';
const tar = 'build';
const dir = join(__dirname, 'assets');
const obj = {
	entries: 'docs/app.js',
	transform: ['rollupify']
};

const OUTNAME = process.env.OUTNAME || 'MyModule';
const OUTFILE = process.env.OUTFILE || 'built.js';

if (process.env.BABEL) {
	obj.transform.push(require('babelify').configure({presets: 'es2015'}));
}

exports.setup = function * () {
	yield this.source(`${dir}/*.*`).target(doc);
};

exports.docs = function * (o) {
	yield this.source(o.src || 'docs/app.js').xo().browserify(obj).concat('bundle.js').target(doc);
	reload();
};

exports.build = function * () {
	yield this.clear(tar);
	const bun = yield rollup.rollup({entry: 'lib/index.js'});
	yield bun.write({
		format: 'umd',
		moduleName: OUTNAME,
		dest: `${tar}/${OUTFILE}`
	});
};

exports.release = function * () {
	const ops = {
		compress: {
			conditionals: 1,
			drop_console: 1,
			comparisons: 1,
			join_vars: 1,
			booleans: 1,
			loops: 1
		}
	};
	yield this.serial(['build', 'docs']);
	yield this.source('docs/bundle.js').uglify(ops).target(doc);
	yield this.source(`${tar}/*.js`).uglify(ops).concat(OUTFILE.replace('.js', '.min.js')).target(tar);
};

exports.watch = function * () {
	isWatch = 1;
	yield this.watch('docs/app.js', 'docs');
	yield this.watch('docs/*.{html,css}', 'refresh');
	yield this.start('serve');
};

exports.refresh = function * () {
	reload();
};

exports.serve = function * () {
	isServer = 1;
	bs({
		server: doc,
		reloadDelay: 300
	});
};
