/**
 * ESLint
 */

const GulpParams = require('../gulp-vars.js');
const gulpParams = new GulpParams();

const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

const browserSync = require('browser-sync');
const reload = browserSync.reload;

module.exports = {
    fn: function (gulp, callback) {
        gulp.src(gulpParams.scriptsWild)
            .pipe($.if(process.env.NODE_ENV == 'serve', reload({stream: true, once: true}))) // Reload browsers
            .pipe($.eslint())
            .pipe($.eslint.format())
            .pipe($.if(!browserSync.active, $.eslint.failAfterError()))
            ;
        callback();
    }
};
