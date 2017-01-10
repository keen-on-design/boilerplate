'use strict';
var gulp = require('gulp'),
  util = require('gulp-util'),
  config = require('./gulp/config');

global.$ = {
  package: require('./package.json'),

  // Environment is stored in env property.
  env: {
    production: util.env[require('./gulp/config.env').flags.production] !== undefined,
    debug: util.env[require('./gulp/config.env').flags.debug] !== undefined
  },

  /**
   * Task list. Is used to build common tasks.
   * @property id Name of a task in a gulp pipeline. Optional: default value is set in a task file
   * @property path Path to a task file
   * @property config Task config. Optional: default config is set in a task file
   */
  tasks: [
    //Generally tasks should be created with config from a global storage: gulp/config.js.
    { id: 'js:lint', path: './gulp/c.tasks/eslint.js', config: config.lint },
    { id: 'js:bundle', path: './gulp/c.tasks/bundle.js', config: config.bundle },
    { id: 'js:browserify', path: './gulp/c.tasks/scripts.js', config: config.js },
    { id: 'sass', path: './gulp/c.tasks/sass.js', config: config.sass },
    { id: 'fonts', path: './gulp/c.tasks/relocate.js', config: config.fonts },
    { id: 'images', path: './gulp/c.tasks/images.js', config: config.images },

    //In some cases you can create tasks passing inline config to keep things simple and transparent.
    { id: 'clean:dev', path: './gulp/c.tasks/clean.js', config: {destination: config.destPrd} },
  ],

  browserSync : require('browser-sync').create()
};

$.tasks.forEach(function(task) {
  //Gathering all tasks. Now you can use them in your pipeline. Don't forget to check log for warnings and errors
  require(task.path)(task.id, task.config);
});

/**
 * This is your pipeline.
 */
gulp.task('default', gulp.series(
  'js:lint',
  'clean:dev',
  gulp.parallel(
    'js:bundle',
    'js:browserify',
    'sass',
    'fonts',
    'images'
  )
));