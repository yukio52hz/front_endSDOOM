'use strict';
const container_artist = document.querySelector('.container-cards');
const manager = new Manager();
const show_artist = async() => {
    let list = await manager.get_listArtists();
    list.forEach(obj => {
        let card = document.createElement('div');
        card.classList.add('card-artist');
        let container_img = document.createElement('div');
        container_img.classList.add('card-img');
        let img = document.createElement('img');
        img.classList.add('img-artist');
        img.src = obj.get_profilePicture();
        let card_body = document.createElement('div');
        card_body.classList.add('card-body');
        let p_name = document.createElement('p');
        p_name.innerText = obj.get_name();

        container_img.appendChild(img);
        card_body.appendChild(p_name);
        card.appendChild(container_img);
        card.appendChild(card_body);
        card.style.cursor = 'pointer';

        card.addEventListener('click', () => {
            console.log(obj)
            localStorage.setItem('artistSelected', JSON.stringify(obj));
            window.location.href = `artist-information.html?name=${obj.get_name()}`
        })
        console.log(obj)

        container_artist.appendChild(card);

    });
};
show_artist()