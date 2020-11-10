// FORMULARIO LOGIN
const formLogin = document.getElementById('formLogin');
const inputUsuario = document.getElementById('usuario');
const inputPassword = document.getElementById('password');
const alerta = document.getElementById('alerta');


formLogin.onsubmit = function (e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usuario = inputUsuario.value;
    const password = inputPassword.value;
    const usuarioEncontrado = users.find((u)=> u.usuario === usuario && u.password === password);


    if (usuarioEncontrado) {
        alert('Logueo Exitoso');
        window.location.href = './index.html'
    }else{
        alerta.classList.remove('d-none');
    }
}

//FORMULARIO CREATE ACCOUNT 
const formCreateAccount = document.getElementById('formCreateAccount');
const userCreateAccountInput = document.getElementById('userCreateAccount');
const passwordCreateAccountInput = document.getElementById('passwordCreateAccount');

formCreateAccount.onsubmit = (e) =>{
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usuario = userCreateAccountInput.value;
    const password = passwordCreateAccountInput.value;

    users.push({
        usuario,
        password,
    })

    localStorage.setItem('users', JSON.stringify(users));
    formCreateAccount.reset();
    $('#modalCreateAccount').modal('hide');
}