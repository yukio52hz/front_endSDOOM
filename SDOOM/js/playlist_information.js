'use strict';
const manager = new Manager();
const playlist = manager.parse_playlist('playlistSongs');
console.log(playlist);
const name_playlist = document.querySelector('#name-playlist');
const tbl_playlist = document.querySelector('#songsPlaylist');

const data_playlist = () => {
    name_playlist.innerText = `Nombre de la playlist ${playlist.get_name()}`;

    playlist.get_songs().forEach(element => {
        let row = tbl_playlist.insertRow();
        row.insertCell().innerHTML = element.get_name();
    });
}

data_playlist();