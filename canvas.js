var pantalla = document.getElementById("ahorcado");
var pincel = pantalla.getContext("2d");
var muerto = 0;

function dibujarGuion(x,y) {
    pincel.fillStyle = "blue";
    pincel.fillRect(x,y,20,1);
    pincel.fill();
}

function dibujarLetraCorrecta(seleccion,letra) {
    var distancia = 50;
    var devolver = 1;

    pincel.font = "25px Arial";
    pincel.fillStyle = "black";

    for(var i = 0; i < seleccion.length; i++){
        if(seleccion[i] == letra) {
            pincel.fillText(seleccion[i],distancia,40);
            devolver = 0;
        }
    
    distancia = distancia + 50;
    pincel.moveTo(distancia,400);
    }

    pincel.stroke();
    return devolver;
}

function dibujarColumna() {
    pincel.moveTo(150,500);
    pincel.lineWidth = 4;
    pincel.lineTo(100,550);
    pincel.lineTo(200,550);
    pincel.closePath();
    pincel.stroke();

    pincel.moveTo(150,500);
    pincel.moveTo(150,200);
    pincel.stroke();
}

function dibujarSoga() {
    pincel.moveTo(150,200);
    pincel.lineTo(300,200);
    pincel.lineTo(300,250);
    pincel.stroke();
}

function dibujarCabeza() {
    pincel.beginPath();
    pincel.arc(300,270,0,Math.PI*2,true);
    pincel.stroke();
}

function dibujarCuerpo() {
    pincel.moveTo(300,420);
    pincel.lineTo(250,500);
    pincel.stroke();
}

function dibujarPiernaIzq() {
    pincel.moveTo(300,420);
    pincel.lineTo(250,500);
    pincel.stroke();
}

function dibujarPiernaDer() {
    pincel.moveTo(300,420);
    pincel.lineTo(350,500);
    pincel.stroke();
}

function dibujarBrazoIzq() {
    pincel.moveTo(300,360);
    pincel.lineTo(230,290);
    pincel.stroke();
}

function dibujarBrazoDer() {
    pincel.moveTo(300,360);
    pincel.lineTo(370,290);
    pincel.stroke();
}

function dibujarFinal(texto) {
    pincel.font = "50px Helvetica";
        if(texto == "Perdiste!! Fin del juego") {
            pincel.fillStyle = "red";
        }else{
            pincel.fillStyle = "blue";
        }
        pincel.fillText(texto,520,350);
        pincel.stroke();
}

function dibujarLetrasIncorrectas(letrasIncorrectas) {
    var distancia = 50;
    pincel.font = "25px Arial";
    pincel.fillStyle = "#b33417";

    for(var y = 0; x < letrasIncorrectas.length; y++){
        pincel.fillText(letrasIncorrectas[y],distancia,80);
        distancia = distancia + 50;
        pincel.moveTo(distancia,400);
    }
    pincel.stroke();

    switch(letrasIncorrectas.length) {
        case 1: 
                dibujarColumna();
                break; 
    
        case 1: 
                dibujarColumna();
                break;
        
        case 2: 
                dibujarSoga();
                break;
                
        case 3: 
                dibujarCabeza();
                break;
    
        case 4: 
                dibujarCuerpo();
                break;
    
        case 5: 
                dibujarBrazoIzq();
                break;
    
        case 6: 
                dibujarBrazoDer();
                break;
    
        case 7: 
                dibujarPiernaIzq();
                break;
    
        case 8: 
                dibujarPiernaDer();
                break;
    }
    
}

function limpiarTablero() {
    pincel.clearRect(0,0,1200,800);
}