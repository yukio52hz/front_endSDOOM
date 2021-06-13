'use strict'
//literal el html y las mismas constantes del registrar cancion
//lo separo todo para que sea mas ordenado
const input_name = document.querySelector('#txt-name');
const slt_artists = document.querySelector('#slt-nameArtist');
const slt_album = document.querySelector('#slt-nameAlbum');
const input_timeOne = document.querySelector('#txt-legth_songOne');
const input_timeTwo = document.querySelector('#txt-legth_songTwo');
const txt_error = document.querySelector('#txt-error');

//btn modify
const btn_modify = document.querySelector('#btn-modify');

const manager = new Manager();

let song = manager.parse_song('songModify');

//pregunto si hay una cancion en el local

//muestro los datos de la canción que vamos a modificar
const data_song = () => {
    input_name.value = song.get_name();
    slt_artists.value = song.get_artistName().name;

    if (song.song_cover) {

    } else {
        console.log('no tiene')
    }
    if (song.album) {

        slt_album.value = song.album.name;
    } else {

        slt_album.value = 'Sin álbum definido'
    }
    let time = song.length_song.toString();
    let data_time = time.split('.');
    input_timeOne.value = data_time[0]
    input_timeTwo.value = data_time[1]
};
//el mismo proceso de registrar pero esta vez lo modificamos
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

const modify_song = () => {

    if (validate_form()) {
        Swal.fire({
            icon: 'error',
            title: 'Necesitas colocar de nuevo el nombre del artista y el álbum',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        });
    } else {
        let name = input_name.value;
        //comienzo de nuevo a transformar el artista selecionado en objeto
        let select_artist = JSON.parse(slt_artists.value);
        let time = input_timeOne.value+'.'+input_timeTwo.value;
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
            new_song.set_id(song.get_id());
            manager.modify_song(new_song)
            Swal.fire({
                icon: 'success',
                title: 'Canción momificado xd',
                confirmButtonColor: '#1E82D9',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    window.location.href = 'SDOOM.html'
                }
            })
            console.log(new_song)
        } else {

            let new_song = new Song(name, artist, time);
            new_song.set_id(song.get_id());
            manager.modify_song(new_song)
            Swal.fire({
                icon: 'success',
                title: 'Canción momificado xd',
                confirmButtonColor: '#1E82D9',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    window.location.href = 'SDOOM.html'
                }
            })
            console.log(new_song)
        }

    }
};
data_song();
slt_loadArtist();
slt_loadAlbum();

btn_modify.addEventListener('click', modify_song)