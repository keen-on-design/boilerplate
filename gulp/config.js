'use strict';
const path = require('./config.paths');
const _ = require('underscore');
const util = require('gulp-util');

module.exports = {

  favicon: {
    location: path.src + 'favicon/master.png',
    destination: path.src + 'favicon/',
    dataFile: path.root + 'favicon.json',
    basedir: '/',
    template: '_favicon.pug',
    config: require('./config.favicon.js')
  },

  browsersync: {
    server: {
      open: false,
      server: path.destDev
    },
    watch: [path.destDev + '**/*.*', '!**/*.css']
  },

  sass: {
    location: path.src + 'scss/**/*.scss',
    entryPoint: path.src + 'scss/style.scss',
    destination: {
      production: path.destPrd + 'css',
      development: path.destDev + 'css'
    },
    sass: {},
    autoprefixer: {
      browsers: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1']
    }
  },

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

  vue: {
    location: path.src + 'js/**/*.vue',
  },

  webpack: (util.env[require('./config.env').flags.production] !== undefined) ? require('./webpack/webpack.prod.config') : require('./webpack/webpack.base.config'),

  browserify: require('./config.browserify'),

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

  images: {
    location: path.src + 'images/**/*',
    destination: {
      production: path.destPrd + 'images',
      development: path.destDev + 'images'
    },

    imagemin: {
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
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