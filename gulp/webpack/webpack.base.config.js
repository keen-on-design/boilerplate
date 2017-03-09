'use strict';
const path = require('path');
const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

/* Helpers */
const utils = require('./utils');

function resolve (dir) {
  return path.join(__dirname, '../..', dir)
}

module.exports = {
  entry: utils.isProduction() ? [
      './src/app.js'
    ] : [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/app.js'
    ],

  output: {
    path: path.resolve(__dirname, '../../build/'),
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[chunkhash].vendor.js',
    publicPath: './'
  },

  devtool: utils.isProduction() ? false : 'source-map',

  performance: {
    hints: utils.isProduction() ? 'warning' : false
  },

  resolve: {
    extensions: ['.js', '.scss', '.css', '.json'],
    modules: [
      resolve('src'),
      resolve('src/js/modules'),
      resolve('src/js/components'),
      resolve('node_modules'),
      resolve('node_modules/bootstrap-sass/assets/')
    ],
    alias: {
      'src': resolve('src'),
      'modules': resolve('src/js/modules'),
      'components': resolve('src/js/components')
    }
  },

  devServer: {
    publicPath: '/build/',
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{
          loader: 'babel-loader'
        }, {
          loader: 'eslint-loader', options: {
            emitWarning: true,
            failOnError: false
          }
        }]
      },
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: require('./vue-loader.conf')
        }]
      },
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: /\.scss$/,
        use: utils.sassLoaders()
      },
      {
        test: /\.css$/,
        use: utils.cssLoaders()
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [

    new webpack.HotModuleReplacementPlugin(),

    new ProgressPlugin(),

    new HtmlWebpackPlugin({
      hash: true,
      template: 'src/template/_pages/index.pug',
      filename: 'index.html',
      inject: true,
      minify: false
    }),

    new HtmlWebpackPlugin({
      hash: true,
      template: 'src/template/_pages/example.pug',
      filename: 'example.html',
      inject: true,
      minify: false
    }),

    new ManifestPlugin({
      fileName: 'manifest.json'
    })
  ],
};
