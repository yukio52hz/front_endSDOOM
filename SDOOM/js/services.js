'use strict';
//const server = 'http://localhost:3000/api/';
const server = 'https://sound-doom.herokuapp.com/api/'

//+++++++registrar
const send_data = async(endpoint, obj) => {
    await axios({
        method: 'post',
        url: `${server}${endpoint}`,
        responseType: 'json',
        data: {
            'object': JSON.stringify(obj)
        }
    }).then((response) => {
        console.log(response.data.err);
        console.log(response.data.msj);
    }).catch((err) => {
        Swal.fire({
            'icon': 'error',
            'text': `No sé pudo registrar , ocurrió el siguiente error: ${err}`
        });
    });;
};
//+++++++listar
const get_data = async(endpoint) => {
    let list = [];
    await axios({ //con el await  hacemos que espere que se procese la informacion
        method: 'get',
        url: `${server}${endpoint}`,
        responseType: 'json',
    }).then((res) => {
        list = res.data.list //el data si son los datos xd
        console.log(res.data.msj);
    }).catch((err) => {
        console.log(`No sé pudo establecer la comunicación con el servidor, 
        ocurrio el siguiente error: ${err}`)
    })
    return list;
};
//+++++++modificar
const modify_data = async(endpoint, obj) => {
    await axios({
            method: 'put',
            url: `${server}${endpoint}`,
            responseType: 'json',
            data: {
                'object': JSON.stringify(obj)
            }
        })
        .then((response) => {
            console.log(response.data.msj);
        })
        .catch((err) => {
            console.log(err)
        });
};
//++++++inicio de sesion

const validate_credentials = async(email, password) => {
    await axios({
            method: 'post',
            url: `${server}log-in`,
            responseType: 'json',
            data: {
                email: email,
                password: password
            }
        })
        .then((res) => {
            if (res.data.login == true) {
                let user = {
                    _id: res.data._id,
                    type: res.data.type,
                    name: res.data.name,
                    nickname: res.data.nickname,
                    birth_date: res.data.birth_date,
                    gender: res.data.gender,
                    email: res.data.email,
                    profile_picture: res.data.profile_picture,
                };
                sessionStorage.setItem('logged_user', JSON.stringify(user));
                window.location.href = 'views/SDOOM.html';
                /* Swal.fire({
                     'icon': 'success',
                     'title': 'Bienvenido',
                     'text': 'Ha iniciado sesión correctamente'
                 }).then(() => {
                     let user = {
                         _id: res.data._id,
                         type: res.data.type,
                         name: res.data.name,
                         birth_date: res.data.birth_date,
                         gender: res.data.gender,
                         email: res.data.email,
                        
                     };
                     sessionStorage.setItem('logged_user', JSON.stringify(user));
                     window.location.href = 'views/SDOOM.html';
                 });*/
            } else {
                Swal.fire({
                    'icon': 'error',
                    'title': 'No ha podido iniciar sesión',
                    'text': res.data.msj
                })
            }
        })
        .catch((err) => {

            console.log(err)
        });
};