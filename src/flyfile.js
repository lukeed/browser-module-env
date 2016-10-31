const res = require('path').resolve;

const src = __dirname;
const tar = res(src, '../assets');
const node = res(src, '../node_modules');

exports.default = function * () {
	yield this.clear(tar);
	yield this.source(`${src}/demo.js`).browserify().target(tar);
	yield this.source(`${src}/*.{jpg,png}`).target(tar);
	yield this.source(`${src}/*.sass`)
		.sass({
			outputStyle: 'compressed',
			includePaths: [`${node}/md-colors/src`]
		}).autoprefixer().target(tar);
};
