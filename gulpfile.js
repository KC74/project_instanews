
// Required packages
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    eslint = require('gulp-eslint');

// scripts
gulp.task('scripts', ['lint'], function() {
    gulp.src('./js/*.js')
    .pipe(uglify()) // call uglify function on files
    .pipe(rename({ extname: '.min.js'})) // rename uglified file
    .pipe(gulp.dest('./build/js')) // save to build/js folder
});

gulp.task('say_hello', function() {
    console.log('hello!');
}); 

// watch scripts for changes and run script tasks
gulp.task('watch', function () {
    gulp.watch('./js/*.js', ['scripts']);
}); // EOF watch


// Reload Browser
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    }); // EOF browser sync

    // watch the following for changes
    gulp.watch('./build/js/*.js').on('change', browserSync.reload);
});

gulp.task('lint', function() {
    return gulp.src(['./js/**/*.js','!./node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// Gulp tasks
gulp.task('default', ['watch', 'browser-sync']);