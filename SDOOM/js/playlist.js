'use strict';
class Playlist {
    constructor(name) {
        this._id;
        this.name = name;
        this.owner;
        this.songs = [];
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
    get_owner() {
        return this.owner;
    }
    set_owner(owner) {
        this.owner = owner;
    }
    get_songs() {
        return this.songs;
    }
    set_songs(songs) {
        this.songs = songs;
    }
    add_songs(song) {
        this.songs.push(song);
    }
}