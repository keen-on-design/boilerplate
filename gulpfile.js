// Include gulp
var gulp = require('gulp');

// Define base folders
var root    = './';
var src     = './app/';
var dest    = './build/';

// Include plugins
var concat          = require('gulp-concat'),
    plumber         = require('gulp-plumber'),
    uglify          = require('gulp-uglify'),
    rename          = require('gulp-rename'),
    sass            = require('gulp-sass'),
    imagemin        = require('gulp-imagemin'),
    cache           = require('gulp-cache'),
    cssnano         = require('gulp-cssnano'),
    filter          = require('gulp-filter'),
    mainBowerFiles  = require('main-bower-files'),
    debug           = require('gulp-debug'),
    browserSync     = require('browser-sync').create();


gulp.task('bower-js', function() {
    var mainFiles = mainBowerFiles();
    console.log(mainFiles);
    return gulp.src(mainFiles)
        .pipe(filter('**/*.js'))
        .pipe(gulp.dest(src + 'js'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(src + 'js/*.js')
        .pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(dest + 'js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Compile CSS from Sass files
gulp.task('sass', function() {
    return gulp.src(src + 'scss/style.scss')
        .pipe(plumber())
        .pipe(sass({style: 'compressed'}))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dest + 'css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Compile CSS from Sass files
gulp.task('html', function() {
    return gulp.src(root + '*.html');
});

gulp.task('images', function() {
    return gulp.src(src + 'images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest(dest + 'img'));
});

// Watch for changes in files
gulp.task('watch', function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // Watch .js files
    gulp.watch('../vendor/**/*.js', ['bower-js']);
    gulp.watch(src + 'js/*.js', ['scripts']);

    // Watch .scss files
    gulp.watch(root + '*.html', ['html']).on('change', browserSync.reload);

    // Watch .scss files
    gulp.watch(src + 'scss/style.scss', ['sass']);

    // Watch image files
    gulp.watch(src + 'images/**/*', ['images']);
});

// Default Task
gulp.task('default', ['bower-js', 'scripts', 'sass', 'images', 'html', 'watch']);