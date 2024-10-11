// import * as moduloSesion from './sesion.js';
// import * as moduloPaises from './paises.js';

let desplegableConversor1 = document.getElementById("pais1");
let desplegableConversor2 = document.getElementById("pais2");


let crearContenidoDesplegables = function(desplegable, elm){
    const option = document.createElement("option");
    option.setAttribute("value", elm);
    option.innerHTML = elm;
    desplegable.appendChild(option);
}

moduloPaises.paisesStrings.forEach((elm) => crearContenidoDesplegables(desplegableConversor1, elm))
moduloPaises.paisesStrings.forEach((elm) => crearContenidoDesplegables(desplegableConversor2, elm))
