'use strict';

const container_album = document.querySelector('.container-cards');
const manager = new Manager();

const show_albums = async() => {
    let list = await manager.get_listAlbums();
    list.forEach(obj => {

        let card = document.createElement('div');
        card.classList.add('card');
        let container_img = document.createElement('div');
        container_img.classList.add('card-img');
        let img = document.createElement('img');
        img.src = obj.get_albumCover();


        let card_body = document.createElement('div');
        card_body.classList.add('card-body');

        let name_album = document.createElement('p');
        name_album.innerText = `Álbum: ${obj.get_name()}`;
        name_album.classList.add('link-card');

        let house_record = document.createElement('p');



        container_img.appendChild(img);

        card_body.appendChild(name_album);

        card.appendChild(container_img);
        card.appendChild(card_body);





        name_album.addEventListener('click', () => {
            console.log(obj)
            localStorage.setItem('albumInformation', JSON.stringify(obj));
            window.location.href = `album-information.html?name=${obj.get_name()}`
        })

        /* i_modify.addEventListener('click', () => {
            console.log(obj)
            localStorage.setItem('songModify', JSON.stringify(obj));
            window.location.href = `modify_song.html?id=${obj.get_id()}`;
        })
*/

        container_album.appendChild(card);

    });
};

show_albums()