/**
 * Start server for dev, watch changes in files
 */

const GulpParams = require('../gulp-vars.js');
const gulpParams = new GulpParams();

const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

const browserSync = require('browser-sync');
const reload = browserSync.reload;

module.exports = {
    deps: [
        'flags:serve',
        'serve:styles',
        'serve:wiredep',
        'serve:scripts',
        'serve:fonts'
    ],
    fn: function (gulp, callback) {
        browserSync({ // Sync and reload browsers
            notify: true,
            proxy: { // Start proxy-server
                target: gulpParams.hostnameTest + '/app'
            }
        });

        gulp.watch([ // Watch files
            gulpParams.pagesWild,
            gulpParams.imagesWild,
            gulpParams.fontsWild
        ]).on('change', reload); // Reload browsers

        gulp.watch(gulpParams.scssWild, ['serve:styles']); // watch scss files and start 'serve:styles' task
        gulp.watch(gulpParams.scriptsWild, ['serve:scripts'/*, 'serve:scripts-unittest'*/]); // watch js files and start 'serve:scripts' task
        gulp.watch(gulpParams.fontsWild, ['serve:fonts']);
        gulp.watch('bower.json', ['serve:wiredep', 'serve:fonts']); // watch bower.json and start 'wiredep' task
    }
};
