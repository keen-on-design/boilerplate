'use strict';

let gutil = require('gulp-util');
const isProduction = (gutil.env[require('./gulp/config.env').flags.production] !== undefined);

// Set node env to production if running with a production flag
if (isProduction) process.env.NODE_ENV = 'production';

let gulp = require('gulp');
let config = require('./gulp/config');
let path = require('./gulp/config.paths');


global.$ = {
  package: require('./package.json'),

  // Global Browsersync instance.
  browserSync: require('browser-sync').create(),

  // Environment is stored in env property.
  env: {
    production: gutil.env[require('./gulp/config.env').flags.production] !== undefined,
    debug: gutil.env[require('./gulp/config.env').flags.debug] !== undefined
  },

  /**
   * Task list. Is used to build common tasks.
   * @property id Name of a task in a gulp pipeline. Optional: default value is set in a task file
   * @property path Path to a task file
   * @property config Task config. Optional: default config is set in a task file
   */
  tasks: [
    // Generally tasks should be created with config from a global storage: gulp/config.js.
    {id: 'webpack', path: './gulp/c.tasks/webpack.js', config: config.webpack},
    {id: 'serve', path: './gulp/c.tasks/webpack-dev-server.js', config: config.webpack},
    {id: 'svg:sprite', path: './gulp/c.tasks/svg.js', config: config.svgsprite},
    {id: 'ftp:deploy', path: './gulp/c.tasks/ftp-deploy.js', config: config.ftp},
    {id: 'ftp:clean', path: './gulp/c.tasks/ftp-clean.js', config: config.ftp},

    // In some cases you can create tasks passing inline config to keep things transparent.
    {id: 'clean', path: './gulp/c.tasks/clean.js', config: {destination: './build'}},
  ]
};

$.tasks.forEach(function (task) {
  // Gathering all tasks. Now you can use them in your pipeline. Don't forget to check log for warnings and errors.
  require(task.path)(task.id, task.config);
});

/**
 * This is your pipeline. Here нou can define additional tasks the way you are used to.
 */

gulp.task('watch', function () {
  gulp.watch(config.svgsprite.location, gulp.series('svg:sprite'));
});

gulp.task('deploy-clean', gulp.series(
  'ftp:clean'
));

gulp.task('deploy', gulp.series(
  'ftp:deploy'
));

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel(
    'svg:sprite'
  ),
  'webpack',
  (!isProduction) ? gulp.parallel('serve', 'watch') : function (done) {done();})
);