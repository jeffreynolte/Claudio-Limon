var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade');

var paths = {
  jade: ['./public/app/**/*.jade'],
  styles: './public/css/*.styl'
};

gulp.task('stylus', function() {
  gulp.src(paths.styles)
      .pipe(stylus())
      .pipe(gulp.dest('./public/css/'));
});

gulp.task('jade', function() {
  gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('./public/app/'));
});

gulp.task('watcher', function() {
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.styles, ['stylus']);
});

gulp.task('default', ['stylus', 'jade', 'watcher']);
