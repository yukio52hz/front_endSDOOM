'use strict';

const input_name = document.querySelector('#txt-name');
const slt_artists = document.querySelector('#slt-nameArtist');
const slt_album = document.querySelector('#slt-nameAlbum');
const input_time = document.querySelector('#txt-legth_song');
const txt_error = document.querySelector('#txt-error');
const btn_register = document.querySelector('#btn-register');

const manager = new Manager();

const cleanUp_form = () => {
    input_name.value = '';
    slt_artists.value = '';
    slt_album.value = '';
    input_time.value = '';
};
const slt_loadArtist = async() => {
    let artist = await manager.get_listArtists();
    artist.forEach(obj => {
        slt_artists.add(new Option(obj.get_name(), JSON.stringify(obj)))
            //transformo a mi objeto artista de nuevo a datos str
    })
};
const slt_loadAlbum = async() => {
    let album = await manager.get_listAlbums();
    album.forEach(obj => {
        slt_album.add(new Option(obj.get_name(), JSON.stringify(obj)))
            //transformo a mi objeto artista de nuevo a datos str
    })
};
slt_loadAlbum()
slt_loadArtist()

const validate_form = () => {
    let error = false;
    let inputs_required = document.querySelectorAll('[required]');
    inputs_required.forEach(input => {
        if (input.value == '') {
            input.classList.add('style-input-error');
            txt_error.innerText = 'No se puede enviar el formulario vacío'
            error = true;
        } else {
            input.classList.remove('style-input-error');
            txt_error.innerText = ''
        }
    });
    return error;
};

const registering_song = () => {
    let error = validate_form();
    if (error) {

    } else {
        let name = input_name.value;
        //comienzo de nuevo a transformar el artista selecionado en objeto
        let select_artist = JSON.parse(slt_artists.value);
        let time = input_time.value;
        let artist = new Artist(select_artist.name, select_artist.record_house, new Date(select_artist.birth_date), select_artist.profile_picture, select_artist.age, select_artist.albums)
        artist.set_id(select_artist._id)
        artist.calculate_age();
        //como en nuestro modelo de album necesita un id
        //por eso el nuestra clase song esta vacio el album
        //si selecionamos otro diferente si lo registramos pero  si no no hacemos nada 
        //y lo registramos sin album
        if (slt_album.value != 'sin álbum definido') {
            //covertimos los datos del album de nuevo a su clase 
            let select_album = JSON.parse(slt_album.value);
            let album = new Album(select_album.name, select_album.release_date, select_album.album_cover, select_album.length_album, select_album.songs_list);
            album.set_id(select_album._id);

            let new_song = new Song(name, artist, time);
            //le agrego el album y tambien una portada
            new_song.set_album(album);
            new_song.set_songCover(select_album.album_cover);

            manager.song_register(new_song);
            cleanUp_form()
            Swal.fire({
                icon: 'success',
                title: 'Canción registrada',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            });
            console.log(new_song)
        } else {

            let new_song = new Song(name, artist, time);

            manager.song_register(new_song)
            cleanUp_form()
            Swal.fire({
                icon: 'success',
                title: 'Canción registrado',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            });
            console.log(new_song)
        }
    }
};


btn_register.addEventListener('click', registering_song)