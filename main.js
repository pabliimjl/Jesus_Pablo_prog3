import { Carta } from "./carta.js";
const grillaCartas = document.querySelector("#cartas");

var numeroPagina;
const btnSiguiente = document.querySelector("#siguiente");
btnSiguiente.addEventListener("click", paginaSiguiente);
var pagina;

const btnAnterior = document.querySelector("#anterior");
btnAnterior.addEventListener("click", paginaAnterior);

document.addEventListener("DOMContentLoaded",()=>{
    numeroPagina = 1;
    pagina = window.location.pathname;
    cambiarPagina(0)
})

function limpiarCartas(){
    grillaCartas.innerHTML = "";
}

function cargarCartasGuardadas(numeroInicio){

    var cartasGuardadas = localStorage.getItem("cartas");
    cartasGuardadas = JSON.parse(cartasGuardadas)
    

    for(var i=numeroInicio;i<numeroInicio+6;i++){
        if (cartasGuardadas[i-1] != null){
            var carta = cartasGuardadas[i-1];
            
            const nuevaCarta = cargarCarta(carta)
            agregarCartaAlDocumento(nuevaCarta,i+1);}
    }
}

function cargarCarta(carta){
    const nuevaCarta = new Carta(
            carta.code,
            carta.value,
            carta.suit,
            carta.image ?? carta.imagen
    )
    
    return nuevaCarta;
}

function agregarCartaAlDocumento(carta){
        grillaCartas.appendChild(carta.createHtmlElement());
}

async function obtenerCartas(){
    let cartas = []
    try{
    const respuesta = await fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=6`);
    const respuestaJson = await respuesta.json();
    cartas = respuestaJson.cards;
}
    catch(error){
        alert(error)
    }
    finally{
    return cartas;
    }
}

async function cargarCartasNuevas(){

    const cartas = await obtenerCartas()
    for(const carta of cartas){        
        const nuevaCarta = cargarCarta(carta)
        agregarCartaAlDocumento(nuevaCarta)

    }
}

function actualizarNumeroPagina(variacion){
    numeroPagina+=variacion;
    var numPag = document.getElementById("numeroPagina")
    numPag.innerHTML = numeroPagina;
}

function paginaSiguiente(){
    cambiarPagina(1)
}

function paginaAnterior(){  
    if (numeroPagina === 1){
        alert("No puedes volver atras, esta es la pagina 1")
    }
    else{
        cambiarPagina(-1)
    }
}

function cambiarPagina(variacion){
    actualizarNumeroPagina(variacion)
    limpiarCartas()
    if (pagina.includes("index.html")) {
        cargarCartasNuevas()}
    if (pagina.includes("guardados.html")) {
        cargarCartasGuardadas((numeroPagina*6)-5)
    }
}
