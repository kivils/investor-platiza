/**
 * Processing Fonts
 */

const GulpParams = require('../../gulp-vars.js');
const gulpParams = new GulpParams();

module.exports = {
    deps: ['serve:fonts'],
    fn: function (gulp, callback) {
        return gulp.src(gulpParams.fontsWild)
            .pipe(gulp.dest(gulpParams.fontsBuild)) // Put fonts from source folder into dist folder
            ;
    }
};
