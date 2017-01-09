'use strict';

var path = require('./config.paths');

module.exports = {
  ftp : {

    dest : '/public_html/',

    files : [
      path.destRls + 'css/**',
      path.destRls + 'js/**',
      path.destRls + 'fonts/**',
      path.destRls + 'images/**',
      path.destRls + 'svg/**',
      path.destRls + 'api/**',
      path.destRls + '*.*'
    ],

    connect : {
      host        : 'HOMESTEAD',
      user        : 'USERNAME',
      password    : 'SECRET',
      parallel    : 10,
      log         : require('gulp-util').log,
    },

    config : {
      base        : path.destRls,
      buffer      : false
    }
  }
};