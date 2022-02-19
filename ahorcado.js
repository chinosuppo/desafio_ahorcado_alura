var listaDeSelecciones = ["URUGUAY", "ITALIA", "BRASIL", "ALEMANIA","INGLATERRA", "ARGENTINA", "FRANCIA", "ESPAÑA", "SUECIA", "CHILE", "MEXICO", "SUIZA", "EEUU", "COREA", "JAPON", "SUDAFRICA", "RUSIA", "QATAR"];
var botonInicio = document.querySelector("#iniciar-juego");
var inputSeleccion = document.querySelector("#input-nueva-seleccion");
var botonAgregarSeleccion = document.querySelector("#nueva-seleccion");
//var botonIngresarLetra = document.querySelector("#ingresar-letra");
var botonReinicio = document.querySelector("#reiniciar-juego");

var inicioDelJuego = false;
var seleccionAleatoria;
var indices = [];
var arraySeleccion;
var arrayLetraIngresante = [];
var arrayLetrasCorrectas = [];
var arrayLetrasIncorrectas = [];
let letrasUnicas = [];

function filtrarLetrasRepetidas(){
    for(var i = 0; i < seleccionAleatoria.length; i++){
        if(!letrasUnicas.includes(seleccionAleatoria[i])){
            letrasUnicas.push(seleccionAleatoria[i]);
        }
    }
}

function sortearSeleccion(){
    var numeroAleatorio = Math.floor(Math.random()*listaDeSelecciones.length);
    seleccionAleatoria = listaDeSelecciones[numeroAleatorio];
    listaDeSelecciones.splice(numeroAleatorio,1);
    return seleccionAleatoria;
}

function crearArraySeleccion(seleccion){
    separada = seleccion.split("");
    arraySeleccion = separada;
}

botonInicio.addEventListener("click", function(event){
    event.preventDefault();
    pincel.clearRect(0,0,pantalla.width,pantalla.height);
    iniciarJuego();
});

botonReinicio.addEventListener("click", function(event){
    event.preventDefault();
    pincel.clearRect(0,0,pantalla.width,pantalla.height);
    iniciarJuego();
});

botonAgregarSeleccion.addEventListener("click", function(event){
    event.preventDefault();
    listaDeSelecciones.push(inputSeleccion.value.toUpperCase());
    inputSeleccion.value = "";
    inputSeleccion.focus();
});

function dibujarGuion(){
    var inicioX = 350;
    var inicioY = 610;
    var contador = 0;
    var nLetras = seleccionAleatoria.length;
    while(contador < nLetras){
        pincel.fillStyle = "black";
        pincel.fillRect(inicioX + (40*contador), inicioY,30,4);
        contador++;
    }   
}

function iniciarJuego(){
    pincel.clearRect(0,0,pantalla.width,pantalla.height);
    pizarron();
    sortearSeleccion();
    crearArraySeleccion(seleccionAleatoria);
    dibujarGuion();
    filtrarLetrasRepetidas();
    inicioDelJuego = true;
    arrayLetraIngresante = [];
    arrayLetrasCorrectas = [];
    arrayLetrasIncorrectas = [];
}

function buscarIndices(){
    if(inicioDelJuego){
        var indiceBuscado = arraySeleccion.indexOf(arrayLetraIngresante[0]);
        while(indiceBuscado != -1){
            indices.push(indiceBuscado);
            indiceBuscado = arraySeleccion.indexOf(arrayLetraIngresante[0], indiceBuscado + 1);
        }
    }
}

function dibujarLetras(arrOrden){
    var inicioX = 358;
    var inicioY = 600;
    for(var i = 0; i < arrOrden.length; i++){
        pincel.fillStyle = "#265813";
        pincel.font = "25px Arial";
        pincel.fillText(arrayLetraIngresante[0], inicioX+(40*arrOrden[i]),inicioY);
    }
    indices = [];
}

document.addEventListener("keyup", function(event){
    arrayLetraIngresante = [];
    var letra = event.key.toUpperCase();
    var codigo = letra.charCodeAt();
    if(inicioDelJuego){
        if(codigo>64 && codigo<91){
            arrayLetraIngresante.push(letra);
            buscarIndices();
            dibujarLetras(indices);
            var comparar = arrayLetrasIncorrectas.length;
            if(arraySeleccion.includes(letra)){
                if(!arrayLetrasCorrectas.includes(letra)){
                    arrayLetrasCorrectas.push(letra);
                    dibujarLetras(letra);
                }
            }else if(!arrayLetrasIncorrectas.includes(letra)){
                arrayLetrasIncorrectas.push(letra);
            }
            if(comparar < arrayLetrasIncorrectas.length){
                dibujarLetrasIncorrectas(arrayLetrasIncorrectas);
            }
            dibujarAhorcado();
        }
        verificarGanador();
        verificarPerdedor();
    }
});

function dibujarLetrasIncorrectas(letrasIncorrectas){
    var inicioX = 400;
    var inicioY = 200;
    pincel.fillStyle = "red";
    pincel.font = "30px Verdana";
    pincel.fillText("Letras incorrectas " + letrasIncorrectas.toString(), inicioX, inicioY);
}

function verificarGanador(){
    let seleccionSinRepetirLetras = letrasUnicas.sort().toString();
    let letrasIncorrectasIngresadas = arrayLetrasCorrectas.sort().toString();
    if(seleccionSinRepetirLetras === letrasIncorrectasIngresadas){
        pincel.fillStyle = "green";
        pincel.font = "50px Arial";
        pincel.fillText("HAS GANADO!!!", 600,400);
        inicioDelJuego = false;
        botonReinicio.focus();
        letrasUnicas = [];
    }
}

function verificarPerdedor(){
    if(arrayLetrasIncorrectas.length>5){
        pincel.fillStyle = "red";
        pincel.font = "50px Helvetica";
        pincel.fillText("HAS PERDIDO!", 600,400);
        inicioDelJuego = false;
        alert("La seleccion era: " + seleccionAleatoria);
        botonReinicio.focus();
        letrasUnicas = [];
    }
}

function dibujarAhorcado(){
    let contador = arrayLetrasIncorrectas.length;
    if(contador===1){
        cabeza();
    }else if(contador===2){
        cuerpo();
    }else if(contador===3){
        brazoIzquierdo();
    }else if(contador===4){
        brazoDerecho();
    }else if(contador===5){
        piernaIzquierda();
    }else if(contador===6){
        piernaDerecha();
    }
}