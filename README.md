<div align="center">
  <h1>HTML Webpack Assets Plugin</h1>
  <p>Plugin to manage injection of chunks into <b>head</b> and <b>body</b> using <a href="https://github.com/jantimon/html-webpack-plugin">HtmlWebpackPlugin</a></p>
</div>

<h2 align="center">Installation</h2>

```bash
  npm i --save-dev html-webpack-assets
```

```bash
  yarn add --dev html-webpack-assets
```


This is a [webpack](http://webpack.js.org/) plugin that manage chunks in `head` and `body` tags of HTML files using `HtmlWebpackPlugin` to serve your `webpack` bundles.


<h2 align="center">Usage</h2>

If you want inject chunks in the html document using HtmlWebpackPlugin, somethime you need to inject some `chunks` in `head` or `body`, you just need put chunks to entry in `webpack.config.js` with key `head` or `body`.

**webpack.config.js**
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackAssets = require('html-webpack-assets');

module.exports = {
  entry: {
    head: "./src/head.css", // Add to head tag
    body: "./src/body.js" // Add to body tag
  },
  output: {
    path: "./dist",
    filename: "[name].bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.ejs",
      chunks: ["head", "body"]
    }),
    new HtmlWebpackAssets()
  ]
}
```

This will generate a file `dist/index.html` containing the following

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Test</title>
    <script type="text/javascript" src="head.bundle.js"></script>
  </head>
  <body>
    <script src="body.bundle.js"></script>
  </body>
</html>
```
