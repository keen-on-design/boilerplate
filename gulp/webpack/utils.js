'use strict';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let $ = {};

$.isProduction = function () {
  return process.env.NODE_ENV === 'production';
};

$.sassLoaders = function () {
  if (!this.isProduction()) return [{
    loader: "style-loader" // creates style nodes from JS strings
  }, {
    loader: "css-loader" // translates CSS into CommonJS
  }, {
    loader: "sass-loader?precision=8" // compiles Sass to CSS
  }];

  return ExtractTextPlugin.extract({
    use: ['css-loader', 'postcss-loader', 'sass-loader?precision=8'],
    fallback: 'style-loader'
  });
};

$.cssLoaders = function () {
  if (!this.isProduction()) return [{
    loader: "style-loader" // creates style nodes from JS strings
  }, {
    loader: "css-loader" // translates CSS into CommonJS
  }];

  return ExtractTextPlugin.extract({
    use: ['css-loader', 'postcss-loader'],
    fallback: 'style-loader'
  });
};

module.exports = $;