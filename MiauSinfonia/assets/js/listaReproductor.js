document.addEventListener('DOMContentLoaded', function() {
    //Varibles Con Contenido del DocumentoHTML
    const audio                 = document.getElementById('musica');
    const logo_album            = document.getElementById('logoM');
    const nombre_album          = document.getElementById('nombreAlbum');
    
    const lista                 = document.getElementById('contenedor');

    const boton_play            = document.getElementById('playButton');
    const boton_prev            = document.getElementById('prevButton');
    const boton_next            = document.getElementById('nextButton');
    const boton_random          = document.getElementById('randomButton');
    const boton_bucle           = document.getElementById('bucleButton');

    const barra_progreso      = document.getElementById('progressBar');
    const tiempoTranscurrido  = document.getElementById('tiempo-transcurrido');
    const tiempoTotal         = document.getElementById('tiempo-total');
    const barra_volumen       = document.getElementById('volumeBar');
    const porcentaje_volumen  = document.getElementById('volumen-porcentaje');

    // Variables para manejar las canciones
    const parametro = new URLSearchParams(window.location.search);// toma todo el link
    let musicas = [];
    let cancionActual = 0;
    let albumActual = parametro.get('album');//toma el parametro que se mando en la url del html anterior
    let album = null;
    let maxCanciones = 0;
    let bucle = false;
    let random = false;
    
    //funcion para optener los datos del json
    fetch('assets/data/dataAlbum.json')
            .then(response => response.json())
            .then(data => { 
                album = data.albums[albumActual];

                if (!album) {
                    console.error('Álbum no encontrado. Regresando a la página anterior.');
                    window.history.back();
                    return;
                }
                cargarAlbum(albumActual);
            })
            .catch(error => {
                console.error('Error al cargar el álbum:', error);
            });

    //funcion que coloca los datos del json en el contenedor de la playlist
    function cargarAlbum(index) {
        logo_album.src = album.imagen;
        nombre_album.textContent = album.titulo;
        maxCanciones = album.canciones.length;
        crearLista();
    }

    //funcion que crea la lista de del album
    function crearLista() {
        lista.innerHTML = ''; // Limpia la lista antes de agregar nuevas canciones
        for (let i = 0; i < maxCanciones; i++) {
            let cancion = album.canciones[i];
            let url = cancion.src;
            let nameCancion = cancion.nombre;
            lista.innerHTML += `<li data-src="${url}">${nameCancion}</li>`;
        }
        musicas = Array.from(document.getElementsByTagName('li')); // Convierte NodeList a Array
        console.log(musicas);
        
        // eventos de clic a cada canción
        musicas.forEach((musica, index) => {
            musica.addEventListener('click', () => {
                cargarCancion(index);
            });
        });

        cargarCancion(0);
    }

    //Funcion que elige cancion que se toco y se reproduce y asi le coloca un efecto de hover
    function cargarCancion(index) {
        const musicaSelecionada = musicas[index]; // Obtiene la canción seleccionada
        if (musicaSelecionada) {
            const src = musicaSelecionada.getAttribute('data-src');
            audio.src = src;
            audio.load();
            audio.pause();
            reproducir();
            listaSelecionFx(index);
        }
    }

    //funcion de reproduccion y cambio de icono del boton
    function reproducir() {
        if (audio.paused) {
            audio.play();
            playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            audio.pause();
            playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    }

    //funcion que retrocede cancion
    function anteriorCancion() {
        cancionActual = (cancionActual - 1 + maxCanciones) % maxCanciones;
        cargarCancion(cancionActual);
        audio.play();
    }

    //funcion siguiente cancion
    function siguienteCancion() {
        if (random) {
            cancionActual = Math.floor(Math.random() * maxCanciones);
        } else {
            cancionActual = (cancionActual + 1) % maxCanciones;
        }
        cargarCancion(cancionActual);
        audio.play();
    }

    //funcion que da una clase para dejarle una especie de hover a la lista
    function listaSelecionFx(index) {
        musicas.forEach((musica, i) => {
            musica.classList.remove('active');
            if (i === index) {
                musica.classList.add('active');
            }
        });
    }
    //evento de cuando se acabe la cancion si es buble repetirla si no dar siguiente
    audio.addEventListener('ended', () => {
        if (bucle) {
            reproducir();
        } else {
            siguienteCancion();
        }
    });

    boton_play.addEventListener('click', reproducir);//evento play
    boton_next.addEventListener('click', siguienteCancion);//evento siguiente
    boton_prev.addEventListener('click', anteriorCancion);//evento anterior cancion
    //evento del boton rando si esta activo cambiar el stylo para que se vea activado si no dejarlo como estaba
    boton_random.addEventListener('click', () => {
        random = !random;
        if (random == true){
            boton_random.style.transform = 'scale(0.95)';
            boton_random.style.background = '#005a4b';
        } else {
            boton_random.style.transform = '';
            boton_random.style.background = '';
        }
            
    });
    //evento boton bucle si esta actibo cambiarlo stylo si no dejarlo como estaba
    boton_bucle.addEventListener('click', () => {
        bucle = !bucle;
        if (bucle == true){
            boton_bucle.style.transform = 'scale(0.95)';
            boton_bucle.style.background = '#005a4b';
        } else {
            boton_bucle.style.transform = '';
            boton_bucle.style.background = '';
        }
    });

    // Eventos que edita las letras segun el porcentae del volumen y lo muestra
    barra_volumen.addEventListener('input', () => {
        const volumen = barra_volumen.value;
        audio.volume = volumen / 100;
        porcentaje_volumen.textContent = `${volumen}%`;
    });
    //evento de subir y bajar volumen
    barra_volumen.addEventListener('input', () => {
        audio.volume = barra_volumen.value / 100;
    });

    // Actualizar la barra de progreso
    audio.addEventListener('timeupdate', () => {
        barra_progreso.value = (audio.currentTime / audio.duration) * 100;

        const tiempoActual = formatTime(audio.currentTime);
        tiempoTranscurrido.textContent = tiempoActual;
    });

    barra_progreso.addEventListener('input', () => {
        audio.currentTime = (barra_progreso.value / 100) * audio.duration;
    });
    
    audio.addEventListener('loadedmetadata', () => {
        // Establecer el tiempo total cuando los metadatos están cargados
        const duracionTotal = formatTime(audio.duration);
        tiempoTotal.textContent = duracionTotal;
    });
    
    // Función para formatear el tiempo en minutos y segundos
    function formatTime(segundos) {
        const minutos = Math.floor(segundos / 60);
        const seg = Math.floor(segundos % 60);
        return `${minutos}:${seg < 10 ? '0' : ''}${seg}`;
    }
});

