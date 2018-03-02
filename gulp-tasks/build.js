/**
 * Task to build production folder, JSdocs, staticStyleguide:
 * start 'build:site', 'build:jsdoc', 'staticStyleguide' tasks
 */

module.exports = {
    deps: [
        'flags:production',
        'build:site'
    ],
    fn: function (gulp, callback) {
        callback();
    }
};
