/*
    Variable que toma los datos de la pagina
    registroForm = datos del form
*/
const iniciarForm = document.querySelector('#loginForm');

//Evento al enviar el formulario
iniciarForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    const nombre = document.querySelector('#user').value;//datos del nombre
    const contraseña = document.querySelector('#password').value;//datos de la contraseña

     //toma los datos del localstorage y los guarda
    const usuarios = JSON.parse(localStorage.getItem('usuariosMS')) || [];

    //Verifica si los datos ya existen
    const validarUsuario = usuarios.find(usuario => usuario.nombre === nombre && usuario.contraseña === contraseña);
    
    //Si no encuentra resultado, entonces retorna
    if(!validarUsuario){
        return alert('Usuario o contraseña incorrectos!');
    }

    //Si encuentra resultado Crea un item de Seccion Activa y retorna al index
    alert(`Bienvenido ${validarUsuario.nombre}`);

    localStorage.setItem('login_success', JSON.stringify(validarUsuario));
    window.location.href = 'index.html';
})