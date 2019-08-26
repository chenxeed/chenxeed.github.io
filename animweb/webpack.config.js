var webpack = require("webpack");
var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./src/script/index.js",
  output: {
    filename: "script.js",
    path : process.cwd() + '/bundle',
    publicPath : 'bundle/'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel' // 'babel-loader' is also a legal name to reference
      },
      {
        test: /\.(wav|mp3|m4a)$/,
        exclude: /(node_modules)/,
        loader: 'file-loader'
      },
      {
        test: /\.(html)$/,
        exclude: /(node_modules)/,
        loader: 'html-loader'
      },
      { test : /\.(css)$/, loaders : [ 'style', 'raw' ]}
    ]
  },
  resolve: {
    root: [
          path.resolve( './src/script' ),
          path.resolve( './src/audio' ),
          path.resolve( './src' )
      ]
  },
  amd: { jQuery: true },
  devtool: 'eval'
}