'use strict';

var plugins = require('gulp-load-plugins')({
    DEBUG : false
});

//noinspection JSDuplicatedDeclaration,JSUnresolvedVariable
global.$ = {
    package: require('./package.json'),
    config: require('./gulp/config'),

    path: {
        task: [
            './gulp/c.tasks/clean.js',
            './gulp/c.tasks/sass.js',
            './gulp/c.tasks/fonts.js',
            './gulp/c.tasks/pug.js',
            './gulp/c.tasks/js.process.js',
            './gulp/c.tasks/images.js',
            './gulp/c.tasks/svg.sprite.js',
            './gulp/c.tasks/serve.js',
            './gulp/c.tasks/watch.js',
            './gulp/c.tasks/favicon.create.js',
            './gulp/c.tasks/favicon.to.pug.js',
            './gulp/c.tasks/favicon.test.update.js',
            './gulp/c.tasks/favicon.process.js'
        ]
    },

    gulp        : require('gulp'),
    rimraf      : require('rimraf'),
    fs          : {
        utils   : require('fs-utils'),
        exists  : require('file-exists')
    },
    console     : require('gulp-util'),
    plugins     : plugins,
    browserSync : require('browser-sync').create()
};

$.path.task.forEach(function(taskPath) {
    require(taskPath)();
});

$.gulp.task('favicon', $.gulp.series(
    'favicon.create',
    'favicon.to.pug',
    'favicon.test.update'
));

$.gulp.task('default', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'favicon.test.update',
        'favicon.process',
        'fonts',
        'sass',
        'pug',
        'js.process',
        'images',
        'svg.sprite'
    ),
    $.gulp.parallel(
        'watch',
        'serve'
    )
));