/**
 * Processing scss files
 * Put css files into css folder of source folder
 */

const GulpParams = require('../../gulp-vars.js');
const gulpParams = new GulpParams();

const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

const browserSync = require('browser-sync');
const reload = browserSync.reload;

module.exports = {
    deps: ['serve:scss-lint'],
    fn: function (gulp, callback) {
        return gulp.src([gulpParams.styleSourcePath + '/main.scss'])
            .pipe($.plumber()) // Fix streams
            .pipe($.sass.sync({ // Compile sass
                outputStyle: 'expanded',
                precision: 10,
                includePaths: ['.']
            }).on('error', $.sass.logError)) // Errors to log

            //.pipe($.sourcemaps.init())
            .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
            //.pipe($.sourcemaps.write())
            .pipe(gulp.dest(gulpParams.cssSourcePath))
            //.pipe($.if(process.env.NODE_ENV == 'production', gulp.dest(gulpParams.cssBuild)))
            .pipe($.if(process.env.NODE_ENV == 'serve', reload({stream: true}))) // Reload browsers
            ;
    }
};
