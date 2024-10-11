import * as moduloPaises from './paises.js';
import * as moduloSesion from './sesion.js';
import {Pais} from './paises.js';

/* --------------------- Eventos DOM -----------------------*/

let desplegable3 = document.getElementById("pais3");

let crearContenidoDesplegables = function (desplegable, elm) {
    const option = document.createElement("option");
    option.setAttribute("value", elm);
    option.innerHTML = elm;
    desplegable.appendChild(option);
}

moduloPaises.paisesStrings.forEach((elm) => crearContenidoDesplegables(desplegable3, elm))

let boton = document.getElementById("obtenerFeriados");

let mostrarPaisUsuario = function(){
    let pais = moduloPaises.seleccionarPais(desplegable3.value);
    const div = document.createElement("div");
    let feriados = pais.obtenerStringFeriados()
    
    
    div.innerHTML = `
    <h2>Feriados de ${pais.obtenerNombre()}</h2>
    <p>${feriados}</p>
    `
    document.getElementById("mainFeriados").appendChild(div)
}


boton.addEventListener("click",mostrarPaisUsuario);


