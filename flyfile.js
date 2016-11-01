'use strict';

const join = require('path').join;
const bs = require('browser-sync');

let isWatch = 0;
let isServer = 0;

const reload = () => isWatch && isServer && bs.reload();

const tar = 'docs';
const bun = 'docs/bundle.js';
const src = ['docs/*.js', `!${bun}`];
const dir = join(__dirname, 'assets');
const obj = {entries: 'docs/app.js'};

if (process.env.BABEL) {
	obj.transform = require('babelify').configure({presets: 'es2015'});
}

exports.setup = function * () {
	yield this.source(`${dir}/*.*`).target(tar);
};

exports.build = function * (o) {
	yield this.source(o.src || src).xo().browserify(obj).concat1('bundle.js').target(tar);
	reload();
};

exports.release = function * () {
	yield this.start('build');
	yield this.source(bun).uglify({
		compress: {
			conditionals: 1,
			drop_console: 1,
			comparisons: 1,
			join_vars: 1,
			booleans: 1,
			loops: 1
		}
	}).target(tar);
};

exports.watch = function * () {
	isWatch = 1;
	yield this.watch(src, 'build');
	yield this.watch('docs/*.{html,css}', 'refresh');
	yield this.start('serve');
};

exports.refresh = function * () {
	reload();
};

exports.serve = function * () {
	isServer = 1;
	bs({
		server: tar,
		reloadDelay: 300
	});
};
