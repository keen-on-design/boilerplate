'use strict';

const isProduction = process.env.NODE_ENV === 'production';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let config = {};
if (isProduction) {
  config = {
    loaders: {
      sass: ExtractTextPlugin.extract({
        use: [
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          }
        ],
        fallback: 'vue-style-loader'
      }),
      css: ExtractTextPlugin.extract({
        use: ['css-loader'],
        fallback: 'vue-style-loader'
      })
    }
  }
} else {
  config = {
    loaders: {
      scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
      sass: 'vue-style-loader!css-loader!sass-loader' // <style lang="sass">
    }
  }
}

module.exports = config;
