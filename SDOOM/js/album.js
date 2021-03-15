'use strict';
class Album {
    constructor(name, release_date, album_cover) {
        this._id;
        this.name = name;
        this.release_date = release_date;
        this.album_cover = album_cover;
        this.length_album;
        this.songs_list = [];
    }
    get_id() {
        return this._id;
    }
    set_id(_id) {
        this._id = _id;
    }
    get_name() {
        return this.name;
    }
    set_name(name) {
        this.name = name;
    }
    get_releaseDate() {
        return this.release_date;
    }
    set_realeseDate(release_date) {
        this.release_date = release_date;
    }
    get_albumCover() {
        return this.album_cover;
    }
    set_albumCover(album_cover) {
        this.album_cover = album_cover;
    }
    get_lengthAlbum() {
        return this.length_album.toFixed(2).replace(/\./g, ':');
    }
    set_lengthAlbum(length_album) {
        this.length_album = length_album;
    }
    get_songs() {
        return this.songs_list;
    }
    set_songs(songs_list) {
        this.song_list = songs_list;
    }
    calculate_lengthAlbum() {
        //recorre la lista de songs
        //y los suma todos
        let suma = this.get_songs().reduce((acc, valor) => {
            return acc + valor.length_song
        }, 0);
        suma.toFixed(2).replace(/\./g, ':');
        //con dos decimales y remplazo el punto por : para que sea mas real
        this.set_lengthAlbum(suma);
    }
    add_songs(song) {
        this.songs_list.push(song);
    }
}