'use strict';
const playlist = manager.parse_playlist('playlistAddsong');
const btn_addSongs = document.querySelector('#addSongPlaylists');
const songsTochoose = async() => {
    let list = await manager.get_listSongs()
    list.forEach(song => {

        let row = tbl_songsToChoose.insertRow();
        row.insertCell().innerHTML = song.get_name();
        row.insertCell().innerHTML = song.get_artistName().get_name();
        let cell = row.insertCell();

        let check = document.createElement('input');
        check.type = 'checkbox';
        check.value = JSON.stringify(song);

        cell.appendChild(check);
    })
};

const add_songsPlaylist = () => {
    let name = playlist.get_name();
    let playlistaddSongs = new Playlist(name);
    playlistaddSongs.set_id(playlist.get_id());
    playlistaddSongs.set_owner(playlist.get_owner());

    let slt_songs = document.querySelectorAll('input[type=checkbox]:checked');

    slt_songs.forEach(input_song => {
        //aqui covierto los albums a json por que venian en str
        let song_json = JSON.parse(input_song.value);
        //aqui creo el objeto song
        let obj_song = new Song(song_json.name, song_json.artist_name, song_json.length_song, song_json.album, song_json.song_cover);
        obj_song.set_id(song_json._id);
        //agrego el obj_album a la lista de albums
        playlistaddSongs.add_songs(obj_song);
    });
    manager.add_songsPlaylist(playlistaddSongs);
    Swal.fire({
        icon: 'success',
        title: 'Canciones agregas',
        confirmButtonColor: '#1E82D9',
        confirmButtonText: 'Aceptar'
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location.reload()
        }
    })
    console.log(playlistaddSongs);
}


songsTochoose();
btn_addSongs.addEventListener('click', add_songsPlaylist)