'use strict';

var validate = require('validate');

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
