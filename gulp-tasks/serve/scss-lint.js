/**
 * Linting scss files
 */

const GulpParams = require('../../gulp-vars.js');
const gulpParams = new GulpParams();

const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

const browserSync = require('browser-sync');
const reload = browserSync.reload;

import scssLint from 'gulp-scss-lint';

module.exports = {
    fn: function (gulp, callback) {
        return gulp.src(gulpParams.scssWild)
        .pipe(scssLint({
            'config': 'lint.yml' // Custom Configuration file for linter.
        }))
        ;
    }
};
