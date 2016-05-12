'use strict'

const gulp         = require('gulp');
const sourcemaps   = require('gulp-sourcemaps');
const source       = require('vinyl-source-stream');
const buffer       = require('vinyl-buffer');
const browserify   = require('browserify');
const watchify     = require('watchify');
const babel        = require('babelify');
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const nodemon      = require('gulp-nodemon');
const rename       = require('gulp-rename');


gulp.task('sass', function () {
  return gulp
    .src('./src/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(rename('_.css'))
    .pipe(gulp.dest('./static'));
});

function compile(watch) {
  var bundler = watchify(browserify('./src/app/app.js', { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('_.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./static'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('build', ['sass'], () => { return compile(); });

gulp.task('watch', function() {
    gulp.watch('./src/styles/**/*.scss', ['sass']);
    gulp.watch('./src/app/**/*.js', () => { return compile(); });
});

gulp.task('serve', function () {
  nodemon({
      script: 'src/server/app.js'
  })
  .on('restart', function () {
      console.log('restarted!')
  });
});

gulp.task('default', ['watch', 'serve']);
