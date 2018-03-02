/**
 * Processing Images - for build, styleguide, staticStyleguide
 */

const GulpParams = require('../../gulp-vars.js');
const gulpParams = new GulpParams();

const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

const browserSync = require('browser-sync');
const reload = browserSync.reload;

module.exports = {
    fn: function (gulp, callback) {
        return gulp.src(gulpParams.imagesWild)
            .pipe($.if(!(process.env.NODE_ENV == 'serve'), $.cache($.imagemin({ // Process only new and changed files - only for build, styleguide and static styleguide
            progressive: true,
            interlaced: true,
            // don't remove IDs from SVGs, they are often used
            // as hooks for embedding and styling
            svgoPlugins: [{cleanupIDs: false}]
        }))))
        .pipe($.if(process.env.NODE_ENV == 'production', gulp.dest(gulpParams.imagesBuild))); // Put processed images into dist folder
    }
};
