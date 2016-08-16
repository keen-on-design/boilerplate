// Define base folders
var root    = './';
var src     = './app/';
var dest    = './build/';

// Include plugins
var gulp            = require('gulp'),
    concat          = require('gulp-concat'),
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

// Paths

var paths = {
    pug : {
        location : src + 'template/**/*.pug',
        compiled : src + 'template/_pages/*.pug',
        destination: dest
    },

    scss : {
        location : src + 'scss/**/*.scss',
        entryPoin : src + 'scss/style.scss',
        destination: dest + 'css'
    },

    js : {
        location : src + 'js/**/*.js',
        entryPoint : src + 'js/main.js',
        destination : dest + 'js'
    },

    browserSync : {
        baseDir : root,
        watchPaths : ['build/*.html', 'build/css/*.css', 'build/js/*.js']
    }
};



// ------- pug ---------

gulp.task('pug', function() {
    var assets = useref.assets();

    gulp.src(paths.pug.compiled)
      .pipe(plumber())
      .pipe(pug({
          pretty: '\t',
          basedir: root
      }))
      .pipe(assets)
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', cssnano()))
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest(paths.pug.destination));
});






gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: root
        }
    })
});


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


gulp.task('images', function() {
    return gulp.src(src + 'images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest(dest + 'img'));
});

// Watch for changes in files
gulp.task('watch', function() {
    // Watch bower vendors
    gulp.watch('../vendor/**/*.js', ['bower-js']);

    // Watch .html files
    gulp.watch(root + '*.html', browserSync.reload);

    // Watch .js files
    gulp.watch(src + 'js/*.js', ['scripts']);

    // Watch .scss files
    gulp.watch(src + 'scss/**/*.scss', ['sass']);

    // Watch image files
    gulp.watch(src + 'images/**/*', ['images']);
});

// Default Task
gulp.task('default', ['browserSync', 'bower-js', 'scripts', 'sass', 'images', 'watch']);