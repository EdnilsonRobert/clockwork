/** ============================================================================
    Project: .clockwork
    ----------------------------------------------------------------------------
    @description: Clockwork: uma biblioteca CSS
    @author: EdnilsonRobert <frontend@ednilsonrobert.dev>
============================================================================= */

// VARIABLES -------------------------------------------------------------------
const gulp = require('gulp'),
      concat = require('gulp-concat'),
      eslint = require('gulp-eslint'),
      notify = require('gulp-notify'),
      rename = require('gulp-rename'),
      sass = require('gulp-sass')(require('sass')),
      sourcemaps = require('gulp-sourcemaps'),
      terser = require('gulp-terser');

const messages = require('./gulpconfig.js').default.messages;
const paths = require('./gulpconfig.js').default.paths;

// NOTIFY ----------------------------------------------------------------------
let cssFailed = () => {
  return notify(messages.css.error).write(messages.css.cssErrorMessage);
};

let cssUpdated = () => {
  return notify(messages.css.success);
};

let jsFailed = () => {
  return notify(messages.js.error).write(messages.js.jsErrorMessage);
};

let jsUpdated = () => {
  return notify(messages.js.success);
};

// CSS -------------------------------------------------------------------------
const outputStyles = {
  // NESTED: 'nested',      /* Não suportado */
  EXPANDED: 'expanded',
  // COMPACT: 'compact',    /* Não suportado */
  COMPRESSED: 'compressed'
}

let sassify = () => {
  return gulp
    .src(`${paths.css.src}/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: outputStyles.COMPRESSED })
    .on('error', sass.logError)
    .on('error', (err) => {
      console.log(`Console de erros [Notifier]: ${err}`);
      cssFailed();
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.css.dest))
    .pipe(cssUpdated());
};
exports.sassify = sassify;

let configCSS = () => {
  return gulp
    .src(`${paths.css.src}/**/config.css`)
    .pipe(gulp.dest(paths.css.dest));
};
exports.configCSS = configCSS;

// JAVASCRIPT ------------------------------------------------------------------
let jsify = () => {
  console.log(`Environment: ${process.env.NODE_ENV}.`);

  return gulp
    .src(`${paths.js.src}/**/*.js`)
    .pipe(eslint())
    .pipe(eslint.results(results => {
      const countE = results.errorCount;
      const countW = results.warningCount;
      if(countE !== 0 || countW !== 0) jsFailed();
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(terser({
      parse: { ecma: 2017 },
      compress: { ecma: 5 },
      output: { ecma: 5 },
      keep_classnames: false,
      keep_fnames: false,
      toplevel: false,
      warnings: false
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(jsUpdated())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browsersync.reload({ stream: true }));
};
exports.jsify = jsify;

let lintifyGulp = () => {
  return gulp
    .src('./gulpfile.js')
    .pipe(eslint())
    .pipe(eslint.results(results => {
      const countE = results.errorCount;
      const countW = results.warningCount;
      if(countE !== 0 || countW !== 0) jsFailed();
    }))
    .pipe(eslint.format());
};
exports.lintifyGulp = lintifyGulp;

// TASKS -----------------------------------------------------------------------
let dev = () => {
  gulp.src(paths.root.src).pipe(notify(messages.gulp.isRunning));
  gulp.watch(`${paths.css.src}/**/*.scss`, gulp.series(configCSS, sassify));
  gulp.watch(`${paths.js.src}/**/*.js`, gulp.series(jsify));
};
exports.dev = dev;

gulp.task('default', gulp.series(dev), () => {
  console.log('>>> GulpJS works like a charm.');
});
