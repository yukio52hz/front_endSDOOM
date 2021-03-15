'use strict';

const manager = new Manager();
const artist = manager.parse_artist('artistSelected');

console.log(artist.get_name())

document.querySelector('#picture-artist').src = artist.get_profilePicture();
document.querySelector('#artist-name').innerText = `Nombre del artista: ${artist.get_name()}`;
document.querySelector('#artist-age').innerText = `Edad ${artist.get_age()}`;
document.querySelector('#artist-recordHouse').innerText = `Sello discografico ${artist.get_recordHouse()}`;

const table = document.querySelector('#albums-artist tbody');

const show_albums = async() => {
    let list = await manager.get_listAlbums();
    list.forEach(album => {
        let row = table.insertRow();


        let img = document.createElement('img');
        img.src = album.get_albumCover();
        img.style.width = '80px';
        row.insertCell().appendChild(img);

        row.insertCell().innerHTML = album.get_name();
        //  row.insertCell().innerText = album.get_releaseDate();



        //console.log(album.get_name(), album.calculate_lengthAlbum())
    });
};
show_albums()