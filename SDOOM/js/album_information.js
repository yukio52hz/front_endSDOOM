'use strict';

const name_album = document.querySelector('#name-album');
const release_date = document.querySelector('#name-releaseDate');
const length_album = document.querySelector('#length_album');
const tbl_songs = document.querySelector('#songsAlbum tbody');
const img_album = document.querySelector('#album-cover');


let album = new Manager().parse_album('albumInformation');
//pregunto si hay una cancion en el local

//muestro los datos de la canción que vamos a modificar
const data_song = () => {
    name_album.innerText = `Nombre álbum: ${album.get_name()}`;
    release_date.innerText = `Fecha de lanzamiento: ${new Date(album.get_releaseDate()).toLocaleDateString()}`;
    img_album.src = album.get_albumCover();
    length_album.innerText = `Duración: ${album.get_lengthAlbum()}`;

    album.get_songs().forEach(element => {
        console.log(element)
        let row = tbl_songs.insertRow();
        row.insertCell().innerHTML = element.get_name();
    });

};

data_song()