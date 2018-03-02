/**
 * Processing js files w/o watching
 */

const GulpParams = require('../../gulp-vars.js');
const gulpParams = new GulpParams();

const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

const source = require('vinyl-source-stream');

module.exports = {
    fn: function (gulp, callback) {
        return gulpParams.br.bundle() // browserify w/o watching
            .on('error', $.util.log.bind($.util, 'Browserify Error'))
            .pipe(source('scripts.js'))
            .pipe(gulp.dest(gulpParams.jsSourcePath)) // Put into js source folder
            //.pipe($.if(process.env.NODE_ENV == 'production', gulp.dest(gulpParams.jsBuild))) // Put into dist
            ;
    }
};
