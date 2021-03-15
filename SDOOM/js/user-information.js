'use strict';
const manager = new Manager();
const user_logged = manager.parse_user('logged_user');
console.log(user_logged);
const icon_uploadPic = document.querySelector('#icon-uploadPic');
icon_uploadPic.style.cursor = 'pointer';
const user_pic = document.querySelector('#user-picture')

const name_user = document.querySelector('#name-user');
const email_user = document.querySelector('#email-user');
const type_user = document.querySelector('#type-user')

const btn_change = document.querySelector('#btn-changePic');
btn_change.style.display = 'none';
icon_uploadPic.addEventListener('click', () => {
    uploadCloudinary(user_pic);
    widget_cloudinary.open();
    btn_change.style.display = 'block'
}, false);

const data_user = () => {
    name_user.value = user_logged.get_name();
    email_user.value = user_logged.get_email();
    type_user.value = user_logged.get_type();
    user_pic.src = user_logged.get_profilePicture();
}
btn_change.addEventListener('click', () => {
    user_logged.set_profilePicture(user_pic.src);
    console.log('foto', user_logged);
    manager.add_pictureUser(user_logged);
    sessionStorage.clear('logged_user');
    //aqui hago un chanchuyo con sessionStorage
    sessionStorage.setItem('logged_user', JSON.stringify(user_logged));
    //window.location.reload()
})
data_user();