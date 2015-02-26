var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function() {
    gulp.src('./skysimulator/static/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'compressed' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./skysimulator/static/css'));
});

gulp.task('watch', function() {
    gulp.watch('./skysimulator/static/scss/*.scss', ['styles']);
});

gulp.task('default', ['watch']);

