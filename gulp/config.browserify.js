'use strict';
let path = require('./config.paths');

module.exports = {
  location    : path.src + 'js/**/*.js',
  entryPoint  : path.src + 'js/main.js',
  destination : {
    production  : path.destPrd + 'js',
    development : path.destDev + 'js'
  },
  vendors: _.keys(require('../package.json').dependencies),
  browserify: {
    insertGlobals: true,
    transform: []
  }
};