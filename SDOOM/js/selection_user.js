'use strict';
const btn_free = document.querySelector('#btn-free');
const btn_premiun = document.querySelector('#btn-premium');

btn_free.addEventListener('click', () => {
    let type = 'Normal'
    window.location.href = `sing_in.html?type=${type}`;
})
btn_premiun.addEventListener('click', () => {
    let type = 'Premium'
    window.location.href = `sing_in.html?type=${type}`;
})