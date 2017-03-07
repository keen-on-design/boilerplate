'use strict';
let path = require('./config.paths');
let _ = require('underscore');
let vueify = require('vueify');
let babelify = require('babelify');

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
    transform: [
      babelify.configure({presets: ["es2015", "stage-2"]}),
      vueify
    ],
    plugin: [
      ['vueify/plugins/extract-css', {
        out: './build/css/bundle.css'
      }]
    ]
  }
};
