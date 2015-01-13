// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');

// Styles
gulp.task('styles', function() {
  return gulp.src('src/scss/style.scss')
    .pipe(sass({ style: 'compressed', errLogToConsole: true }))
    .pipe(autoprefixer('last 2 version'))
    .pipe(minifycss())
    .pipe(gulp.dest('./'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('./site-assets/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('./site-assets'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Default task
gulp.task('default', function() {
    gulp.start('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('src/scss/**/*.scss', ['styles']);
  // Watch .js files
  gulp.watch('src/js/**/*.js', ['scripts']);
  // Watch image files
  gulp.watch('site-assets/**/*', ['images']);
  // Create LiveReload server
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['src/**']).on('change', livereload.changed);
});