//Evento que carge la Funcion, Despues de aver cargado todo el Contenido del Dom
document.addEventListener('DOMContentLoaded', function() {
    const seccionActiva = JSON.parse(localStorage.getItem('login_success')) || false;//Verifica si la Seccion Esta activa
    const nombre = document.getElementById('userName');//Datos de nombre
    const suiche = document.querySelector('.login');//Div Login
    const suiche2= document.querySelector('.logout');//Div Logout
    const salir = document.querySelector('.SalirSeccion');//Boton de Salir
    
    //Si la Seccion Esta Activa 
    //Cambia el display de Login a None, Para que no se vea
    //Y activa el de Logout
    //Ademas le coloca el nombre de usuario en el logout 
    //Sino Devuelve el Display de Login y Logout lo cambia a none
    if(seccionActiva){
        suiche.style.display = 'none';//Propiedad Css
        suiche2.style.display = 'flex';//Propiedad Css
        nombre.textContent = seccionActiva.nombre;//Cambio de Contenido

        //Evento De boton de Salir
        //Cierra seccion, y redirecciona al login
        salir.addEventListener('click', ()=>{
            alert('Hasta pronto!');
            localStorage.removeItem('login_success');
            window.location.href = 'login.html';
        });
    } else {
        suiche.style.display = 'flex';
        suiche2.style.display = 'none';
    } 
});
