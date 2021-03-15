'use strict';

let widget_cloudinary;
const uploadCloudinary = (img) => {
    widget_cloudinary = cloudinary.createUploadWidget({
        cloudName: 'yukio52hz',
        uploadPreset: 'ml_SDOOM'
    }, (err, result) => {
        if (!err && result && result.event === 'success') {
            //console.log(`Imagen subida con exito`, result.info);
            img.src = result.info.secure_url;
        }
    });
};



/*
 <!--Cloudinary-->
    <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
como subir imagenes a cloudinary script 


const btn_upload = document.querySelector('#btn-uploadImgArtist');
const profile_picture = document.querySelector('#img-artist');


let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'yukio52hz',
    uploadPreset: 'ml_SDOOM'
}, (err, result) => {
    if (!err && result && result.event === 'success') {
        //console.log(`Imagen subida con exito`, result.info);
        profile_picture.src = result.info.secure_url;
    }
});
btn_upload.addEventListener('click', () => {
    uploadCloudinary(profile_picture);
    widget_cloudinary.open();
}, false)

*/