const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/scroll-animate-to.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'scroll-animate-to.min.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      { test: /\.(js)$/, exclude: /node_modules/, loader: "babel-loader" },
    ]
  },
  plugins: [
    new UglifyJsPlugin()
  ]
};