'use strict';
const manager = new Manager();
const artist = manager.parse_artist('artistModify');

const input_name = document.querySelector('#txt-name');
const input_recordHouse = document.querySelector('#txt-recordHouse');
const input_birthDate = document.querySelector('#txt-birthDate');

const txt_error = document.querySelector('#txt-error');
const btn_modify = document.querySelector('#btn-modify');
//subir imagen// 
const btn_upload = document.querySelector('#btn-uploadImgArtist');
const picture_artist = document.querySelector('#img-artist');

btn_upload.addEventListener('click', () => {
    uploadCloudinary(picture_artist);
    widget_cloudinary.open();
}, false);

const data_artist = () => {
    input_name.value = artist.get_name();
    input_recordHouse.value = artist.get_recordHouse();
    input_birthDate.value = new Date(artist.get_birthDate().toLocaleDateString());
    document.querySelector('#date-artist').innerText = artist.get_birthDate().toLocaleDateString();
    picture_artist.src = artist.get_profilePicture();
};

const update_artist = () => {
    let upd_artist = new Artist(input_name.value, input_recordHouse.value, new Date(input_birthDate.value), picture_artist.src);
    upd_artist.set_id(artist.get_id())
    upd_artist.calculate_age()
    console.log(upd_artist)
    manager.modify_artist(upd_artist);
    Swal.fire({
        icon: 'success',
        title: 'Artista momificado xd',
        confirmButtonColor: '#1E82D9',
        confirmButtonText: 'Aceptar'
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location.href = 'SDOOM.html'
        }
    })
}

data_artist()
btn_modify.addEventListener('click', update_artist);