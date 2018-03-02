/**
 * Processing and watching js files
 */

const GulpParams = require('../../gulp-vars.js');
const gulpParams = new GulpParams();

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

const source = require('vinyl-source-stream');

const browserSync = require('browser-sync');
const reload = browserSync.reload;

function bundle() {
    gulpParams.b.bundle()
        .on('error', $.util.log.bind($.util, 'Browserify Error'))
        .pipe(source('scripts.js'))
        .pipe(gulp.dest(gulpParams.jsSourcePath))
        .pipe(reload({stream: true})) // Reload browsers
        ;
}

module.exports = {
    deps: ['lint'],
    fn: function (gulp, callback) {
        bundle();
        gulpParams.b.on('update', bundle);
        gulpParams.b.on('log', $.util.log);
        callback();
    }
};
