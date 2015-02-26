var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var debowerify = require('debowerify');

gulp.task('styles', function() {
    gulp.src('./skysimulator/static/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'compressed' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./skysimulator/static/css'));
});

gulp.task('scripts', function() {
    var bundler = browserify({
       entries: ['./skysimulator/static/js-source/app.js'],
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
            .pipe(gulp.dest('./skysimulator/static/js/'));
    };

    return bundle();
});

gulp.task('watch', function() {
    gulp.watch('./skysimulator/static/scss/*.scss', ['styles']);
    gulp.watch('./skysimulator/static/js-source/*.js', ['scripts']);
});

gulp.task('default', ['watch']);

