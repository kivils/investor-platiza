/**
 * Task: flags:production
 */

const env = require('gulp-env');

module.exports = {
    fn: function (gulp, callback) {
        env.set({
            NODE_ENV: 'production'
        });

        callback();
    }
};
