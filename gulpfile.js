
// Required packages
const   gulp = require('gulp'),
        uglify = require('gulp-uglify'),
        rename = require('gulp-rename'),
        watch = require('gulp-watch'),
        browserSync = require('browser-sync').create(),
        eslint = require('gulp-eslint'),
        sass = require('gulp-sass'),
        autoprefixer = require('gulp-autoprefixer'),
        cssnano = require('gulp-cssnano'),
        prettyError = require('gulp-prettyerror'),
        babel = require('gulp-babel');
        
// Babel
gulp.task('babel', () => {
    return gulp.src('./js/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./build/js'));
});

// Script build
gulp.task('scripts', ['lint'], function() {
    gulp.src('./js/*.js')
    .pipe(babel({
        presets: ['es2015']
    })) // call babel
    .pipe(uglify()) // call uglify function on files
    .pipe(rename({ extname: '.min.js'})) // rename uglified file
    .pipe(gulp.dest('./build/js')) // save to build/js folder
}); // END OF SCRIPT BUILD

// watch scripts for changes and run script tasks
gulp.task('watch', function () {
    gulp.watch('./js/*.js', ['scripts']);
    gulp.watch('./sass/*.scss', ['sass']);
}); // EOF watch


// Reload Browser
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    }); // EOF browser sync

    // watch the following for changes
    gulp.watch('./build/**/*min.css').on('change', browserSync.reload);
    gulp.watch('./build/**/*min.js').on('change', browserSync.reload);
    

}); // EOF Browser reload

// JS Lint
gulp.task('lint', function() {
    return gulp.src(['./js/**/*.js','!./node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}); // EOF JS Lint

// GULP SASS Compiler
gulp.task('sass', function() {
   gulp.src('./sass/*.scss')
      .pipe(prettyError())
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./build/css'))
      .pipe(cssnano())
      .pipe(rename({extname: '.min.css'}))
      .pipe(gulp.dest('./build/css'));
}); // EOF SASS Compiler

// Gulp tasks
gulp.task('default', ['watch', 'browser-sync']);