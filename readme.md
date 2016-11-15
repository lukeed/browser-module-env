# browser-module-env

> Recycled environment & assets for making browser modules.

## Install

```
npm install --save-dev browser-module-env
```

## Usage

After installing:

1. Create a `flyfile.js` in your root directory with the following:

  ```js
  process.env.OUTNAME = 'MyModule'; // module's name
  process.env.OUTFILE = 'my-module.js'; // built file name
  module.exports = require('browser-module-env/flyfile.js');
  ```

  This will expose this module's [pre-configured command scripts](#commands).

2. Connect this module's commands to your `package.json` file within `"scripts"`:

  ```json
  "scripts": {
    "postinstall": "fly setup",
    "build": "fly build",
    "docs": "fly docs",
    "release": "fly release",
    "start": "fly release serve",
    "watch": "fly watch"
  }
  ```

  This will let you execute commands with `npm`.

  > For example, `npm run watch`.

3. Configure [Fly](https://github.com/flyjs/fly) so that it loads this environment. Add this to your `package.json` file:

  ```json
  "fly": {
    "pkg": "node_modules/browser-module-env"
  }
  ```

4. Copy static assets to your `docs` directory.

  ```
  npm run postinstall
  ```

  > If this works, you're ready to roll! :tada:

## Commands

Each command takes the form: `npm run {command}`.

#### postinstall
Copies static demo assets (`bg.jpg`, `chart.css`, `demo.css`, `demo.js`) to your `docs` directory.

> **Note:** Once configured, this is will automatically run after future `npm install` commands.

#### build
Builds the [UMD](http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/#umd-universal-module-definition) module. Output is sent to `build`.

#### docs
Creates a [browserify](http://browserify.org/) bundle, using `docs/app.js` as its entry file. Output is sent to `docs/bundle.js`.

#### release
Runs [`build`](#build) and [`docs`](#docs) then minifies `build/*.js` and `docs/bundle.js` using [Uglify JS](http://lisperator.net/uglifyjs/).

> **Note:** Your minified module will be saved with a `.min.js` extension in the `build` directory.

#### serve
Starts a local server on port `3000` using [BrowserSync](https://www.browsersync.io/).

#### watch
Runs [`serve`](#serve) but will auto-compile & auto-reload the server after any file changes within `docs` directory.

## License

MIT © [Luke Edwards](https://lukeed.com)

