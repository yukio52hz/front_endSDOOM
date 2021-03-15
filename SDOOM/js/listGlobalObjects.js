'use strict';

const tbl_artist = document.querySelector('#tbl-artist tbody');
const tbl_album = document.querySelector('#tbl-album tbody');
const tbl_song = document.querySelector('#tbl-song tbody');
const tbl_playlists = document.querySelector('#tbl-playlistMenu tbody');
const tbl_songsToChoose = document.querySelector('#tbl-songsChoose');
//lista de todos literal
//en teoria de aqui nos encargaremos para hacer los update y adds
const show_artists = async() => {
    let list = await manager.get_listArtists();
    list.forEach(artist => {
        let row = tbl_artist.insertRow();


        let img = document.createElement('img');
        img.src = artist.get_profilePicture();
        img.style.width = '80px';
        row.insertCell().appendChild(img);

        row.insertCell().innerHTML = artist.get_name();
        //row.insertCell().innerText = artist.get_age();

        let i_modify = document.createElement('i');
        i_modify.classList.add('fas', 'fa-edit')
        i_modify.style.cursor = 'pointer';
        i_modify.title = 'Modificar';
        row.insertCell().appendChild(i_modify);

        i_modify.addEventListener('click', () => {
            localStorage.setItem('artistModify', JSON.stringify(artist));
            window.location.href = `modify-artist.html?id=${artist.get_id()}`;
        });


        let i_add = document.createElement('i');
        i_add.classList.add('fas', 'fa-plus-square')
        i_add.style.cursor = 'pointer';
        i_add.title = 'Agregar álbum'
        row.insertCell().appendChild(i_add);
        i_add.addEventListener('click', () => {
            localStorage.setItem('artistAddAlbum', JSON.stringify(artist));

        });

        i_add.setAttribute('data-bs-toggle', 'modal');
        i_add.setAttribute('data-bs-target', '#modalAdd_album');
    });
};

const show_songs = async() => {
    let list = await manager.get_listSongs();
    list.forEach(song => {
        let row = tbl_song.insertRow();

        if (song.album) { //si no tiene album no obtiene la imagen
            let img = document.createElement('img');
            img.src = song.get_songCover();
            img.style.width = '80px';
            row.insertCell().appendChild(img);

        } else {

        }

        row.insertCell().innerHTML = song.get_name();
        row.insertCell().innerText = song.get_artistName().get_name();

        let i_modify = document.createElement('i');
        i_modify.classList.add('fas', 'fa-edit')
        i_modify.style.cursor = 'pointer';
        i_modify.title = 'Modificar';
        row.insertCell().appendChild(i_modify);
        i_modify.addEventListener('click', () => {
            console.log(song)
            localStorage.setItem('songModify', JSON.stringify(song));
            window.location.href = `modify_song.html?id=${song.get_id()}`;
        })

    });
};

const show_albums = async() => {
    let list = await manager.get_listAlbums();
    list.forEach(album => {
        let row = tbl_album.insertRow();


        let img = document.createElement('img');
        img.src = album.get_albumCover();
        img.style.width = '80px';
        row.insertCell().appendChild(img);

        row.insertCell().innerHTML = album.get_name();
        //  row.insertCell().innerText = album.get_releaseDate();

        let i_modify = document.createElement('i');
        i_modify.classList.add('fas', 'fa-edit')
        i_modify.style.cursor = 'pointer';
        row.insertCell().appendChild(i_modify);

        /* let i_add = document.createElement('i');
         i_add.classList.add('fas', 'fa-plus-square')
         i_add.style.cursor = 'pointer';
         row.insertCell().appendChild(i_add);*/

        i_modify.addEventListener('click', () => {
                console.log(album)
                localStorage.setItem('albumModify', JSON.stringify(album));
                window.location.href = `modify-album.html?id=${album.get_id()}`;
            })
            //console.log(album.get_name(), album.calculate_lengthAlbum())
    });
};

const show_playlistUser = async() => {
    let list = await manager.get_listPlaylist();

    list.forEach(playlist => {
        if (user_logged.get_id() == playlist.get_owner()) {

            let row = tbl_playlists.insertRow();
            row.insertCell().innerHTML = playlist.get_name();

            let i_add = document.createElement('i');
            i_add.classList.add('fas', 'fa-plus-square')
            i_add.style.cursor = 'pointer';
            i_add.title = 'Agregar canciones'
            row.insertCell().appendChild(i_add);
            i_add.addEventListener('click', () => {
                localStorage.setItem('playlistAddsong', JSON.stringify(playlist));

            });
            i_add.setAttribute('data-bs-toggle', 'modal');
            i_add.setAttribute('data-bs-target', '#modalAdd_songsPlaylist');


            let i_eye = document.createElement('i');
            i_eye.classList.add('far', 'fa-eye')
            i_eye.style.cursor = 'pointer';
            row.insertCell().appendChild(i_eye);

            i_eye.addEventListener('click', () => {
                console.log(playlist)
                localStorage.setItem('playlistSongs', JSON.stringify(playlist));
                window.location.href = `playlist-information.html?id=${playlist.get_id()}`;
            });
        };
    });
};


show_artists();
show_songs();
show_albums();
show_playlistUser();