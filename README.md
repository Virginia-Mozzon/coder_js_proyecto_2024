# coder_js_proyecto_2024
                Documentación Coder JS Proyecto 2024 - Tempo Clock

Descripción
    Este proyecto es un desarrollo realizado en JavaScript, centrado en la creación de una aplicación web para gestionar datos de países relacionados con el tiempo. El objetivo principal es brindar una herramienta de organización para la agenda profesional dentro de ambientes de trabajo remotos, donde conviven personas de diferentes partes del mundo.
    Dentro del proyecto, encontrarán tres funcionalidades principales: Listar feriados filtrando el país, obtener un huso horario de un país en particular, y obtener una comparativa horaria entre 2 países. 

Tabla de Contenidos
    - Tecnologías Utilizadas
    - Uso
    - Mejoras futuras

Tecnologías Utilizadas
    - HTML: Estructura básica del contenido web.
    - CSS: Estilos visuales del proyecto, utilizando Bootstrap/Normalize, y algunos elementos prediseñados de bibliotecas de internet (como mapas UTC y lineas de tiempo).
    - JavaScript: Lógica del lado del cliente para interactividad.
    - Librerías
        - Luxon: Lógica para la manipulación de fechas y horas.
        - FullPage.js: Estética principal de la página.

Uso
    El archivo script_index.js es el núcleo de la lógica de la aplicación. Se encarga de gestionar la interacción del usuario, la carga de datos y la manipulación del DOM. Este archivo se utiliza para proporcionar funcionalidad y respuesta a las acciones del usuario en la interfaz.

    Funcionalidades Principales
        1. Carga de Datos
            El script se encarga de cargar datos desde un archivo JSON (paises.json). 
            
                Estructura Objeto Pais:
                    "nombrePais":       //String que almacena el nombre del país
                    "unicode":          //String que almacena nombre de ícono asociado al país, para una futura funcionalidad de mostrar al usuario la bandera del país al seleccionarlo en el input (Ejemplo: "af.webp")
                    "factorSumador":    //Int que representa la cantidad de horas de diferencia entre el país y el UTC+0 (Greenwich). 
                    "husoHorario":      //String que representa el código UTC del país (ejemplo: "UTC+4:30")
                    "feriados" :        //Array de strings que representan un feriado. La estructura del string es "dd/mm - [nombre del feriado en español]"
            
            Este proceso se realiza de manera asíncrona para garantizar que la aplicación no se congele mientras se recuperan los datos.
            
                async function obtenerArrayPaises() {
                    // Código para cargar y procesar el archivo JSON
                }
        
            El script crea elementos de tipo <option> en un <datalist> a partir de los datos cargados. Esto permite a los usuarios seleccionar un país de una lista.
                
                //crearDatalist recibe un array de objetos Paises, y modifica la estructura HTML a través del DOM, creando un conjunto de options.
                function crearDatalist(paises){}

        2. Interactividad del Usuario
            El script maneja eventos de interacción, como la selección de un país. Esto permite que la aplicación responda a las acciones del usuario y muestre información relevante.
            
            En líneas generales, para las 3 funcionalidades principales, la estructura HTML se divide en las 3 sections de cada funcionalidad que a su vz se dividen en 2 div: el primero se muestra desde el inicio, y el segundo permanece oculto bajo la clase "hidden". En el momento que el usuario ingresa un dato y lo procesa, se switchean las propiedades, para que el segundo div permanezca visible.
            Con este contexto, funciones como "vaciarContenidoHTML()" o "renovarRespuestaFeriados()" cobran sentido.

            a. Funciones de uso general
                - vaciarElementoHtml(elemento): recibira un elemento de tipo HTMLCollection. Una vez identificado, borrara todos los hijos de esa etiqueta.
                - getPais(arrayObjetosPais, inputUsuario): Recibe un array de objetos paises, y un string que representa un país. Retorna 'undefined' si el input ingresado no es válido (no se encuentra en la lista de opciones de paises); y retorna un Objeto País si el input ingresado es válido.
                - obtenerHora(pais): Recibe un objeto País, y retorna su hora actual.

            b. Funciones específicas
                A partir de los evenntListeners se invocan a una serie de funciones que contruyen el programa:
                
                - renovarRespuestaFeriados(paisRespuesta)
                - renovarRespuestaHusoHorario(paisFinal)
                - renovarRespuestaConversor(paisFinal1, paisFinal2)

Mejoras Futuras
    -Mejorar el mapa UTC de la sección "Obtener Huso Horario".
    -Ingresar un elemento interactivo en lugar de una grilla estática en el elemento "Conversor de tiempo".
    -Añadir una nueva funcionalidad desde perfil, para que el usuario pueda comparar franjas horarias de más de un país.
    -Programar una funcionalidad para obtener el mejor horario para coordinar una reunión.
    -Completar la lista de países con toda su información o integrar una API para su funcionamiento.