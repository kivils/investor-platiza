/**
 * Inject bower components into php and scss files.
 *
 * Links to components are injected between comments:
 * - in php:
 *  <!-- bower:css -->
 *  <!-- endbower -->
 *
 *  <!-- bower:js -->
 *  <!-- endbower -->
 */

const GulpParams = require('../../gulp-vars.js');
const gulpParams = new GulpParams();

const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

const wiredep = require('wiredep');

module.exports = {
    fn: function (gulp, callback) {
        return gulp.src(gulpParams.pagesWild) // Process all php layouts
            .pipe(wiredep.stream({
                exclude: ['bootstrap-sass'], // Exclude this components. Bootstrap - use only mixins, see app/assets/scss/main.scss and app/assets/scss/utility/_vendors.scss
                ignorePath: /^(\.\.\/)*\.\./
            }))
            .pipe($.replace('/web/bower_components', '/bower_components'))
            .pipe(gulp.dest(gulpParams.sourcePath)) // Processed files stay in src folder
        ;
    }
};
