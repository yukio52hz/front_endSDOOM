'use strict';
const input_name = document.querySelector('#txt-name');
const input_recordHouse = document.querySelector('#txt-recordHouse');
const input_birthDate = document.querySelector('#txt-birthDate');

const txt_error = document.querySelector('#txt-error');
const btn_register = document.querySelector('#btn-register');
//subit imagen// 
const btn_upload = document.querySelector('#btn-uploadImgArtist');
const picture_artist = document.querySelector('#img-artist');

btn_upload.addEventListener('click', () => {
    uploadCloudinary(picture_artist);
    widget_cloudinary.open();
}, false);
//++++++++//
const manager = new Manager();

const cleanUp_form = () => {
    input_name.value = '';
    input_recordHouse.value = '';
    input_birthDate.value = '';
    picture_artist.src = '';
};

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

const registering_artist = async() => {
    let error = validate_form();
    if (error) {

    } else {
        let name = input_name.value;
        let record_house = input_recordHouse.value;
        let birth_date = new Date(input_birthDate.value);
        let img_profile = picture_artist.src;
        let new_artist = new Artist(name, record_house, birth_date, img_profile);

        new_artist.calculate_age()
        manager.artist_register(new_artist);
        cleanUp_form();
        Swal.fire({
            icon: 'success',
            title: 'Artista registrado',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        });
        console.log(new_artist);
    }
};
btn_register.addEventListener('click', registering_artist)