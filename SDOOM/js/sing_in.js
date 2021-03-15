'use strict';

const input_name = document.querySelector('#txt-name');
const input_nickname = document.querySelector('#txt-nickname');
const input_bith_date = document.querySelector('#txt-birth_date');
const input_email = document.querySelector('#txt-email');
const input_password = document.querySelector('#txt-password');
const password_confirmation = document.querySelector('#txt-passwordConfirmation');

const eye_watch = document.querySelector('.eye-watch');
const eye_notSee = document.querySelector('.eye-notSee');

const txt_error = document.querySelector('#txt-error');

const btn_register = document.querySelector('#btn-register');

const manager = new Manager();
//span eye
let spanContainerOne = document.querySelector('.password-eye');
let spanContainerTwo = document.querySelector('.password-eyeConfirmation')

const get_parametersUrl = () => {
    const location = new URL(window.location.href);
    const parameters = new URLSearchParams(location.search);
    let type = parameters.get('type'); //.toLowerCase()
    return type;
};

const validate_email = () => {
    let error = false;
    let validation = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    let comprobation = validation.test(input_email.value);
    if (comprobation == true) {
        return error = false;
    } else {
        return error = true;
    }
}
const validate_password = () => {
    let error = false;
    let validation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,18}/;
    let comprobation = validation.test(input_password.value)
    if (comprobation == true) {
        txt_error.innerText = '';
        if (input_password.value == password_confirmation.value) {
            txt_error.innerText = '';
            return error = false;
        } else {
            txt_error.innerText = '';
            txt_error.innerText = 'La constraseñas no son iguales';
            return error = true;
        }
    } else {
        txt_error.innerText = 'La contraseña debe tener una mayúscula, una minúscula, un número y un carácter no alfanumérico'
        error = true;
    }
    return error
};

const validate_form = () => {
    let error = false;
    let inputs_required = document.querySelectorAll('[required]');
    inputs_required.forEach(input => {
        if (input.value == '') {
            input.classList.add('style-input-error');
            error = true;
            txt_error.innerText = 'No se puede enviar el formulario vacío';
        } else {
            input.classList.remove('style-input-error');
            txt_error.innerText = ''
            if (validate_email() == true) {
                error = true;
                if (validate_password() == true) {
                    return error = true;
                }
            }

        }
    });
    return error;
};
const registering_user = async() => {
    let err = validate_form();
    if (err) {

    } else {
        let type = get_parametersUrl();
        let name = input_name.value;
        let nick = input_nickname.value;
        let birth_date = new Date(input_bith_date.value);
        let gender = document.querySelector('input[type=radio]:checked').value;
        let email = input_email.value;
        let password = input_password.value;
        let password_confirm = password_confirmation.value;

        let new_user = new User(type, name, nick, birth_date, gender, email, password, password_confirm);
        if (new_user.calculate_age() < 14) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No cumples con nuestras politicas de edad',
            })
        } else {
            manager.user_register(new_user);
            console.log(new_user);
            Swal.fire({
                icon: 'success',
                title: 'Exitoso',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '../index.html'
                }
            })
        }

    }

};
manager.seeAnd_notSee(input_password, spanContainerOne);
manager.seeAnd_notSee(password_confirmation, spanContainerTwo);


btn_register.addEventListener('click', registering_user)