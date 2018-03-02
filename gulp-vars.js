'use strict';

const browserify = require('browserify');
const watchify = require('watchify');

/**
 * Project configuration
 */
let GulpParams = (function () {
    function GulpParams() {
        this.hostnameTest = 'http://invest/';

        /**
         * Source
         */
        this.sourcePath = 'app';

        this.styleSourcePath = this.sourcePath + '/scss';
        this.scssWild = this.styleSourcePath + '/**/*.scss';
        this.cssSourcePath = this.sourcePath + '/css';

        this.scriptsSourcePath = this.sourcePath + '/scripts';
        this.scriptsWild = this.scriptsSourcePath + '/**/*.js';
        this.jsSourcePath = this.sourcePath + '/js';

        this.pagesWild = [
            this.sourcePath + '/**/*.html',
            this.sourcePath + '/**/*.php',
            '!' + this.sourcePath + '/config/**/*',
            '!' + this.sourcePath + '/lib/**/*'
        ];

        this.imagesSourcePath = this.sourcePath + '/images';
        this.imagesWild = this.imagesSourcePath + '/**/*';

        this.fontsSourcePath = this.sourcePath + '/fonts';
        this.fontsWild = this.fontsSourcePath + '/**/*';

        /**
         * Dist
         */
        this.buildPath = 'dist';

        this.imagesBuild = this.buildPath + '/images';
        this.cssBuild = this.buildPath + '/css';
        this.jsBuild = this.buildPath + '/js';
        this.fontsBuild = this.buildPath + '/fonts';

        /**
         * Custom browserify options
         * @type {{entries: *[], debug: boolean}}
         */
        this.browserifyOpts = {
            entries: [
                this.scriptsSourcePath + '/main.js'
            ],
            debug: true
        };

        /**
         * Custom browserify options for build
         * @type {{entries: *[], debug: boolean}}
         */
        this.browserifyOptsBuild = {
            entries: [this.scriptsSourcePath + '/main.js'],
            debug: true
        };

        /**
         * Watchify
         */
        this.b = watchify(browserify(watchify.args, this.browserifyOpts));

        /**
         * Browserify
          */
        this.br = browserify(this.browserifyOptsBuild);

    }
    return GulpParams;
})();

module.exports = GulpParams;
