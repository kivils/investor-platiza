'use strict';

function IsJS() {
    var self = this;

    self.init = function() {
        var container = document.querySelector('html');

        container.classList.remove('no-js');
        container.classList.add('js');
    };

}

module.exports = IsJS;
