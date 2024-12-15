const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--)
  {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array;
}

let paises_antes = [
"TINA",
"CUBETA",
"BONITO",
"MAJO",
"MAZO",
"CHIDO",
"VOSOTROS",
"USTEDES",
"TIO",
"SUJETO",
"CHAVAL",
"NIÑO",
"PAJILLA",
"POPOTE",
"TACO",
"GROCERIA",
"PIBE",
"INMOLAR",
"SACRIFICAR",
"BAÑADOR",
"COSTILLA",
"CHISME",
"FLIPADO",
"ALUCINADO"
];

//arreglo que guarda los paises para jugar

let paises_despues = shuffle(paises_antes)
let paises = paises_despues.slice(0, 8)


//arreglo donde se guradaran los paises desordenados
let paisesDesordenados=[];

//variable que guarda la posicion actual
let posJuegoActual = 0;

//variable que guarda la cantidad acertada
let cantidadAcertados = 0;

//funcion para desordenar los paises
function desordenarPaises(){
    for(var i=0;i<paises.length;i++){
        //convertimos el pais en un arreglo
        let pais = paises[i];
        pais = pais.split('');
    
        let paisDesordenado;
    
        //desordenamos el areglo
        paisDesordenado = pais.sort(function(){return Math.random() - 0.5});
    
        //Convertimos el arreglo a string
        paisDesordenado = paisDesordenado.toString();
        paisDesordenado = paisDesordenado.replace(/,/g,"");
    
        //Guardamos el pais en el arreglo de paises desordenads
        paisesDesordenados.push(paisDesordenado);
    }
}

function mostrarNuevoPais(){

    //controlo si terminaron las palabras
    if(posJuegoActual >= paises.length){
        mostrarPantallaFinal();
    }
    let contenedorPais = document.getElementById("pais");
    //eliminamos todo lo que tiene el div del pais
    contenedorPais.innerHTML="";

    let pais = paisesDesordenados[posJuegoActual];
    pais = pais.split('');

    x=0;
    clearInterval(idInterval);
    move();
    for(i=0;i<pais.length;i++){
        var div = document.createElement("div");
        div.className = "letra";
        div.innerHTML = pais[i];
        contenedorPais.appendChild(div);
    }

}

function mostrarPantallaFinal(){
    clearInterval(idInterval);
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("pantalla-final").style.display = "flex";
    document.getElementById("acertadas").innerHTML = cantidadAcertados;
}




//Funcion que compara el pais ingresado con el pais correcto
function comparar(){
    var paisOrdanedo = paises[posJuegoActual];
    var paisIngresado = document.getElementById("paisIngresado").value;
    paisIngresado = paisIngresado.toUpperCase();

    if(paisOrdanedo == paisIngresado){
        posJuegoActual++;
        cantidadAcertados++;
        document.getElementById("contador").innerHTML = cantidadAcertados;
        paisIngresado = document.getElementById("paisIngresado").value="";
        mostrarNuevoPais();
    }
}



let x = 0;
let idInterval;
function move() {
  if (x == 0) {
    x= 1;
    let elem = document.getElementById("myBar");
    let width = 1;
    idInterval = setInterval(frame, 120);
    function frame() {
      if (width >= 100) {
        clearInterval(idInterval);
        x = 0;
        posJuegoActual++;
        paisIngresado = document.getElementById("paisIngresado").value="";
        mostrarNuevoPais();
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

function comenzarJuego(){
    paises_despues = shuffle(paises_antes)
    paises = paises_despues.slice(0, 8)
    paisesDesordenados=[];
    posJuegoActual = 0;
    cantidadAcertados = 0;
    desordenarPaises();
    document.getElementById("pantalla-inicio").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    document.getElementById("pantalla-final").style.display = "none";
    mostrarNuevoPais();
    document.getElementById("contador").innerHTML = 0;
    document.getElementById("paisIngresado").focus();
}

