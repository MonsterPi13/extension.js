[action-image]: https://github.com/cezaraugusto/webpack-run-firefox-extension/workflows/CI/badge.svg
[action-url]: https://github.com/cezaraugusto/webpack-run-firefox-extension/actions
[npm-image]: https://img.shields.io/npm/v/webpack-run-firefox-extension.svg
[npm-url]: https://npmjs.org/package/webpack-run-firefox-extension

# webpack-run-firefox-extension [![workflow][action-image]][action-url] [![npm][npm-image]][npm-url]

<img src="https://user-images.githubusercontent.com/4672033/103182804-f2bc9a80-488c-11eb-936d-efa5474e384f.png" align=right height=180>

> Run your browser extension on Firefox with zero-config auto-reload support

Opens up a new Firefox instance with an extension loaded. Resources declared in manifest.json are auto-reloaded by default, including JavaScript and CSS declared in Manifest HTML pages. This plugin accepts all flags Firefox does (see [browserFlags](#browserFlags)) and loads on a clean profile by default.

## Highlights

- Zero-config auto-reload for [virtually everything](https://github.com/cezaraugusto/webpack-run-firefox-extension/issues/4) including all HTML overrides, and every resource you plan to require via `<script>` and `<link>` in manifest declared HTML pages.
- Fresh profile with developer mode enabled by default on every run. (customizable)
- Opens the handy "about:addons" by default for fast debugging.
- Uses the system browser instead of fully downloading Firefox. (accepts Canary builds)
- Closing the webpack process instantly kills all child processes. No extra steps to open/close Firefox.
- Supports [virtually all Firefox flags](https://peter.sh/experiments/chromium-command-line-switches/).

## See it in action

```
git clone git@github.com:cezaraugusto/webpack-run-firefox-extension.git
cd webpack-run-firefox-extension && yarn install
yarn demo
```

<p align='center'>
<img src='https://user-images.githubusercontent.com/4672033/105644192-e0755280-5e72-11eb-90bd-658224eb33c7.gif' width='600' alt='npm start'>
</p>

## Usage

```
yarn add webpack-run-firefox-extension --save-dev
```

If you want to watch for file changes in your extension, `watch` mode must be enabled.

```diff
// webpack config file
+ const RunFirefoxExtension = require('webpack-run-firefox-extension')

module.exports {
+  watch: true,
  plugins: [
+   new RunFirefoxExtension({
+     extensionPath: 'path/to/extension'
+   })
  ]
}
```

**Lazy sample**

```js
const RunFirefoxExtension = require('webpack-run-firefox-extension')

new RunFirefoxExtension({
  extensionPath: 'path/to/extension/dir', // Only required field
  browserFlags: [
    '--enable-experimental-extension-apis',
    '--embedded-extension-options'
  ],
  userDataDir: 'path/to/user/data/dir',
  startingUrl: 'https://example.com',
  autoReload: true,
  port: 8081
})
```

## API

### new RunFirefoxExtension(options)

#### Options

##### extensionPath (required)

Type: `string`

Path to your extension. Must point to the same directory as the manifest file.

##### browserFlags (optional)

Type: `Array<string>`

Additional flags to pass to Firefox. Defaults to [these flags](https://github.com/GoogleFirefox/firefox-launcher/blob/master/src/flags.ts).

For a full list of available flags, see https://peter.sh/experiments/chromium-command-line-switches/.

##### userDataDir (optional)

Type: `string` | `boolean`

What Firefox profile path to use. A boolean value of `false` sets the profile to the default user profile. Defaults to a fresh Firefox profile.

##### startingUrl (optional)

Type: `string`

What URL to start the browser with. Defaults to `about:blank`

##### autoReload (optional)

Type: `boolean`

Whether to enable auto-reload on save. Defaults to `true`

##### port (optional)

Type: `number`

What port should run the extension reloader. Defaults to `8081`

## License

MIT (c) Cezar Augusto.
