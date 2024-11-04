const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

/* ---------- Obtener los paises del json ---------- */
async function obtenerArrayPaises() {
    let paises = [];
    try {
        const respuesta = await fetch("./js/paises.json");
        if (!respuesta.ok) {
            throw new Error('Error al obtener los paises');
        }
        const datos = await respuesta.json(); // Convertir la respuesta a JSON
        paises = datos.paises; // Acceder al array de paises
    } catch (err) {
        console.error(err);
    } finally {
        return paises; // Devolver el array de paises
    }
}

/* ---------- Funcionamiento ---------- */

function agregarOpcionesDatalist (paises) {
    let inputs = document.getElementsByTagName('input');
    
    Array.from(inputs).forEach( (e) => {
        e.addEventListener("click", () => {
            let datalistElemento = document.getElementById("paises")
            paises.forEach(element => {
                const option = document.createElement('option');
                option.value = element.nombrePais;
                datalistElemento.appendChild(option)
            });
        });
    });
}
function vaciarElementoHtml(elemento) {
    while (elemento.firstChild ) {
        elemento.removeChild(elemento.firstChild);
    }
}

// esInputCorrecto retorna 'undefined' si el input ingresado no es válido (no se encuentra en la lista de opciones de paises); y retorna un Objeto País si el input ingresado es válido.
function getPais(arrayObjetosPais, input){
    const pais = input.value;
    for (paisObj of arrayObjetosPais) { 
        if (paisObj.nombrePais === pais) {
            return paisObj;
        } 
    }
    return undefined;
}

/* ---------- Funcionamiento feriados ---------- */
function appendearFeriados(paisRespuesta) {
    let array = paisRespuesta.feriados;
    for (feriado of array){
        let split1 = feriado.split("/");
        let split2 = split1[1].split("-");
        let mesNumero = split2[0];
        let indice = parseInt(mesNumero) - 1;
        
        let contenedorMesHTML = document.getElementById(meses[indice]);
        let pDefault = contenedorMesHTML.getElementsByClassName("noFeriado")[0]
        if (!pDefault.classList.contains('hidden')) {pDefault.classList.add("hidden")}

        let parrafo = document.createElement("p");
        parrafo.textContent = feriado;
        parrafo.classList.add("elementoTextoFeriado");

        let feriadosContainer = contenedorMesHTML.getElementsByClassName("feriadosContainer")[0]
        feriadosContainer.appendChild(parrafo)
    }
}

function removerFeriados(){
    for (mes of meses){
        let divMes = document.getElementById(`${mes}`);
        let feriadosContainer = divMes.getElementsByClassName("feriadosContainer")[0]
        vaciarElementoHtml(feriadosContainer);
        let pVacio = document.createElement('p')
        pVacio.innerHTML = 'Este mes no contiene ningún feriado.'
        pVacio.classList.add('elementoTextoFeriado', 'noFeriado')
        feriadosContainer.appendChild(pVacio)
    }
}

function renovarRespuestaFeriados(paisRespuesta) {
    let seccionFeriados = document.getElementById("feriadosIndex");
    seccionFeriados.classList.add("hidden");

    let nuevaSeccionFeriados = document.getElementById("feriadosRespuesta");
    nuevaSeccionFeriados.classList.remove("hidden");
    appendearFeriados(paisRespuesta);

    let feriadosTitle = document.getElementById("feriadosPais");
    feriadosTitle.innerHTML = `FERIADOS ${paisRespuesta.nombrePais.toUpperCase()}`    
}



/* ---------- Funcionamiento Huso Horario ---------- */

function obtenerHora(pais){
    let husoHorario = pais.husoHorario;
    let horaResultado = luxon.DateTime.now().setZone(husoHorario);
    return horaResultado;
}

function getHoraYHuso(pais, horaPais, id){
    let horaStr = horaPais.hour <= 9 ? "0"+ horaPais.hour : horaPais.hour;
    let minStr = horaPais.minute <= 9 ? "0"+ horaPais.minute : horaPais.minute;
    let secStr = horaPais.second <= 9 ? "0"+ horaPais.second : horaPais.second;
    let hora = document.getElementById(id);
    hora.innerHTML = `${horaStr}:${minStr}:${secStr} - ${pais.husoHorario}`
}

function getFecha(horaPais, id){
    let hhFecha = document.getElementById(id);
    hhFecha.innerHTML = `${(horaPais.toFormat("EEEE, LLLL dd, yyyy", {locale: "es"})).toUpperCase()}`;
}


function formatearResultadoHusoHorario (pais, horaPais) {
    let husoHorarioTitulo = document.getElementById("nombrePaisHH")
    husoHorarioTitulo.innerHTML = `${pais.nombrePais.toUpperCase()}`;
    getHoraYHuso(pais, horaPais, "hora")
    getFecha(horaPais, "fechaPaisHH")    
}

function renovarRespuestaHusoHorario(paisFinal){
    let seccionFeriados = document.getElementById("husoHorarioIndex");
    seccionFeriados.classList.add("hidden");

    let nuevaSeccionFeriados = document.getElementById("husoRespuesta");
    nuevaSeccionFeriados.classList.remove("hidden");
    
    let hora = obtenerHora(paisFinal);
    formatearResultadoHusoHorario (paisFinal, hora);

    let relojUpdater = setInterval( () => {
        let hora = obtenerHora(paisFinal);
        formatearResultadoHusoHorario (paisFinal, hora);
    }, 1000);
    return relojUpdater;
}


/* ---------- Funcionamiento Conversor ---------- */
function crearGrilla(pais, hora, idGrilla, idPaisFranja){
    
    /* --- Definir h3 --- */
    let nombrePais = document.getElementById(idPaisFranja);
    let unicode = pais.unicode.split(".");
    let abreviatura = unicode[0];
    nombrePais.innerHTML = `${abreviatura.toUpperCase()}`

    /* --- Definir grilla horas --- */
    let grilla = document.getElementById(idGrilla);

    for(let i = 0; i <= 10; i++){

        let horaParametro = hora.minus({hours: i - 1}).hour;
        let minutoParametro = hora.minute;
        
        let horaStr = horaParametro <= 9 ? "0"+ horaParametro : horaParametro;
        let minStr = minutoParametro <= 9 ? "0"+ minutoParametro : minutoParametro;
        
        
        let p = document.createElement('p');
        p.classList.add("horaGrilla")
        p.innerHTML = `${horaStr}:${minStr}`
        grilla.appendChild(p)
    }

    let horaStr = hora.hour <= 9 ? "0"+ hora.hour : hora.hour;
    let minStr = hora.minute <= 9 ? "0"+ hora.minute : hora.minute;

    let p = document.createElement('p');
    p.classList.add("horaGrillaResaltada");
    p.classList.add("horaGrilla");
    p.innerHTML = `${horaStr}:${minStr}`
    grilla.appendChild(p)

    for(let i = 0; i <= 10; i++){

        let horaParametro = hora.plus({hours: i + 1}).hour;
        let minutoParametro = hora.minute;
        
        let horaStr = horaParametro <= 9 ? "0"+ horaParametro : horaParametro;
        let minStr = minutoParametro <= 9 ? "0"+ minutoParametro : minutoParametro;
        
        
        let p = document.createElement('p');
        p.classList.add("horaGrilla")
        p.innerHTML = `${horaStr}:${minStr}`
        grilla.appendChild(p)
    }   

}

function renovarRespuestaConversor(paisFinal1, paisFinal2){
    let seccionConversor = document.getElementById("conversorIndex");
    seccionConversor.classList.add("hidden");

    let nuevaSeccionConversor = document.getElementById("conversorRespuesta");
    nuevaSeccionConversor.classList.remove("hidden");
    
    let horaPais1 = obtenerHora(paisFinal1);
    let pais1Titulo = document.getElementById("pais1Conv")
    pais1Titulo.innerHTML = `${paisFinal1.nombrePais.toUpperCase()}`;
    getHoraYHuso(paisFinal1, horaPais1, "hora1Conv");

    let horaPais2 = obtenerHora(paisFinal2);
    let pais2Titulo = document.getElementById("pais2Conv")
    pais2Titulo.innerHTML = `${paisFinal2.nombrePais.toUpperCase()}`;
    getHoraYHuso(paisFinal2, horaPais2, "hora2Conv");

    let relojUpdater1 = setInterval( () => {
        let horaPais1 = obtenerHora(paisFinal1);
        let pais1Titulo = document.getElementById("pais1Conv")
        pais1Titulo.innerHTML = `${paisFinal1.nombrePais.toUpperCase()}`;
        getHoraYHuso(paisFinal1, horaPais1, "hora1Conv");
    }, 1000);

    let relojUpdater2 = setInterval( () => {
        let horaPais2 = obtenerHora(paisFinal2);
        let pais2Titulo = document.getElementById("pais2Conv")
        pais2Titulo.innerHTML = `${paisFinal2.nombrePais.toUpperCase()}`;
        getHoraYHuso(paisFinal2, horaPais2, "hora2Conv");
    }, 1000);

    let difHoras = document.getElementById("difHoras");
    difHoras.innerHTML = `Diferencia horaria: ${(Math.abs(paisFinal1.factorSumador - paisFinal2.factorSumador))} horas`;

    crearGrilla(paisFinal1, horaPais1, "grillaHoras1", "paisFranja1")
    crearGrilla(paisFinal2, horaPais2, "grillaHoras2", "paisFranja2")

    return [relojUpdater1, relojUpdater2];
}


/* ---------- Main ---------- */
async function main() { 
    const paisesObjetos = await obtenerArrayPaises();
    agregarOpcionesDatalist(paisesObjetos);

    /* --------- Instrucciones si usuario clickea boton feriados --------- */

    let botonF = document.getElementById("botonFeriados");
    botonF.addEventListener("click", function(event){
        event.preventDefault();
        const input = document.getElementById("paisFeriados");
        let paisFinal = getPais(paisesObjetos, input);

        if (!paisFinal) {
            alert('País inválido. Por favor, ingrese un país de la lista.');
            return;  
        }
        renovarRespuestaFeriados(paisFinal);  
    });

    let botonResetFeriados = document.getElementById("resetFeriados");    
    botonResetFeriados.addEventListener("click", () => {
        feriadosIndex = document.getElementById("feriadosIndex")
        feriadosIndex.classList.remove("hidden")

        let nuevaSeccionFeriados = document.getElementById("feriadosRespuesta");
        nuevaSeccionFeriados.classList.add("hidden");
        removerFeriados();
    });
 

    /* --------- Instrucciones si usuario clickea huso horario --------- */
    let relojUpdater;

    let botonHH = document.getElementById("botonHusoHorario");
    botonHH.addEventListener("click", (event) => {
        event.preventDefault();
        const input = document.getElementById("paisHH");
        let paisFinal = getPais(paisesObjetos, input);
        if (!paisFinal) {
            alert('País inválido. Por favor, ingrese un país de la lista.');
            return;  
        }
        relojUpdater = renovarRespuestaHusoHorario(paisFinal);
    })
    let botonResetHuso = document.getElementById("resetHuso");    
    botonResetHuso.addEventListener("click", (event) => {
        event.preventDefault();
        clearInterval(relojUpdater);
        husoIndex = document.getElementById("husoHorarioIndex")
        husoIndex.classList.remove("hidden")

        let nuevaSeccionHuso = document.getElementById("husoRespuesta");
        nuevaSeccionHuso.classList.add("hidden");
    });


    

    /* --------- Instrucciones si usuario clickea conversor --------- */
    let relojUpdater1;
    let relojUpdater2;

    let botonConv= document.getElementById("botonConversor");
    botonConv.addEventListener("click", (event) => {
        event.preventDefault();
        const input1 = document.getElementById("pais1");
        const input2 = document.getElementById("pais2");
        let paisFinal1 = getPais(paisesObjetos, input1);
        let paisFinal2 = getPais(paisesObjetos, input2);
        if (!paisFinal1 || !paisFinal2) {
            alert('País inválido. Por favor, ingrese un país de la lista.');
            return;  
        }
        [relojUpdater1, relojUpdater2] = renovarRespuestaConversor(paisFinal1, paisFinal2);
    })

    let botonResetConv = document.getElementById("resetConversor");
    botonResetConv.addEventListener("click", (event) => {
        event.preventDefault();
        clearInterval(relojUpdater1);
        clearInterval(relojUpdater2);

        let div1 = document.getElementById("grillaHoras1");
        let div2 = document.getElementById("grillaHoras2");

        vaciarElementoHtml(div1);
        vaciarElementoHtml(div2);

        let nuevaSeccionConversor= document.getElementById("conversorRespuesta");
        nuevaSeccionConversor.classList.add("hidden");

        let seccionConversor = document.getElementById("conversorIndex");
        seccionConversor.classList.remove("hidden");
    })

}


document.addEventListener('DOMContentLoaded', () => {
    main();
});

