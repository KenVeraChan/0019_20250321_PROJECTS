/*
 * Fila de personajes (personajes.db) y reflexiones (reflexones.ideas).
 * Registrar no borra capítulos ni fichas: solo INSERT en ideas, y exige fecha.
 */

const galeriaPaneles = document.getElementById("galeriaPaneles"); // Contenedor de la fila.

let listaPersonajes = []; // NOMBRE y APELLIDOS.
let listaIdeas = []; // Filas de la tabla ideas.
let indicePanelAbierto = null; // Qué panel está desplegado.

function escaparHtml(textoOriginal) { // Evita HTML inyectado.
    if (textoOriginal === null || textoOriginal === undefined) { // Sin valor.
        return ""; // Vacío.
    }

    return String(textoOriginal) // Cadena.
        .replaceAll("&", "&amp;") // Ampersand.
        .replaceAll("<", "&lt;") // Menor.
        .replaceAll(">", "&gt;") // Mayor.
        .replaceAll('"', "&quot;") // Comillas.
        .replaceAll("'", "&#39;"); // Apóstrofo.
}

function clavePersonaje(nombrePersonaje, apellidosPersonaje) { // Empareja ficha e idea.
    return String(nombrePersonaje || "").trim() + "|" + String(apellidosPersonaje || "").trim(); // Clave.
}

function ideasDePersonaje(nombrePersonaje, apellidosPersonaje) { // Reflexiones de esa ficha.
    const claveBuscada = clavePersonaje(nombrePersonaje, apellidosPersonaje); // Clave.

    return listaIdeas.filter(function (filaIdea) { // Recorre ideas.
        return clavePersonaje(filaIdea.NOMBRE, filaIdea.APELLIDOS) === claveBuscada; // Mismo personaje.
    });
}

function pintarListaIdeas(nombrePersonaje, apellidosPersonaje) { // HTML de la lista ya guardada.
    const ideasPersonaje = ideasDePersonaje(nombrePersonaje, apellidosPersonaje); // Filas.

    if (ideasPersonaje.length === 0) { // Aún no hay texto.
        return '<p class="aviso-lista">Este personaje aún no tiene reflexiones.</p>'; // Aviso.
    }

    return ideasPersonaje.map(function (filaIdea) { // Una caja por idea.
        const fechaIdea = filaIdea.FECHA_IDEA || ""; // Columna FECHA IDEA.
        const textoIdea = filaIdea.REFLEXION || ""; // Texto.
        return `<article class="item-idea"><strong>${escaparHtml(fechaIdea)}</strong><p>${escaparHtml(textoIdea)}</p></article>`; // Fecha + reflexión.
    }).join(""); // Junta.
}

function plantillaPanelPersonaje(datosPersonaje, indicePersonaje) { // Panel en la fila.
    const claseColor = "color-" + (indicePersonaje % 8); // Color distinto, misma fuente.
    const nombreCompleto = ((datosPersonaje.NOMBRE || "") + " " + (datosPersonaje.APELLIDOS || "")).trim(); // Nombre y apellidos.
    const estaAbierto = indicePanelAbierto === indicePersonaje; // Desplegado.
    const claseAbierto = estaAbierto ? " abierto" : ""; // Clase CSS.

    return `
        <article class="panel-personaje ${claseColor}${claseAbierto}" data-indice="${indicePersonaje}">
            <div class="resumen-personaje">${escaparHtml(nombreCompleto || "Personaje sin nombre")}</div>
            <div class="detalle-reflexiones">
                <div class="lista-ideas">${pintarListaIdeas(datosPersonaje.NOMBRE, datosPersonaje.APELLIDOS)}</div>
                <textarea class="texto-reflexion" rows="3" placeholder="Escribe una reflexión de este personaje"></textarea>
                <div class="fila-acciones">
                    <input class="fecha-idea" type="date" aria-label="Fecha de la idea">
                    <button type="button" class="btn-accion boton-registrar" disabled>Registrar reflexion del personaje</button>
                    <button type="button" class="btn-accion boton-cancelar">Cancelar</button>
                </div>
            </div>
        </article>
    `; // Panel listo.
}

function pintarGaleria() { // Dibuja la fila de personajes.
    if (listaPersonajes.length === 0) { // No hay fichas.
        galeriaPaneles.innerHTML = '<p class="aviso-vacio">No hay personajes registrados. Créalos primero en Personajes.</p>'; // Aviso.
        return; // Sale.
    }

    galeriaPaneles.innerHTML = listaPersonajes.map(plantillaPanelPersonaje).join(""); // Fila.
    activarInteraccionesPaneles(); // Clic, fecha y botones.
}

function actualizarBotonRegistrar(panelPersonaje) { // Sin fecha no se guarda.
    const campoFecha = panelPersonaje.querySelector(".fecha-idea"); // Desplegable de fecha.
    const botonRegistrar = panelPersonaje.querySelector(".boton-registrar"); // Guardar.

    if (!campoFecha || !botonRegistrar) { // Falta el formulario.
        return; // Sale.
    }

    botonRegistrar.disabled = campoFecha.value.trim() === ""; // Obligatorio elegir fecha.
}

function activarInteraccionesPaneles() { // Clic en panel, fecha, registrar y cancelar.
    const panelesPersonaje = document.querySelectorAll(".panel-personaje"); // Todos.

    panelesPersonaje.forEach(function (panelPersonaje) { // Recorre.
        const indicePersonaje = parseInt(panelPersonaje.getAttribute("data-indice"), 10); // Índice.
        const campoFecha = panelPersonaje.querySelector(".fecha-idea"); // Fecha.
        const botonRegistrar = panelPersonaje.querySelector(".boton-registrar"); // Alta.
        const botonCancelar = panelPersonaje.querySelector(".boton-cancelar"); // Repliega.

        panelPersonaje.addEventListener("click", function (eventoClic) { // Clic en el panel.
            if (eventoClic.target.closest(".detalle-reflexiones")) { // Clic dentro de la lista o el formulario.
                return; // No repliega ni cambia de panel.
            }

            indicePanelAbierto = indicePanelAbierto === indicePersonaje ? null : indicePersonaje; // Abre o cierra.
            pintarGaleria(); // Un solo desplegable a la vez.
        });

        if (campoFecha) { // Hay fecha.
            campoFecha.addEventListener("input", function () { // Cambia la fecha.
                actualizarBotonRegistrar(panelPersonaje); // Enciende registrar.
            });
            campoFecha.addEventListener("change", function () { // Elige en el desplegable.
                actualizarBotonRegistrar(panelPersonaje); // Enciende registrar.
            });
            actualizarBotonRegistrar(panelPersonaje); // Estado inicial.
        }

        if (botonRegistrar) { // Hay botón de alta.
            botonRegistrar.addEventListener("click", function (eventoClic) { // Guardar.
                eventoClic.stopPropagation(); // No cierra el panel.
                registrarReflexionDePanel(panelPersonaje, indicePersonaje); // INSERT en ideas.
            });
        }

        if (botonCancelar) { // Hay cancelar.
            botonCancelar.addEventListener("click", function (eventoClic) { // Repliega.
                eventoClic.stopPropagation(); // Evita el toggle del artículo.
                indicePanelAbierto = null; // Ninguno abierto.
                pintarGaleria(); // Cierra el desplegable.
            });
        }
    });
}

async function registrarReflexionDePanel(panelPersonaje, indicePersonaje) { // INSERT en reflexones.ideas.
    const datosPersonaje = listaPersonajes[indicePersonaje]; // Ficha.
    const campoFecha = panelPersonaje.querySelector(".fecha-idea"); // Fecha.
    const campoTexto = panelPersonaje.querySelector(".texto-reflexion"); // Reflexión.
    const botonRegistrar = panelPersonaje.querySelector(".boton-registrar"); // Botón.

    if (!datosPersonaje || !campoFecha || !campoTexto) { // Falta contexto.
        return; // Sale.
    }

    const fechaIdea = campoFecha.value.trim(); // YYYY-MM-DD.

    if (fechaIdea === "") { // Condición del enunciado.
        window.alert("Elige una fecha para guardar la reflexión."); // Aviso.
        if (botonRegistrar) { // Existe el botón.
            botonRegistrar.disabled = true; // Sigue apagado.
        }
        return; // No llama al servidor.
    }

    const textoReflexion = campoTexto.value.trim(); // Texto.

    if (textoReflexion === "") { // Vacío.
        window.alert("Escribe la reflexión del personaje."); // Aviso.
        return; // No guarda.
    }

    try {
        const respuestaServidor = await fetch("registrarReflexion.php", { // Alta SQL.
            method: "POST", // Envío.
            headers: { "Content-Type": "application/json" }, // JSON.
            body: JSON.stringify({
                NOMBRE: datosPersonaje.NOMBRE, // De personajes.
                APELLIDOS: datosPersonaje.APELLIDOS, // De personajes.
                REFLEXION: textoReflexion, // Texto nuevo.
                FECHA_IDEA: fechaIdea // Columna FECHA IDEA.
            })
        });
        const datosRespuesta = await respuestaServidor.json(); // Cuerpo.

        if (!respuestaServidor.ok) { // Error.
            window.alert(datosRespuesta.error || "No se pudo registrar la reflexión."); // Aviso.
            return; // Sale.
        }

        listaIdeas.push({
            id: datosRespuesta.id, // Nuevo id.
            NOMBRE: datosRespuesta.NOMBRE, // Nombre.
            APELLIDOS: datosRespuesta.APELLIDOS, // Apellidos.
            REFLEXION: datosRespuesta.REFLEXION, // Texto.
            FECHA_IDEA: datosRespuesta.FECHA_IDEA // Fecha.
        }); // La lista se actualiza sin borrar nada de cronologia ni de personajes.
        indicePanelAbierto = indicePersonaje; // El panel sigue abierto.
        pintarGaleria(); // Refresca la lista de ideas.
    } catch (errorRed) { // Fallo de red.
        window.alert("No se pudo registrar: " + errorRed.message); // Detalle.
    }
}

fetch("transformadorReflexionesJSON.php") // Personajes + ideas.
    .then(function (respuestaServidor) { return respuestaServidor.json(); }) // Parsea.
    .then(function (datosServidor) { // Payload.
        if (datosServidor && datosServidor.error && (!datosServidor.personajes || datosServidor.personajes.length === 0)) { // Fallo grave.
            throw new Error(datosServidor.error); // Lo muestra.
        }

        listaPersonajes = Array.isArray(datosServidor.personajes) ? datosServidor.personajes : []; // Fila de paneles.
        listaIdeas = Array.isArray(datosServidor.ideas) ? datosServidor.ideas : []; // Tabla ideas.
        pintarGaleria(); // Primera pintura.
    })
    .catch(function (errorLectura) { // Fallo.
        galeriaPaneles.innerHTML = `<p class="aviso-vacio">No se pudieron leer personajes o reflexiones: ${escaparHtml(errorLectura.message)}</p>`; // Error.
    });
