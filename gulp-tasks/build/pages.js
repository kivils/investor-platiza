/**
 * Processing html and php files
 */

const GulpParams = require('../../gulp-vars.js');
const gulpParams = new GulpParams();

const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

const injectVersion = require('gulp-inject-version');

module.exports = {
    deps: [
        'serve:wiredep',
        'build:styles',
        'build:scripts',
        'build:scriptsVendors'
    ],
    fn: function (gulp, callback) {
        const jsFilter = $.filter('**/*.js', { restore: true });
        const cssFilter = $.filter('**/*.css', { restore: true });
        const pagesFilter = $.filter('**/*.{html,php}', { restore: true });

        return gulp.src(gulpParams.pagesWild)
            .pipe($.useref({searchPath: [gulpParams.sourcePath, gulpParams.cssSourcePath, gulpParams.jsSourcePath, '.']}))// Concatenate css and js files, and inject correct links to this concatenated files into html-files
            .pipe($.plumber())
            // js
            .pipe(jsFilter)
            .pipe($.uglify({preserveComments: 'license'}))
            .pipe(jsFilter.restore)

            // css
            .pipe(cssFilter)
            .pipe($.cssnano())
            .pipe(cssFilter.restore)

            // html, php
            .pipe(pagesFilter)
            .pipe($.replace('min.css', 'min.css?%%GULP_INJECT_VERSION%%'))
            .pipe($.replace('min.js', 'min.js?%%GULP_INJECT_VERSION%%'))
            .pipe(injectVersion({
                replace: /%%GULP_INJECT_VERSION%%/g
            }))
            .pipe($.htmlmin({
                collapseWhitespace: true,
                conservativeCollapse: true,
                minifyJS: {
                    comments: false
                }
            }))
            .pipe(pagesFilter.restore)

            .pipe(gulp.dest(gulpParams.buildPath)); // Put files into build folder
    }
};
