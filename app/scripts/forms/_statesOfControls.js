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
