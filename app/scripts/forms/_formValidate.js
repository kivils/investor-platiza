'use strict';

var $ = require('jquery');
var validate = require('validate');

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
