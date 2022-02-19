var listaDeSelecciones = ["URUGUAY", "ITALIA", "BRASIL", "ALEMANIA","INGLATERRA", "ARGENTINA", "FRANCIA", "ESPAÑA", "SUECIA", "CHILE", "MEXICO", "SUIZA", "ESTADOS UNIDOS", "COREA DEL SUR", "JAPON", "SUDAFRICA", "RUSIA", "QATAR"];
var botonInicio = document.querySelector("#iniciar-juego");
var botonAgregarSeleccion = document.querySelector("#nueva-seleccion");
var botonIngresarLetra = document.querySelector("#ingresar-letra");

var letrasCorrectas = "";
var letrasIncorrectas = "";
var seleccionElegida = "";
var totalDeLetrasElegidas = "";
var sigueElJuego = true;
var inicio = false;

function elegirSeleccionAleatoria(lista) {
    seleccionAleatoria = Math.random()*lista.length;
    return lista[Math.floor(seleccionAleatoria)];
}

function guionesPorSeleccion(seleccion) {
    var x = 50;
    var y = 50;

    for(var i = 0; i < seleccion.length; i++){
        dibujarGuion(x,y);
        x = x + 50;
    }
}

function iniciar() {
    limpiarTablero();
    seleccionElegida = elegirSeleccionAleatoria(listaDeSelecciones);
    guionesPorSeleccion(seleccionElegida);
    letrasIncorrectas="";
    totalDeLetrasElegidas = "";
    muerto = 0;
    inicio = false;
    
}

botonInicio.addEventListener("click",function(event){
  event.preventDefault();
  iniciar();
  inicio = true;

});

botonAgregarSeleccion.addEventListener("click",function(event){
    event.preventDefault();
    var seleccionIngresante = document.querySelector("#input-nueva-seleccion");
    seleccionIngresante = seleccionIngresante.toUpperCase();

    if(listaDeSelecciones.includes(seleccionIngresante)) {
        alert("La seleccion ingresada por usted ya existe en el juego");
    } else {
        listaDeSelecciones.push(seleccionIngresante);
        alert("Se agrego la seleccion al juego");
    }
    document.querySelector("#input-nueva-seleccion").value = "";

});

botonIngresarLetra.addEventListener("click",function(event){
    event.preventDefault();

   if(sigueElJuego && inicio) {
       var letraIngresante = document.querySelector("#input-letra").value;
       var repeat = false;

       if(letraIngresante.length == 1) {
           letraIngresante = letraIngresante.toUpperCase();

            if(totalDeLetrasElegidas = "") {
                totalDeLetrasElegidas = totalDeLetrasElegidas + letraIngresante;
            }else{

                for(var i = 0; i < totalDeLetrasElegidas.length; i++) {
                    if(totalDeLetrasElegidas[i] == letraIngresante){
                        repeat = true;
                        alert("La letra ya esta elegida, elige otra");
                        break;
                    }
                }

                if(repeat == false) {

                    totalDeLetrasElegidas = totalDeLetrasElegidas + letraIngresante;

                }
            }
           
            if((dibujarLetraCorrecta(seleccionElegida, letraIngresante) == 1) && (repeat = false)) {
                letrasIncorrectas = letrasIncorrectas + letraIngresante;
                dibujarLetrasIncorrectas(letrasIncorrectas);
            }else {
                letrasCorrectas = letrasCorrectas + letraIngresante;
            }
            
            if(letrasCorrectas.length == seleccionElegida.length) {
                muerto = 2;
                sigueElJuego = false;
                inicio = false;
            }

            if (letrasIncorrectas.length == 8) {
                muerto = 1;
                sigueElJuego = false;
                inicio = false;
            }else {
                //alert("Solo ingresar una letra");
            }

            document.querySelector("#input-letra").value = "";
       }else {
           alert("Iniciar nuevo juego!!!");
           location.reload();
       }

       if(muerto == 1) {
           pincel.fillStyle = "red";
           pincel.fillText("USTED ES UN PERDEDOR", 450, 100);
       }else if(muerto == 2) {
           pincel.fillStyle = "green";
           pincel.fillText("USTED ES UN GANADOR", 450, 100);
       }

   }

});