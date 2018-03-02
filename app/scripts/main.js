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
