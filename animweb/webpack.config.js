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
      {
        test: /\.(png|jpg|gif|cur|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192, // If a file exceeds this size, use file-loader instead
          fallback: 'file-loader'
        }
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