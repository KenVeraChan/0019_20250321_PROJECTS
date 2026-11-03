const galeriaCajas = document.getElementById("galeriaCajas"); // Contenedor de las cajas de personaje.

function escaparHtml(textoOriginal) { // Evita HTML inyectado en nombres.
    if (textoOriginal === null || textoOriginal === undefined) { // Sin valor.
        return ""; // Vacío.
    }

    return String(textoOriginal) // A cadena.
        .replaceAll("&", "&amp;") // Ampersand.
        .replaceAll("<", "&lt;") // Menor que.
        .replaceAll(">", "&gt;") // Mayor que.
        .replaceAll('"', "&quot;") // Comillas dobles.
        .replaceAll("'", "&#39;"); // Comillas simples.
}

function pintarCampoFicha(etiquetaCampo, valorCampo) { // Una línea de la ficha desplegada.
    const textoSeguro = escaparHtml(valorCampo || "Sin registrar"); // Valor o aviso.
    return `<div class="campo-ficha"><strong>${escaparHtml(etiquetaCampo)}</strong><p>${textoSeguro}</p></div>`; // HTML del campo.
}

function plantillaCajaPersonaje(datosPersonaje, indicePersonaje) { // Tarjeta alargada: nombre y apellidos siempre visibles.
    const claseColor = "color-" + (indicePersonaje % 8); // Color distinto.
    const nombreCompleto = escaparHtml((datosPersonaje.NOMBRE || "") + " " + (datosPersonaje.APELLIDOS || "")).trim(); // Nombre y apellidos.

    return `
        <article class="caja-personaje ${claseColor}" data-indice="${indicePersonaje}">
            <div class="resumen-personaje">${nombreCompleto || "Personaje sin nombre"}</div>
            <div class="detalle-personaje">
                ${pintarCampoFicha("Nombre", datosPersonaje.NOMBRE)}
                ${pintarCampoFicha("Apellidos", datosPersonaje.APELLIDOS)}
                ${pintarCampoFicha("Hobbie", datosPersonaje.HOBBIE)}
                ${pintarCampoFicha("Profesión", datosPersonaje.PROFESION)}
                ${pintarCampoFicha("Simbología personalidad", datosPersonaje.SIMBOLOGIA_PERSONALIDAD)}
                ${pintarCampoFicha("Fecha de nacimiento", datosPersonaje.FECHA_NACIMIENTO)}
                ${pintarCampoFicha("Zona de residencia", datosPersonaje.ZONA_RESIDENCIA)}
            </div>
        </article>
    `; // Caja lista para insertar.
}

function pintarGaleria(listaPersonajes) { // Dibuja todas las cajas desde la base personajes.
    const personajes = Array.isArray(listaPersonajes) ? listaPersonajes : []; // Garantiza un array.

    if (personajes.length === 0) { // Tabla vacía.
        galeriaCajas.innerHTML = `<p class="aviso-vacio">No hay personajes registrados. Use "Introducir personaje nuevo".</p>`; // Aviso.
        return; // Nada más que pintar.
    }

    galeriaCajas.innerHTML = personajes.map(plantillaCajaPersonaje).join(""); // Inserta las cajas.
    activarClicsDeCajas(); // Enlaza el despliegue.
}

function activarClicsDeCajas() { // El clic abre o cierra la ficha completa.
    const cajasPersonaje = document.querySelectorAll(".caja-personaje"); // Todas las cajas.

    cajasPersonaje.forEach(function (cajaPersonaje) { // Recorre cada caja.
        cajaPersonaje.addEventListener("click", function () { // Clic del usuario.
            cajaPersonaje.classList.toggle("abierto"); // Muestra u oculta todos los campos.
        });
    });
}

fetch("transformadorPersonajesJSON.php") // Lee la tabla personajesNovela.
    .then(function (respuestaServidor) { // Respuesta HTTP.
        return respuestaServidor.json(); // Objeto.
    })
    .then(function (datosPersonajes) { // Datos listos.
        pintarGaleria(datosPersonajes); // Pinta las cajas.
    })
    .catch(function (errorLectura) { // Fallo de lectura.
        galeriaCajas.innerHTML = `<p class="aviso-vacio">No se pudieron leer los personajes: ${escaparHtml(errorLectura.message)}</p>`; // Error.
    });
