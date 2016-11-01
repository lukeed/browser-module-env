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
  module.exports = require('browser-module-env/flyfile.js');
  ```

  This will expose this module's [pre-configured command scripts](#commands).

2. Connect this module's commands to your `package.json` file within `"scripts"`:

  ```json
  "scripts": {
    "setup": "fly setup",
    "build": "fly build",
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

## Commands

#### setup
Copies static demo assets (`bg.jpg`, `chart.css`, `demo.css`, `demo.js`) to your `docs` directory.

#### build
Creates a [browserify](http://browserify.org/) bundle, using `docs/app.js` as its entry file. Output is sent to `docs/bundle.js`.

#### release
Runs [`build`](#build) then minifies `docs/bundle.js` using [Uglify JS](http://lisperator.net/uglifyjs/).

#### serve
Starts a local server on port `3000` using [BrowserSync](https://www.browsersync.io/).

#### watch
Runs [`serve`](#serve) but will auto-compile & auto-reload the server after any file changes within `docs` directory.

## License

MIT © [Luke Edwards](https://lukeed.com)

