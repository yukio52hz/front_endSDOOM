'use strict';

const input_name = document.querySelector('#txt-name');
const input_releaseDay = document.querySelector('#txt-releaseDay');
const txt_error = document.querySelector('#txt-error');
const btn_register = document.querySelector('#btn-register');

const tbl_body = document.querySelector('#tbl-songs tbody');

const manager = new Manager();
//subir imagen// 
const btn_upload = document.querySelector('#btn-uploadCoverAlbum');
const coverAlbum = document.querySelector('#img-album');

btn_upload.addEventListener('click', () => {
    uploadCloudinary(coverAlbum);
    widget_cloudinary.open();
}, false);
//++++++++//
const cleanUp_form = () => {
    input_name.value = '';
    input_releaseDay.value = '';
    coverAlbum.src = '';
};
const show_songs = async() => {
    let list = await manager.get_listSongs()
    list.forEach(song => {

        let row = tbl_body.insertRow();
        row.insertCell().innerHTML = song.get_name();
        row.insertCell().innerHTML = song.get_artistName().get_name();
        let cell = row.insertCell();

        let check = document.createElement('input');
        check.type = 'checkbox';
        check.value = JSON.stringify(song);

        cell.appendChild(check);
    })
}
show_songs()
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
const registering_album = async() => {
    let error = validate_form();
    if (error) {

    } else {
        let slt_songs = document.querySelectorAll('input[type=checkbox]:checked');

        let name = input_name.value;
        let release_date = Date(input_releaseDay.value);
        let cover = coverAlbum.src;
        let new_album = new Album(name, release_date, cover);
        //recorro las canciones selecionadas y la transformo en objetos para asi poder sus metodos 
        //asi le colo el id
        slt_songs.forEach(input_song => {
            let songs = JSON.parse(input_song.value);
            let obj_song = new Song(songs.name, songs.artist_name, songs.length_song, songs.album, songs.song_cover);
            obj_song.set_id(songs._id);
            obj_song.set_songCover(cover);
            obj_song.set_album(JSON.stringify(new_album));
            //artista
            let artist = new Artist(songs.artist_name.name, songs.artist_name.record_house, new Date(songs.artist_name.birth_date), songs.artist_name.profile_picture, songs.artist_name.age, songs.artist_name.albums)
            artist.set_id(songs.artist_name._id)
            artist.calculate_age();
            obj_song.set_artistName(artist)


            new_album.add_songs(obj_song);
        })
        new_album.calculate_lengthAlbum();
        manager.album_register(new_album);
        cleanUp_form();
        Swal.fire({
            icon: 'success',
            title: 'Álbum registrado',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        });
        console.log(new_album);
    }
};

btn_register.addEventListener('click', registering_album)