// cartografia.js: pinta planetas padre y continentes hijo leídos de transformadorJSON.php.
// Cada línea de lógica lleva comentario para el equipo que mantenga la novela.

// Contenedor donde se pintan los paneles padre e hijo.
const galeriaPaneles = document.getElementById("galeriaPaneles");

// Escapa texto para que no se interprete como HTML.
function escaparHtml(textoOriginal) {
    if (textoOriginal === null || textoOriginal === undefined) { // Si no hay valor, se pinta vacío.
        return ""; // Cadena vacía segura.
    }

    return String(textoOriginal) // Convierte el valor a texto.
        .replaceAll("&", "&amp;") // Escapa ampersand.
        .replaceAll("<", "&lt;") // Escapa menor que.
        .replaceAll(">", "&gt;") // Escapa mayor que.
        .replaceAll('"', "&quot;") // Escapa comillas dobles.
        .replaceAll("'", "&#39;"); // Escapa comillas simples.
}

// Devuelve un párrafo de ficha con etiqueta y valor.
function pintarCampoFicha(etiquetaCampo, valorCampo) {
    const textoSeguro = escaparHtml(valorCampo || "Sin registrar"); // Texto visible o aviso.
    return `<div class="campo-ficha"><strong>${escaparHtml(etiquetaCampo)}</strong><p>${textoSeguro}</p></div>`; // Caja de lectura.
}

// Construye el HTML de un planeta padre y sus continentes hijos.
function plantillaPlaneta(datosPlaneta, indicePlaneta) {
    const claseColorPlaneta = "color-" + (indicePlaneta % 12); // Color distinto y cíclico.
    const nombrePlaneta = escaparHtml(datosPlaneta.nombre_planeta || "Planeta sin nombre"); // Nombre visible.
    const listaContinentes = Array.isArray(datosPlaneta.continentes) ? datosPlaneta.continentes : []; // Hijos del planeta.

    let htmlContinentes = ""; // Acumulador de paneles hijo.

    listaContinentes.forEach(function (datosContinente, indiceContinente) { // Recorre cada continente.
        htmlContinentes += plantillaContinente(datosContinente, indicePlaneta, indiceContinente); // Añade el panel hijo.
    });

    if (htmlContinentes === "") { // Si el planeta aún no tiene continentes.
        htmlContinentes = `<p class="aviso-vacio">Este planeta todavía no tiene continentes registrados.</p>`; // Aviso al usuario.
    }

    return `
        <article class="panel-planeta ${claseColorPlaneta}" data-tipo="planeta" data-indice="${indicePlaneta}">
            <div class="resumen-planeta">${nombrePlaneta}</div>
            <div class="detalle-planeta">
                ${pintarCampoFicha("Intensidad gravitatoria", datosPlaneta.intensidad_gravitatoria)}
                ${pintarCampoFicha("Masa del planeta", datosPlaneta.masa_planeta)}
                ${pintarCampoFicha("Radio del planeta", datosPlaneta.radio_planeta)}
                ${pintarCampoFicha("Superficie total", datosPlaneta.superficie_total)}
                ${pintarCampoFicha("Volumen total", datosPlaneta.volumen_total)}
                ${pintarCampoFicha("Velocidad de escape", datosPlaneta.velocidad_escape)}
                ${pintarCampoFicha("Densidad total", datosPlaneta.densidad_total)}
                ${pintarCampoFicha("Velocidad de rotación", datosPlaneta.velocidad_rotacion)}
                ${pintarCampoFicha("Período de rotación", datosPlaneta.periodo_rotacion)}
                ${pintarCampoFicha("Duración del día", datosPlaneta.duracion_dia)}
                ${pintarCampoFicha("Período de traslación a su sol", datosPlaneta.periodo_traslacion)}
                ${pintarCampoFicha("Tiempo en que llega la luz del sol", datosPlaneta.tiempo_luz_sol)}
                ${pintarCampoFicha("Distancia al sol desde Ambur", datosPlaneta.distancia_sol_ambur)}
                ${pintarCampoFicha("Distancia anterior en U.A. (Tierra)", datosPlaneta.distancia_ua_tierra)}
                ${pintarCampoFicha("Grosor completo de la atmósfera", datosPlaneta.grosor_atmosfera)}
                ${pintarCampoFicha("Continentes en el planeta Ambur", datosPlaneta.continentes_en_ambur)}
            </div>
            <div class="lista-continentes">${htmlContinentes}</div>
        </article>
    `; // Panel padre listo para insertar. Los hijos se ven compactos desde el primer momento.
}

// Construye el HTML de un continente hijo (compacto: nombre + coordenadas).
function plantillaContinente(datosContinente, indicePlaneta, indiceContinente) {
    const claseColorContinente = "color-" + ((indicePlaneta + indiceContinente + 3) % 12); // Color distinto al padre.
    const nombreContinente = escaparHtml(datosContinente.nombre_continente || "Continente sin nombre"); // Apartado 0.
    const coordenadasContinente = escaparHtml(datosContinente.coordenadas_geograficas || "Coordenadas sin registrar"); // Apartado 11.
    const listaEventos = Array.isArray(datosContinente.eventos_historicos) ? datosContinente.eventos_historicos : []; // Apartado 13.

    let htmlEventos = ""; // Acumulador de eventos históricos.

    listaEventos.forEach(function (datosEvento, indiceEvento) { // Recorre cada evento.
        const numeroEvento = indiceEvento + 1; // Numeración humana.
        htmlEventos += pintarCampoFicha("Evento histórico " + numeroEvento, datosEvento.texto_evento); // Pinta el texto.
    });

    if (htmlEventos === "") { // Si no hay eventos.
        htmlEventos = pintarCampoFicha("Eventos históricos territoriales", "Sin eventos registrados"); // Aviso.
    }

    return `
        <article class="panel-continente ${claseColorContinente}" data-tipo="continente">
            <div class="resumen-continente">
                <span class="nombre-continente">${nombreContinente}</span>
                <span class="coordenadas-continente">${coordenadasContinente}</span>
            </div>
            <div class="detalle-continente">
                ${pintarCampoFicha("0) Nombre del continente", datosContinente.nombre_continente)}
                ${pintarCampoFicha("1) Características territoriales", datosContinente.caracteristicas_territoriales)}
                ${pintarCampoFicha("2) Empleos más destacados", datosContinente.empleos_destacados)}
                ${pintarCampoFicha("3) Financiación destacada del gobierno estatal", datosContinente.financiacion_estatal)}
                ${pintarCampoFicha("4) Importaciones más exigidas", datosContinente.importaciones)}
                ${pintarCampoFicha("5) Exportaciones más exigidas", datosContinente.exportaciones)}
                ${pintarCampoFicha("6) Fuerzas militares", datosContinente.fuerzas_militares)}
                ${pintarCampoFicha("7) Climatología en primavera", datosContinente.clima_primavera)}
                ${pintarCampoFicha("8) Climatología en verano", datosContinente.clima_verano)}
                ${pintarCampoFicha("9) Climatología en otoño", datosContinente.clima_otono)}
                ${pintarCampoFicha("10) Climatología en invierno", datosContinente.clima_invierno)}
                ${pintarCampoFicha("11) Colocación coordenadas geográficas", datosContinente.coordenadas_geograficas)}
                ${pintarCampoFicha("12) Zona horaria territorial", datosContinente.zona_horaria)}
                ${htmlEventos}
            </div>
        </article>
    `; // Panel hijo listo para insertar.
}

// Pinta toda la galería a partir del JSON de la base de datos.
function pintarGaleria(listaPlanetas) {
    const planetas = Array.isArray(listaPlanetas) ? listaPlanetas : []; // Garantiza un array.

    if (planetas.length === 0) { // No hay filas en la tabla planetas.
        galeriaPaneles.innerHTML = `<p class="aviso-vacio">No hay planetas registrados. Use "Registrar planeta" y después "Registrar continente".</p>`; // Mensaje de consulta vacía.
        return; // No hay más que pintar.
    }

    galeriaPaneles.innerHTML = planetas.map(plantillaPlaneta).join(""); // Inserta todos los paneles.
    activarClicksDePaneles(); // Enlaza clics para desplegar fichas.
}

// El hover solo desliza; el clic abre o cierra la ficha completa.
function activarClicksDePaneles() {
    const panelesPlaneta = document.querySelectorAll(".panel-planeta"); // Todos los padres.

    panelesPlaneta.forEach(function (panelPlaneta) { // Recorre cada planeta.
        panelPlaneta.addEventListener("click", function (eventoClick) { // Clic en el padre.
            if (eventoClick.target.closest(".panel-continente")) { // Si el clic nació en un hijo.
                return; // El hijo se encarga de su propio despliegue.
            }

            panelPlaneta.classList.toggle("abierto"); // Abre o cierra la ficha del planeta.
        });
    });

    const panelesContinente = document.querySelectorAll(".panel-continente"); // Todos los hijos.

    panelesContinente.forEach(function (panelContinente) { // Recorre cada continente.
        panelContinente.addEventListener("click", function (eventoClick) { // Clic en el hijo.
            eventoClick.stopPropagation(); // No abre/cierra el planeta a la vez.
            panelContinente.classList.toggle("abierto"); // Abre o cierra la ficha del continente.
        });
    });
}

// Carga los datos ya registrados en la base cartografia.
fetch("transformadorJSON.php") // Pide el JSON de planetas y continentes.
    .then(function (respuestaServidor) { // Recibe la respuesta HTTP.
        return respuestaServidor.json(); // Convierte el cuerpo a objeto.
    })
    .then(function (datosCartografia) { // Datos listos.
        pintarGaleria(datosCartografia); // Dibuja paneles de consulta.
    })
    .catch(function (errorLectura) { // Si falla la lectura.
        galeriaPaneles.innerHTML = `<p class="aviso-vacio">No se pudieron leer los datos: ${escaparHtml(errorLectura.message)}</p>`; // Muestra el error.
    });
