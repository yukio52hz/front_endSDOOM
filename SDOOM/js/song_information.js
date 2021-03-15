'use strict';

const name_song = document.querySelector('#name-song');
const name_artist = document.querySelector('#name-artist');
const name_album = document.querySelector('#name-album');
const length_timeSong = document.querySelector('#length-time');
const img_song = document.querySelector('#song-cover');

const manager = new Manager();
const song = manager.parse_song('songInformation');


//muestro los datos de la canción que vamos a modificar
const data_song = () => {
    name_song.innerText = `Nombre de la canción: ${song.get_name()}`;
    name_artist.innerText = `Artista: ${song.get_artistName().get_name()}`;
    if (song.song_cover) {
        img_song.src = song.get_songCover();
    } else {
        img_song.src = '../img/sin album.jpg';
    }
    if (song.album) {
        name_album.innerText = `Álbum: ${song.get_album().get_name()}`;
    } else {
        name_album.innerText = 'Sin álbum definido'
    }
    length_timeSong.innerText = `Duración: ${song.get_lengthSong()}`;
};

data_song()