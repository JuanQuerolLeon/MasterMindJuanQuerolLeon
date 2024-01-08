// se crea dos arrays uno con los getElementByClassName de las casillas y otro de las correcciones
var casillas = [
    document.getElementsByClassName("casilla1"),
    document.getElementsByClassName("casilla2"),
    document.getElementsByClassName("casilla3"),
    document.getElementsByClassName("casilla4"),
    document.getElementsByClassName("casilla5"),
    document.getElementsByClassName("casilla6")
];
var casR = document.getElementsByClassName("casillaR");
var correcciones = [
    document.getElementsByClassName("corre1"),
    document.getElementsByClassName("corre2"),
    document.getElementsByClassName("corre3"),
    document.getElementsByClassName("corre4"),
    document.getElementsByClassName("corre5"),
    document.getElementsByClassName("corre6")
];
var linea = document.getElementsByClassName("linea");

let mapaRepe = new Map();
let s;
let m;
let turno = 0;
let contadorFinal = 0;
let arraySolucion = new Array(4);
let arrayUsuario = [0, 0, 0, 0];
let contRepeF = new Map();
let colores = new Map();

//meto los colore en un mapa para que asi se guie el programa con numeros enteros
let setSolucion = new Set();
colores.set(1, 'rgb(196, 196, 31)');
colores.set(2, 'rgb(177, 3, 3)');
colores.set(3, 'rgb(219, 219, 219)');
colores.set(4, 'rgb(219, 0, 219)');
colores.set(5, 'rgb(25, 0, 247)');
colores.set(6, 'rgb(34, 114, 36)');
colores.set(7, 'rgb(1, 249, 237)');
colores.set(0, 'rgb(128, 128, 128)');
let botonPlay = document.querySelector('#play');
let miTo, id;  
let jugadas = 0;
let ganadas = 0;
init();

function init() {
    m = 1;
    s = 0;
    document.getElementById("cronometro").innerHTML = "01:00";
    //saca la partidas jugadas y ganadas de localhost
    jugadas = parseInt(localStorage.getItem("jugadas")) || 0;
    ganadas = parseInt(localStorage.getItem("ganadas")) || 0;
    localStorage.removeItem("jugadas");
    localStorage.removeItem("ganadas");

    document.getElementById("pJugadas").innerHTML = `Partidas Jugadas: ${jugadas}`;
    document.getElementById("pGanadas").innerHTML = `Partidas Ganadas: ${ganadas}`;

    //boton de empezar que tambien es el boton de siguiente ronda
    botonPlay.addEventListener('click', () => {
    
    clearTimeout(miTo);
    clearInterval(id);
    m = 1;
    s = 0;
    
    document.getElementById("cronometro").innerHTML = "01:00";
        if(turno == 0){

            tiempo()
            aleatorio(arraySolucion, contRepeF);
            saberRonda()
            ronda()
        }else if(turno==1){
            checkear();
            tiempo();
            saberRonda()
            ronda();
        }else if(turno==2){
            checkear();
            tiempo();
            saberRonda()
            ronda();
        }else if(turno==3){
            checkear();
            tiempo();
            saberRonda()
            ronda();
        }else if(turno==4){
            checkear();
            tiempo();
            saberRonda()
            ronda();
        }else if(turno==5){
            checkear();
            tiempo();
            saberRonda()
            ronda();
        }else if(turno==6){
            checkear()
        }else if(turno>=7 ){
           restaurar() 
           turno= -2;
           
        }
        turno++
    });
}

function tiempo() {
    //se crea una funcion donde tienes tiempo  para cada ronda por defecto he puesto 1 minuto
    miTo = setTimeout(() => {
        checkear();

    }, 60000);
    id = setInterval(escribir, 1000);
}

function escribir() {
    var  minutos, segundos;
    s--;
    if (s<0){
        m--;
        s=59;
    }
    if (s<10){
        segundos="0"+s;
    }else{
        segundos=s;
    }
    if (m<10){
        minutos="0"+m;
    }else{
        minutos=m;
    }
    document.getElementById("cronometro").innerHTML =  minutos + ":" + segundos;
}
function saberRonda() {
    //colorea el la fila donde tienes que jugar en esa ronda
    if(turno > 0 &&  turno< 6){
        linea[turno+1].style.backgroundColor='rgb(203, 91, 91)';
        linea[turno].style.backgroundColor='brown';
    }else{
        linea[turno+1].style.backgroundColor='rgb(203, 91, 91)';
    }
}
function ronda() {
    //se hara un bucle de las casillas determinadas y se dejara hacer click
    for (let i = 0; i < casillas[turno].length; i++) {
        casillas[turno][i].addEventListener("click", cambiarColor.bind(casillas[turno][i], i));
    }
    
}
function restaurar() {
    //restaura los elementos a su color por defecto
    for (let i = 0; i < casR.length; i++) {
        casR[i].style.backgroundColor = `${colores.get(0)}`
        casR[i].innerHTML='?'
        for (let j = 0; j < 6; j++) {
            
            casillas[j][i].style.backgroundColor=`${colores.get(0)}`
            correcciones[j][i].style.backgroundColor=`${colores.get(0)}`
            linea[j+1].style.backgroundColor= 'brown'

        }

        
    }
    botonPlay.style.backgroundColor= "#00bfff"
    linea[0].style.backgroundColor='#ff6347'
}
function cambiarColor(i) {
    //cada vez que hagas click en una casilla se  cambiara de color
    arrayUsuario[i]++;
    if (arrayUsuario[i] > 7) {
        arrayUsuario[i] = 1;
    }
    
    this.style.backgroundColor = colores.get(arrayUsuario[i]);
}

function checkear() {
    //cheackea la solucion y lo informa en los divs de correccion
    
    contadorFinal = 0;
    clearTimeout(miTo);
    clearInterval(id);
    m = 1;
    s = 0;
    document.getElementById("cronometro").innerHTML = "01:00";

    

    for (let j = 0; j < arraySolucion.length; j++) {
        if (setSolucion.has(arrayUsuario[j])) {
            if (arraySolucion[j] == arrayUsuario[j]) {
                correcciones[turno-1][j].style.backgroundColor = "white";
                contadorFinal++
            } else {
                
                correcciones[turno-1][j].style.backgroundColor = "black";
            }
        }
    }
    if (contadorFinal == 4 || turno == 6) {
        gameOver();
    }
    arrayUsuario = [0, 0, 0, 0];
}

function gameOver() {
    //el fin de la partida
    clearTimeout(miTo);
    clearInterval(id);
    m = 1;
    s = 0;
    document.getElementById("cronometro").innerHTML = "01:00"
    for (let i = 0; i < casR.length; i++) {
        casR[i].style.backgroundColor = colores.get(arraySolucion[i]);
        casR[i].innerHTML = '';
    }
    if(contadorFinal==4){
        botonPlay.style.backgroundColor='green'
        jugadas++;
        ganadas++;
    
    }
    if (turno == 6 && contadorFinal!=4) {
        botonPlay.style.backgroundColor='red'
        jugadas++;
    }
    turno=7
    document.getElementById("pJugadas").innerHTML = `Partidas Jugadas: ${jugadas}`;
    document.getElementById("pGanadas").innerHTML = `Partidas Ganadas: ${ganadas}`;
    localStorage.setItem("jugadas", jugadas);
    localStorage.setItem("ganadas", ganadas);
    

}

function aleatorio(array, mapa) {
    //funcion que genera el codigo secreto con numeros aleatorios del 1 al 7
    for (let i = 0; i < array.length; i++) {
        do {
            array[i] = Math.ceil(Math.random() * 7);
        } while (array[i] === 0);
        setSolucion.add(array[i]);
    }
    array.forEach((color) => {
        if (mapa.has(color)) {
            mapa.set(color, mapa.get(color) + 1);
        } else {
            mapa.set(color, 1);
        }
    });
    
}
