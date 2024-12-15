/*
    Variable que toma los datos de la pagina
    registroForm = datos del form
*/
const registroForm = document.querySelector('#signupForm');

//Evento al enviar el formulario
registroForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    const nombre = document.querySelector('#name').value;//datos del nombre
    const correo = document.querySelector('#email').value;//datos del correo
    const contraseña = document.querySelector('#password').value;//datos de la clave

    //toma los datos del localstorage y los guarda
    const usuarios = JSON.parse(localStorage.getItem('usuariosMS')) || [];

    //Verifica si los datos ya existen
    const usuarioRegistrado = usuarios.find(usuario => 
        usuario.nombre === nombre && 
        usuario.correo === correo && 
        usuario.contraseña === contraseña
    );
    
    //Si Existen No se registra
    if(usuarioRegistrado){
        return alert('El usuario ya esta registado!');
    }

    //Caso contrario con el Metodo Push Envia la peticion y guarda los datos en el 
    //LocalStorage
    //al finalizar redirige al login
    usuarios.push({nombre: nombre, correo: correo, contraseña: contraseña});
    localStorage.setItem('usuariosMS', JSON.stringify(usuarios));
    alert('Registro Exitoso!');
    window.location.href = 'login.html';
})