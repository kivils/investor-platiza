/**
 * Processing Vendor`s scripts
 */

const GulpParams = require('../../gulp-vars.js');
const gulpParams = new GulpParams();

const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

module.exports = {
    fn: function (gulp, callback) {
        return gulp.src(gulpParams.pagesWild)
            .pipe($.useref({searchPath: [gulpParams.jsSourcePath, '.']}))// Concatenate js files
            .pipe($.filter(['**/*.js'])) // Filter js files
            .pipe(gulp.dest(gulpParams.buildPath)) // Put files into build folder
            ;
    }
};
