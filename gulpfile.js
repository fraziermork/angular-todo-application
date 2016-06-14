'use strict';

const gulp    = require('gulp');
const eslint  = require('gulp-eslint');
const mocha   = require('gulp-mocha');
const del     = require('del');
const webpack = require('webpack-stream');


const PATHS   = {
  frontend:       [`${__dirname}/app/**/*.js`],
  html:           [`${__dirname}/app/main/index.html`, `${__dirname}/app/components/**/*.html`], 
  bootstrap:      [`${__dirname}/node_modules/bootstrap/dist/css/bootstrap.min.css`], 
  build:          `${__dirname}/build`, 
  webpackEntry:   `${__dirname}/app/entry.js`,
  webpackConfig:  `${__dirname}/webpack.config.js`
};

gulp.task('eslint', () => {
  return gulp.src(PATHS.backend.concat(PATHS.frontend))
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('app:build-clear', () => {
  return del(PATHS.build + '/*');
});
gulp.task('app:build-bootstrap', () => {
  return gulp.src(PATHS.bootstrap)
    .pipe(gulp.dest(PATHS.build));
});
gulp.task('app:build-html', () => {
  return gulp.src(PATHS.html)
    .pipe(gulp.dest(PATHS.build));
});
gulp.task('app:build-js', () => {
  return gulp.src(PATHS.webpackEntry)
    .pipe(webpack(require(PATHS.webpackConfig)))
    .pipe(gulp.dest(PATHS.build));
});
gulp.task('app:build-all', ['app:build-clear', 'app:build-bootstrap', 'app:build-html', 'app:build-js']);
gulp.task('app:watch', () => {
  gulp.watch(`${__dirname}/app/**`, ['app:build-all']);
});

gulp.task('default', ['eslint', 'app:build-all']);
