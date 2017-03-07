'use strict';
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const base = require('./webpack.base.config');


base.plugins.push(

  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),

  new ExtractTextPlugin({
    filename: 'css/[name].[contenthash].css',
    allChunks: true,
  }),

  new OptimizeCssAssetsPlugin({
    cssProcessor: require('cssnano'),
    cssProcessorOptions: { discardComments: {removeAll: true } },
    canPrint: true
  }),

  // extract vendor chunks
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module, count) {
      return (
        module.resource &&
        /\.js$/.test(module.resource) &&
        module.resource.indexOf(
          path.join(__dirname, '../../node_modules')
        ) === 0
      )
    }
  }),

  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: ['vendor']
  }),

  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  }),

  new webpack.LoaderOptionsPlugin({
    minimize: true
  })
);

module.exports = base;
