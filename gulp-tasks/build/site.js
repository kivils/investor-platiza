/**
 * Task to build production folder:
 * start 'flags:production', 'build:php', 'build:images', 'build:fonts' tasks
 */

module.exports = {
    deps: [
        'flags:production',
        'build:pages',
        'build:images',
        'build:fonts',
        'build:files'
    ],
    fn: function (gulp, callback) {
        callback();
    }
};
