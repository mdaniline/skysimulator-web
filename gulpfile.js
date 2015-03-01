var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var debowerify = require('debowerify');


var STATIC_ROOT = './skysimulator/static';
var JS_ROOT = './frontend/js/src';
var SASS_ROOT = './frontend/scss';

gulp.task('styles', function() {
    gulp.src(SASS_ROOT + '/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'compressed' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(STATIC_ROOT + '/css'));
});

gulp.task('scripts', function() {
    var bundler = browserify({
       entries: [JS_ROOT + '/main.js'],
       debug: true
    });
    bundler.transform(debowerify);

    var bundle = function() {
        return bundler.bundle()
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps:true }))
            .pipe(uglify())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(STATIC_ROOT + '/js'));
    };

    return bundle();
});

gulp.task('watch', function() {
    gulp.watch(SASS_ROOT + '/*.scss', ['styles']);
    gulp.watch(JS_ROOT + '/**/*.js', ['scripts']);
});

gulp.task('default', ['watch']);

