'use strict';

function ModalPltz() {
    var self = this;

    var $ = require('jquery');

    self.init = function() {
        var modalLink = $('.js-modal-link'),
            modal = $('.js-modal-form'),
            overlay = $('.js-overlay'),
            body = $('body'),
            close = $('.js-modal-close'),
            contInvestSum = $('.js-invest-sum-chosen-span'),
            inputInvestSum = $('.js-invest-sum-chosen'),
            inputInvestPeriod = $('.js-invest-period-chosen'),
            inputInvestType = $('.js-invest-type-chosen');

        modalLink.on('click', function(e) {
            var investType = $('.js-percents:checked').val(),
                investSum = $('.js-invest-sum-value').text(),
                investPeriod = $('.js-invest-period-value').text();

            modal.addClass('is-visible');
            overlay.addClass('is-visible');
            body.addClass('is-modal-opened');
            contInvestSum.text(investSum);
            inputInvestSum.val(investSum);
            inputInvestPeriod.val(investPeriod);
            inputInvestType.val(investType);

            e.preventDefault();
        });

        close.on('click', function(e) {
            modal.removeClass('is-visible');
            overlay.removeClass('is-visible');
            body.removeClass('is-modal-opened');

            e.preventDefault();
        });

    };

}

module.exports = ModalPltz;
