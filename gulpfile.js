"use strict";

// Load plugins
const browsersync = require("browser-sync").create();
const del = require("del");
const gulp = require("gulp");
const merge = require("merge-stream");
const sass = require("gulp-sass");

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean vendor
function clean() {
  return del(["./vendor/", "css/*"]);
}

function styles() {
  return gulp.src('scss/main.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest('./css/'));
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap
  var bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*')
    .pipe(gulp.dest('./vendor/bootstrap'));
  // jQuery
  var jquery = gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'));
  // popmotion
  var popmotion = 
    gulp.src('./node_modules/popmotion/dist/*')
      .pipe(gulp.dest('./vendor/popmotion'));
  
  return merge(bootstrap, jquery, popmotion);
}

// Watch files
function watchFiles() {
  // gulp.watch("./**/*.css", browserSyncReload);
  gulp.watch('scss/**/*.scss', (done) => {
        gulp.series([styles])(done);
        browserSyncReload(done)
    });
  gulp.watch("./**/*.html", browserSyncReload);
  gulp.watch("./**/*.js", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const compileSassStyles = gulp.series(clean, styles);
const build = gulp.series(vendor, styles);
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
