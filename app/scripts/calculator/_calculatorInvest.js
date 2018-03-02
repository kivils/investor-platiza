'use strict';

/**
 * Investments Calculator
 * @module calculatorInvest
 */

function CalculatorInvest(calculator) {
    var self = this;

    var $ = require('jquery');
    var CALCULATOR_DEFAULTS = require('CALCULATOR_DEFAULTS');

    self.CALCULATOR_CURRENT_VALUES = {
        d: CALCULATOR_DEFAULTS.d,
        p: CALCULATOR_DEFAULTS.p,
        t: CALCULATOR_DEFAULTS.t,
        type: CALCULATOR_DEFAULTS.type
    };

    self.init = function() {
        var contCalculator = $(calculator);

        if(contCalculator.length) {

            self.setValues();
            self.initCheckboxPercents();
            self.calculateInterest();

        }
    };

    /**
     * Format Values
     * @param val
     */
    self.formatSumValue = function(val) {
        var FormatNumber = require('./_formatNumber');
        var formatNumberFunc = new FormatNumber(val);

        return formatNumberFunc.init();
    };

    /**
     * Init slider For Invest sum
     */
    self.initSliderSum = function() {
        var sliderSum = $('.js-slider-sum');

        if (sliderSum.length) {
            var sliderWrapper = sliderSum.parents('.js-calc-slider');

            sliderWrapper.each(function (index) {
                var $this = sliderWrapper.eq(index),
                    inputValueCont = $this.find('.js-invest-sum-input'),
                    inputValue = inputValueCont.val(),
                    investSumCont = $this.find('.js-invest-sum-value'),
                    slider = $this.find('.js-slider-sum');

                var setFormattedSumValue = function(val) {
                    var formattedValue = self.formatSumValue(val);

                    investSumCont.text(formattedValue);
                };

                setFormattedSumValue(inputValue);

                slider.slider({
                    range: 'min',
                    min: slider.data('min') || CALCULATOR_DEFAULTS.dMin,
                    max: slider.data('max') || CALCULATOR_DEFAULTS.dMax,
                    value: slider.data('start') || self.CALCULATOR_CURRENT_VALUES.d,
                    step: CALCULATOR_DEFAULTS.dStep,
                    slide: function (event, ui) {
                        self.CALCULATOR_CURRENT_VALUES.d = ui.value;

                        setFormattedSumValue(ui.value);
                        inputValueCont.val(ui.value);

                        self.calculateInterest();
                    },
                    change: function (event, ui) {
                        self.CALCULATOR_CURRENT_VALUES.d = ui.value;

                        setFormattedSumValue(ui.value);
                        inputValueCont.val(ui.value);

                        self.calculateInterest();
                    }
                });
            });
        }

    };

    /**
     * Init slider For Period
     */
    self.initSliderPeriod = function() {
        var sliderPeriod = $('.js-slider-period');

        if (sliderPeriod.length) {
            var sliderWrapper = sliderPeriod.parents('.js-calc-slider');

            sliderWrapper.each(function (index) {
                var $this = sliderWrapper.eq(index),
                    inputValue = $this.find('.js-invest-period-input'),
                    investPeriod = $this.find('.js-invest-period-value'),
                    slider = $this.find('.js-slider-period');

                slider.slider({
                    range: 'min',
                    min: slider.data('min') || CALCULATOR_DEFAULTS.tMin,
                    max: slider.data('max') || CALCULATOR_DEFAULTS.tMax,
                    value: slider.data('start') || self.CALCULATOR_CURRENT_VALUES.t,
                    step: CALCULATOR_DEFAULTS.tStep,
                    slide: function (event, ui) {
                        self.CALCULATOR_CURRENT_VALUES.t = ui.value;

                        investPeriod.text(ui.value);
                        inputValue.val(ui.value);

                        self.calculatePercents();
                        self.initSliderPercent();
                        self.calculateInterest();
                    },
                    change: function (event, ui) {
                        self.CALCULATOR_CURRENT_VALUES.t = ui.value;

                        investPeriod.text(ui.value);
                        inputValue.val(ui.value);

                        self.calculatePercents();
                        self.initSliderPercent();
                        self.calculateInterest();
                    }
                });
            });
        }
    };

    /**
     * Init slider For Percents
     */
    self.initSliderPercent = function() {
        var sliderPercent = $('.js-slider-percent');

        if (sliderPercent.length) {
            var sliderWrapper = sliderPercent.parents('.js-calc-slider');

            sliderWrapper.each(function (index) {
                var $this = sliderWrapper.eq(index),
                    inputValue = $this.find('.js-invest-percent-input'),
                    investPercent = $this.find('.js-invest-percent-value'),
                    slider = $this.find('.js-slider-percent');

                slider.slider({
                    range: 'min',
                    min: slider.data('min') || CALCULATOR_DEFAULTS.pMin - 1,
                    max: slider.data('max') || CALCULATOR_DEFAULTS.pMax,
                    value: slider.data('start') || self.CALCULATOR_CURRENT_VALUES.p,
                    step: CALCULATOR_DEFAULTS.pStep,
                    slide: function (event, ui) {
                        self.CALCULATOR_CURRENT_VALUES.p = ui.value;

                        investPercent.text(ui.value);
                        inputValue.val(ui.value);

                        self.calculateInterest();
                    },
                    change: function (event, ui) {
                        self.CALCULATOR_CURRENT_VALUES.p = ui.value;

                        investPercent.text(ui.value);
                        inputValue.val(ui.value);

                        self.calculateInterest();
                    },
                    disabled: true
                });

            });
        }
    };

    /**
     * Choose Percents type
     */
    self.initCheckboxPercents = function() {
        var choosePercent = $('.js-percents');

        if (choosePercent.length) {
            var monthlyCont = $('.js-calc-table-monthly'),
                quarterlyCont = $('.js-calc-table-quarterly');

            choosePercent.on('change', function() {
                var chosenPercents = $(this).val();

                if(chosenPercents === 'monthly') {
                    monthlyCont.removeClass('is-hidden');
                    quarterlyCont.addClass('is-hidden');
                    self.CALCULATOR_CURRENT_VALUES.type = 'monthly';
                }
                else {
                    monthlyCont.addClass('is-hidden');
                    quarterlyCont.removeClass('is-hidden');
                    self.CALCULATOR_CURRENT_VALUES.type = 'quarterly';
                }

                self.calculatePercents();
                self.calculateInterest();
            });
        }

    };

    /**
     * Calculate percents
     */
    self.calculatePercents = function() {
        if(self.CALCULATOR_CURRENT_VALUES.type === 'monthly') {
            if(self.CALCULATOR_CURRENT_VALUES.t <= CALCULATOR_DEFAULTS.tBoundary) {
                self.CALCULATOR_CURRENT_VALUES.p = CALCULATOR_DEFAULTS.pMonthly1;
            }
            else {
                self.CALCULATOR_CURRENT_VALUES.p = CALCULATOR_DEFAULTS.pMonthly2;
            }
        }
        else {
            if(self.CALCULATOR_CURRENT_VALUES.t <= CALCULATOR_DEFAULTS.tBoundary) {
                self.CALCULATOR_CURRENT_VALUES.p = CALCULATOR_DEFAULTS.pQuarterly1;
            }
            else {
                self.CALCULATOR_CURRENT_VALUES.p = CALCULATOR_DEFAULTS.pQuarterly2;
            }
        }

        self.initSliderPercent();

    };

    /**
     * Set values of elements in calculator
     */
    self.setValues = function() {
        var inputSumInvest = $('.js-invest-sum-input'),
            contSumInvest = $('.js-invest-sum-value');

        var inputPeriodInvest = $('.js-invest-period-input'),
            contPeriodInvest = $('.js-invest-period-value');

        var inputPercentInvest = $('.js-invest-percent-input'),
            contPercentInvest = $('.js-invest-percent-value');

        var choosePercent = $('.js-percents');

        inputSumInvest.val(self.CALCULATOR_CURRENT_VALUES.d);
        contSumInvest.text(self.formatSumValue(self.CALCULATOR_CURRENT_VALUES.d));
        self.initSliderSum();

        inputPeriodInvest.val(self.CALCULATOR_CURRENT_VALUES.t);
        contPeriodInvest.text(self.CALCULATOR_CURRENT_VALUES.t);
        self.initSliderPeriod();

        inputPercentInvest.val(self.CALCULATOR_CURRENT_VALUES.p);
        contPercentInvest.text(self.CALCULATOR_CURRENT_VALUES.p);
        self.initSliderPercent();

        choosePercent.each(function() {
            if($(this).val() === self.CALCULATOR_CURRENT_VALUES.type) {
                $(this).prop('checked', true);
                $(this).siblings().prop('checked', false);
            }
        });

    };

    /**
     * Calculate Interest
     */
    self.calculateInterest = function() {
        var contSumQuarterly = $('.js-calc-sum-quarterly'),
            contSumMonthly = $('.js-calc-sum-monthly'),
            contSumTotal = $('.js-calc-sum-total');

        var sumMonthly = (self.CALCULATOR_CURRENT_VALUES.d * self.CALCULATOR_CURRENT_VALUES.p * 30) / (CALCULATOR_DEFAULTS.T * 100);
        var sumMonthlyRounded = Math.round(sumMonthly);
        var TotalSum = Math.round(self.CALCULATOR_CURRENT_VALUES.d + (sumMonthly * self.CALCULATOR_CURRENT_VALUES.t));

        contSumQuarterly.text(self.formatSumValue(sumMonthlyRounded * 3));
        contSumMonthly.text(self.formatSumValue(sumMonthlyRounded));
        contSumTotal.text(self.formatSumValue(TotalSum));

    };

}

module.exports = CalculatorInvest;
