(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

function ModalPltz() {
    var self = this;

    var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
(function (global){
'use strict';

/**
 * Button to top
 * @module totop
 */
function Totop() {
    var self = this;

    var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],4:[function(require,module,exports){
(function (global){
'use strict';

/**
 * Investments Calculator
 * @module calculatorInvest
 */

function CalculatorInvest(calculator) {
    var self = this;

    var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
    var CALCULATOR_DEFAULTS = (typeof window !== "undefined" ? window['CALCULATOR_DEFAULTS'] : typeof global !== "undefined" ? global['CALCULATOR_DEFAULTS'] : null);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./_formatNumber":5}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
(function (global){
'use strict';

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var validate = (typeof window !== "undefined" ? window['validate'] : typeof global !== "undefined" ? global['validate'] : null);

function FormValidate(formToValidate) {
    var self = this;

    self.init = function() {

        if(formToValidate) {
            var patternName = /^[а-яА-ЯёЁ\-\s]+$/;

            var constraints = {
                nameInvest: {
                    presence: true,
                    format: {
                        pattern: patternName
                    }
                },
                emailInvest: {
                    presence: true,
                    email: true
                },
                phoneInvest: {
                    presence: true,
                    length: {
                        is: 11,
                        tokenizer: function(value) {
                            return value.replace(/\D+/g, '');
                        }
                    }
                }
            };

            var formGroupClass = 'js-form-item',
                inputs = formToValidate.querySelectorAll('input[type=text], input[type=email]'),
                inputsArr = Array.prototype.slice.call(inputs);

            self.handleFormSubmit(formToValidate, constraints, inputsArr, formGroupClass);
            //self.hadnleInputFocus(formToValidate, constraints, inputsArr, formGroupClass);
            self.hadnleInputChange(formToValidate, constraints, inputsArr, formGroupClass);
            //self.hadnleInputKeyup(formToValidate, constraints, inputsArr, formGroupClass);
            self.hadnleInputBlur(formToValidate, constraints, inputsArr, formGroupClass);

        }

    };

    self.handleFormSubmit = function (form, constraints, inputs, formGroupClass) {
        form.addEventListener('submit', function(ev) {
            ev.preventDefault();

            var errors = validate(form, constraints);

            self.showErrors(form, errors || {}, inputs, formGroupClass);

            if(errors) {
                /**
                 * Focus first invalid control
                 */
                var errorFirstWr = form.querySelector('.has-error');

                if(errorFirstWr) {
                    errorFirstWr.querySelector('[name]').focus();
                }
            }
            else {
                /**
                 * Add class 'is-sending': hide form controls, show preloader
                 */
                form.classList.add('is-sending');

                $.ajax({
                    url: './invest-form.php',
                    type: 'POST',
                    data: new FormData(this),
                    dataType: 'json',
                    contentType: false,
                    cache: false,
                    processData: false
                })
                    .done(function(data) {
                        /**
                         * Close modal form
                         */
                        var evt = document.createEvent('MouseEvents');
                        evt.initEvent('click', true, true);
                        document.querySelector('.js-modal-close').dispatchEvent(evt);

                        /**
                         * Remove class is-sending
                         */
                        form.classList.remove('is-sending');

                        /**
                         * Create element for messages
                         */
                        var res = document.createElement('div');
                        res.classList.add('c-form-result');
                        document.body.appendChild(res);

                        var resDiv = document.createElement('h2');
                        resDiv.classList.add('o-pltz-h2');

                        res.appendChild(resDiv);

                        /**
                         * Overlay
                         */
                        var overlay = document.querySelector('.o-overlay');
                        overlay.classList.add('is-visible');

                        /**
                         * Remove message
                         */
                        var removeMessage = function() {
                            res.parentNode.removeChild(res);
                            overlay.classList.remove('is-visible');
                        };

                        if(!data.success) {
                            resDiv.classList.add('o-pltz-h2_error');

                            if(data.errors) {
                                if(data.errors.email) {
                                    resDiv.innerHTML = data.errors.email;
                                }
                                if(data.errors.name) {
                                    resDiv.innerHTML = data.errors.name;
                                }
                                if(data.errors.phone) {
                                    resDiv.innerHTML = data.errors.phone;
                                }
                            }
                            else {
                                resDiv.innerHTML = data.msg;
                            }
                        }
                        else {
                            resDiv.innerHTML = data.msg;

                            form.reset();
                        }

                        setTimeout(removeMessage, 3000);
                    });
            }
        });
    };

    self.hadnleInputFocus = function(form, constraints, inputsArr, formGroupClass) {
        inputsArr.forEach(function(input) {
            input.addEventListener('focus', function() {
                var formGroup = self.closestParent(input.parentNode, formGroupClass);

                self.resetFormGroup(formGroup);
            });
        });
    };

    self.hadnleInputChange = function(form, constraints, inputsArr, formGroupClass) {
        inputsArr.forEach(function(input) {
            input.addEventListener('change', function() {
                var errors = validate(form, constraints) || {};

                self.showErrorsForInput(input, errors[input.name], formGroupClass);
            });
        });
    };

    self.hadnleInputKeyup = function(form, constraints, inputsArr, formGroupClass) {
        inputsArr.forEach(function(input) {
            input.addEventListener('keyup', function() {
                var errors = validate(form, constraints) || {};

                self.showErrorsForInput(input, errors[input.name], formGroupClass);
            });
        });
    };

    self.hadnleInputBlur = function(form, constraints, inputsArr, formGroupClass) {
        inputsArr.forEach(function(input) {
            input.addEventListener('blur', function() {
                var errors = validate(form, constraints) || {};

                self.showErrorsForInput(input, errors[input.name], formGroupClass);
            });
        });
    };

    self.resetFormGroup = function (formGroup) {
        var formGroupList = formGroup.querySelectorAll('.o-form-info'),
            formGroupArr = Array.prototype.slice.call(formGroupList);

        formGroup.classList.remove('has-error');
        formGroup.classList.remove('has-success');

        formGroupArr.forEach(function(el) {
            el.innerHTML = '';
        });
    };

    self.showErrors = function(form, errors, inputs, formGroupClass) {
        inputs.forEach(function(input) {
            self.showErrorsForInput(input, errors && errors[input.name], formGroupClass);
        });
    };

    self.showErrorsForInput = function(input, errors, formGroupClass) {
        var formGroup = self.closestParent(input.parentNode, formGroupClass),
            messages = formGroup.querySelector('.o-form-info');

        self.resetFormGroup(formGroup);

        if (errors) {
            formGroup.classList.add('has-error');

            errors.forEach(function(error) {
                self.addError(messages, error);
            });
        } else {
            formGroup.classList.add('has-success');
        }
    };

    self.closestParent = function(child, className) {
        if (!child || child === document) {
            return null;
        }
        if (child.classList.contains(className)) {
            return child;
        } else {
            return self.closestParent(child.parentNode, className);
        }
    };

    self.addError = function(messages, error) {
        var block = document.createElement('p');

        block.classList.add('o-form-info__text');
        block.innerText = error;

        messages.appendChild(block);
    };
}

module.exports = FormValidate;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],7:[function(require,module,exports){
(function (global){
'use strict';

var validate = (typeof window !== "undefined" ? window['validate'] : typeof global !== "undefined" ? global['validate'] : null);

function FormValidateTranslate() {
    var self = this;

    self.init = function() {
        var container = document.querySelector('html'),
            lang = container.getAttribute('lang');

        if(lang === 'en') {
            validate.validators.presence.options = {
                message: '^Required'
            };

            validate.validators.email.options = {
                message: '^Incorrect email address'
            };

            validate.validators.length.options = {
                wrongLength: '^Should be %{count} characters',
                tooShort: '^Should be minimum %{count} characters'
            };

            validate.validators.format.options = {
                message: function(value, attribute) {
                    if(attribute === 'nameInvest') {
                        return validate.format('^Only cyrillic characters and whitespaces');
                    }
                }
            };
        }
        else if(lang === 'ru') {
            validate.validators.presence.options = {
                message: '^Поле обязательно к заполнению'
            };

            validate.validators.email.options = {
                message: '^Введите корректный адрес электронной почты'
            };

            validate.validators.length.options = {
                wrongLength: '^Поле должно содержать %{count} символов',
                tooShort: '^Поле должно содержать минимум %{count} символов'
            };

            validate.validators.format.options = {
                message: function(value, attribute) {
                    if(attribute === 'nameInvest') {
                        return validate.format('^Только русские буквы и пробелы');
                    }
                }
            };
        }
    };

}

module.exports = FormValidateTranslate;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],8:[function(require,module,exports){
(function (global){
'use strict';

/**
 * Masked input for phone number
 * @module inputMaskedPhone
 */
function InputMaskedPhone() {
    var self = this;

    var Inputmask = (typeof window !== "undefined" ? window['Inputmask'] : typeof global !== "undefined" ? global['Inputmask'] : null);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],9:[function(require,module,exports){
'use strict';

/**
 * States of controls in form
 * @module statesOfControls
 */
function StatesOfControls() {
    var self = this;

    var input = document.querySelectorAll([
        '.o-pltz-text-input',
        '.o-pltz-textarea'
    ]);

    self.init = function() {
        if(input) {
            var inputsArr = Array.prototype.slice.call(input);

            inputsArr.forEach(
                function(el) {
                    var formGroup = el.parentNode;

                    var isEmpty = function() {
                        if(el.value.length === 0) {
                             formGroup.classList.add('is-empty');
                        }
                        else {
                            formGroup.classList.remove('is-empty');
                        }
                    };

                    var isFocused = function() {
                        isEmpty();

                        formGroup.classList.add('is-focused');
                    };

                    var isBlured = function() {
                        isEmpty();

                        formGroup.classList.remove('is-focused');
                    };

                    isEmpty();
                    el.addEventListener('focus', isFocused);
                    el.addEventListener('blur', isBlured);
                }
            );
        }
    };


}

module.exports = StatesOfControls;

},{}],10:[function(require,module,exports){
'use strict';

/**
 * Check if JS is enabled in browser
 * @see module:isJs
 */
function initIsJS() {
    var IsJS = require('./_isJS');
    var isJSFunc = new IsJS();

    isJSFunc.init();
}

/**
 * Button To Top
 * @see module:totop
 */
function initToTop() {
    var Totop = require('./_totop');
    var totopFunc = new Totop();

    totopFunc.toggle();
    totopFunc.init();
}

/**
 * Caclulator
 * @see module:Caclulator
 */
function initCalculator() {
    var CalculatorInvest = require('./calculator/_calculatorInvest');
    var calculatorInvestFunc = new CalculatorInvest('.js-calculator-invest');

    calculatorInvestFunc.init();
}

/**
 * Add classes to form-group when controls are focused, active, disabled...
 * @see module:statesOfControls
 */
function initStatesOfControls() {
    var StatesOfControls = require('./forms/_statesOfControls');
    var statesOfControlsFunc = new StatesOfControls();

    statesOfControlsFunc.init();
}

///**
// * Masked input for cyrillic fields - cyrillic letters only
// * @see module:inputMaskedCyrillic
// */
//function initInputMaskedCyrillic() {
//    var InputMaskedCyrillic = require('./forms/_inputMaskedCyrillic');
//    var inputMaskedCyrillicFunc = new InputMaskedCyrillic();
//
//    inputMaskedCyrillicFunc.init();
//}

/**
 * Masked input for phone number
 * @see module:inputMaskedPhone
 */
function initInputMaskedPhone() {
    var InputMaskedPhone = require('./forms/_inputMaskedPhone');
    var inputMaskedPhoneFunc = new InputMaskedPhone();

    inputMaskedPhoneFunc.init();
}

/**
 * Modal Contact Form
 * @see module:modalPltz
 */
function initModalPltz() {
    var ModalPltz = require('./_modalPltz');
    var modalPltzFunc = new ModalPltz();

    modalPltzFunc.init();
}

/**
 * Modal Contact Form
 * @see module:formValidate
 * @see module:formValidateTranslate
 */
function initContactForm() {
    var form = document.querySelector('.js-modal-form');

    var FormValidate = require('./forms/_formValidate');
    var formValidateFunc = new FormValidate(form);

    var FormValidateTranslate = require('./forms/_formValidateTranslate');
    var formValidateTranslateFunc = new FormValidateTranslate();

    formValidateFunc.init();
    formValidateTranslateFunc.init();
}

function allScripts() {

    initIsJS();
    initCalculator();
    initContactForm();
    initToTop();
    initStatesOfControls();
    initInputMaskedPhone();
    //initInputMaskedCyrillic();
    initModalPltz();

}

allScripts();

},{"./_isJS":1,"./_modalPltz":2,"./_totop":3,"./calculator/_calculatorInvest":4,"./forms/_formValidate":6,"./forms/_formValidateTranslate":7,"./forms/_inputMaskedPhone":8,"./forms/_statesOfControls":9}]},{},[10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9faXNKUy5qcyIsImFwcC9zY3JpcHRzL19tb2RhbFBsdHouanMiLCJhcHAvc2NyaXB0cy9fdG90b3AuanMiLCJhcHAvc2NyaXB0cy9jYWxjdWxhdG9yL19jYWxjdWxhdG9ySW52ZXN0LmpzIiwiYXBwL3NjcmlwdHMvY2FsY3VsYXRvci9fZm9ybWF0TnVtYmVyLmpzIiwiYXBwL3NjcmlwdHMvZm9ybXMvX2Zvcm1WYWxpZGF0ZS5qcyIsImFwcC9zY3JpcHRzL2Zvcm1zL19mb3JtVmFsaWRhdGVUcmFuc2xhdGUuanMiLCJhcHAvc2NyaXB0cy9mb3Jtcy9faW5wdXRNYXNrZWRQaG9uZS5qcyIsImFwcC9zY3JpcHRzL2Zvcm1zL19zdGF0ZXNPZkNvbnRyb2xzLmpzIiwiYXBwL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMxU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN4UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZnVuY3Rpb24gSXNKUygpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICBzZWxmLmluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpO1xyXG5cclxuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnbm8tanMnKTtcclxuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnanMnKTtcclxuICAgIH07XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElzSlM7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmZ1bmN0aW9uIE1vZGFsUGx0eigpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICB2YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcclxuXHJcbiAgICBzZWxmLmluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgbW9kYWxMaW5rID0gJCgnLmpzLW1vZGFsLWxpbmsnKSxcclxuICAgICAgICAgICAgbW9kYWwgPSAkKCcuanMtbW9kYWwtZm9ybScpLFxyXG4gICAgICAgICAgICBvdmVybGF5ID0gJCgnLmpzLW92ZXJsYXknKSxcclxuICAgICAgICAgICAgYm9keSA9ICQoJ2JvZHknKSxcclxuICAgICAgICAgICAgY2xvc2UgPSAkKCcuanMtbW9kYWwtY2xvc2UnKSxcclxuICAgICAgICAgICAgY29udEludmVzdFN1bSA9ICQoJy5qcy1pbnZlc3Qtc3VtLWNob3Nlbi1zcGFuJyksXHJcbiAgICAgICAgICAgIGlucHV0SW52ZXN0U3VtID0gJCgnLmpzLWludmVzdC1zdW0tY2hvc2VuJyksXHJcbiAgICAgICAgICAgIGlucHV0SW52ZXN0UGVyaW9kID0gJCgnLmpzLWludmVzdC1wZXJpb2QtY2hvc2VuJyksXHJcbiAgICAgICAgICAgIGlucHV0SW52ZXN0VHlwZSA9ICQoJy5qcy1pbnZlc3QtdHlwZS1jaG9zZW4nKTtcclxuXHJcbiAgICAgICAgbW9kYWxMaW5rLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdmFyIGludmVzdFR5cGUgPSAkKCcuanMtcGVyY2VudHM6Y2hlY2tlZCcpLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgaW52ZXN0U3VtID0gJCgnLmpzLWludmVzdC1zdW0tdmFsdWUnKS50ZXh0KCksXHJcbiAgICAgICAgICAgICAgICBpbnZlc3RQZXJpb2QgPSAkKCcuanMtaW52ZXN0LXBlcmlvZC12YWx1ZScpLnRleHQoKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGFsLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgYm9keS5hZGRDbGFzcygnaXMtbW9kYWwtb3BlbmVkJyk7XHJcbiAgICAgICAgICAgIGNvbnRJbnZlc3RTdW0udGV4dChpbnZlc3RTdW0pO1xyXG4gICAgICAgICAgICBpbnB1dEludmVzdFN1bS52YWwoaW52ZXN0U3VtKTtcclxuICAgICAgICAgICAgaW5wdXRJbnZlc3RQZXJpb2QudmFsKGludmVzdFBlcmlvZCk7XHJcbiAgICAgICAgICAgIGlucHV0SW52ZXN0VHlwZS52YWwoaW52ZXN0VHlwZSk7XHJcblxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNsb3NlLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgbW9kYWwucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICBib2R5LnJlbW92ZUNsYXNzKCdpcy1tb2RhbC1vcGVuZWQnKTtcclxuXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbFBsdHo7XHJcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBCdXR0b24gdG8gdG9wXG4gKiBAbW9kdWxlIHRvdG9wXG4gKi9cbmZ1bmN0aW9uIFRvdG9wKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpO1xuXG4gICAgdmFyIHdpbiA9ICQod2luZG93KSxcbiAgICAgICAgY29udCA9ICQoJy5qcy10b3RvcCcpO1xuXG4gICAgc2VsZi5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKGNvbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb250Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBjb250LmFkZENsYXNzKCdpcy1jbGlja2VkJyk7XG5cbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIDEwMDAsXG4gICAgICAgICAgICAgICAgICAgICdzd2luZycsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udC5yZW1vdmVDbGFzcygnaXMtY2xpY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHNlbGYudG9nZ2xlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjaGVja1Zpc2liaWxpdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKGNvbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYod2luLnNjcm9sbFRvcCgpID4gMzAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnQuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnQucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY2hlY2tWaXNpYmlsaXR5KCk7XG5cbiAgICAgICAgd2luLnNjcm9sbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjaGVja1Zpc2liaWxpdHkoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRvdG9wO1xuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIEludmVzdG1lbnRzIENhbGN1bGF0b3JcclxuICogQG1vZHVsZSBjYWxjdWxhdG9ySW52ZXN0XHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gQ2FsY3VsYXRvckludmVzdChjYWxjdWxhdG9yKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgdmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XHJcbiAgICB2YXIgQ0FMQ1VMQVRPUl9ERUZBVUxUUyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydDQUxDVUxBVE9SX0RFRkFVTFRTJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydDQUxDVUxBVE9SX0RFRkFVTFRTJ10gOiBudWxsKTtcclxuXHJcbiAgICBzZWxmLkNBTENVTEFUT1JfQ1VSUkVOVF9WQUxVRVMgPSB7XHJcbiAgICAgICAgZDogQ0FMQ1VMQVRPUl9ERUZBVUxUUy5kLFxyXG4gICAgICAgIHA6IENBTENVTEFUT1JfREVGQVVMVFMucCxcclxuICAgICAgICB0OiBDQUxDVUxBVE9SX0RFRkFVTFRTLnQsXHJcbiAgICAgICAgdHlwZTogQ0FMQ1VMQVRPUl9ERUZBVUxUUy50eXBlXHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBjb250Q2FsY3VsYXRvciA9ICQoY2FsY3VsYXRvcik7XHJcblxyXG4gICAgICAgIGlmKGNvbnRDYWxjdWxhdG9yLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgc2VsZi5zZXRWYWx1ZXMoKTtcclxuICAgICAgICAgICAgc2VsZi5pbml0Q2hlY2tib3hQZXJjZW50cygpO1xyXG4gICAgICAgICAgICBzZWxmLmNhbGN1bGF0ZUludGVyZXN0KCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGb3JtYXQgVmFsdWVzXHJcbiAgICAgKiBAcGFyYW0gdmFsXHJcbiAgICAgKi9cclxuICAgIHNlbGYuZm9ybWF0U3VtVmFsdWUgPSBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICB2YXIgRm9ybWF0TnVtYmVyID0gcmVxdWlyZSgnLi9fZm9ybWF0TnVtYmVyJyk7XHJcbiAgICAgICAgdmFyIGZvcm1hdE51bWJlckZ1bmMgPSBuZXcgRm9ybWF0TnVtYmVyKHZhbCk7XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtYXROdW1iZXJGdW5jLmluaXQoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0IHNsaWRlciBGb3IgSW52ZXN0IHN1bVxyXG4gICAgICovXHJcbiAgICBzZWxmLmluaXRTbGlkZXJTdW0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc2xpZGVyU3VtID0gJCgnLmpzLXNsaWRlci1zdW0nKTtcclxuXHJcbiAgICAgICAgaWYgKHNsaWRlclN1bS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdmFyIHNsaWRlcldyYXBwZXIgPSBzbGlkZXJTdW0ucGFyZW50cygnLmpzLWNhbGMtc2xpZGVyJyk7XHJcblxyXG4gICAgICAgICAgICBzbGlkZXJXcmFwcGVyLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSBzbGlkZXJXcmFwcGVyLmVxKGluZGV4KSxcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFZhbHVlQ29udCA9ICR0aGlzLmZpbmQoJy5qcy1pbnZlc3Qtc3VtLWlucHV0JyksXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWVDb250LnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGludmVzdFN1bUNvbnQgPSAkdGhpcy5maW5kKCcuanMtaW52ZXN0LXN1bS12YWx1ZScpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlciA9ICR0aGlzLmZpbmQoJy5qcy1zbGlkZXItc3VtJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNldEZvcm1hdHRlZFN1bVZhbHVlID0gZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm1hdHRlZFZhbHVlID0gc2VsZi5mb3JtYXRTdW1WYWx1ZSh2YWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpbnZlc3RTdW1Db250LnRleHQoZm9ybWF0dGVkVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRGb3JtYXR0ZWRTdW1WYWx1ZShpbnB1dFZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzbGlkZXIuc2xpZGVyKHtcclxuICAgICAgICAgICAgICAgICAgICByYW5nZTogJ21pbicsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluOiBzbGlkZXIuZGF0YSgnbWluJykgfHwgQ0FMQ1VMQVRPUl9ERUZBVUxUUy5kTWluLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heDogc2xpZGVyLmRhdGEoJ21heCcpIHx8IENBTENVTEFUT1JfREVGQVVMVFMuZE1heCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogc2xpZGVyLmRhdGEoJ3N0YXJ0JykgfHwgc2VsZi5DQUxDVUxBVE9SX0NVUlJFTlRfVkFMVUVTLmQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogQ0FMQ1VMQVRPUl9ERUZBVUxUUy5kU3RlcCxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZTogZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkNBTENVTEFUT1JfQ1VSUkVOVF9WQUxVRVMuZCA9IHVpLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Rm9ybWF0dGVkU3VtVmFsdWUodWkudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dFZhbHVlQ29udC52YWwodWkudmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jYWxjdWxhdGVJbnRlcmVzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuQ0FMQ1VMQVRPUl9DVVJSRU5UX1ZBTFVFUy5kID0gdWkudmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRGb3JtYXR0ZWRTdW1WYWx1ZSh1aS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0VmFsdWVDb250LnZhbCh1aS52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbGN1bGF0ZUludGVyZXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdCBzbGlkZXIgRm9yIFBlcmlvZFxyXG4gICAgICovXHJcbiAgICBzZWxmLmluaXRTbGlkZXJQZXJpb2QgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc2xpZGVyUGVyaW9kID0gJCgnLmpzLXNsaWRlci1wZXJpb2QnKTtcclxuXHJcbiAgICAgICAgaWYgKHNsaWRlclBlcmlvZC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdmFyIHNsaWRlcldyYXBwZXIgPSBzbGlkZXJQZXJpb2QucGFyZW50cygnLmpzLWNhbGMtc2xpZGVyJyk7XHJcblxyXG4gICAgICAgICAgICBzbGlkZXJXcmFwcGVyLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSBzbGlkZXJXcmFwcGVyLmVxKGluZGV4KSxcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gJHRoaXMuZmluZCgnLmpzLWludmVzdC1wZXJpb2QtaW5wdXQnKSxcclxuICAgICAgICAgICAgICAgICAgICBpbnZlc3RQZXJpb2QgPSAkdGhpcy5maW5kKCcuanMtaW52ZXN0LXBlcmlvZC12YWx1ZScpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlciA9ICR0aGlzLmZpbmQoJy5qcy1zbGlkZXItcGVyaW9kJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2xpZGVyLnNsaWRlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2U6ICdtaW4nLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbjogc2xpZGVyLmRhdGEoJ21pbicpIHx8IENBTENVTEFUT1JfREVGQVVMVFMudE1pbixcclxuICAgICAgICAgICAgICAgICAgICBtYXg6IHNsaWRlci5kYXRhKCdtYXgnKSB8fCBDQUxDVUxBVE9SX0RFRkFVTFRTLnRNYXgsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHNsaWRlci5kYXRhKCdzdGFydCcpIHx8IHNlbGYuQ0FMQ1VMQVRPUl9DVVJSRU5UX1ZBTFVFUy50LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IENBTENVTEFUT1JfREVGQVVMVFMudFN0ZXAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5DQUxDVUxBVE9SX0NVUlJFTlRfVkFMVUVTLnQgPSB1aS52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludmVzdFBlcmlvZC50ZXh0KHVpLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZS52YWwodWkudmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jYWxjdWxhdGVQZXJjZW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmluaXRTbGlkZXJQZXJjZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2FsY3VsYXRlSW50ZXJlc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkNBTENVTEFUT1JfQ1VSUkVOVF9WQUxVRVMudCA9IHVpLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW52ZXN0UGVyaW9kLnRleHQodWkudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dFZhbHVlLnZhbCh1aS52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbGN1bGF0ZVBlcmNlbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW5pdFNsaWRlclBlcmNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jYWxjdWxhdGVJbnRlcmVzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdCBzbGlkZXIgRm9yIFBlcmNlbnRzXHJcbiAgICAgKi9cclxuICAgIHNlbGYuaW5pdFNsaWRlclBlcmNlbnQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc2xpZGVyUGVyY2VudCA9ICQoJy5qcy1zbGlkZXItcGVyY2VudCcpO1xyXG5cclxuICAgICAgICBpZiAoc2xpZGVyUGVyY2VudC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdmFyIHNsaWRlcldyYXBwZXIgPSBzbGlkZXJQZXJjZW50LnBhcmVudHMoJy5qcy1jYWxjLXNsaWRlcicpO1xyXG5cclxuICAgICAgICAgICAgc2xpZGVyV3JhcHBlci5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gc2xpZGVyV3JhcHBlci5lcShpbmRleCksXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9ICR0aGlzLmZpbmQoJy5qcy1pbnZlc3QtcGVyY2VudC1pbnB1dCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIGludmVzdFBlcmNlbnQgPSAkdGhpcy5maW5kKCcuanMtaW52ZXN0LXBlcmNlbnQtdmFsdWUnKSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXIgPSAkdGhpcy5maW5kKCcuanMtc2xpZGVyLXBlcmNlbnQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzbGlkZXIuc2xpZGVyKHtcclxuICAgICAgICAgICAgICAgICAgICByYW5nZTogJ21pbicsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluOiBzbGlkZXIuZGF0YSgnbWluJykgfHwgQ0FMQ1VMQVRPUl9ERUZBVUxUUy5wTWluIC0gMSxcclxuICAgICAgICAgICAgICAgICAgICBtYXg6IHNsaWRlci5kYXRhKCdtYXgnKSB8fCBDQUxDVUxBVE9SX0RFRkFVTFRTLnBNYXgsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHNsaWRlci5kYXRhKCdzdGFydCcpIHx8IHNlbGYuQ0FMQ1VMQVRPUl9DVVJSRU5UX1ZBTFVFUy5wLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IENBTENVTEFUT1JfREVGQVVMVFMucFN0ZXAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5DQUxDVUxBVE9SX0NVUlJFTlRfVkFMVUVTLnAgPSB1aS52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludmVzdFBlcmNlbnQudGV4dCh1aS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0VmFsdWUudmFsKHVpLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2FsY3VsYXRlSW50ZXJlc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkNBTENVTEFUT1JfQ1VSUkVOVF9WQUxVRVMucCA9IHVpLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW52ZXN0UGVyY2VudC50ZXh0KHVpLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZS52YWwodWkudmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jYWxjdWxhdGVJbnRlcmVzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENob29zZSBQZXJjZW50cyB0eXBlXHJcbiAgICAgKi9cclxuICAgIHNlbGYuaW5pdENoZWNrYm94UGVyY2VudHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgY2hvb3NlUGVyY2VudCA9ICQoJy5qcy1wZXJjZW50cycpO1xyXG5cclxuICAgICAgICBpZiAoY2hvb3NlUGVyY2VudC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdmFyIG1vbnRobHlDb250ID0gJCgnLmpzLWNhbGMtdGFibGUtbW9udGhseScpLFxyXG4gICAgICAgICAgICAgICAgcXVhcnRlcmx5Q29udCA9ICQoJy5qcy1jYWxjLXRhYmxlLXF1YXJ0ZXJseScpO1xyXG5cclxuICAgICAgICAgICAgY2hvb3NlUGVyY2VudC5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hvc2VuUGVyY2VudHMgPSAkKHRoaXMpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNob3NlblBlcmNlbnRzID09PSAnbW9udGhseScpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb250aGx5Q29udC5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVhcnRlcmx5Q29udC5hZGRDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5DQUxDVUxBVE9SX0NVUlJFTlRfVkFMVUVTLnR5cGUgPSAnbW9udGhseSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtb250aGx5Q29udC5hZGRDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVhcnRlcmx5Q29udC5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5DQUxDVUxBVE9SX0NVUlJFTlRfVkFMVUVTLnR5cGUgPSAncXVhcnRlcmx5JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLmNhbGN1bGF0ZVBlcmNlbnRzKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNhbGN1bGF0ZUludGVyZXN0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlIHBlcmNlbnRzXHJcbiAgICAgKi9cclxuICAgIHNlbGYuY2FsY3VsYXRlUGVyY2VudHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZihzZWxmLkNBTENVTEFUT1JfQ1VSUkVOVF9WQUxVRVMudHlwZSA9PT0gJ21vbnRobHknKSB7XHJcbiAgICAgICAgICAgIGlmKHNlbGYuQ0FMQ1VMQVRPUl9DVVJSRU5UX1ZBTFVFUy50IDw9IENBTENVTEFUT1JfREVGQVVMVFMudEJvdW5kYXJ5KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkNBTENVTEFUT1JfQ1VSUkVOVF9WQUxVRVMucCA9IENBTENVTEFUT1JfREVGQVVMVFMucE1vbnRobHkxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5DQUxDVUxBVE9SX0NVUlJFTlRfVkFMVUVTLnAgPSBDQUxDVUxBVE9SX0RFRkFVTFRTLnBNb250aGx5MjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYoc2VsZi5DQUxDVUxBVE9SX0NVUlJFTlRfVkFMVUVTLnQgPD0gQ0FMQ1VMQVRPUl9ERUZBVUxUUy50Qm91bmRhcnkpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuQ0FMQ1VMQVRPUl9DVVJSRU5UX1ZBTFVFUy5wID0gQ0FMQ1VMQVRPUl9ERUZBVUxUUy5wUXVhcnRlcmx5MTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuQ0FMQ1VMQVRPUl9DVVJSRU5UX1ZBTFVFUy5wID0gQ0FMQ1VMQVRPUl9ERUZBVUxUUy5wUXVhcnRlcmx5MjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5pbml0U2xpZGVyUGVyY2VudCgpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdmFsdWVzIG9mIGVsZW1lbnRzIGluIGNhbGN1bGF0b3JcclxuICAgICAqL1xyXG4gICAgc2VsZi5zZXRWYWx1ZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaW5wdXRTdW1JbnZlc3QgPSAkKCcuanMtaW52ZXN0LXN1bS1pbnB1dCcpLFxyXG4gICAgICAgICAgICBjb250U3VtSW52ZXN0ID0gJCgnLmpzLWludmVzdC1zdW0tdmFsdWUnKTtcclxuXHJcbiAgICAgICAgdmFyIGlucHV0UGVyaW9kSW52ZXN0ID0gJCgnLmpzLWludmVzdC1wZXJpb2QtaW5wdXQnKSxcclxuICAgICAgICAgICAgY29udFBlcmlvZEludmVzdCA9ICQoJy5qcy1pbnZlc3QtcGVyaW9kLXZhbHVlJyk7XHJcblxyXG4gICAgICAgIHZhciBpbnB1dFBlcmNlbnRJbnZlc3QgPSAkKCcuanMtaW52ZXN0LXBlcmNlbnQtaW5wdXQnKSxcclxuICAgICAgICAgICAgY29udFBlcmNlbnRJbnZlc3QgPSAkKCcuanMtaW52ZXN0LXBlcmNlbnQtdmFsdWUnKTtcclxuXHJcbiAgICAgICAgdmFyIGNob29zZVBlcmNlbnQgPSAkKCcuanMtcGVyY2VudHMnKTtcclxuXHJcbiAgICAgICAgaW5wdXRTdW1JbnZlc3QudmFsKHNlbGYuQ0FMQ1VMQVRPUl9DVVJSRU5UX1ZBTFVFUy5kKTtcclxuICAgICAgICBjb250U3VtSW52ZXN0LnRleHQoc2VsZi5mb3JtYXRTdW1WYWx1ZShzZWxmLkNBTENVTEFUT1JfQ1VSUkVOVF9WQUxVRVMuZCkpO1xyXG4gICAgICAgIHNlbGYuaW5pdFNsaWRlclN1bSgpO1xyXG5cclxuICAgICAgICBpbnB1dFBlcmlvZEludmVzdC52YWwoc2VsZi5DQUxDVUxBVE9SX0NVUlJFTlRfVkFMVUVTLnQpO1xyXG4gICAgICAgIGNvbnRQZXJpb2RJbnZlc3QudGV4dChzZWxmLkNBTENVTEFUT1JfQ1VSUkVOVF9WQUxVRVMudCk7XHJcbiAgICAgICAgc2VsZi5pbml0U2xpZGVyUGVyaW9kKCk7XHJcblxyXG4gICAgICAgIGlucHV0UGVyY2VudEludmVzdC52YWwoc2VsZi5DQUxDVUxBVE9SX0NVUlJFTlRfVkFMVUVTLnApO1xyXG4gICAgICAgIGNvbnRQZXJjZW50SW52ZXN0LnRleHQoc2VsZi5DQUxDVUxBVE9SX0NVUlJFTlRfVkFMVUVTLnApO1xyXG4gICAgICAgIHNlbGYuaW5pdFNsaWRlclBlcmNlbnQoKTtcclxuXHJcbiAgICAgICAgY2hvb3NlUGVyY2VudC5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZigkKHRoaXMpLnZhbCgpID09PSBzZWxmLkNBTENVTEFUT1JfQ1VSUkVOVF9WQUxVRVMudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKCkucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGUgSW50ZXJlc3RcclxuICAgICAqL1xyXG4gICAgc2VsZi5jYWxjdWxhdGVJbnRlcmVzdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBjb250U3VtUXVhcnRlcmx5ID0gJCgnLmpzLWNhbGMtc3VtLXF1YXJ0ZXJseScpLFxyXG4gICAgICAgICAgICBjb250U3VtTW9udGhseSA9ICQoJy5qcy1jYWxjLXN1bS1tb250aGx5JyksXHJcbiAgICAgICAgICAgIGNvbnRTdW1Ub3RhbCA9ICQoJy5qcy1jYWxjLXN1bS10b3RhbCcpO1xyXG5cclxuICAgICAgICB2YXIgc3VtTW9udGhseSA9IChzZWxmLkNBTENVTEFUT1JfQ1VSUkVOVF9WQUxVRVMuZCAqIHNlbGYuQ0FMQ1VMQVRPUl9DVVJSRU5UX1ZBTFVFUy5wICogMzApIC8gKENBTENVTEFUT1JfREVGQVVMVFMuVCAqIDEwMCk7XHJcbiAgICAgICAgdmFyIHN1bU1vbnRobHlSb3VuZGVkID0gTWF0aC5yb3VuZChzdW1Nb250aGx5KTtcclxuICAgICAgICB2YXIgVG90YWxTdW0gPSBNYXRoLnJvdW5kKHNlbGYuQ0FMQ1VMQVRPUl9DVVJSRU5UX1ZBTFVFUy5kICsgKHN1bU1vbnRobHkgKiBzZWxmLkNBTENVTEFUT1JfQ1VSUkVOVF9WQUxVRVMudCkpO1xyXG5cclxuICAgICAgICBjb250U3VtUXVhcnRlcmx5LnRleHQoc2VsZi5mb3JtYXRTdW1WYWx1ZShzdW1Nb250aGx5Um91bmRlZCAqIDMpKTtcclxuICAgICAgICBjb250U3VtTW9udGhseS50ZXh0KHNlbGYuZm9ybWF0U3VtVmFsdWUoc3VtTW9udGhseVJvdW5kZWQpKTtcclxuICAgICAgICBjb250U3VtVG90YWwudGV4dChzZWxmLmZvcm1hdFN1bVZhbHVlKFRvdGFsU3VtKSk7XHJcblxyXG4gICAgfTtcclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2FsY3VsYXRvckludmVzdDtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZnVuY3Rpb24gRm9ybWF0TnVtYmVyKHZhbCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIHNlbGYuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciByZXZlcnNlZFZhbHVlID0gKHZhbCArICcnKS5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpLFxyXG4gICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9ICcnO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gcmV2ZXJzZWRWYWx1ZS5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xyXG4gICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSArPSByZXZlcnNlZFZhbHVlW2ldO1xyXG4gICAgICAgICAgICBpZiAoaSAlIDMgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlICs9ICcgJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZFZhbHVlO1xyXG4gICAgfTtcclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybWF0TnVtYmVyO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcclxudmFyIHZhbGlkYXRlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ3ZhbGlkYXRlJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyd2YWxpZGF0ZSddIDogbnVsbCk7XHJcblxyXG5mdW5jdGlvbiBGb3JtVmFsaWRhdGUoZm9ybVRvVmFsaWRhdGUpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICBzZWxmLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaWYoZm9ybVRvVmFsaWRhdGUpIHtcclxuICAgICAgICAgICAgdmFyIHBhdHRlcm5OYW1lID0gL15b0LAt0Y/QkC3Qr9GR0IFcXC1cXHNdKyQvO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbnN0cmFpbnRzID0ge1xyXG4gICAgICAgICAgICAgICAgbmFtZUludmVzdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXNlbmNlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBwYXR0ZXJuTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlbWFpbEludmVzdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXNlbmNlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcGhvbmVJbnZlc3Q6IHtcclxuICAgICAgICAgICAgICAgICAgICBwcmVzZW5jZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXM6IDExLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZXI6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvXFxEKy9nLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9ybUdyb3VwQ2xhc3MgPSAnanMtZm9ybS1pdGVtJyxcclxuICAgICAgICAgICAgICAgIGlucHV0cyA9IGZvcm1Ub1ZhbGlkYXRlLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9dGV4dF0sIGlucHV0W3R5cGU9ZW1haWxdJyksXHJcbiAgICAgICAgICAgICAgICBpbnB1dHNBcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChpbnB1dHMpO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5oYW5kbGVGb3JtU3VibWl0KGZvcm1Ub1ZhbGlkYXRlLCBjb25zdHJhaW50cywgaW5wdXRzQXJyLCBmb3JtR3JvdXBDbGFzcyk7XHJcbiAgICAgICAgICAgIC8vc2VsZi5oYWRubGVJbnB1dEZvY3VzKGZvcm1Ub1ZhbGlkYXRlLCBjb25zdHJhaW50cywgaW5wdXRzQXJyLCBmb3JtR3JvdXBDbGFzcyk7XHJcbiAgICAgICAgICAgIHNlbGYuaGFkbmxlSW5wdXRDaGFuZ2UoZm9ybVRvVmFsaWRhdGUsIGNvbnN0cmFpbnRzLCBpbnB1dHNBcnIsIGZvcm1Hcm91cENsYXNzKTtcclxuICAgICAgICAgICAgLy9zZWxmLmhhZG5sZUlucHV0S2V5dXAoZm9ybVRvVmFsaWRhdGUsIGNvbnN0cmFpbnRzLCBpbnB1dHNBcnIsIGZvcm1Hcm91cENsYXNzKTtcclxuICAgICAgICAgICAgc2VsZi5oYWRubGVJbnB1dEJsdXIoZm9ybVRvVmFsaWRhdGUsIGNvbnN0cmFpbnRzLCBpbnB1dHNBcnIsIGZvcm1Hcm91cENsYXNzKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgc2VsZi5oYW5kbGVGb3JtU3VibWl0ID0gZnVuY3Rpb24gKGZvcm0sIGNvbnN0cmFpbnRzLCBpbnB1dHMsIGZvcm1Hcm91cENsYXNzKSB7XHJcbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihldikge1xyXG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVycm9ycyA9IHZhbGlkYXRlKGZvcm0sIGNvbnN0cmFpbnRzKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuc2hvd0Vycm9ycyhmb3JtLCBlcnJvcnMgfHwge30sIGlucHV0cywgZm9ybUdyb3VwQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgaWYoZXJyb3JzKSB7XHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIEZvY3VzIGZpcnN0IGludmFsaWQgY29udHJvbFxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JGaXJzdFdyID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcuaGFzLWVycm9yJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZXJyb3JGaXJzdFdyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JGaXJzdFdyLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lXScpLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIEFkZCBjbGFzcyAnaXMtc2VuZGluZyc6IGhpZGUgZm9ybSBjb250cm9scywgc2hvdyBwcmVsb2FkZXJcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdpcy1zZW5kaW5nJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL2ludmVzdC1mb3JtLnBocCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBGb3JtRGF0YSh0aGlzKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIENsb3NlIG1vZGFsIGZvcm1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZ0LmluaXRFdmVudCgnY2xpY2snLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW1vZGFsLWNsb3NlJykuZGlzcGF0Y2hFdmVudChldnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIFJlbW92ZSBjbGFzcyBpcy1zZW5kaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXNlbmRpbmcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBDcmVhdGUgZWxlbWVudCBmb3IgbWVzc2FnZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmNsYXNzTGlzdC5hZGQoJ2MtZm9ybS1yZXN1bHQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc0Rpdi5jbGFzc0xpc3QuYWRkKCdvLXBsdHotaDInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5hcHBlbmRDaGlsZChyZXNEaXYpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIE92ZXJsYXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm8tb3ZlcmxheScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBSZW1vdmUgbWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlbW92ZU1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc0Rpdi5jbGFzc0xpc3QuYWRkKCdvLXBsdHotaDJfZXJyb3InKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmVycm9ycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuZXJyb3JzLmVtYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc0Rpdi5pbm5lckhUTUwgPSBkYXRhLmVycm9ycy5lbWFpbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5lcnJvcnMubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNEaXYuaW5uZXJIVE1MID0gZGF0YS5lcnJvcnMubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5lcnJvcnMucGhvbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzRGl2LmlubmVySFRNTCA9IGRhdGEuZXJyb3JzLnBob25lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc0Rpdi5pbm5lckhUTUwgPSBkYXRhLm1zZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc0Rpdi5pbm5lckhUTUwgPSBkYXRhLm1zZztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocmVtb3ZlTWVzc2FnZSwgMzAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgc2VsZi5oYWRubGVJbnB1dEZvY3VzID0gZnVuY3Rpb24oZm9ybSwgY29uc3RyYWludHMsIGlucHV0c0FyciwgZm9ybUdyb3VwQ2xhc3MpIHtcclxuICAgICAgICBpbnB1dHNBcnIuZm9yRWFjaChmdW5jdGlvbihpbnB1dCkge1xyXG4gICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZvcm1Hcm91cCA9IHNlbGYuY2xvc2VzdFBhcmVudChpbnB1dC5wYXJlbnROb2RlLCBmb3JtR3JvdXBDbGFzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5yZXNldEZvcm1Hcm91cChmb3JtR3JvdXApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgc2VsZi5oYWRubGVJbnB1dENoYW5nZSA9IGZ1bmN0aW9uKGZvcm0sIGNvbnN0cmFpbnRzLCBpbnB1dHNBcnIsIGZvcm1Hcm91cENsYXNzKSB7XHJcbiAgICAgICAgaW5wdXRzQXJyLmZvckVhY2goZnVuY3Rpb24oaW5wdXQpIHtcclxuICAgICAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JzID0gdmFsaWRhdGUoZm9ybSwgY29uc3RyYWludHMpIHx8IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuc2hvd0Vycm9yc0ZvcklucHV0KGlucHV0LCBlcnJvcnNbaW5wdXQubmFtZV0sIGZvcm1Hcm91cENsYXNzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYuaGFkbmxlSW5wdXRLZXl1cCA9IGZ1bmN0aW9uKGZvcm0sIGNvbnN0cmFpbnRzLCBpbnB1dHNBcnIsIGZvcm1Hcm91cENsYXNzKSB7XHJcbiAgICAgICAgaW5wdXRzQXJyLmZvckVhY2goZnVuY3Rpb24oaW5wdXQpIHtcclxuICAgICAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlcnJvcnMgPSB2YWxpZGF0ZShmb3JtLCBjb25zdHJhaW50cykgfHwge307XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5zaG93RXJyb3JzRm9ySW5wdXQoaW5wdXQsIGVycm9yc1tpbnB1dC5uYW1lXSwgZm9ybUdyb3VwQ2xhc3MpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgc2VsZi5oYWRubGVJbnB1dEJsdXIgPSBmdW5jdGlvbihmb3JtLCBjb25zdHJhaW50cywgaW5wdXRzQXJyLCBmb3JtR3JvdXBDbGFzcykge1xyXG4gICAgICAgIGlucHV0c0Fyci5mb3JFYWNoKGZ1bmN0aW9uKGlucHV0KSB7XHJcbiAgICAgICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlcnJvcnMgPSB2YWxpZGF0ZShmb3JtLCBjb25zdHJhaW50cykgfHwge307XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5zaG93RXJyb3JzRm9ySW5wdXQoaW5wdXQsIGVycm9yc1tpbnB1dC5uYW1lXSwgZm9ybUdyb3VwQ2xhc3MpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgc2VsZi5yZXNldEZvcm1Hcm91cCA9IGZ1bmN0aW9uIChmb3JtR3JvdXApIHtcclxuICAgICAgICB2YXIgZm9ybUdyb3VwTGlzdCA9IGZvcm1Hcm91cC5xdWVyeVNlbGVjdG9yQWxsKCcuby1mb3JtLWluZm8nKSxcclxuICAgICAgICAgICAgZm9ybUdyb3VwQXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZm9ybUdyb3VwTGlzdCk7XHJcblxyXG4gICAgICAgIGZvcm1Hcm91cC5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtZXJyb3InKTtcclxuICAgICAgICBmb3JtR3JvdXAuY2xhc3NMaXN0LnJlbW92ZSgnaGFzLXN1Y2Nlc3MnKTtcclxuXHJcbiAgICAgICAgZm9ybUdyb3VwQXJyLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcclxuICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYuc2hvd0Vycm9ycyA9IGZ1bmN0aW9uKGZvcm0sIGVycm9ycywgaW5wdXRzLCBmb3JtR3JvdXBDbGFzcykge1xyXG4gICAgICAgIGlucHV0cy5mb3JFYWNoKGZ1bmN0aW9uKGlucHV0KSB7XHJcbiAgICAgICAgICAgIHNlbGYuc2hvd0Vycm9yc0ZvcklucHV0KGlucHV0LCBlcnJvcnMgJiYgZXJyb3JzW2lucHV0Lm5hbWVdLCBmb3JtR3JvdXBDbGFzcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYuc2hvd0Vycm9yc0ZvcklucHV0ID0gZnVuY3Rpb24oaW5wdXQsIGVycm9ycywgZm9ybUdyb3VwQ2xhc3MpIHtcclxuICAgICAgICB2YXIgZm9ybUdyb3VwID0gc2VsZi5jbG9zZXN0UGFyZW50KGlucHV0LnBhcmVudE5vZGUsIGZvcm1Hcm91cENsYXNzKSxcclxuICAgICAgICAgICAgbWVzc2FnZXMgPSBmb3JtR3JvdXAucXVlcnlTZWxlY3RvcignLm8tZm9ybS1pbmZvJyk7XHJcblxyXG4gICAgICAgIHNlbGYucmVzZXRGb3JtR3JvdXAoZm9ybUdyb3VwKTtcclxuXHJcbiAgICAgICAgaWYgKGVycm9ycykge1xyXG4gICAgICAgICAgICBmb3JtR3JvdXAuY2xhc3NMaXN0LmFkZCgnaGFzLWVycm9yJyk7XHJcblxyXG4gICAgICAgICAgICBlcnJvcnMuZm9yRWFjaChmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hZGRFcnJvcihtZXNzYWdlcywgZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3JtR3JvdXAuY2xhc3NMaXN0LmFkZCgnaGFzLXN1Y2Nlc3MnKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYuY2xvc2VzdFBhcmVudCA9IGZ1bmN0aW9uKGNoaWxkLCBjbGFzc05hbWUpIHtcclxuICAgICAgICBpZiAoIWNoaWxkIHx8IGNoaWxkID09PSBkb2N1bWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoaWxkLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjaGlsZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5jbG9zZXN0UGFyZW50KGNoaWxkLnBhcmVudE5vZGUsIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBzZWxmLmFkZEVycm9yID0gZnVuY3Rpb24obWVzc2FnZXMsIGVycm9yKSB7XHJcbiAgICAgICAgdmFyIGJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG5cclxuICAgICAgICBibG9jay5jbGFzc0xpc3QuYWRkKCdvLWZvcm0taW5mb19fdGV4dCcpO1xyXG4gICAgICAgIGJsb2NrLmlubmVyVGV4dCA9IGVycm9yO1xyXG5cclxuICAgICAgICBtZXNzYWdlcy5hcHBlbmRDaGlsZChibG9jayk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1WYWxpZGF0ZTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHZhbGlkYXRlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ3ZhbGlkYXRlJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyd2YWxpZGF0ZSddIDogbnVsbCk7XHJcblxyXG5mdW5jdGlvbiBGb3JtVmFsaWRhdGVUcmFuc2xhdGUoKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgc2VsZi5pbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKSxcclxuICAgICAgICAgICAgbGFuZyA9IGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoJ2xhbmcnKTtcclxuXHJcbiAgICAgICAgaWYobGFuZyA9PT0gJ2VuJykge1xyXG4gICAgICAgICAgICB2YWxpZGF0ZS52YWxpZGF0b3JzLnByZXNlbmNlLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnXlJlcXVpcmVkJ1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFsaWRhdGUudmFsaWRhdG9ycy5lbWFpbC5vcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ15JbmNvcnJlY3QgZW1haWwgYWRkcmVzcydcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhbGlkYXRlLnZhbGlkYXRvcnMubGVuZ3RoLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICB3cm9uZ0xlbmd0aDogJ15TaG91bGQgYmUgJXtjb3VudH0gY2hhcmFjdGVycycsXHJcbiAgICAgICAgICAgICAgICB0b29TaG9ydDogJ15TaG91bGQgYmUgbWluaW11bSAle2NvdW50fSBjaGFyYWN0ZXJzJ1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFsaWRhdGUudmFsaWRhdG9ycy5mb3JtYXQub3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGZ1bmN0aW9uKHZhbHVlLCBhdHRyaWJ1dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihhdHRyaWJ1dGUgPT09ICduYW1lSW52ZXN0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWRhdGUuZm9ybWF0KCdeT25seSBjeXJpbGxpYyBjaGFyYWN0ZXJzIGFuZCB3aGl0ZXNwYWNlcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihsYW5nID09PSAncnUnKSB7XHJcbiAgICAgICAgICAgIHZhbGlkYXRlLnZhbGlkYXRvcnMucHJlc2VuY2Uub3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICde0J/QvtC70LUg0L7QsdGP0LfQsNGC0LXQu9GM0L3QviDQuiDQt9Cw0L/QvtC70L3QtdC90LjRjidcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhbGlkYXRlLnZhbGlkYXRvcnMuZW1haWwub3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICde0JLQstC10LTQuNGC0LUg0LrQvtGA0YDQtdC60YLQvdGL0Lkg0LDQtNGA0LXRgSDRjdC70LXQutGC0YDQvtC90L3QvtC5INC/0L7Rh9GC0YsnXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YWxpZGF0ZS52YWxpZGF0b3JzLmxlbmd0aC5vcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgd3JvbmdMZW5ndGg6ICde0J/QvtC70LUg0LTQvtC70LbQvdC+INGB0L7QtNC10YDQttCw0YLRjCAle2NvdW50fSDRgdC40LzQstC+0LvQvtCyJyxcclxuICAgICAgICAgICAgICAgIHRvb1Nob3J0OiAnXtCf0L7Qu9C1INC00L7Qu9C20L3QviDRgdC+0LTQtdGA0LbQsNGC0Ywg0LzQuNC90LjQvNGD0LwgJXtjb3VudH0g0YHQuNC80LLQvtC70L7QsidcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhbGlkYXRlLnZhbGlkYXRvcnMuZm9ybWF0Lm9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBmdW5jdGlvbih2YWx1ZSwgYXR0cmlidXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXR0cmlidXRlID09PSAnbmFtZUludmVzdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRlLmZvcm1hdCgnXtCi0L7Qu9GM0LrQviDRgNGD0YHRgdC60LjQtSDQsdGD0LrQstGLINC4INC/0YDQvtCx0LXQu9GLJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1WYWxpZGF0ZVRyYW5zbGF0ZTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1hc2tlZCBpbnB1dCBmb3IgcGhvbmUgbnVtYmVyXG4gKiBAbW9kdWxlIGlucHV0TWFza2VkUGhvbmVcbiAqL1xuZnVuY3Rpb24gSW5wdXRNYXNrZWRQaG9uZSgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgSW5wdXRtYXNrID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ0lucHV0bWFzayddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnSW5wdXRtYXNrJ10gOiBudWxsKTtcblxuICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1pbnB1dC1waG9uZScpO1xuXG4gICAgc2VsZi5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKGlucHV0KSB7XG4gICAgICAgICAgICB2YXIgcGhvbmVNYXNrID0gbmV3IElucHV0bWFzayh7XG4gICAgICAgICAgICAgICAgJ21hc2snOiAnKzcgKDk5OSkgOTk5IDk5IDk5JyxcbiAgICAgICAgICAgICAgICAncGxhY2Vob2xkZXInOiAnXydcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwaG9uZU1hc2subWFzayhpbnB1dCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXRNYXNrZWRQaG9uZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTdGF0ZXMgb2YgY29udHJvbHMgaW4gZm9ybVxuICogQG1vZHVsZSBzdGF0ZXNPZkNvbnRyb2xzXG4gKi9cbmZ1bmN0aW9uIFN0YXRlc09mQ29udHJvbHMoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdmFyIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChbXG4gICAgICAgICcuby1wbHR6LXRleHQtaW5wdXQnLFxuICAgICAgICAnLm8tcGx0ei10ZXh0YXJlYSdcbiAgICBdKTtcblxuICAgIHNlbGYuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZihpbnB1dCkge1xuICAgICAgICAgICAgdmFyIGlucHV0c0FyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGlucHV0KTtcblxuICAgICAgICAgICAgaW5wdXRzQXJyLmZvckVhY2goXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm1Hcm91cCA9IGVsLnBhcmVudE5vZGU7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzRW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtR3JvdXAuY2xhc3NMaXN0LmFkZCgnaXMtZW1wdHknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1Hcm91cC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1lbXB0eScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBpc0ZvY3VzZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRW1wdHkoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUdyb3VwLmNsYXNzTGlzdC5hZGQoJ2lzLWZvY3VzZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNCbHVyZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRW1wdHkoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUdyb3VwLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWZvY3VzZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBpc0VtcHR5KCk7XG4gICAgICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgaXNGb2N1c2VkKTtcbiAgICAgICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGlzQmx1cmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfTtcblxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhdGVzT2ZDb250cm9scztcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBKUyBpcyBlbmFibGVkIGluIGJyb3dzZXJcclxuICogQHNlZSBtb2R1bGU6aXNKc1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdElzSlMoKSB7XHJcbiAgICB2YXIgSXNKUyA9IHJlcXVpcmUoJy4vX2lzSlMnKTtcclxuICAgIHZhciBpc0pTRnVuYyA9IG5ldyBJc0pTKCk7XHJcblxyXG4gICAgaXNKU0Z1bmMuaW5pdCgpO1xyXG59XHJcblxyXG4vKipcclxuICogQnV0dG9uIFRvIFRvcFxyXG4gKiBAc2VlIG1vZHVsZTp0b3RvcFxyXG4gKi9cclxuZnVuY3Rpb24gaW5pdFRvVG9wKCkge1xyXG4gICAgdmFyIFRvdG9wID0gcmVxdWlyZSgnLi9fdG90b3AnKTtcclxuICAgIHZhciB0b3RvcEZ1bmMgPSBuZXcgVG90b3AoKTtcclxuXHJcbiAgICB0b3RvcEZ1bmMudG9nZ2xlKCk7XHJcbiAgICB0b3RvcEZ1bmMuaW5pdCgpO1xyXG59XHJcblxyXG4vKipcclxuICogQ2FjbHVsYXRvclxyXG4gKiBAc2VlIG1vZHVsZTpDYWNsdWxhdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0Q2FsY3VsYXRvcigpIHtcclxuICAgIHZhciBDYWxjdWxhdG9ySW52ZXN0ID0gcmVxdWlyZSgnLi9jYWxjdWxhdG9yL19jYWxjdWxhdG9ySW52ZXN0Jyk7XHJcbiAgICB2YXIgY2FsY3VsYXRvckludmVzdEZ1bmMgPSBuZXcgQ2FsY3VsYXRvckludmVzdCgnLmpzLWNhbGN1bGF0b3ItaW52ZXN0Jyk7XHJcblxyXG4gICAgY2FsY3VsYXRvckludmVzdEZ1bmMuaW5pdCgpO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkIGNsYXNzZXMgdG8gZm9ybS1ncm91cCB3aGVuIGNvbnRyb2xzIGFyZSBmb2N1c2VkLCBhY3RpdmUsIGRpc2FibGVkLi4uXHJcbiAqIEBzZWUgbW9kdWxlOnN0YXRlc09mQ29udHJvbHNcclxuICovXHJcbmZ1bmN0aW9uIGluaXRTdGF0ZXNPZkNvbnRyb2xzKCkge1xyXG4gICAgdmFyIFN0YXRlc09mQ29udHJvbHMgPSByZXF1aXJlKCcuL2Zvcm1zL19zdGF0ZXNPZkNvbnRyb2xzJyk7XHJcbiAgICB2YXIgc3RhdGVzT2ZDb250cm9sc0Z1bmMgPSBuZXcgU3RhdGVzT2ZDb250cm9scygpO1xyXG5cclxuICAgIHN0YXRlc09mQ29udHJvbHNGdW5jLmluaXQoKTtcclxufVxyXG5cclxuLy8vKipcclxuLy8gKiBNYXNrZWQgaW5wdXQgZm9yIGN5cmlsbGljIGZpZWxkcyAtIGN5cmlsbGljIGxldHRlcnMgb25seVxyXG4vLyAqIEBzZWUgbW9kdWxlOmlucHV0TWFza2VkQ3lyaWxsaWNcclxuLy8gKi9cclxuLy9mdW5jdGlvbiBpbml0SW5wdXRNYXNrZWRDeXJpbGxpYygpIHtcclxuLy8gICAgdmFyIElucHV0TWFza2VkQ3lyaWxsaWMgPSByZXF1aXJlKCcuL2Zvcm1zL19pbnB1dE1hc2tlZEN5cmlsbGljJyk7XHJcbi8vICAgIHZhciBpbnB1dE1hc2tlZEN5cmlsbGljRnVuYyA9IG5ldyBJbnB1dE1hc2tlZEN5cmlsbGljKCk7XHJcbi8vXHJcbi8vICAgIGlucHV0TWFza2VkQ3lyaWxsaWNGdW5jLmluaXQoKTtcclxuLy99XHJcblxyXG4vKipcclxuICogTWFza2VkIGlucHV0IGZvciBwaG9uZSBudW1iZXJcclxuICogQHNlZSBtb2R1bGU6aW5wdXRNYXNrZWRQaG9uZVxyXG4gKi9cclxuZnVuY3Rpb24gaW5pdElucHV0TWFza2VkUGhvbmUoKSB7XHJcbiAgICB2YXIgSW5wdXRNYXNrZWRQaG9uZSA9IHJlcXVpcmUoJy4vZm9ybXMvX2lucHV0TWFza2VkUGhvbmUnKTtcclxuICAgIHZhciBpbnB1dE1hc2tlZFBob25lRnVuYyA9IG5ldyBJbnB1dE1hc2tlZFBob25lKCk7XHJcblxyXG4gICAgaW5wdXRNYXNrZWRQaG9uZUZ1bmMuaW5pdCgpO1xyXG59XHJcblxyXG4vKipcclxuICogTW9kYWwgQ29udGFjdCBGb3JtXHJcbiAqIEBzZWUgbW9kdWxlOm1vZGFsUGx0elxyXG4gKi9cclxuZnVuY3Rpb24gaW5pdE1vZGFsUGx0eigpIHtcclxuICAgIHZhciBNb2RhbFBsdHogPSByZXF1aXJlKCcuL19tb2RhbFBsdHonKTtcclxuICAgIHZhciBtb2RhbFBsdHpGdW5jID0gbmV3IE1vZGFsUGx0eigpO1xyXG5cclxuICAgIG1vZGFsUGx0ekZ1bmMuaW5pdCgpO1xyXG59XHJcblxyXG4vKipcclxuICogTW9kYWwgQ29udGFjdCBGb3JtXHJcbiAqIEBzZWUgbW9kdWxlOmZvcm1WYWxpZGF0ZVxyXG4gKiBAc2VlIG1vZHVsZTpmb3JtVmFsaWRhdGVUcmFuc2xhdGVcclxuICovXHJcbmZ1bmN0aW9uIGluaXRDb250YWN0Rm9ybSgpIHtcclxuICAgIHZhciBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW1vZGFsLWZvcm0nKTtcclxuXHJcbiAgICB2YXIgRm9ybVZhbGlkYXRlID0gcmVxdWlyZSgnLi9mb3Jtcy9fZm9ybVZhbGlkYXRlJyk7XHJcbiAgICB2YXIgZm9ybVZhbGlkYXRlRnVuYyA9IG5ldyBGb3JtVmFsaWRhdGUoZm9ybSk7XHJcblxyXG4gICAgdmFyIEZvcm1WYWxpZGF0ZVRyYW5zbGF0ZSA9IHJlcXVpcmUoJy4vZm9ybXMvX2Zvcm1WYWxpZGF0ZVRyYW5zbGF0ZScpO1xyXG4gICAgdmFyIGZvcm1WYWxpZGF0ZVRyYW5zbGF0ZUZ1bmMgPSBuZXcgRm9ybVZhbGlkYXRlVHJhbnNsYXRlKCk7XHJcblxyXG4gICAgZm9ybVZhbGlkYXRlRnVuYy5pbml0KCk7XHJcbiAgICBmb3JtVmFsaWRhdGVUcmFuc2xhdGVGdW5jLmluaXQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWxsU2NyaXB0cygpIHtcclxuXHJcbiAgICBpbml0SXNKUygpO1xyXG4gICAgaW5pdENhbGN1bGF0b3IoKTtcclxuICAgIGluaXRDb250YWN0Rm9ybSgpO1xyXG4gICAgaW5pdFRvVG9wKCk7XHJcbiAgICBpbml0U3RhdGVzT2ZDb250cm9scygpO1xyXG4gICAgaW5pdElucHV0TWFza2VkUGhvbmUoKTtcclxuICAgIC8vaW5pdElucHV0TWFza2VkQ3lyaWxsaWMoKTtcclxuICAgIGluaXRNb2RhbFBsdHooKTtcclxuXHJcbn1cclxuXHJcbmFsbFNjcmlwdHMoKTtcclxuIl19
