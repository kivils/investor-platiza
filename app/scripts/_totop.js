'use strict';

/**
 * Button to top
 * @module totop
 */
function Totop() {
    var self = this;

    var $ = require('jquery');

    var win = $(window),
        cont = $('.js-totop');

    self.init = function() {
        if(cont.length) {
            cont.on('click', function(e) {
                cont.addClass('is-clicked');

                $('html, body').animate({
                    scrollTop: 0
                },
                    1000,
                    'swing',
                    function() {
                        cont.removeClass('is-clicked');
                    });

                e.preventDefault();
            });
        }
    };

    self.toggle = function() {
        var checkVisibility = function() {
            if(cont.length) {
                if(win.scrollTop() > 300) {
                    cont.addClass('is-visible');
                }
                else {
                    cont.removeClass('is-visible');
                }
            }
        };

        checkVisibility();

        win.scroll(function () {
            checkVisibility();
        });
    };

}

module.exports = Totop;
