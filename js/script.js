
/* ----- Variables y constantes ----- */
let usuariosRegistrados = [];
let usuarioActual;
let estaLogeado = false;



// La lista de feriados es una lista de listas: las listas que contiene tienen la estructura "país", ["feriados"], y los feriados son de la estructura "fecha-nombre del feriado".
const listaFeriados = {
    "Afganistán": ["01/01-Año Nuevo", "21/03-Nawruz", "19/08-Día de la Independencia", "09/11-Día de la Revolución"],
    "Albania": ["01/01-Año Nuevo", "28/11-Día de la Independencia", "29/11-Día de la Liberación"],
    "Alemania": ["01/01-Neujahrstag", "07/04-Karfreitag", "10/04-Ostermontag", "01/05-Tag der Arbeit", "03/10-Tag der Deutschen Einheit", "25/12-1. Weihnachtstag", "26/12-2. Weihnachtstag"],
    "Andorra": ["01/01-Año Nuevo", "06/01-Día de Reyes", "14/03-Día de la Cruz", "15/08-Asunción de la Virgen", "08/09-Día de Nuestra Señora de Meritxell", "25/12-Navidad"],
    "Angola": ["01/01-Año Nuevo", "04/02-Día de la Lucha Patriótica", "08/03-Día Internacional de la Mujer", "01/05-Día del Trabajador", "11/11-Día de la Independencia"],
    "Antigua y Barbuda": ["01/01-New Year's Day", "21/02-Día de la Juventud", "01/05-Labor Day", "01/11-Día de la Independencia"],
    "Arabia Saudita": ["01/01-Año Nuevo", "23/09-Día Nacional", "10/12-Día de la Fundación"],
    "Argelia": ["01/01-Año Nuevo", "18/02-Día del Mártir", "01/05-Día del Trabajo", "05/07-Día de la Independencia"],
    "Argentina": ["01/01-Año Nuevo", "12/02-Carnaval", "13/02-Carnaval", "24/03-Día Nacional de la Memoria", "02/04-Día del Veterano", "01/05-Día del Trabajador", "25/05-Día de la Revolución", "09/07-Día de la Independencia", "08/12-Inmaculada Concepción", "25/12-Navidad"],
    "Armenia": ["01/01-Año Nuevo", "28/02-Día de la Memoria del Genocidio Armenio", "24/04-Día de la Conciencia del Genocidio Armenio", "21/09-Día de la Independencia"],
    "Australia": ["01/01-New Year's Day", "26/01-Australia Day", "14/04-Good Friday", "17/04-Easter Monday", "25/04-Anzac Day", "12/06-Queen's Birthday", "25/12-Christmas Day", "26/12-Boxing Day"],
    "Austria": ["01/01-Neujahrstag", "06/01-Heilige Drei Könige", "01/05-Tag der Arbeit", "15/08-Assumption", "26/10-Nationalfeiertag", "01/11-Allerheiligen", "25/12-Erster Weihnachtstag", "26/12-Zweiter Weihnachtstag"],
    "Azerbaiyán": ["01/01-New Year's Day", "20/01-Día de la Solidaridad de los Azerbaiyanos del Mundo", "08/03-Día Internacional de la Mujer", "20/03-Nawruz Bayram", "28/05-Día de la República", "26/06-Día del Ejército", "09/11-Día de la Nacionalidad"],
    "Bahamas": ["01/01-New Year's Day", "10/02-Discovery Day", "01/05-Labour Day", "01/07-Independence Day", "First Monday in October-Emancipation Day", "25/12-Christmas Day", "26/12-Boxing Day"],
    "Bangladés": ["01/01-New Year's Day", "21/02-Día Internacional de la Lengua Materna", "26/03-Día de la Independencia", "01/05-Día del Trabajo", "16/12-Día de la Victoria"],
    "Barbados": ["01/01-New Year's Day", "21/02-Día de la Juventud", "01/05-Labor Day", "30/11-Día de la Independencia", "25/12-Christmas Day"],
    "Baréin": ["01/01-New Year's Day", "16/12-Día Nacional", "01/05-Labor Day", "29/07-Día de la Independencia"],
    "Bélgica": ["01/01-New Year's Day", "21/07-Día Nacional", "15/08-Asunción de la Virgen", "01/11-Todos los Santos", "11/11-Día del Armisticio", "25/12-Christmas Day"],
    "Belice": ["01/01-New Year's Day", "09/03-Baron Bliss Day", "01/05-Labor Day", "21/09-Independence Day", "25/12-Christmas Day"],
    "Benín": ["01/01-Año Nuevo", "01/05-Día del Trabajo", "01/08-Día de la Independencia", "01/11-Día de los Muertos"],
    "Bielorrusia": ["01/01-New Year's Day", "07/01-Christmas", "08/03-International Women's Day", "25/03-Día de la Libertad", "09/05-Día de la Victoria", "03/07-Día de la Independencia"],
    "Birmania": ["01/01-New Year's Day", "04/01-Día de la Independencia", "13/03-Thingyan", "01/05-Labor Day", "02/10-Día de la Constitución"],
    "Bolivia": ["01/01-Año Nuevo", "10/02-Carnaval", "02/04-Día del Mar", "01/05-Día del Trabajo", "06/08-Día de la Independencia", "02/11-Día de los Muertos"],
    "Bosnia y Herzegovina": ["01/01-New Year's Day", "01/03-Día de la Independencia", "25/11-Día de la República", "25/12-Christmas Day"],
    "Botsuana": ["01/01-New Year's Day", "01/05-Labour Day", "30/09-Día de la Independencia", "25/12-Christmas Day", "26/12-Boxing Day"],
    "Brasil": ["01/01-Ano Novo", "25/02-Carnaval", "26/02-Carnaval", "21/04-Tiradentes", "01/05-Dia do Trabalho", "07/09-Independência do Brasil", "12/10-Nossa Senhora Aparecida", "02/11-Dia de Finados", "15/11-Proclamação da República", "25/12-Natal"],
    "Brunéi": ["01/01-New Year's Day", "23/02-Día Nacional", "01/05-Labor Day", "07/07-Día del Sultán", "25/12-Christmas Day"],
    "Bulgaria": ["01/01-New Year's Day", "03/03-Día de la Liberación", "01/05-Día del Trabajo", "06/05-Día de San Jorge", "22/09-Día de la Independencia", "25/12-Navidad"],
    "Burkina Faso": ["01/01-Año Nuevo", "08/03-Día Internacional de la Mujer", "04/08-Día de la Revolución", "25/12-Día de la Independencia"]],
    "Burundi": ["01/01-New Year's Day", "08/03-Día Internacional de la Mujer", "01/05-Día del Trabajo", "18/09-Día de la Independencia", "25/12-Navidad"],
    "Bután": ["01/01-New Year's Day", "20/12-Día de la Fundación", "Día de los Reyes", "Día del Cumpleaños del Rey"],
    "Cabo Verde": ["01/01-Año Nuevo", "20/01-Día de la Bandera", "01/05-Día del Trabajo", "05/07-Día de la Independencia"]],
    "Camboya": ["01/01-New Year's Day", "07/01-Día de la Victoria sobre el Genocidio", "13/04-Año Nuevo Camboyano", "14/04-Año Nuevo Camboyano", "15/04-Año Nuevo Camboyano", "24/09-Día de la Independencia"],
    "Camerún": ["01/01-Año Nuevo", "11/02-Día de la Unidad Nacional", "01/05-Día del Trabajo", "20/05-Día de la República"],
    "Canadá": ["01/01-New Year's Day", "Good Friday", "Easter Monday", "Victoria Day", "Canada Day", "First Monday in September-Labor Day", "Second Monday in October-Thanksgiving", "25/12-Christmas Day", "26/12-Boxing Day"],
    "Catar": ["01/01-New Year's Day", "18/12-Día Nacional", "01/05-Labor Day", "Día del Eid al-Fitr", "Día del Eid al-Adha"],
    "Chad": ["01/01-Año Nuevo", "11/04-Día de la Independencia", "01/05-Día del Trabajo", "15/08-Día de la Independencia"],
    "Chile": ["01/01-Año Nuevo", "07/04-Viernes Santo", "08/04-Sábado Santo", "01/05-Día del Trabajo", "21/05-Día de las Glorias Navales", "26/06-Día de San Pedro y San Pablo", "15/08-Asunción de la Virgen", "18/09-Día de la Independencia", "19/09-Día de las Glorias del Ejército", "25/12-Navidad"],
    "China": ["01/01-Año Nuevo", "Lunar New Year (varía)", "Día de la Mujer (08/03)", "Día del Trabajo (01/05)", "Día de la República (01/10)", "Día Nacional (01/10)"],
    "Chipre": ["01/01-Año Nuevo", "25/03-Día de la Independencia", "01/05-Día del Trabajo", "15/08-Asunción de la Virgen", "01/10-Día de la Independencia"],
    "Ciudad del Vaticano": ["01/01-Año Nuevo", "06/01-Epifanía", "19/03-San José", "29/06-San Pedro y San Pablo", "15/08-Asunción de la Virgen", "25/12-Navidad"],
    "Colombia": ["01/01-Año Nuevo", "06/01-Día de Reyes", "20/07-Día de la Independencia", "07/08-Batalla de Boyacá", "15/08-Asunción de la Virgen", "12/10-Día de la Raza", "01/11-Todos los Santos", "11/11-Día de la Independencia", "08/12-Inmaculada Concepción", "25/12-Navidad"],
    "Comoras": ["01/01-Año Nuevo", "07/07-Día de la Independencia", "15/08-Día de la Asunción", "25/12-Navidad"],
    "Corea del Norte": ["01/01-Año Nuevo", "15/04-Día del Sol", "01/05-Día del Trabajo", "09/09-Día de la República"],
    "Corea del Sur": ["01/01-Año Nuevo", "20/03-Día de la Independencia", "05/05-Día de los Niños", "06/06-Día del Recuerdo de los Caídos", "15/08-Día de la Liberación", "03/10-Día de la Fundación"],
    "Costa de Marfil": ["01/01-Año Nuevo", "07/08-Día de la Independencia", "25/12-Navidad"],
    "Costa Rica": ["01/01-Año Nuevo", "11/04-Día de Juan Santamaría", "01/05-Día del Trabajo", "15/09-Día de la Independencia", "25/12-Navidad"],
    "Croacia": ["01/01-Año Nuevo", "06/01-Día de Reyes", "17/04-Viernes Santo", "01/05-Día del Trabajo", "22/06-Día de la Lucha por la Libertad", "05/08-Día de la Victoria", "15/08-Asunción de la Virgen", "08/10-Día de la Independencia", "25/12-Navidad"],
    "Cuba": ["01/01-Día de la Liberación", "10/10-Día de la Independencia", "01/05-Día del Trabajo", "25/12-Navidad"],
    "Dinamarca": ["01/01-Año Nuevo", "25/12-Navidad", "26/12-Santo Esteban", "01/05-Día del Trabajo"],
    "Dominica": ["01/01-New Year's Day", "21/02-Día de la Juventud", "01/05-Labor Day", "03/11-Día de la Independencia", "25/12-Christmas Day"],
    "Ecuador": ["01/01-Año Nuevo", "06/01-Día de Reyes", "23/03-Día del Encuentro de Dos Mundos", "01/05-Día del Trabajo", "10/08-Día de la Independencia", "25/12-Navidad"],
    "Egipto": ["01/01-Año Nuevo", "25/01-Día de la Revolución", "06/10-Día de las Fuerzas Armadas", "01/05-Día del Trabajo", "25/12-Navidad"],
    "El Salvador": ["01/01-Año Nuevo", "16/01-Día de la Paz", "01/05-Día del Trabajo", "15/09-Día de la Independencia", "25/12-Navidad"],
    "Emiratos Árabes Unidos": ["01/01-New Year's Day", "02/12-Día Nacional", "01/05-Labor Day", "Eid al-Fitr (varía)", "Eid al-Adha (varía)"],
    "Eritrea": ["01/01-Año Nuevo", "24/05-Día de la Independencia", "01/09-Día de la Revolución"],
    "Eslovaquia": ["01/01-Día de la Independencia", "05/07-Día de los Santos Cirilo y Metodio", "01/09-Día de la Constitución", "15/09-Día de la Virgen María"],
    "Eslovenia": ["01/01-Año Nuevo", "08/02-Día de Prešeren", "27/04-Día de la Resistencia", "01/05-Día del Trabajo", "25/06-Día de la Independencia", "15/08-Asunción de la Virgen", "25/12-Navidad"],
    "España": ["01/01-Año Nuevo", "06/01-Día de Reyes", "19/03-Día del Padre", "01/05-Fiesta del Trabajo", "15/08-Asunción de la Virgen", "12/10-Fiesta Nacional", "01/11-Todos los Santos", "06/12-Día de la Constitución", "08/12-Inmaculada Concepción", "25/12-Navidad"],
    "Estados Unidos": ["01/01-New Year's Day", "15/01-Martin Luther King Jr. Day", "20/02-Presidents' Day", "29/05-Memorial Day", "04/07-Independence Day", "01/09-Labor Day", "11/11-Veterans Day", "24/11-Thanksgiving", "25/12-Christmas Day"],
    "Estonia": ["01/01-Año Nuevo", "24/02-Día de la Independencia", "01/05-Día del Trabajo", "23/06-Día de la Victoria", "24/06-Día de San Juan", "20/08-Día de la Restauración de la Independencia", "25/12-Navidad"],
    "Etiopía": ["01/01-Año Nuevo (Enkutatash)", "19/01-Día de San Jorge", "02/05-Día del Trabajo", "20/07-Día de la Revolución", "11/09-Día de la Independencia"],
    "Filipinas": ["01/01-New Year's Day", "25/02-EDSA People Power Revolution", "01/05-Labor Day", "12/06-Independence Day", "30/08-National Heroes Day", "01/11-All Saints' Day", "30/11-Andres Bonifacio Day", "25/12-Christmas Day", "26/12-Rizal Day"],
    "Finlandia": ["01/01-Año Nuevo", "06/12-Día de la Independencia", "01/05-Día del Trabajo", "25/12-Navidad", "26/12-San Esteban"],
    "Fiyi": ["01/01-New Year's Day", "06/02-Día de la Independencia", "02/04-Good Friday", "05/04-Easter Monday", "01/05-Labor Day", "10/10-Día del Jefe"],
    "Francia": ["01/01-Jour de l'An", "21/04-Lundi de Pâques", "01/05-Fête du Travail", "08/05-Victoire 1945", "14/07-Bastille Day", "15/08-Assomption", "01/11-Toussaint", "11/11-Armistice", "25/12-Noël"],
    "Gabón": ["01/01-Año Nuevo", "17/08-Día de la Independencia", "01/05-Día del Trabajo", "25/12-Navidad"],
    "Gambia": ["01/01-New Year's Day", "18/02-Día de la Independencia", "01/05-Labor Day", "25/12-Christmas Day"],
    "Georgia": ["01/01-New Year's Day", "07/01-Christmas", "03/03-Día de la Independencia", "09/04-Día de la Libertad", "26/05-Día de la Independencia"],
    "Ghana": ["01/01-New Year's Day", "06/03-Día de la Independencia", "01/05-Labor Day", "25/12-Christmas Day"],
    "Granada": ["01/01-New Year's Day", "21/02-Discovery Day", "01/05-Labor Day", "07/10-Día de la Independencia", "25/12-Christmas Day"],
    "Grecia": ["01/01-Año Nuevo", "06/01-Epifanía", "25/03-Día de la Independencia", "01/05-Día del Trabajo", "15/08-Asunción de la Virgen", "28/10-Día Ohi"],
    "Guatemala": ["01/01-Año Nuevo", "20/02-Día de la Revolución", "01/05-Día del Trabajo", "15/09-Día de la Independencia", "25/12-Navidad"],
    "Guyana": ["01/01-New Year's Day", "23/02-Día de la Independencia", "01/05-Labor Day", "01/07-Emancipation Day", "25/12-Christmas Day"],
    "Guinea": ["01/01-Año Nuevo", "02/10-Día de la Independencia", "01/05-Día del Trabajo"],
    "Guinea ecuatorial": ["01/01-Año Nuevo", "12/10-Día de la Independencia", "01/05-Día del Trabajo"],
    "Guinea-Bisáu": ["01/01-Año Nuevo", "24/09-Día de la Independencia", "01/05-Día del Trabajo"],
    "Haití": ["01/01-Día de la Independencia", "01/05-Labor Day", "18/05-Día de la Bandera"],
    "Honduras": ["01/01-Año Nuevo", "15/09-Día de la Independencia", "03/10-Día de la Raza", "25/12-Navidad"],
    "Hungría": ["01/01-Año Nuevo", "15/03-Día de la Revolución", "01/05-Día del Trabajo", "20/08-Día de San Esteban", "25/10-República"],
    "India": ["01/01-New Year's Day", "26/01-Día de la República", "15/08-Día de la Independencia", "02/10-Día de Mahatma Gandhi"],
    "Indonesia": ["01/01-New Year's Day", "17/08-Día de la Independencia", "01/05-Labor Day", "25/12-Christmas Day"],
    "Irak": ["01/01-New Year's Day", "14/07-Día de la Revolución", "01/05-Labor Day", "06/01-Día de la Independencia"],
    "Irán": ["01/01-Nawruz", "11/02-Día de la Revolución", "01/05-Día del Trabajo", "27/12-Día de la Fundación"],
    "Irlanda": ["01/01-New Year's Day", "17/03-Día de San Patricio", "01/05-Labor Day", "25/12-Christmas Day"],
    "Islandia": ["01/01-New Year's Day", "21/04-Día de la Independencia", "01/05-Labor Day", "25/12-Christmas Day"],
    "Islas Marshall": ["01/01-New Year's Day", "01/05-Labor Day", "17/09-Día de la Independencia", "25/12-Christmas Day"],
    "Islas Salomón": ["01/01-New Year's Day", "02/02-Día de la Independencia", "01/05-Labor Day", "25/12-Christmas Day"],
    "Israel": ["01/01-New Year's Day", "14/05-Día de la Independencia", "06/10-Yom Kipur", "25/12-Christmas Day"],
    "Italia": ["01/01-Capodanno", "06/01-Epifania", "25/04-Festa della Liberazione", "01/05-Festa dei Lavoratori", "02/06-Festa della Repubblica", "15/08-Ferragosto", "01/11-Ognissanti", "25/12-Natale"],
    "Jamaica": ["01/01-New Year's Day", "21/01-Día de la Juventud", "01/05-Labor Day", "06/08-Día de la Independencia", "25/12-Christmas Day"],
    "Japón": ["01/01-Año Nuevo", "11/02-Día de la Fundación Nacional", "21/03-Día del Equinoccio de Primavera", "29/04-Día de Showa", "03/05-Día de la Constitución", "04/05-Día de la Naturaleza", "05/05-Día de los Niños", "23/11-Día de Acción de Gracias"],
    "Jordania": ["01/01-New Year's Day", "25/05-Día de la Independencia", "01/05-Labor Day"],
    "Kazajistán": ["01/01-New Year's Day", "07/01-Día de la Educación", "08/03-Día Internacional de la Mujer", "01/05-Día de la Unidad del Pueblo", "16/12-Día de la Independencia"],
    "Kenia": ["01/01-New Year's Day", "20/10-Día de Mashujaa", "12/12-Día de la Independencia", "01/05-Labor Day"],
    "Kirguistán": ["01/01-New Year's Day", "23/02-Día del Ejército", "08/03-Día Internacional de la Mujer", "31/08-Día de la Independencia"],
    "Kiribati": ["01/01-New Year's Day", "12/07-Día de la Independencia", "25/12-Christmas Day"],
    "Kuwait": ["01/01-New Year's Day", "25/02-Día Nacional", "01/05-Labor Day"],
    "Laos": ["01/01-Año Nuevo", "13/04-Songkran", "02/12-Día de la Independencia"],
    "Lesoto": ["01/01-New Year's Day", "04/10-Día de la Independencia", "01/05-Labor Day"],
    "Letonia": ["01/01-Año Nuevo", "04/05-Día de la Restauración de la Independencia", "18/11-Día de la Independencia"],
    "Líbano": ["01/01-Año Nuevo", "22/11-Día de la Independencia", "01/05-Labor Day"],
    "Liberia": ["01/01-New Year's Day", "26/07-Día de la Independencia", "01/05-Labor Day"],
    "Libia": ["01/01-Año Nuevo", "17/02-Día de la Revolución", "01/05-Labor Day"],
    "Liechtenstein": ["01/01-Año Nuevo", "15/08-Día Nacional", "25/12-Navidad"],
    "Lituania": ["01/01-Año Nuevo", "16/02-Día de la Restauración de la Independencia", "11/03-Día de la Independencia", "01/05-Día del Trabajo"],
    "Luxemburgo": ["01/01-New Year's Day", "01/05-Labor Day", "23/06-Día Nacional", "25/12-Christmas Day"],
    "Madagascar": ["01/01-Año Nuevo", "26/06-Día de la Independencia", "01/05-Día del Trabajo"],
    "Malasia": ["01/01-New Year's Day", "31/08-Día de la Independencia", "01/05-Labor Day"],
    "Malaui": ["01/01-New Year's Day", "06/07-Día de la Independencia", "01/05-Labor Day"],
    "Maldivas": ["01/01-New Year's Day", "26/07-Día de la Independencia", "01/05-Labor Day"],
    "Malí": ["01/01-Año Nuevo", "20/11-Día de la Independencia", "01/05-Día del Trabajo"],
    "Malta": ["01/01-New Year's Day", "10/02-Día de la Independencia", "01/05-Labor Day", "08/09-Día de la Victoria", "25/12-Christmas Day"],
    "Marruecos": ["01/01-Año Nuevo", "11/01-Día de la Independencia", "01/05-Día del Trabajo", "30/07-Día del Rey", "25/12-Navidad"],    
    "Mauricio": ["01/01-New Year's Day", "12/03-Día de la Independencia", "01/05-Labor Day", "25/12-Christmas Day"],
    "Mauritania": ["01/01-Año Nuevo", "28/11-Día de la Independencia", "01/05-Día del Trabajo"],
    "México": ["01/01-Año Nuevo", "05/02-Día de la Constitución", "21/03-Natalicio de Benito Juárez", "01/05-Día del Trabajo", "16/09-Día de la Independencia", "02/11-Día de los Muertos", "25/12-Navidad"],
    "Micronesia": ["01/01-New Year's Day", "02/11-Día de los Muertos", "04/07-Día de la Independencia"],
    "Moldavia": ["01/01-Año Nuevo", "24/01-Día de la Unificación", "08/03-Día Internacional de la Mujer", "01/05-Día del Trabajo", "27/08-Día de la Independencia"],
    "Mónaco": ["01/01-Año Nuevo", "19/11-Día del Príncipe", "25/12-Navidad"],
    "Mongolia": ["01/01-New Year's Day", "11/07-Día de la Independencia", "25/12-Christmas Day"],
    "Montenegro": ["01/01-New Year's Day", "15/02-Día de la Independencia", "01/05-Labor Day", "21/05-Día de la Libertad"],
    "Mozambique": ["01/01-Año Nuevo", "07/09-Día de la Independencia", "01/05-Día del Trabajo"],
    "Namibia": ["01/01-Año Nuevo", "21/03-Día de la Independencia", "01/05-Día del Trabajo", "26/08-Día de la Libertad"],
    "Nauru": ["01/01-New Year's Day", "31/01-Día de la Independencia", "01/05-Labor Day"],
    "Nepal": ["01/01-Nepali New Year", "29/04-Día del Trabajo", "15/08-Día de la Independencia"]],
    "Nicaragua": ["01/01-Año Nuevo", "04/07-Día de la Independencia", "15/09-Día de la Independencia", "08/12-Día de la Inmaculada Concepción"],
    "Níger": ["01/01-Año Nuevo", "18/12-Día de la Independencia", "01/05-Día del Trabajo"],
    "Nigeria": ["01/01-New Year's Day", "01/10-Día de la Independencia", "01/05-Labor Day"],
    "Noruega": ["01/01-New Year's Day", "17/05-Día de la Constitución", "25/12-Christmas Day"],
    "Nueva Zelanda": ["01/01-New Year's Day", "06/02-Waitangi Day", "01/05-Labor Day", "25/12-Christmas Day"],
    "Omán": ["01/01-New Year's Day", "18/11-Día del Sultanato", "01/05-Labor Day"],
    "Países Bajos": ["01/01-New Year's Day", "27/04-Día del Rey", "05/05-Día de la Libertad", "25/12-Christmas Day"],
    "Pakistán": ["01/01-New Year's Day", "14/08-Día de la Independencia", "01/05-Labor Day"],
    "Palaos": ["01/01-New Year's Day", "24/07-Día de la Independencia", "01/05-Labor Day"],
    "Palestina": ["01/01-New Year's Day", "15/11-Día de la Independencia", "01/05-Labor Day"],
    "Panamá": ["01/01-Año Nuevo", "09/01-Día de los Mártires", "01/05-Día del Trabajo", "03/11-Día de la Independencia"],
    "Papúa Nueva Guinea": ["01/01-New Year's Day", "16/09-Día de la Independencia", "25/12-Christmas Day"],
    "Paraguay": ["01/01-Año Nuevo", "01/03-Día de la Paz del Chaco", "14/05-Día de la Independencia", "15/05-Día de la Independencia", "01/05-Día del Trabajo", "25/12-Navidad"],
    "Perú": ["01/01-Año Nuevo", "11/04-Día de la Mujer", "01/05-Día del Trabajo", "28/07-Día de la Independencia", "29/07-Día de la Independencia", "25/12-Navidad"],
    "Polonia": ["01/01-Año Nuevo", "06/01-Día de los Reyes", "01/05-Día del Trabajo", "03/05-Día de la Constitución", "15/08-Día de la Asunción", "01/11-Todos los Santos", "11/11-Día de la Independencia", "25/12-Navidad", "26/12-Navidad"],
    "Portugal": ["01/01-Año Nuevo", "25/04-Día de la Libertad", "01/05-Día del Trabajo", "10/06-Día de Portugal", "15/08-Asunción de la Virgen", "01/11-Día de Todos los Santos", "25/12-Navidad"],
    "Reino Unido": ["01/01-New Year's Day", "Good Friday (varía)", "Easter Monday (varía)", "01/05-Labor Day", "25/12-Christmas Day", "26/12-Boxing Day"],
    "República Centroafricana": ["01/01-Año Nuevo", "15/03-Día de la Independencia", "01/05-Día del Trabajo", "25/12-Navidad"],
    "República Checa": ["01/01-Año Nuevo", "28/09-Día de San Venceslao", "28/10-Día de la Independencia", "17/11-Día de la Lucha por la Libertad", "24/12-Christmas Eve", "25/12-Navidad", "26/12-Navidad"],
    "República de Macedonia": ["01/01-Año Nuevo", "07/01-Día de la Epifanía", "11/10-Día de la Revolución", "08/09-Día de la Independencia"],
    "República del Congo": ["01/01-Año Nuevo", "15/08-Día de la Independencia", "01/05-Día del Trabajo", "25/12-Navidad"],
    "República Democrática del Congo": ["01/01-Año Nuevo", "30/06-Día de la Independencia", "01/05-Día del Trabajo"],
    "República Dominicana": ["01/01-Año Nuevo", "21/01-Día de la Altagracia", "26/01-Día de Duarte", "27/02-Día de la Independencia", "01/05-Día del Trabajo", "16/08-Día de la Restauración", "25/12-Navidad"],
    "República Sudafricana": ["01/01-New Year's Day", "21/03-Human Rights Day", "27/04-Freedom Day", "01/05-Labor Day", "16/06-Youth Day", "09/08-Women's Day", "24/09-Heritage Day", "16/12-Day of Reconciliation"],
    "Ruanda": ["01/01-New Year's Day", "07/04-Día de la Conmemoración del Genocidio", "01/05-Labor Day", "04/07-Día de la Liberación"],
    "Rumanía": ["01/01-Año Nuevo", "24/01-Día de la Unión", "01/05-Día del Trabajo", "15/08-Asunción de la Virgen", "01/12-Día Nacional"],
    "Rusia": ["01/01-Año Nuevo", "07/01-Navidad", "23/02-Día del Defensor de la Patria", "08/03-Día Internacional de la Mujer", "01/05-Día de la Primavera y del Trabajo", "12/06-Día de Rusia"],
    "Samoa": ["01/01-New Year's Day", "06/06-Día de la Independencia", "01/05-Labor Day", "25/12-Christmas Day"],
    "San Cristóbal y Nieves": ["01/01-New Year's Day", "19/09-Día de la Independencia", "01/05-Labor Day", "25/12-Christmas Day"],
    "San Marino": ["01/01-Año Nuevo", "25/03-Día de la Libertad", "15/08-Assunzione", "01/11-Todos los Santos"],    
    "San Vicente y las Granadinas": ["01/01-New Year's Day", "14/03-Día de la Independencia", "01/05-Labor Day", "25/12-Christmas Day"],
    "Santa Lucía": ["01/01-New Year's Day", "22/02-Día de la Independencia", "01/05-Labor Day", "25/12-Christmas Day"],
    "Santo Tomé y Príncipe": ["01/01-Año Nuevo", "12/07-Día de la Independencia", "01/05-Día del Trabajo"],
    "Senegal": ["01/01-Año Nuevo", "04/04-Día de la Independencia", "01/05-Día del Trabajo", "25/12-Navidad"],
    "Serbia": ["01/01-Año Nuevo", "15/02-Día de la Revolución", "01/05-Día del Trabajo", "11/11-Día de la Armisticio"],
    "Seychelles": ["01/01-New Year's Day", "18/06-Día de la Independencia", "01/05-Labor Day", "25/12-Christmas Day"],
    "Sierra Leona": ["01/01-New Year's Day", "27/04-Día de la Independencia", "01/05-Labor Day"],
    "Singapur": ["01/01-New Year's Day", "01/02-Año Nuevo Chino", "01/05-Labor Day", "09/08-Día Nacional"],
    "Siria": ["01/01-Año Nuevo", "17/04-Día de la Independencia", "01/05-Día del Trabajo"],
    "Somalia": ["01/01-New Year's Day", "01/07-Día de la Independencia", "01/05-Labor Day"],
    "Sri Lanka": ["01/01-New Year's Day", "04/02-Día de la Independencia", "01/05-Labor Day"],
    "Suazilandia": ["01/01-New Year's Day", "25/04-Día de la Independencia", "01/05-Labor Day"],
    "Sudán": ["01/01-New Year's Day", "01/05-Labor Day", "01/01-Día de la Independencia"],
    "Sudán del Sur": ["01/01-New Year's Day", "09/07-Día de la Independencia", "01/05-Labor Day"],
    "Suecia": ["01/01-New Year's Day", "01/05-Día del Trabajo", "06/06-Día Nacional"],
    "Suiza": ["01/01-Año Nuevo", "01/05-Día del Trabajo", "01/08-Día Nacional"],
    "Surinam": ["01/01-New Year's Day", "25/02-Día de la Independencia", "01/05-Labor Day"],
    "Tailandia": ["01/01-New Year's Day", "06/04-Día de Chakri", "01/05-Labor Day", "12/08-Día de la Reina", "05/12-Día del Rey"]],
    "Tanzania": ["01/01-New Year's Day", "26/04-Día de la Revolución", "01/05-Labor Day"],
    "Tayikistán": ["01/01-Año Nuevo", "09/09-Día de la Independencia", "01/05-Día del Trabajo"],
    "Timor Oriental": ["01/01-Año Nuevo", "20/05-Día de la Independencia", "01/05-Labor Day"],
    "Togo": ["01/01-Año Nuevo", "27/04-Día de la Independencia", "01/05-Día del Trabajo"],
    "Tonga": ["01/01-New Year's Day", "04/06-Día de la Independencia", "01/05-Labor Day"],
    "Trinidad y Tobago": ["01/01-New Year's Day", "31/08-Día de la Independencia", "01/05-Labor Day"],
    "Túnez": ["01/01-Año Nuevo", "20/03-Día de la Independencia", "01/05-Día del Trabajo"],
    "Turkmenistán": ["01/01-Año Nuevo", "27/10-Día de la Independencia", "01/05-Día del Trabajo"],
    "Turquía": ["01/01-Año Nuevo", "23/04-Día de la Soberanía Nacional", "01/05-Día del Trabajo", "30/08-Día de la Victoria", "29/10-Día de la República"],
    "Tuvalu": ["01/01-New Year's Day", "01/10-Día de la Independencia", "25/12-Christmas Day"],
    "Ucrania": ["01/01-Año Nuevo", "24/08-Día de la Independencia", "01/05-Día del Trabajo"],
    "Uganda": ["01/01-New Year's Day", "09/10-Día de la Independencia", "01/05-Labor Day"],
    "Uruguay": ["01/01-Año Nuevo", "25/08-Día de la Independencia", "01/05-Día del Trabajo"],
    "Uzbekistán": ["01/01-Año Nuevo", "01/09-Día de la Independencia", "01/05-Día del Trabajo"],
    "Vanuatu": ["01/01-New Year's Day", "30/07-Día de la Independencia", "25/12-Christmas Day"],
    "Venezuela": ["01/01-Año Nuevo", "19/04-Día de la Independencia", "01/05-Día del Trabajo"],
    "Vietnam": ["01/01-Año Nuevo", "30/04-Día de la Reunificación", "01/05-Día del Trabajo"],
    "Yemen": ["01/01-Año Nuevo", "14/10-Día de la Independencia", "01/05-Día del Trabajo"],
    "Yibuti": ["01/01-Año Nuevo", "27/06-Día de la Independencia", "01/05-Día del Trabajo"],
    "Zambia": ["01/01-New Year's Day", "24/10-Día de la Independencia", "01/05-Labor Day"],
    "Zimbabue": ["01/01-New Year's Day", "18/04-Día de la Independencia", "01/05-Labor Day"]
};
const paisesStrings = ["Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia","Australia","Austria","Azerbaiyán","Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia","Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi","Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","Chile","China","Chipre","Ciudad del Vaticano","Colombia","Comoras","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia","Cuba","Dinamarca","Dominica","Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos","Estonia","Etiopía","Filipinas","Finlandia","Fiyi","Francia","Gabón","Gambia","Georgia","Ghana","Granada","Grecia","Guatemala","Guyana","Guinea","Guinea ecuatorial","Guinea-Bisáu","Haití","Honduras","Hungría","India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón","Israel","Italia","Jamaica","Japón","Jordania","Kazajistán","Kenia","Kirguistán","Kiribati","Kuwait","Laos","Lesoto","Letonia","Líbano","Liberia","Libia","Liechtenstein","Lituania","Luxemburgo","Madagascar","Malasia","Malaui","Maldivas","Malí","Malta","Marruecos","Mauricio","Mauritania","México","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique","Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda","Omán","Países Bajos","Pakistán","Palaos","Palestina","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia","Portugal","Reino Unido","República Centroafricana","República Checa","República de Macedonia","República del Congo","República Democrática del Congo","República Dominicana","República Sudafricana","Ruanda","Rumanía","Rusia","Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía","Santo Tomé y Príncipe","Senegal","Serbia","Seychelles","Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Suazilandia","Sudán","Sudán del Sur","Suecia","Suiza","Surinam","Tailandia","Tanzania","Tayikistán","Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía","Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu","Venezuela","Vietnam","Yemen","Yibuti","Zambia","Zimbabue"];

const listaHusosHorarios = ["UTC -12","UTC -11","UTC -10","UTC -9","UTC -8","UTC -7","UTC -6","UTC -5","UTC -4","UTC -3","UTC -2","UTC -1","UTC 0","UTC +1","UTC +2","UTC +3","UTC +4","UTC +4:30","UTC +5","UTC +5:30","UTC +5:45","UTC +6","UTC +6:30","UTC +7","UTC +8","UTC +9","UTC +10","UTC +11","UTC +12","UTC +13","UTC +14","UTC -7 (PST)","UTC -6 (CST)","UTC -5 (EST)","UTC +10 (AEST)","UTC +9:30 (ACST)","UTC +8 (AWST)","UTC +3 (AEDT)","UTC +11 (AEDT)","UTC -4 (AST)","UTC +1 (CET)","UTC +2 (EET)","UTC +3 (MSK)"];

const listaHusosHorariosPorPais = [
    ["UTC -12", ["Baker Island", "Howland Island"]],
    ["UTC -11", ["Samoa", "American Samoa"]],
    ["UTC -10", ["Estados Unidos - Hawái", "Polinesia - Francia", "Tuvalu"]],
    ["UTC -9", ["Estados Unidos - Alaska", "Islas Gambier"]],
    ["UTC -8", ["Canadá", "México"]],
    ["UTC -8 (PST)", ["Estados Unidos - California", "Estados Unidos - Oregón"]],
    ["UTC -7", ["Estados Unidos - Arizona", "Argentina - Mendoza"]],
    ["UTC -6", ["Guatemala", "Honduras", "Belice", "Costa Rica", "El Salvador"]],
    ["UTC -6 (CST)", ["Estados Unidos - Illinois", "México"]],
    ["UTC -5", ["Colombia", "Perú", "Venezuela", "Bahamas", "Cuba", "Ecuador", "Haití", "Jamaica", "Panamá", "Bahamas"]],
    ["UTC -5 (EST)", ["Estados Unidos - Nueva York", "Canadá - Toronto"]],
    ["UTC -4", ["República Dominicana", "Cuba", "Puerto Rico", "Antigua y Barbuda", "Barbados", "Chile", "Dominica", "Granada", "San Cristóbal y Nieves", "San Vicente y las Granadinas", "Santa Lucía", "Trinidad y Tobago"]],
    ["UTC -4 (AST)", ["Venezuela", "Bolivia"]],
    ["UTC -3", ["Argentina", "Uruguay", "Brasil", "Paraguay"]],
    ["UTC -2", ["Islas Georgias del Sur", "Islas Sandwich del Sur"]],
    ["UTC -1", ["Islas Azores (Portugal)", "Islas Cabo Verde", "Cabo Verde"]],
    ["UTC 0", ["Reino Unido", "Portugal", "Gambia", "Burkina Faso", "Costa de Marfil", "Ghana", "Guinea", "Guinea-Bisáu", "Irlanda", "Islandia", "Liberia", "Malí", "Mauritania", "Togo"]],
    ["UTC +1", ["Alemania", "Francia", "Bélgica", "Suecia", "Dinamarca", "Albania", "Andorra", "Angola", "Argelia", "Bélgica", "Benín", "Bosnia y Herzegovina", "Camerún", "Croacia", "Dinamarca", "Eslovaquia", "Eslovenia", "Gabón", "Hungría", "Liechtenstein", "Luxemburgo", "Marruecos", "Mónaco", "Montenegro", "Níger", "Nigeria", "Noruega", "Polonia", "República Centroafricana", "República Checa", "República de Macedonia", "República del Congo", "San Marino", "Suiza"]],
    ["UTC +1 (CET)", ["Suecia", "Dinamarca"]],
    ["UTC +2", ["Grecia", "Israel", "Egipto", "Sudáfrica", "Botsuana", "Bulgaria", "Burundi", "Chipre", "Lesoto", "Libia", "Malawi", "Moldavia", "Mozambique", "República Democrática del Congo", "Suazilandia", "Sudán", "Sudán del Sur", "Ucrania", "Zambia", "Zimbabue"]],
    ["UTC +2 (EET)", ["Finlandia", "Grecia"]],
    ["UTC +3", ["Arabia Saudita", "Etiopía", "Baréin", "Catar", "Comoras", "Etiopía", "Jordania", "Kuwait", "Siria", "Somalia", "Turquía", "Uganda", "Yibuti"]],
    ["UTC +3 (AEDT)", ["Australia - Sydney", "Australia - Melbourne"]],
    ["UTC +3 (MSK)", ["Rusia - Moscú", "Bielorrusia"]],
    ["UTC +4", ["Emiratos Árabes Unidos", "Azerbaiyán", "Mauricio", "Omán"]], 
    ["UTC +4:30", ["Afganistán"]],
    ["UTC +5", ["Pakistán", "Uzbekistán", "Maldivas", "Tayikistán"]],
    ["UTC +5:30", ["Sri Lanka"]],
    ["UTC +5:45", ["Nepal"]],
    ["UTC +6", ["Bangladés", "Bután", "Kazajistán"]],
    ["UTC +6:30", ["Birmania"]],
    ["UTC +7", ["Tailandia", "Vietnam", "Indonesia", "Camboya", "Laos"]],
    ["UTC +8", ["China", "Malasia", "Singapur"]],
    ["UTC +8 (AWST)", ["Australia - Australia Occidental", "Brunéi"]],
    ["UTC +9", ["Japón", "Corea del Sur", "Mongolia", "Palaos", "Timor Oriental"]],
    ["UTC +9:30 (ACST)", ["Australia - Australia del Sur", "Australia - Territorio del Norte"]],
    ["UTC +10", ["Papúa Nueva Guinea", "Micronesia"]],
    ["UTC +10 (AEST)", ["Australia - Nueva Gales del Sur", "Australia - Queensland"]],
    ["UTC +11", ["Vanuatu"]],
    ["UTC +11 (AEDT)", ["Islas Salomón", "Nueva Caledonia"]],
    ["UTC +12", ["Fiyi", "Islas Gilbert", "Kiribati", "Nauru"]],
    ["UTC +13", ["Tonga", "Islas Cook"]],    
];



const inicio = "iniciar sesion"
const registro = "registrarse"

const letrasConTilde = ["á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú"];
const letrasSinTilde = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];

/* ------ Funcionamiento: Texto ------- */
function sacarTildes(palabra) {
    
    let palabraSinTilde = ""
    let eraConTilde = false
    
    for(letra of palabra){
        
        let contador = 0;
        
        for(l of letrasConTilde){
            
            if(letra === l){
                palabraSinTilde += letrasSinTilde[contador];
                eraConTilde = true
                break;
            } else {
                contador += 1;
                continue
            }
        }

        if(eraConTilde){
            eraConTilde = false;
            continue;
        } else {
            palabraSinTilde += letra;
        }
    }

    return palabraSinTilde;
}


/* ------ Funcionamiento: Paises -------- */

function esPaisValido(paisIngresado) {
    for(pais of paisesStrings){
        let paisLowerCase = sacarTildes(pais.toLowerCase());
        paisIngresado = sacarTildes(paisIngresado.toLowerCase())

        if(paisIngresado === paisLowerCase){
            return true;
        }
    }
    return false;
}

function seleccionarPais(nombrePais){
        
    while(esPaisValido(nombrePais) === false){
        nombrePais = prompt("Por favor, ingresar un país válido.")
    }

    return listaPaises.find((elem) => sacarTildes(elem.nombre.toLowerCase()) === sacarTildes(nombrePais.toLowerCase()))

}

function getFactorSumador(huso) {
    let factorSumador;
    let husoSpliteado = huso.split(" ");

    switch(husoSpliteado[1]){
        case "+4:30":
            factorSumador = 4.50
            break
        case "+5:30":
            factorSumador = 5.50
            break
        case "+5:45":
            factorSumador = 4.75
            break
        case "+6:30":
            factorSumador = 6.50
            break
        case "+9:30":
            factorSumador = 9.50
            break
        default:
            factorSumador = parseInt(husoSpliteado[1])
            break
    } 

    return factorSumador;
}


/* ----- BASE DE DATOS ----- */

class Pais {
    constructor (nombre, huso) {
        this.nombre = nombre;
        this.huso = huso;                   //Huso horario correspondiente a ese pais.
        this.feriados = listaFeriados.nombre;           //Lista con los feriados o días no laborables de ese país.
        this.factorSumador = getFactorSumador(huso);
    }
    //Getters
    obtenerFactorSumador() {return this.factorSumador}
    obtenerNombre() {return this.nombre}
    obtenerHusoHorario() {return this.huso}
    obtenerFeriados() {return this.feriados}

    //Metodos
    obtenerStringFeriados() {                     //Retorna un string de todos los feriados concatenados.
        let stringFeriados = "",
        for (feriado of this.feriados){
            stringFeriados += feriado;
            stringFeriados += ", ";
        }
        stringFeriados += ".";
        return stringFeriados;
    }

    calcularDiferenciaHoraria(otroPais) {         //Retorna un entero que representa la diferencia horaria entre dos paises.        
        return Math.abs(this.factorSumador - otroPais.getFactorSumador())
    }


}

function crearListaPaises() {
    let final = [];
    let huso;
    let nombrePais;

    for(let i = 0; i < listaHusosHorariosPorPais.length; i++){
        huso = listaHusosHorariosPorPais[i]
        for(let j = 0; j < listaHusosHorariosPorPais[i].length; j++){
            nombrePais = listaHusosHorariosPorPais[i][j];
            let pais = Pais.new(nombrePais, huso)
            final.push(pais);
        }
    }

    return final;

}

const listaPaises = crearListaPaises();

class Usuario {
    constructor (nombre, apellido, pais, husoHorario, password, mail){
        this.nombre = nombre;
        this.apellido = apellido;
        this.pais = seleccionarPais(pais);
        this.husoHorario = husoHorario;
        this.password = password;
        this.mail = mail;
    }
}



/* -------- Funcionamiento: Inicio de Sesión | Registro -------- */

function usuarioEstaRegistrado(usuarioNuevo) {
    for(usuario of usuariosRegistrados) {
        if(usuario === usuarioNuevo){
            return true
        }
    }
    return false
}

function seleccionarPaisResidencia() {
    pais = promt("Ingrese su país de residencia: ");
    pais = sacarTildes(pais);

    if(esPaisValido(pais)){
        return retornarIndicePais(pais);
    }

}

function crearUsuario() {
    let nombre = prompt("Ingrese su nombre: ");
    let apellido = prompt("Ingrese su apellido: ");
    let pais = seleccionarPais()

}

let registrarUsuario = usuarioIngresado => usuariosRegistrados.unshift(usuarioIngresado);

function ingresarPerfil() {
    let eleccionUsuario = prompt("Bienvenido a TempoClock, el conversor de horarios que te permitirá organizarte a nivel internacional. Para continuar con su perfil, escriba 'Iniciar sesión'. En caso de que no tenga una cuenta creada, escriba 'Registrarse'.")

    while( sacarTildes(eleccionUsuario).toLowerCase() != inicio || sacarTildes(eleccionUsuario).toLowerCase() != registro) {
        eleccionUsuario = prompt ("Opción inválida. Por favor, ingrese 'Iniciar sesión' para ingresar a su cuenta, o 'Registrarse' para crear una nueva cuenta.")
    }

    if(sacarTildes(eleccionUsuario).toLowerCase() === inicio){
        iniciarUsuario(eleccionUsuario)
    }else {
        registrarUsuario(eleccionUsuario)
        iniciarUsuario(eleccionUsuario)
    }

}




/* ------ Funcionamiento: Calcular horas -------- */

function devolverStringHoraActual(pais) {

}



/* ------ PROGRAMA ------ */

// function main() {
    
//     let opcionIngresadaUsuario

//     let nuevoComando = true
//     let paisSeleccionado1
//     let paisSeleccionado2
//     let husoHorarioSeleccionado

//     alert ("Bienvenido al Conversor de horarios TempoClock.")

//     do {
//         opcionIngresadaUsuario = prompt("Para ver una lista de feriados por pais, por favor introduzca la palabra 'feriado'. Para saber que huso horario es un país, introduzca la palabra 'huso'. Si desea salir del programa, ingrese la palabra 'salir'. Otras funciones del programa se encuentran en desarrollo.  Por favor, aguardar a una siguiente instancia de entrega para probar las demás funcionalidades.")
//         while(opcionIngresadaUsuario != "feriado" && opcionIngresadaUsuario != "huso" && opcionIngresadaUsuario != "salir") {
//             opcionIngresadaUsuario = prompt("Para ver una lista de feriados por pais, por favor introduzca la palabra 'feriado'. Para saber que huso horario es un país, introduzca la palabra 'huso'. Si desea salir del programa, ingrese la palabra 'salir'.")
//         }
//         switch(opcionIngresadaUsuario){
//             case "feriado":
//                 paisSeleccionado1 = solicitarUnPais();
//                 alert(paisSeleccionado1.feriados);
//                 nuevoComando = confirm("Desea realizar otra operación?")
//                 break;
//             case "huso":
//                 paisSeleccionado2 = solicitarUnPais();
//                 husoHorarioSeleccionado = paisSeleccionado2.husoHorario
//                 alert(husoHorarioSeleccionado.huso);
//                 nuevoComando = confirm("Desea realizar otra operación?")
//                 break;
//             default:
//                 nuevoComando = false;
//                 break;
//         }
//     } while(nuevoComando)

//         alert("Muchas gracias por usar TempoClock. Vuelva pronto!")
// }

// main()