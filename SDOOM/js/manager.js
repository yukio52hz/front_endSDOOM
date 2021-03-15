'use strict';
class Manager {
    constructor() {

    }
    seeAnd_notSee(input, cont) {
        let span_container = cont;
        let i = document.createElement('i');
        i.classList.add('fas', 'fa-eye-slash');
        i.style.cursor = 'pointer';
        span_container.appendChild(i);
        i.addEventListener('click', () => {
            if (input.type == 'password') {
                input.type = 'text';
                i.classList.remove('fas', 'fa-eye-slash');
                i.classList.add('fas', 'fa-eye');
                span_container.appendChild(i);
            } else {
                input.type = 'password';
                i.classList.remove('fas', 'fa-eye');
                i.classList.add('fas', 'fa-eye-slash');
                span_container.appendChild(i);
            }
        })
    }
    parse_user(keylocal) {
        let obj_user;
        if (sessionStorage.getItem(keylocal)) {
            let obj_userJson = JSON.parse(sessionStorage.getItem(keylocal));

            obj_user = new User(obj_userJson.type, obj_userJson.name, obj_userJson.nickname, new Date(obj_userJson.birth_date), obj_userJson.gender, obj_userJson.email, obj_userJson.password, obj_userJson.password_confirmation, obj_userJson.profile_picture, obj_userJson.playlists);
            obj_user.set_id(obj_userJson._id);
            obj_user.set_profilePicture(obj_userJson.profile_picture);

            console.log(obj_user)
        }
        return obj_user;
    }
    parse_artist(keylocal) {
        let obj_artist;
        if (localStorage.getItem(keylocal)) {
            let obj_artistJson = JSON.parse(localStorage.getItem(keylocal));

            obj_artist = new Artist(obj_artistJson.name, obj_artistJson.record_house, new Date(obj_artistJson.birth_date), obj_artistJson.profile_picture, obj_artistJson.age, obj_artistJson.albums);
            obj_artist.set_id(obj_artistJson._id)
            obj_artist.calculate_age();

            obj_artistJson.albums.forEach(albums => {
                let obj_album = new Album(albums.name, albums.release_date, albums.album_cover, albums.length_album, albums.songs_list);
                obj_album.set_id(albums._id);

                obj_artist.add_albums(obj_album);
            });
        }
        return obj_artist;
    }
    parse_song(keylocal) {
        let obj_song;
        if (localStorage.getItem(keylocal)) {
            let obj_songJson = JSON.parse(localStorage.getItem(keylocal));
            obj_song = new Song(obj_songJson.name, obj_songJson.artist_name, obj_songJson.length_song, obj_songJson.album, obj_songJson.song_cover);
            obj_song.set_id(obj_songJson._id)

            let artist = new Artist(obj_songJson.artist_name.name, obj_songJson.artist_name.record_house, new Date(obj_songJson.artist_name.birth_date), obj_songJson.artist_name.profile_picture, obj_songJson.artist_name.age, obj_songJson.artist_name.albums)
            artist.set_id(obj_songJson.artist_name._id)
            artist.calculate_age();
            //le pongo a la cancion el artista
            obj_song.set_artistName(artist)

            if (obj_songJson.album) {
                let album = new Album(obj_songJson.album.name, obj_songJson.album.release_date, obj_songJson.album.album_cover, obj_songJson.album.length_album, obj_songJson.album.songs_list)
                album.set_id(obj_songJson.album._id);

                obj_song.set_album(album);
                obj_song.set_songCover(obj_songJson.album.album_cover);
            }
        }
        return obj_song;
    }
    parse_album(keylocal) {
        let obj_album;
        if (localStorage.getItem(keylocal)) {
            let obj_albumtJson = JSON.parse(localStorage.getItem(keylocal));
            obj_album = new Album(obj_albumtJson.name, obj_albumtJson.release_date, obj_albumtJson.album_cover, obj_albumtJson.length_album, obj_albumtJson.songs_list);
            obj_album.set_id(obj_albumtJson._id);

            obj_albumtJson.songs_list.forEach(song => {
                let obj_song = new Song(song.name, song.artist_name, song.length_song, song.album)
                obj_song.set_id(song._id);
                obj_song.set_songCover(song.song_cover);
                //aqui cada cancion se le agrega al album
                obj_album.add_songs(obj_song)
            });
            obj_album.calculate_lengthAlbum()
        }
        return obj_album;
    }
    parse_playlist(keylocal) {
        let obj_playlist;
        if (localStorage.getItem(keylocal)) {
            let obj_playlistJson = JSON.parse(localStorage.getItem(keylocal));
            obj_playlist = new Playlist(obj_playlistJson.name);
            obj_playlist.set_id(obj_playlistJson._id);
            obj_playlist.set_owner(obj_playlistJson._id);
            obj_playlistJson.songs.forEach(song => {
                let obj_song = new Song(song.name, song.artist_name, song.length_song, song.album, song.song_cover);
                obj_song.set_id(song._id);

                obj_playlist.add_songs(obj_song);
            })

        }
        return obj_playlist;
    }
    async get_listUsers() {
        let list = await get_data('list-users');

        let list_users = list.map((user) => {
            let obj_user = new User(user.type, user.name, user.birth_date, user.gender, user.email, user.password, user.password_confirmation, user.profile_picture);

            return obj_user;
        })
        return list_users;
    }

    async get_listArtists() {
        let list = await get_data('list-artists');
        let list_artists = list.map(obj => {
            let obj_artist = new Artist(obj.name, obj.record_house, new Date(obj.birth_date), obj.profile_picture, obj.age, obj.albums);
            obj_artist.set_id(obj._id)
            obj_artist.calculate_age();

            //albums
            obj.albums.forEach(album => {
                let obj_album = new Album(album.name, album.release_date, album.album_cover, album.length_album, album.songs_list);
                obj_album.set_id(album._id);
                obj_artist.add_albums(obj_album);


            })
            return obj_artist
        });
        return list_artists;
    }
    async get_listSongs() {
        let list = await get_data('list-songs');
        //el objeto es el tipo de dato que yo hice 
        //los datos que trae la cancion los covierto en objeto
        //los datos del artista le hago lo mismo y igual a album
        let list_songs = list.map(obj => {
            let obj_song = new Song(obj.name, obj.artist_name, obj.length_song, obj.album, obj.song_cover);
            obj_song.set_id(obj._id)
                //el artista
            let artist = new Artist(obj.artist_name.name, obj.artist_name.record_house, new Date(obj.artist_name.birth_date), obj.artist_name.profile_picture, obj.artist_name.age, obj.artist_name.albums)
            artist.set_id(obj.artist_name._id)
            artist.calculate_age();
            //le pongo a la cancion el artista
            obj_song.set_artistName(artist)
                //el album
            if (obj.album) {
                let album = new Album(obj.album.name, obj.album.release_date, obj.album.album_cover, obj.album.length_album, obj.album.songs_list)
                album.set_id(obj.album._id);

                obj_song.set_album(album);
                obj_song.set_songCover(obj.album.album_cover);
            }

            return obj_song
        })
        return list_songs;
    }
    async get_listAlbums() {
        let list = await get_data('list-albums');
        let list_albums = list.map(obj => {
            let obj_album = new Album(obj.name, obj.release_date, obj.album_cover, obj.length_album, obj.songs_list);
            obj_album.set_id(obj._id);

            //para agregar las canciones tengo que recorrer la lista de canciones y
            // antes que eso las convierto en su clase

            obj.songs_list.forEach(song => {
                let obj_song = new Song(song.name, song.artist_name, song.length_song, song.album)
                obj_song.set_id(song._id);
                obj_song.set_songCover(song.song_cover);
                //aqui cada cancion se le agrega al album
                obj_album.add_songs(obj_song)
            });

            obj_album.calculate_lengthAlbum()

            return obj_album;
        })

        return list_albums;
    }
    async get_listPlaylist() {
        let list = await get_data('list-playlists');
        let list_playlist = list.map(obj => {
            let obj_playlist = new Playlist(obj.name);
            obj_playlist.set_id(obj._id);
            obj_playlist.set_owner(obj.owner);
            obj.songs.forEach(song => {
                let obj_song = new Song(song.name, song.artist_name, song.length_song, song.album, song.song_cover);
                obj_song.set_id(song._id);
                obj_playlist.add_songs(obj_song);
            })
            return obj_playlist;
        })
        return list_playlist;
    }
    user_register(obj) {
        send_data('register-user', obj);
    }
    artist_register(obj) {
        send_data('register-artist', obj);
    }
    song_register(obj) {
        send_data('register-song', obj);
    }
    album_register(obj) {
        send_data('register-album', obj);
    }
    playlist_register(obj) {
        send_data('register-playlist', obj)
    }
    modify_song(obj) {
        modify_data('modify-song', obj);
    }
    add_albumsArtist(obj) {
        modify_data('add-albumsArtist', obj);
    }
    modify_artist(obj) {
        modify_data('modify-artist', obj);
    }
    modify_album(obj) {
        modify_data('modify-album', obj);
    }
    add_pictureUser(obj) {
        modify_data('add-picUser', obj);
    }
    add_songsPlaylist(obj) {
        modify_data('add-songsPLaylist', obj);
    }
    async log_in(email, password) {
        validate_credentials(email, password)
    }
};