'use strict';
const input_email = document.querySelector('#txt-email');
const input_password = document.querySelector('#txt-passwordUser');

const txt_error = document.querySelector('#txt-error');

//eye span
const span_containerLogin = document.querySelector('.password-eyeLogin');
const btn_login = document.querySelector('#btn-login');

const manager = new Manager()

const validate_form = () => {
    let error = false;
    let inputs_required = document.querySelectorAll('[required]');
    inputs_required.forEach(input => {
        if (input.value == '') {
            input.classList.add('style-input-error');
            error = true;
            txt_error.innerText = 'No se puede enviar el formulario vacío'
        } else {
            input.classList.remove('style-input-error');
            txt_error.innerText = ''
        }
    });
    return error;
};

const validate_count = () => {
    if (validate_form()) {

    } else {
        manager.log_in(input_email.value, input_password.value);
    }
}

manager.seeAnd_notSee(input_password, span_containerLogin);

btn_login.addEventListener('click', validate_count)