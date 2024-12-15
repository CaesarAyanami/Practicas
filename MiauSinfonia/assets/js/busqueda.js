document.addEventListener('DOMContentLoaded', function() {
    const busqueda = document.getElementById('BuscarButton');//Boton Vuscar
    busqueda.addEventListener('click', buscaPlaylist);//Evento al presionar boton buscar
    
    
    //funcion que toma los valores de los texto y lo convierte en minuscula
    //para luego iterar con un forEach u compararlos si ay parecido se cambia el estylo de los que no para que desaparescan
    //de la busqueda post data ya ay cansancio de comentar
    function buscaPlaylist(){
        const query = document.getElementById('buscar').value.toLowerCase();
        const playlists = document.querySelectorAll('main div.Playlist');
        

        playlists.forEach(playlist => {
            const tituloElemento = playlist.querySelector('h2');
            const categoriaElemento = playlist.querySelector('p');

            if (tituloElemento && categoriaElemento) {
                const titulo = tituloElemento.textContent.toLowerCase();
                const categoria = categoriaElemento.textContent.toLowerCase();

                if (titulo.includes(query) || categoria.includes(query)) {
                    playlist.style.display = '';
                } else {
                    playlist.style.display = 'none';
                }
            } else {
                console.error('Elementos no encontrados en la playlist:', playlist);
            }
        });
    }
});
