/*
    Variable que toma los datos de la pagina
    Evento que aplica todo al cargar todo el htm
*/
document.addEventListener('DOMContentLoaded', function() {
    //Varibles Con Contenido del DocumentoHTML
    const audio = document.getElementById('musica');//Etiqueta Audio
    const barra_progreso = document.getElementById('progressBar');//Input Slider Barra de Progreso
    const tiempoTranscurrido = document.getElementById('tiempo-transcurrido');// Span de Footer Time
    const tiempoTotal = document.getElementById('tiempo-total');//Span de Footer Final Time
    const barra_volumen = document.getElementById('volumeBar');//Input Slider Volumen
    const porcentaje_volumen = document.getElementById('volumen-porcentaje');//Span de Footer Volumen
    const boton_play = document.getElementById('playButton');//Boton De Play
    const boton_prev = document.getElementById('prevButton');//Boton de Prev
    const boton_next  = document.getElementById('nextButton');//Boton de Next
    const nombre_musica = document.getElementById('nombreCancion');//H2 donde va el nombre de la cancion
    const nombre_album = document.getElementById('categoria');//P donde va la categoria
    const logo_album = document.getElementById('logoM');//Img imagen de la cancion

    // Variables para manejar las canciones
    let cancionActual = 0;
    let albumActual = 0;
    let album = 0;
    let maxCanciones = 0;

    //Evento CargaAlbum al HacerClick en el Boton de la PlayList
    document.querySelector('main').addEventListener('click', (event) => {
        const boton = event.target.closest('.play');
        if (boton) {
            cargarAlbum(boton);
        }
    });

    // Funciónes para cargar las Canciones de un ALbum del JSON
    function cargarAlbum(boton) {
        albumActual = boton.value;

        fetch('assets/data/dataAlbum.json')
            .then(response => response.json())
            .then(data => { 
                album = data.albums[albumActual];
                //console.log(album)
                cargarCancion(0);
            })
            .catch(error => {
                console.error('Error al cargar el álbum:', error);
            });
    }

    // Función para Reproducir/Pausar la canción
    function reproducir() {
        if (audio.paused) {
            audio.play();
            playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            audio.pause();
            playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    }
    //Función para cargar una canción
    function cargarCancion(index) {
        const canciones = album.canciones[index];
        audio.src = canciones.src;
        logo_album.src = album.imagen;
        nombre_musica.textContent = canciones.nombre;
        nombre_album.textContent = album.titulo;
        maxCanciones = album.canciones.length;
        reproducir();
    }
    //Funciones para navegar entre canciones
    function anteriorCancion() {
        cancionActual = (cancionActual - 1 + maxCanciones) % maxCanciones;
        cargarCancion(cancionActual);
        audio.play();
    }
    function siguienteCancion() {
        cancionActual = (cancionActual + 1) % maxCanciones;
        cargarCancion(cancionActual);
        audio.play();
    }

    //Llamada de Funciones 
    boton_play.addEventListener('click', reproducir);
    boton_prev.addEventListener('click', anteriorCancion);
    boton_next.addEventListener('click', siguienteCancion);
    musica.addEventListener('ended', siguienteCancion);

    // Eventos para la barra de volumen
    barra_volumen.addEventListener('input', () => {
        const volumen = barra_volumen.value;
        musica.volume = volumen / 100;
        porcentaje_volumen.textContent = `${volumen}%`;
    });
    barra_volumen.addEventListener('input', () => {
        musica.volume = barra_volumen.value / 100;
    });

    // Evento de Actualizar la barra de progreso
    musica.addEventListener('timeupdate', () => {
        barra_progreso.value = (musica.currentTime / musica.duration) * 100;

        const tiempoActual = formatTime(musica.currentTime);
        tiempoTranscurrido.textContent = tiempoActual;
    });

    //Evento de Volumen al Usar el input del Slider
    barra_progreso.addEventListener('input', () => {
        musica.currentTime = (barra_progreso.value / 100) * musica.duration;
    });
    
    musica.addEventListener('loadedmetadata', () => {
        // Establecer el tiempo total cuando los metadatos están cargados
        const duracionTotal = formatTime(musica.duration);
        tiempoTotal.textContent = duracionTotal;
    });
    
    // Función para formatear el tiempo en minutos y segundos
    function formatTime(segundos) {
        const minutos = Math.floor(segundos / 60);
        const seg = Math.floor(segundos % 60);
        return `${minutos}:${seg < 10 ? '0' : ''}${seg}`; // Añadir un cero delante de los segundos si es menor de 10
    }







});

