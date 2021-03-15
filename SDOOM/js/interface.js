'use strict';
const manager = new Manager();
//nombre del usuario 
const name_user = document.querySelector('#name-user');
//salidas de los datos de la plataforma
const output_lengthArtists = document.querySelector('#length-artists');
const output_lengthAlbums = document.querySelector('#length-albums');
const output_lengthSongs = document.querySelector('#length-songs');
//pic de usuario que se ve en la interface
const pic_user = document.querySelector('#pick-userInterface');
//menu del costado que muestra la informacion del usuario y para salir
const menu_user = document.querySelector('#menu-user');
//opcion de salir
const sing_off = document.querySelector('#sing-off');
//el usuario cuando accede a la plataforma

const user_logged = manager.parse_user('logged_user');
//si no hay nada el el session storage no muestro nada
if (sessionStorage.getItem('logged_user') == null) {
    document.querySelector('.contents-admin').style.display = 'none';
    document.querySelector('.contents-user').style.display = 'none';
}
//si hay
//Muestro el nombre del usuario logged
//dependiendo de lo que es muesta sus cosas
name_user.innerText = user_logged.get_nickName();
if (user_logged.get_type() == "Premium" || user_logged.get_type() == 'Normal') {
    document.querySelector('.contents-admin').style.display = 'none';
    document.querySelector('.contents-user').style.display = 'block';

} else {
    document.querySelector('.contents-user').style.display = 'none';
    document.querySelector('.contents-admin').style.display = 'block';
};
//se muestra la foto del usuario
if (user_logged.get_profilePicture()) {
    pic_user.src = user_logged.get_profilePicture();
} else {
    pic_user.style.display = 'none'
}
//el menu de usuario lo hago no visible
//si le dan click dependiendo lo que tenga por toggle se le agrega o quita
menu_user.classList.add('display-none');
name_user.addEventListener('click', () => {
    menu_user.classList.toggle('display-none');

});
//++++//
sing_off.addEventListener('click', () => {
    sessionStorage.clear('logged_user');
    window.location.href = '../index.html';
})



const widget_lengthSongs = async() => {
    let list_artist = await manager.get_listArtists();
    output_lengthArtists.innerText = list_artist.length;
    let list_albums = await manager.get_listAlbums();
    output_lengthAlbums.innerText = list_albums.length;
    let list_songs = await manager.get_listSongs()
    output_lengthSongs.innerText = list_songs.length;

}
widget_lengthSongs()