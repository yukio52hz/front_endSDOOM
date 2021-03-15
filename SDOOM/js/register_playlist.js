'use strict';

const input_namePlaylist = document.querySelector('#txt-playlist');
const btn_registerPlaylis = document.querySelector('#btn-createPlaylist');
const txt_error = document.querySelector('#txt-error');

const validate_form = () => {
    let error = false;
    let inputs_required = document.querySelectorAll('[required]');
    inputs_required.forEach(input => {
        if (input.value == '') {
            input.classList.add('style-input-error');
            txt_error.innerText = 'Nombre ocupado,por ti en el corazón de ella xd'
            error = true;
        } else {
            input.classList.remove('style-input-error');
            txt_error.innerText = '';
        }
    });
    return error;
};

const register_playList = async() => {
    //se valida cuantas playlist tiene el usuario normal
    let list = await manager.get_listPlaylist();
    let acc = 0;
    list.forEach(playlist => {
        if (user_logged.get_type() == 'Normal') {
            if (user_logged.get_id() == playlist.owner) {
                acc = acc + 1
            }
        } else {
            console.log('usuario premiun')
        }
    });
    console.log(acc)
    if (acc == 2) {
        Swal.fire({
            title: 'Pasate a premiun para poder tener más playlists',
            width: 600,
            padding: '3em',
            imageUrl: '../img/chems.jpg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })
    } else {
        if (validate_form()) {

        } else {
            let name = input_namePlaylist.value;
            let new_playlist = new Playlist(name);
            new_playlist.set_owner(user_logged.get_id());
            //se registra la playlist
            manager.playlist_register(new_playlist);

            //limpia el formulario
            input_namePlaylist.value = ''
            console.log('la playlist registrada', new_playlist)
            Swal.fire({
                icon: 'success',
                title: 'Playlist registrada',
                confirmButtonColor: '#1E82D9',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    window.location.reload()
                }
            })
        }
    }
}

btn_registerPlaylis.addEventListener('click', register_playList);