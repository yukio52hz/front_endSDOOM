'use strict';
class Song {
    constructor(name, artist_name, length_song) {
        this._id;
        this.name = name;
        this.artist_name = artist_name;
        this.length_song = length_song;
        this.album;
        this.song_cover;
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
    get_artistName() {
        return this.artist_name;
    }
    set_artistName(artist_name) {
        this.artist_name = artist_name;
    }
    get_lengthSong() {
        return this.length_song.toFixed(2).replace(/\./g, ':');
    }
    set_lengthSong(length_song) {
        this.length_song = length_song;
    }
    get_album() {
        return this.album;
    }
    set_album(album) {
        this.album = album;
    }
    get_songCover() {
        return this.song_cover;
    }
    set_songCover(song_cover) {
        this.song_cover = song_cover;
    }
}