//cansado de comentar :|
document.addEventListener('DOMContentLoaded', function() {
    //variables del Dom y otras valores 
    let lista = document.querySelector('main');
    let numeracion = document.getElementById('paginacion')
    let album = null;
    let LimiteCartas = 8;
    let PaginaActual = 1;
    
    //funcion para cargar los datos del JSON
    fetch('assets/data/dataAlbum.json')
        .then(response => response.json())
        .then(data => { 
            album = data.albums;
            maxAlbums = album.length;
            crearCartas();
            paginacion();
        })
        .catch(error => {
            console.error('Error al cargar el álbum:', error);
        });

    //Funcion que crea los album y lo inserta en la pagina
    function crearCartas(){
        for (let i = 0; i < maxAlbums; i++){
            let imagenAlbum = album[i].imagen;
            let tituloAlbum = album[i].titulo;
            let categoriaAlbum = album[i].categoria;
            let nuevaPlaylist = 
            `
                <div class="Playlist" data-album-index="${i}">
                    <div class="img">
                        <img src="${imagenAlbum}">
                    </div>
                    <div class="title">
                        <h2>${tituloAlbum}</h2>
                    </div>
                    <div class="categoria">
                        <p>${categoriaAlbum}</p>
                    </div>
                    <button class="play" type="submit" value="${i}"><i class="fa-solid fa-play"></i></button>
                </div>
            `;
            document.querySelector('main').insertAdjacentHTML('afterbegin', nuevaPlaylist);
        }
    }

    //Funcion que revisa cuantas se han colocado y crea unos botones de paginacion segun las cartas que haya
    function paginacion() {
        const totalPaginas = Math.ceil(maxAlbums / LimiteCartas);
        const pagContenedor = document.getElementById('paginacion');

        const atras_boton = document.createElement('button')
        atras_boton.classList.add('atras');
        atras_boton.textContent = '<';

        for(let i = 1; i <= totalPaginas; i++){
            const pagina_boton = document.createElement('button');
            pagina_boton.classList.add('PagNum');
            pagina_boton.textContent = i;
            pagContenedor.appendChild(pagina_boton);

            pagina_boton.addEventListener('click', () =>{
                PaginaActual = i;
                recargarPlaylists();
            });
        };

        const adelante_boton = document.createElement('button');
        adelante_boton.classList.add('adelante');
        adelante_boton.textContent = '>';

        atras_boton.addEventListener('click', () => {
            if (PaginaActual > 1){
                PaginaActual--;
                recargarPlaylists();
            }
        });

        adelante_boton.addEventListener('click', () =>{
            if (PaginaActual < totalPaginas){
                PaginaActual++;
                recargarPlaylists();
            }
        });

        pagContenedor.prepend(atras_boton);
        pagContenedor.appendChild(adelante_boton);
        
        recargarPlaylists();
    }

    //funcion que muestra la cantidad de cartas en cada paginacion
    function recargarPlaylists() {
        const pagInicio = (PaginaActual - 1) * LimiteCartas
        const pagFin = pagInicio + LimiteCartas;

        const playlists = document.querySelectorAll('.Playlist');
        playlists.forEach((playlist, i) => {
            playlist.style.display = (i >= pagInicio && i < pagFin) ? 'flex' : 'none';
        });

        const pagina_boton = document.querySelectorAll('.PagNum');
        pagina_boton.forEach((pagboton, i) => {
            pagboton.classList.toggle('active', i + 1 === PaginaActual);
        });
    }
});