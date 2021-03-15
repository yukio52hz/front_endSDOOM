'use strict';
const container_song = document.querySelector('.container-cards');
const manager = new Manager();
const show_songs = async() => {
    let list = await manager.get_listSongs();
    list.forEach(obj => {

        let card = document.createElement('div');
        card.classList.add('card');
        let container_img = document.createElement('div');
        container_img.classList.add('card-img');
        let img = document.createElement('img');

        if (obj.album) { //si no tiene album no obtiene la imagen
            img.src = obj.get_songCover();
        } else {
            img.src = '../img/sin album.jpg';
        }

        let card_body = document.createElement('div');
        card_body.classList.add('card-body');


        let song_data = document.createElement('p');
        song_data.innerText = `${obj.get_artistName().get_name()}: ${obj.get_name()}`;
        song_data.classList.add('link-card');

        container_img.appendChild(img);

        card_body.appendChild(song_data);
        card.appendChild(container_img);
        card.appendChild(card_body);

        song_data.addEventListener('click', () => {
            console.log(obj)
            localStorage.setItem('songInformation', JSON.stringify(obj));
            window.location.href = `song-information.html?name=${obj.get_name()}`
        })
        container_song.appendChild(card);

    });
};

show_songs()