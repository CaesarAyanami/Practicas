/*
    Variable que toma los datos de la pagina
    Evento que aplica todo al cargar todo el htm
*/
document.addEventListener('DOMContentLoaded', function() {
    //Evento Al hacer click en un album
    document.querySelector('main').addEventListener('click', (event) => {
        const playlist = event.target.closest('.Playlist');//Toma los datos del Origen que ocasiono el evento, y el elemento mas cercano

        //Si Existe la Playlis Hacer
        if (playlist){
            //Si se toco la carta exptuando el boto Redirecciona
            if (event.target.closest('button') === null) {
                const albumIndex = playlist.getAttribute('data-album-index'); // Obtener el índice del álbum
                window.location.href = `./reproductor.html?album=${albumIndex}`; // Redirigir a la página de reproducción con el índice del álbum
            }
        }
    });
});

