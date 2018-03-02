'use strict';

function FormatNumber(val) {
    var self = this;

    self.init = function() {
        var reversedValue = (val + '').split('').reverse().join(''),
            formattedValue = '';

        for (var i = reversedValue.length - 1; i >= 0; --i) {
            formattedValue += reversedValue[i];
            if (i % 3 === 0) {
                formattedValue += ' ';
            }
        }

        return formattedValue;
    };

}

module.exports = FormatNumber;
