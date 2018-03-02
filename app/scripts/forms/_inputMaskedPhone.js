'use strict';

/**
 * Masked input for phone number
 * @module inputMaskedPhone
 */
function InputMaskedPhone() {
    var self = this;

    var Inputmask = require('inputmask');

    var input = document.querySelectorAll('.js-input-phone');

    self.init = function() {
        if(input) {
            var phoneMask = new Inputmask({
                'mask': '+7 (999) 999 99 99',
                'placeholder': '_'
            });

            phoneMask.mask(input);
        }
    };

}

module.exports = InputMaskedPhone;
