import * as moduloPaises from './paises.js';



export let usuariosRegistrados = [];
export let mailsUsuariosRegistrados = [];
export let usuarioActual;
export let estaUsuarioLogueado;

/* --------------------- Objetos --------------------- */
export class Usuario {

    constructor (nombre, apellido, pais, password, mail){
        this.nombre = nombre;
        this.apellido = apellido;
        this.pais = moduloPaises.seleccionarPais(pais);
        this.password = password;
        this.mail = mail;
    }

    //Getter
    obtenerNombreCompleto() { return this.nombre + " " + this.apellido;}    //Retorna un string
    obtenerHusoHorario() { return this.pais.huso;}                          //Retorna un string
    obtenerEmail() {return this.mail;}                                      //Retorna un string
    obtenerPaisResidencia() {return this.pais;}                             //Retorna un objeto Pais. 
    obtenerPassword() {return this.password;}
}

/* -------- Funcionamiento: Inicio de Sesión | Registro -------- */


export function usuarioEstaRegistrado(mail) {
    estaUsuario = mailsUsuariosRegistrados.find(mail);
    let vacio = [];
    return(!(estaUsuario === vacio));
}

export function registrarse(nombre, apellido, pais, password, mail){
    let nuevoUsuario = new Usuario(nombre, apellido, pais, password, mail);
    usuariosRegistrados.push(nuevoUsuario)
    mailsUsuariosRegistrados.push(mail);
    usuarioActual = nuevoUsuario;
}

export function iniciarSesion(mail, password){
    
    if(!usuarioEstaRegistrado(mail)){
        alert("No existe usuario con el mail ingresado. Por favor, inicie sesión nuevamente o registrese en el sitio.");
        return;
    }
    
    let usuario = usuariosRegistrados.find((elem) => elem.mail === mail);
    if (usuario.obtenerPassword() !== password) {
        alert("La contraseña ingresada no es correcta. Intente nuevamente.")
        return;
    }   
    usuarioActual = usuario;
}