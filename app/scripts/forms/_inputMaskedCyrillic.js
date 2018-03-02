'use strict';

/**
 * Masked input for cyrillic fields - cyrillic letters only
 * @module inputMaskedCyrillic
 */
function InputMaskedCyrillic() {
    var self = this;

    var $ = require('jquery');

    var input = $('.js-input-cyrillic');

    self.init = function() {
        if(input.length) {
            input.inputmask({
                mask: '*{+}',
                placeholder: '_',
                definitions: {
                    '*': {
                        validator: '[а-яА-ЯёЁ ]',
                        cardinality: 1
                    }
                }
            });
        }
    };

}

module.exports = InputMaskedCyrillic;
