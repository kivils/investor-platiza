/**
 * Processing Fonts
 */

const GulpParams = require('../../gulp-vars.js');
const gulpParams = new GulpParams();

module.exports = {
    fn: function (gulp, callback) {
        return gulp.src('')
            .pipe(gulp.dest(gulpParams.fontsSourcePath))
            ;
    }
};
