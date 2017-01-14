'use strict';
var gulp = require('gulp'),
  util = require('gulp-util'),
  config = require('./gulp/config');

global.$ = {
  package: require('./package.json'),

  // Global Browsersync instance.
  browserSync: require('browser-sync').create(),

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
    // Generally tasks should be created with config from a global storage: gulp/config.js.
    { id: 'js:lint', path: './gulp/c.tasks/eslint.js', config: config.lint },
    { id: 'js:bundle', path: './gulp/c.tasks/bundle.js', config: config.bundle },
    { id: 'js:browserify', path: './gulp/c.tasks/browserify.js', config: config.js },
    { id: 'pug', path: './gulp/c.tasks/pug.js', config: config.pug },
    { id: 'sass', path: './gulp/c.tasks/sass.js', config: config.sass },
    { id: 'fonts', path: './gulp/c.tasks/relocate.js', config: config.fonts },
    { id: 'images', path: './gulp/c.tasks/images.js', config: config.images },
    { id: 'svg:sprite', path: './gulp/c.tasks/svg.js', config: config.svgsprite },
    { id: 'serve', path: './gulp/c.tasks/serve.js', config: config.browsersync },

    // In some cases you can create tasks passing inline config to keep things simple and transparent.
    { id: 'clean:dev', path: './gulp/c.tasks/clean.js', config: {destination: config.destPrd} },
  ]
};

$.tasks.forEach(function(task) {
  // Gathering all tasks. Now you can use them in your pipeline. Don't forget to check log for warnings and errors.
  require(task.path)(task.id, task.config);
});

/**
 * This is your pipeline. Here нou can define additional tasks the way you are used to.
 */

gulp.task('watch', function () {
  gulp.watch(config.js.location, gulp.series('js:lint', 'js:browserify'));
  gulp.watch(config.sass.location, gulp.series('sass'));
  gulp.watch(config.pug.location, gulp.series('pug'));
  gulp.watch(config.fonts.location, gulp.series('fonts'));
  gulp.watch(config.svgsprite.location, gulp.series('svg:sprite'));
  gulp.watch(config.images.location, gulp.series('images'));
});

gulp.task('default', gulp.series(
  'js:lint',
  'clean:dev',
  gulp.parallel(
    'js:bundle',
    'js:browserify',
    'pug',
    'sass',
    'images',
    'svg:sprite',
    'fonts'
  ),
  gulp.parallel(
    'watch',
    'serve'
  )
));