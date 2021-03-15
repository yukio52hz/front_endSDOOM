'use strict';
const tbl_addAlbums = document.querySelector('#tbl-addAlbums tbody');
const btn_addAlbums = document.querySelector('#btn-addAlbums');

let artist = manager.parse_artist('artistAddAlbum');

//document.querySelector('#name-artist').innerText = artist.name;


const albums = async() => {
    let list = await manager.get_listAlbums();
    list.forEach(album => {
        let row = tbl_addAlbums.insertRow();

        let img = document.createElement('img');
        img.src = album.get_albumCover();
        img.style.width = '80px';
        row.insertCell().appendChild(img);

        row.insertCell().innerHTML = album.get_name();
        let cell = row.insertCell();
        let check = document.createElement('input');
        check.type = 'checkbox';
        check.value = JSON.stringify(album);
        cell.appendChild(check);

    });
};
const validate_artist = async() => {
    let list = await manager.get_listAlbums();
    let artist;
    list.forEach(album => {
        album.get_songs().forEach(songs => {
            artist = songs.get_artistName()
        })
    });
    return artist
}
const add_album = () => {
    let name = artist.get_name();
    let recorHouse = artist.get_recordHouse();
    let birth_date = new Date(artist.get_birthDate());
    let profile_picture = artist.get_profilePicture();

    let artits_addAlbums = new Artist(name, recorHouse, birth_date, profile_picture);
    artits_addAlbums.set_id(artist.get_id());
    artits_addAlbums.calculate_age();

    let slt_albums = document.querySelectorAll('input[type=checkbox]:checked');
    slt_albums.forEach(input_album => {
        //aqui covierto los albums a json por que venian en str
        let album_json = JSON.parse(input_album.value);
        //aqui creo el objeto album
        let obj_album = new Album(album_json.name, album_json.release_date, album_json.album_cover, album_json.length_album, album_json.songs_list);
        obj_album.set_id(album_json._id);
        //agrego el obj_album a la lista de albums
        artits_addAlbums.add_albums(obj_album);
    })
    manager.add_albumsArtist(artits_addAlbums)
    Swal.fire({
        icon: 'success',
        title: 'Albums agregados',
        confirmButtonColor: '#1E82D9',
        confirmButtonText: 'Aceptar'
    });

    console.log(artits_addAlbums)
}

albums();
btn_addAlbums.addEventListener('click', add_album)