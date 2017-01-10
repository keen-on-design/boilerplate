'use strict';
var path = require('./config.paths'),
  _ = require('underscore');

module.exports = {

    root    : path.root,
    src     : path.src,
    destDev : path.destDev,
    destPrd : path.destPrd,

    app : {
        favicon : {
            location    : path.src + 'favicon/master.png',
            destination : path.src + 'favicon/',
            dataFile    : path.root + 'favicon.json',
            basedir     : '/',
            template    : '_favicon.pug',
            config      : require('./config.favicon.js')
        },
        deploy : require('./config.ftp.js')
    },

    sass: {
      location    : path.src + 'scss/**/*.scss',
      entryPoint  : path.src + 'scss/style.scss',
      destination : {
        production  : path.destPrd + 'css',
        development : path.destDev + 'css'
      },
      sass : {},
      autoprefixer : {
        browsers: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1']
      }
    },

    lint : {
      location : path.src + 'js/**/*.js',

      eslint : {
        failAfterError : false
      }
    },

    pug: {
        location       : path.src + 'template/**/*.pug',
        compiled       : path.src + 'template/_pages/*.pug',
        destinationDev : path.destDev,
        destinationRls : path.destRls,
        externals      : path.src + 'template/_external/',
        dummy          : path.src + 'template/_external/_dummy.pug',

        config: {
            pretty: '\t',
            basedir: path.root
        }

    },

    js : {
      location    : path.src + 'js/**/*.js',
      entryPoint  : path.src + 'js/main.js',
      destination : {
        production  : path.destPrd + 'js',
        development : path.destDev + 'js'
      },
      vendors: _.keys(require('../package.json').dependencies),
      browserify: {
        insertGlobals: true
      }
    },

    bundle : {
      entryPoint  : path.src + 'js/main.js',
      destination : {
        production  : path.destPrd + 'js',
        development : path.destDev + 'js'
      },
      output : 'bundle.js',
      vendors: _.keys(require('../package.json').dependencies)
    },

    fonts : {
      location       : path.src + 'fonts/**/*.{ttf,woff,woff2,eof,svg}',
      destination : {
        production  : path.destPrd + 'fonts',
        development : path.destDev + 'fonts'
      }
    },

    images : {
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

    svg: {
        location       : path.src + 'svg/**/*.svg',
        destinationDev : path.destDev + 'svg',
        destinationRls : path.destRls + 'svg',

        config: {
            sprite: {
                svgmin: {
                    js2svg: {
                        pretty: true
                    }
                },
                cheerio: {
                    run: function ($) {
                        $('[fill]').removeAttr('fill');
                        $('[style]').removeAttr('style');
                    },
                    parserOptions: {
                        xmlMode: true
                    }
                },
                svgSprite: {
                    mode: {
                        symbol: {
                            example: false
                        }
                    }
                }
            }
        }
    },

};