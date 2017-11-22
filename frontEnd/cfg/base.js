'use strict';
let path = require('path');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

module.exports = {
  additionalPaths: additionalPaths,
  port: 8000,
  debug: true,
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/../dist'),
    filename: 'app.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,   //"start": "webpack-dev-server --inline --content-base . --history-api-fallback"
    hot: true,
    port: 8000,
    publicPath: '/',
    noInfo: false,
    stats: 'errors-only',
    // proxy: 'http://localhost:4444',
    proxy: {
      '/api/**': {
        target: 'http://localhost:4444',
        changeOrigin: true,
        secure: false
      }
    }
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],

  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      }
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loaders: [
          'export-from-ie8/loader'
        ]
      }
    ]
  }
};
