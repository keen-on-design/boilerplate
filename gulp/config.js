'use strict';
const path = require('./config.paths');
const _ = require('underscore');
const util = require('gulp-util');

module.exports = {
  lint: {
    location: path.src + 'js/**/*.js',

    eslint: {
      failAfterError: false
    }
  },

  pug: {
    location: path.src + 'template/**/*.pug',
    entryPoint: path.src + 'template/_pages/*.pug',
    destination: {
      production: path.destPrd,
      development: path.destDev
    },

    pug: {
      pretty: '\t',
      basedir: './'
    },

    useref: {}
  },

  webpack: (util.env[require('./config.env').flags.production] !== undefined) ? require('./webpack/webpack.prod.config') : require('./webpack/webpack.base.config'),

  bundle: {
    entryPoint: path.src + 'js/main.js',
    destination: {
      production: path.destPrd + 'js',
      development: path.destDev + 'js'
    },
    output: 'bundle.js',
    vendors: _.keys(require('../package.json').dependencies)
  },

  fonts: {
    location: path.src + 'fonts/**/*.{ttf,woff,woff2,eof,svg}',
    destination: {
      production: path.destPrd + 'fonts',
      development: path.destDev + 'fonts'
    }
  },

  svgsprite: {
    location: path.src + 'svg/**/*.svg',
    destination: {
      production: path.destPrd + 'svg',
      development: path.destDev + 'svg',
    },

    svgSprite: {
      mode: {
        symbol: {
          example: false
        }
      }
    },

    svgmin: {
      js2svg: {pretty: true}
    },

    cheerio: {
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[style]').removeAttr('style');
      },
      parserOptions: {
        xmlMode: true
      }
    }
  },

  ftp: require('./config.ftp')
};