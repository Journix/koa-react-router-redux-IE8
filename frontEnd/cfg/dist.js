'use strict';

let path = require('path');
let webpack = require('webpack');
let merge = require('webpack-merge');

let baseConfig = require('./base');

// Add needed plugins here
let es3ifyPlugin = require('es3ify-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let config = merge(baseConfig, {
  entry: path.join(__dirname, '../src/index.js'),
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          properties: false,
          warnings: false
      },
      output: {
          beautify: true,
          quote_keys: true
      },
      mangle: {
          screw_ie8: false
      },
      // sourceMap: false
  }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new es3ifyPlugin(),
    // new webpack.NoErrorsPlugin()
    new HtmlWebpackPlugin({
        title: 'spa demo',
        filename: 'index.html',
        template: path.join(__dirname, '../index-template.html')
    })
  ]
});

config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  query: {
    'plugins': [
      ['transform-runtime', {
        'helpers': false,
        'polyfill': false,
        'regenerator': true,
        'moduleName': 'babel-runtime'
      }],
      'transform-es3-property-literals',
      'transform-es3-member-expression-literals'
    ],
    'presets': [
      ['es2015',
        {
          'loose': true
        }
      ],
      'react',
      'stage-0'
    ]
  }
});


module.exports = config;
