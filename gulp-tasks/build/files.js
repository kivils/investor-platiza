/**
 * Processing Fonts
 */

const GulpParams = require('../../gulp-vars.js');
const gulpParams = new GulpParams();

module.exports = {
    fn: function (gulp, callback) {
        gulp.src([
            gulpParams.sourcePath + '/*.*',
            '!' + gulpParams.sourcePath + '/*.html',
            '!' + gulpParams.sourcePath + '/*.php'
        ])
            .pipe(gulp.dest(gulpParams.buildPath)); // Put files into build folder

        gulp.src(gulpParams.sourcePath + '/config/**/*.*')
            .pipe(gulp.dest(gulpParams.buildPath + '/config'));

        gulp.src(gulpParams.sourcePath + '/lib/**/*.*')
            .pipe(gulp.dest(gulpParams.buildPath + '/lib'));
    }
};
