/**
 * Task: flags:serve
 */

const env = require('gulp-env');

module.exports = {
    fn: function (gulp, callback) {
        env.set({
            NODE_ENV: 'serve'
        });

        callback();
    }
};
