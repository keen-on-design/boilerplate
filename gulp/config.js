'use strict';

var root = './',
    src  = './app/',
    dest = './build/';

module.exports = {

    root    : root,
    src     : src,
    dest    : dest,

    app : {
        favicon : {
            location    : src + 'favicon/master.png',
            destination : src + 'favicon/',
            dataFile    : root + 'favicon.json',
            basedir     : '/',
            template    : '_favicon.pug',

            config      : require('./config.favicon.js')
        }
    },

    sass : {
        location    : src  + 'scss/**/*.scss',
        entryPoint  : src  + 'scss/style.scss',
        destination : dest + 'css',

        config      : {
            outputStyle: 'compressed',
            autoprefixer: {
                browser: [
                    'last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1'
                ]
            }
        }
    },

    pug : {
        location    : src + 'template/**/*.pug',
        compiled    : src + 'template/_pages/*.pug',
        destination : dest,
        externals   : src + 'template/_external/',
        dummy       : src + 'template/_external/_dummy.pug',

        config      : {
            pretty  : '\t',
            basedir : root
        }

    },

    js : {
        location    : src  + 'js/**/*.js',
        entryPoint  : src  + 'js/main.js',
        destination : dest + 'js',

        config      : {
            process : {
                result      : 'main.min.js',
                browserify  : {
                    insertGlobals   : true,
                    debug           : true
                }
            }
        }
    },

    fonts : {
        location    : src  + 'fonts/**/*.{ttf,woff,woff2,eof,svg}',
        destination : dest + 'fonts'
    },

    images: {
        location    : src + 'images/**/*',
        destination : dest + 'img',

        config      : {
            imagemin : {
                optimizationLevel   : 5,
                progressive         : true,
                interlaced          : true
            }
        }
    },

    svg : {
        location : src + '**/*.svg',
        destination : dest + 'svg',

        config : {
            sprite : {
                svgmin : {
                    js2svg: {
                        pretty: true
                    }
                },
                cheerio : {
                    run: function ($) {
                        $('[fill]').removeAttr('fill');
                        $('[style]').removeAttr('style');
                    },
                    parserOptions: {
                        xmlMode: true
                    }
                },
                svgSprite : {
                    mode : {
                        symbol              : {
                            example         : true
                        }
                    }
                }
            }
        }
    },

};