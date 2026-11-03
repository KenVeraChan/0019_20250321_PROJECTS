/*
 * Interfaz de bloques: foco sobre un bloque, alta de capítulos desde
 * los desplegables de año, baja de capítulo solo con los dos focos,
 * Capítulos y fechas se leen de cronologia (data/datos.sql); al guardar se escribe cronologia.bloque.
 */

const listaDesplegablesBloques = document.getElementById("listaDesplegablesBloques"); // Columna dorada.
const listaDesplegablesAnios = document.getElementById("listaDesplegablesAnios"); // Columna verde.
const campoNombreNuevoBloque = document.getElementById("nombreNuevoBloque"); // Nombre del bloque nuevo.
const botonCrearBloque = document.getElementById("botonCrearBloque"); // Alta de bloque.
const botonAnadirCapitulo = document.getElementById("botonAnadirCapitulo"); // Pasa un capítulo al bloque enfocado.
const botonEliminarBloque = document.getElementById("botonEliminarBloque"); // Baja del bloque enfocado.
const botonEliminarCapitulo = document.getElementById("botonEliminarCapitulo"); // Baja de un capítulo del bloque.
const botonActualizarBase = document.getElementById("botonActualizarBase"); // Escribe cronologia.bloque y el recuento.

let listaBloques = []; // Bloques en memoria (id, NOMBRE, capitulos).
let capitulosPorAnio = []; // [{ anio, capitulos: [{ titulo, fecha, clave }] }] ordenados.
let idBloqueEnfocado = null; // Primer focuslistener: desplegable de bloque.
let claveCapituloEnBloque = ""; // Segundo focuslistener: capítulo dentro del bloque.
let claveCapituloDelAnio = ""; // Capítulo elegido a la derecha para añadir.
let haHabidoAnadiduraCapitulos = false; // El guardado solo se habilita tras añadir.

function escaparHtml(textoOriginal) { // Evita que un nombre se interprete como HTML.
    if (textoOriginal === null || textoOriginal === undefined) { // Si no hay texto.
        return ""; // Vacío.
    }

    return String(textoOriginal) // Cadena.
        .replaceAll("&", "&amp;") // Ampersand.
        .replaceAll("<", "&lt;") // Menor.
        .replaceAll(">", "&gt;") // Mayor.
        .replaceAll('"', "&quot;") // Comillas.
        .replaceAll("'", "&#39;"); // Apóstrofo.
}

function claveCapitulo(tituloCapitulo, fechaCapitulo) { // Identifica título + fecha.
    return String(tituloCapitulo) + "|" + String(fechaCapitulo); // Clave única.
}

function partesFecha(fechaTexto) { // Separa año, mes y día de YYYY-MM-DD.
    const coincidenciaFecha = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(fechaTexto || "")); // Patrón ISO.

    if (!coincidenciaFecha) { // Fecha rara.
        return { anio: 0, mes: 0, dia: 0 }; // Ceros.
    }

    return {
        anio: parseInt(coincidenciaFecha[1], 10), // Año.
        mes: parseInt(coincidenciaFecha[2], 10), // Mes.
        dia: parseInt(coincidenciaFecha[3], 10) // Día.
    };
}

function textoOpcionCapitulo(datosCapitulo) { // Nombre del capítulo y fecha adjunta.
    return datosCapitulo.titulo + " — " + datosCapitulo.fecha; // Una sola línea en el select.
}

function normalizarCapitulo(datosCapitulo) { // Título y fecha que vienen de cronologia.
    const tituloCapitulo = datosCapitulo.titulo || ""; // Nombre.
    const fechaCapitulo = datosCapitulo.fecha || ""; // Fecha.

    return {
        titulo: tituloCapitulo, // De cronologia.titulo.
        fecha: fechaCapitulo, // De cronologia.fecha.
        clave: claveCapitulo(tituloCapitulo, fechaCapitulo) // Clave de interfaz.
    };
}

function normalizarBloqueServidor(filaBloque) { // Fila SQL → objeto de interfaz.
    const listaCruda = Array.isArray(filaBloque.capitulos) ? filaBloque.capitulos : []; // Capítulos de cronologia.

    return {
        id: parseInt(filaBloque.id, 10), // Identificador en bloques.db.
        NOMBRE: filaBloque.NOMBRE || "", // Nombre del bloque.
        capitulos: listaCruda.map(normalizarCapitulo) // Sin copiar otra fuente.
    };
}

function agruparCapitulosPorAnio(filasCronologia) { // Capítulos de cronologia, un desplegable por año.
    const mapaUnicos = new Map(); // Evita título+fecha repetidos.

    filasCronologia.forEach(function (filaEvento) { // Recorre acontecimientos.
        const tituloCapitulo = String(filaEvento.titulo || "").trim(); // Título = capítulo.
        const fechaCapitulo = String(filaEvento.fecha || "").trim(); // Fecha del capítulo.

        if (!tituloCapitulo || !fechaCapitulo) { // Fila incompleta.
            return; // La omite.
        }

        const claveUnica = claveCapitulo(tituloCapitulo, fechaCapitulo); // Título + fecha.

        if (mapaUnicos.has(claveUnica)) { // Ya estaba.
            return; // No duplica.
        }

        const partes = partesFecha(fechaCapitulo); // Año y mes para ordenar.
        mapaUnicos.set(claveUnica, {
            titulo: tituloCapitulo, // Nombre.
            fecha: fechaCapitulo, // Fecha adjunta.
            clave: claveUnica, // Clave.
            anio: partes.anio, // Año del desplegable.
            mes: partes.mes, // Orden interior.
            dia: partes.dia // Desempate.
        });
    });

    const mapaAnios = new Map(); // anio → lista de capítulos.

    mapaUnicos.forEach(function (datosCapitulo) { // Reparte por año.
        const anioCapitulo = datosCapitulo.anio || 0; // Año 0 si la fecha no era ISO.

        if (!mapaAnios.has(anioCapitulo)) { // Primer capítulo de ese año.
            mapaAnios.set(anioCapitulo, []); // Lista nueva.
        }

        mapaAnios.get(anioCapitulo).push(datosCapitulo); // Añade al año.
    });

    const listaAnios = []; // Resultado ordenado.

    Array.from(mapaAnios.keys()).sort(function (anioA, anioB) { // Años de menor a mayor.
        return anioA - anioB; // Numérico.
    }).forEach(function (anioCapitulo) {
        const capitulosDelAnio = mapaAnios.get(anioCapitulo).slice(); // Copia.
        capitulosDelAnio.sort(function (capituloA, capituloB) { // Dentro del año, por mes y día.
            if (capituloA.mes !== capituloB.mes) { // Distinto mes.
                return capituloA.mes - capituloB.mes; // Mes.
            }

            if (capituloA.dia !== capituloB.dia) { // Distinto día.
                return capituloA.dia - capituloB.dia; // Día.
            }

            return capituloA.titulo.localeCompare(capituloB.titulo, "es"); // Nombre.
        });

        listaAnios.push({
            anio: anioCapitulo, // Número de año.
            capitulos: capitulosDelAnio // Opciones del desplegable.
        });
    });

    return listaAnios; // Desplegables de la columna verde.
}

function buscarBloquePorId(idBloque) { // Localiza un bloque en memoria.
    return listaBloques.find(function (datosBloque) { // Recorre.
        return datosBloque.id === idBloque; // Mismo id.
    }) || null; // No está.
}

function actualizarEstadoBotones() { // Habilita o apaga según los dos focos y las altas.
    const hayBloqueEnfocado = idBloqueEnfocado !== null && buscarBloquePorId(idBloqueEnfocado) !== null; // Primer foco.
    const hayCapituloEnBloque = hayBloqueEnfocado && claveCapituloEnBloque !== ""; // Segundo foco.
    const hayCapituloDeAnio = claveCapituloDelAnio !== ""; // Capítulo de la derecha.

    botonEliminarBloque.disabled = !hayBloqueEnfocado; // Solo con bloque elegido.
    botonEliminarCapitulo.disabled = !(hayBloqueEnfocado && hayCapituloEnBloque); // Los dos focos.
    botonAnadirCapitulo.disabled = !(hayBloqueEnfocado && hayCapituloDeAnio); // Bloque + capítulo del año.
    botonActualizarBase.disabled = !haHabidoAnadiduraCapitulos; // Solo tras añadir capítulos.
}

function pintarDesplegablesBloques() { // Columna dorada.
    if (listaBloques.length === 0) { // Todavía no hay bloques.
        listaDesplegablesBloques.innerHTML = '<p class="aviso-columna">No hay bloques. Escribe un nombre y pulsa Añadir bloque.</p>'; // Aviso.
        actualizarEstadoBotones(); // Botones al día.
        return; // Sale.
    }

    listaDesplegablesBloques.innerHTML = listaBloques.map(function (datosBloque) { // Un select por bloque.
        const estaEnfocado = datosBloque.id === idBloqueEnfocado; // Primer foco.
        const tieneCapituloElegido = estaEnfocado && claveCapituloEnBloque !== ""; // Segundo foco.
        const clasesFila = [
            "fila-desplegable", // Base.
            estaEnfocado ? "bloque-enfocado" : "", // Marco del bloque.
            tieneCapituloElegido ? "capitulo-enfocado" : "" // Halo del capítulo.
        ].join(" ").trim(); // Clases CSS.

        const opcionesCapitulos = datosBloque.capitulos.length === 0
            ? '<option value="">Bloque vacío</option>' // Desplegable inicial vacío.
            : '<option value="">Elige un capítulo del bloque</option>' + datosBloque.capitulos.map(function (datosCapitulo) { // Opciones.
                const seleccionado = estaEnfocado && claveCapituloEnBloque === datosCapitulo.clave ? " selected" : ""; // Segundo foco.
                return `<option value="${escaparHtml(datosCapitulo.clave)}"${seleccionado}>${escaparHtml(textoOpcionCapitulo(datosCapitulo))}</option>`; // Título y fecha.
            }).join(""); // Junta opciones.

        return `
            <div class="${clasesFila}" data-id-bloque="${datosBloque.id}">
                <span class="etiqueta-desplegable">${escaparHtml(datosBloque.NOMBRE)}</span>
                <select class="desplegable-bloque" data-id-bloque="${datosBloque.id}" aria-label="Capítulos de ${escaparHtml(datosBloque.NOMBRE)}">
                    ${opcionesCapitulos}
                </select>
            </div>
        `;
    }).join(""); // Junta filas.

    actualizarEstadoBotones(); // Botones al día.
}

function aplicarMarcaFoco() { // Marca visual de los dos focos sin recrear los desplegables.
    const filasBloque = listaDesplegablesBloques.querySelectorAll(".fila-desplegable[data-id-bloque]"); // Filas doradas.

    filasBloque.forEach(function (filaBloque) { // Recorre cada bloque.
        const idFila = parseInt(filaBloque.getAttribute("data-id-bloque"), 10); // Id de esa fila.
        const estaEnfocado = idFila === idBloqueEnfocado; // Primer foco.
        filaBloque.classList.toggle("bloque-enfocado", estaEnfocado); // Marco del bloque.
        filaBloque.classList.toggle("capitulo-enfocado", estaEnfocado && claveCapituloEnBloque !== ""); // Segundo foco.
    });

    actualizarEstadoBotones(); // Botones según focos y altas.
}

function pintarDesplegablesAnios() { // Columna verde diamante.
    if (capitulosPorAnio.length === 0) { // No hay fechas en cronologia.
        listaDesplegablesAnios.innerHTML = '<p class="aviso-columna">No hay capítulos con fecha en acontecimientos.</p>'; // Aviso.
        return; // Sale.
    }

    listaDesplegablesAnios.innerHTML = capitulosPorAnio.map(function (grupoAnio) { // Un select por año.
        const textoAnio = grupoAnio.anio ? String(grupoAnio.anio) : "Sin año"; // Etiqueta al lado.
        const opcionesCapitulos = '<option value="">Elige un capítulo</option>' + grupoAnio.capitulos.map(function (datosCapitulo) { // Opciones.
            const seleccionado = claveCapituloDelAnio === datosCapitulo.clave ? " selected" : ""; // Capítulo a añadir.
            return `<option value="${escaparHtml(datosCapitulo.clave)}"${seleccionado}>${escaparHtml(textoOpcionCapitulo(datosCapitulo))}</option>`; // Nombre y fecha.
        }).join(""); // Junta.

        return `
            <div class="fila-desplegable">
                <span class="etiqueta-desplegable">${escaparHtml(textoAnio)}</span>
                <select class="desplegable-anio" data-anio="${grupoAnio.anio}" aria-label="Capítulos del año ${escaparHtml(textoAnio)}">
                    ${opcionesCapitulos}
                </select>
            </div>
        `;
    }).join(""); // Junta filas.
}

function enfocarBloque(idBloque) { // Primer focuslistener: clic o uso del desplegable del bloque.
    const idNumerico = parseInt(idBloque, 10); // Número.

    if (idBloqueEnfocado !== idNumerico) { // Cambia de bloque.
        claveCapituloEnBloque = ""; // El segundo foco era de otro bloque.
    }

    idBloqueEnfocado = idNumerico; // Bloque activo para altas y bajas.
    aplicarMarcaFoco(); // Marco sin destruir el select (así se puede abrir).
}

function registrarCapituloEnBloqueEnfocado(claveElegida) { // Segundo focuslistener: capítulo del bloque.
    claveCapituloEnBloque = claveElegida || ""; // Vacío = aún no hay segundo foco.
    aplicarMarcaFoco(); // Halo y botones, sin recrear opciones.
}

function registrarCapituloDeAnio(claveElegida) { // Capítulo de la columna verde, listo para añadir.
    claveCapituloDelAnio = claveElegida || ""; // Vacío si vuelve a "Elige un capítulo".
    actualizarEstadoBotones(); // Añadir se enciende si hay bloque enfocado.
}

function buscarCapituloEnAnios(claveBuscada) { // Localiza título y fecha a la derecha.
    let capituloEncontrado = null; // Resultado.

    capitulosPorAnio.forEach(function (grupoAnio) { // Recorre años.
        grupoAnio.capitulos.forEach(function (datosCapitulo) { // Recorre opciones.
            if (datosCapitulo.clave === claveBuscada) { // Coincide.
                capituloEncontrado = datosCapitulo; // Lo guarda.
            }
        });
    });

    return capituloEncontrado; // O null.
}

async function crearBloqueNuevo() { // Pide el nombre y lo guarda vacío en la base.
    const nombreBloque = campoNombreNuevoBloque.value.trim(); // Nombre escrito.

    if (nombreBloque === "") { // Obligatorio.
        window.alert("Escribe el nombre del bloque."); // Aviso.
        return; // No crea.
    }

    try {
        const respuestaServidor = await fetch("crearBloque.php", { // Alta SQL.
            method: "POST", // Envío.
            headers: { "Content-Type": "application/json" }, // JSON.
            body: JSON.stringify({ NOMBRE: nombreBloque }) // Solo el nombre.
        });
        const datosRespuesta = await respuestaServidor.json(); // Cuerpo.

        if (!respuestaServidor.ok) { // Error.
            window.alert(datosRespuesta.error || "No se pudo crear el bloque."); // Aviso.
            return; // Sale.
        }

        const bloqueNuevo = normalizarBloqueServidor(datosRespuesta); // Objeto de interfaz.
        listaBloques.push(bloqueNuevo); // Lo añade a la columna dorada.
        campoNombreNuevoBloque.value = ""; // Limpia el campo.
        idBloqueEnfocado = bloqueNuevo.id; // Primer foco en el bloque nuevo.
        claveCapituloEnBloque = ""; // Aún no hay capítulo dentro.
        pintarDesplegablesBloques(); // Pinta el desplegable vacío.
    } catch (errorRed) { // Fallo de red.
        window.alert("No se pudo crear el bloque: " + errorRed.message); // Detalle.
    }
}

function anadirCapituloAlBloqueEnfocado() { // Pasa el capítulo de la derecha al bloque con foco.
    const bloqueActivo = buscarBloquePorId(idBloqueEnfocado); // Primer foco.
    const capituloElegido = buscarCapituloEnAnios(claveCapituloDelAnio); // Columna verde.

    if (!bloqueActivo || !capituloElegido) { // Falta alguno.
        return; // El botón debería estar apagado.
    }

    const yaEstaEnElBloque = bloqueActivo.capitulos.some(function (datosCapitulo) { // Evita duplicar.
        return datosCapitulo.clave === capituloElegido.clave; // Misma clave.
    });

    if (yaEstaEnElBloque) { // Ya lo tiene.
        window.alert("Ese capítulo ya está en el bloque " + bloqueActivo.NOMBRE + "."); // Aviso.
        return; // No duplica.
    }

    listaBloques.forEach(function (otroBloque) { // Un capítulo solo puede estar en un bloque (columna cronologia.bloque).
        if (otroBloque.id === bloqueActivo.id) { // El bloque activo.
            return; // Lo añade después.
        }

        otroBloque.capitulos = otroBloque.capitulos.filter(function (datosCapitulo) { // Lo saca de los demás.
            return datosCapitulo.clave !== capituloElegido.clave; // Conserva el resto.
        });
    });

    bloqueActivo.capitulos.push({
        titulo: capituloElegido.titulo, // Nombre.
        fecha: capituloElegido.fecha, // Fecha.
        clave: capituloElegido.clave // Clave.
    }); // Añadidura: habilita el guardado.
    haHabidoAnadiduraCapitulos = true; // Condición del botón Actualizar.
    pintarDesplegablesBloques(); // Refresca el desplegable del bloque.
}

function eliminarCapituloDelBloqueEnfocado() { // Requiere los dos focos.
    const bloqueActivo = buscarBloquePorId(idBloqueEnfocado); // Primer foco.

    if (!bloqueActivo || claveCapituloEnBloque === "") { // Falta el segundo foco.
        return; // El botón está apagado.
    }

    bloqueActivo.capitulos = bloqueActivo.capitulos.filter(function (datosCapitulo) { // Quita esa opción.
        return datosCapitulo.clave !== claveCapituloEnBloque; // Conserva el resto.
    });
    claveCapituloEnBloque = ""; // Ya no hay segundo foco.
    pintarDesplegablesBloques(); // Desplegable actualizado.
}

async function eliminarBloqueEnfocado() { // Baja el bloque elegido de la base y de la interfaz.
    const bloqueActivo = buscarBloquePorId(idBloqueEnfocado); // Primer foco.

    if (!bloqueActivo) { // No hay bloque.
        return; // El botón está apagado.
    }

    const confirmaBorrado = window.confirm("¿Eliminar el bloque \"" + bloqueActivo.NOMBRE + "\"?"); // Confirmación.

    if (!confirmaBorrado) { // El usuario cancela.
        return; // No borra.
    }

    try {
        const respuestaServidor = await fetch("eliminarBloque.php", { // DELETE SQL.
            method: "POST", // Envío.
            headers: { "Content-Type": "application/json" }, // JSON.
            body: JSON.stringify({ id: bloqueActivo.id }) // Identificador.
        });
        const datosRespuesta = await respuestaServidor.json(); // Cuerpo.

        if (!respuestaServidor.ok) { // Error.
            window.alert(datosRespuesta.error || "No se pudo eliminar el bloque."); // Aviso.
            return; // Sale.
        }

        listaBloques = listaBloques.filter(function (datosBloque) { // Quita de memoria.
            return datosBloque.id !== bloqueActivo.id; // Conserva los demás.
        });
        idBloqueEnfocado = null; // Sin primer foco.
        claveCapituloEnBloque = ""; // Sin segundo foco.
        pintarDesplegablesBloques(); // Columna dorada.
    } catch (errorRed) { // Fallo de red.
        window.alert("No se pudo eliminar el bloque: " + errorRed.message); // Detalle.
    }
}

async function guardarCambiosEnBase() { // Escribe cronologia.bloque y el recuento CAPITULOS.
    if (!haHabidoAnadiduraCapitulos) { // Condición del enunciado.
        return; // El botón está apagado.
    }

    const payloadBloques = {
        bloques: listaBloques.map(function (datosBloque) { // Cada bloque de la interfaz.
            return {
                id: datosBloque.id, // Identificador.
                NOMBRE: datosBloque.NOMBRE, // Nombre.
                capitulos: datosBloque.capitulos.map(function (datosCapitulo) { // Mismos título y fecha de cronologia.
                    return { titulo: datosCapitulo.titulo, fecha: datosCapitulo.fecha }; // Se escribe cronologia.bloque.
                })
            };
        })
    };

    try {
        const respuestaServidor = await fetch("guardarBloques.php", { // UPDATE.
            method: "POST", // Envío.
            headers: { "Content-Type": "application/json" }, // JSON.
            body: JSON.stringify(payloadBloques) // Todos los bloques.
        });
        const datosRespuesta = await respuestaServidor.json(); // Cuerpo.

        if (!respuestaServidor.ok) { // Error.
            window.alert(datosRespuesta.error || "No se pudo actualizar la base de datos."); // Aviso.
            return; // Sale.
        }

        haHabidoAnadiduraCapitulos = false; // Vuelve a apagar el botón hasta la próxima alta.
        actualizarEstadoBotones(); // Estado visual.
        window.alert("Base de datos de bloques actualizada."); // Confirmación.
    } catch (errorRed) { // Fallo de red.
        window.alert("No se pudo actualizar: " + errorRed.message); // Detalle.
    }
}

listaDesplegablesBloques.addEventListener("mousedown", function (eventoRaton) { // Clic sobre el desplegable del bloque.
    const desplegableBloque = eventoRaton.target.closest(".desplegable-bloque"); // ¿Es el select?

    if (!desplegableBloque || !listaDesplegablesBloques.contains(desplegableBloque)) { // No lo es.
        return; // Ignora.
    }

    enfocarBloque(desplegableBloque.getAttribute("data-id-bloque")); // Primer focuslistener.
});

listaDesplegablesBloques.addEventListener("focusin", function (eventoFoco) { // Teclado o clic: foco nativo del select.
    const desplegableBloque = eventoFoco.target.closest(".desplegable-bloque"); // Select del bloque.

    if (!desplegableBloque || !listaDesplegablesBloques.contains(desplegableBloque)) { // No aplica.
        return; // Ignora.
    }

    enfocarBloque(desplegableBloque.getAttribute("data-id-bloque")); // Primer focuslistener.
});

listaDesplegablesBloques.addEventListener("change", function (eventoCambio) { // Elige un capítulo dentro del bloque.
    const desplegableBloque = eventoCambio.target.closest(".desplegable-bloque"); // Select.

    if (!desplegableBloque || !listaDesplegablesBloques.contains(desplegableBloque)) { // No aplica.
        return; // Ignora.
    }

    enfocarBloque(desplegableBloque.getAttribute("data-id-bloque")); // Asegura el primer foco.
    registrarCapituloEnBloqueEnfocado(desplegableBloque.value); // Segundo focuslistener.
});

listaDesplegablesAnios.addEventListener("change", function (eventoCambio) { // Elige un capítulo de un año.
    const desplegableAnio = eventoCambio.target.closest(".desplegable-anio"); // Select del año.

    if (!desplegableAnio || !listaDesplegablesAnios.contains(desplegableAnio)) { // No aplica.
        return; // Ignora.
    }

    listaDesplegablesAnios.querySelectorAll(".desplegable-anio").forEach(function (otroDesplegable) { // Solo un capítulo de año a la vez.
        if (otroDesplegable !== desplegableAnio) { // Los demás años.
            otroDesplegable.value = ""; // Quita su elección.
        }
    });
    registrarCapituloDeAnio(desplegableAnio.value); // Capítulo listo para Añadir.
});

botonCrearBloque.addEventListener("click", crearBloqueNuevo); // Alta por nombre.
campoNombreNuevoBloque.addEventListener("keydown", function (eventoTeclado) { // Enter en el nombre.
    if (eventoTeclado.key === "Enter") { // Confirma.
        crearBloqueNuevo(); // Crea.
    }
});
botonAnadirCapitulo.addEventListener("click", anadirCapituloAlBloqueEnfocado); // Pasa el capítulo al bloque.
botonEliminarCapitulo.addEventListener("click", eliminarCapituloDelBloqueEnfocado); // Baja capítulo (dos focos).
botonEliminarBloque.addEventListener("click", eliminarBloqueEnfocado); // Baja bloque.
botonActualizarBase.addEventListener("click", guardarCambiosEnBase); // Escribe en bloques.db.

fetch("transformadorBloquesJSON.php") // Un JSON: nombres de bloque + capítulos de cronologia.
    .then(function (respuestaServidor) { return respuestaServidor.json(); }) // Parsea.
    .then(function (datosServidor) { // Payload.
        if (datosServidor && datosServidor.error) { // Fallo PHP.
            throw new Error(datosServidor.error); // Lo muestra.
        }

        const filasBloques = Array.isArray(datosServidor.bloques) ? datosServidor.bloques : []; // Izquierda.
        const filasCapitulos = Array.isArray(datosServidor.capitulos) ? datosServidor.capitulos : []; // Derecha, de cronologia.
        listaBloques = filasBloques.map(normalizarBloqueServidor); // Memoria de bloques.
        capitulosPorAnio = agruparCapitulosPorAnio(filasCapitulos); // Desplegables por año.
        pintarDesplegablesBloques(); // Columna dorada.
        pintarDesplegablesAnios(); // Columna verde.
        actualizarEstadoBotones(); // Los tres botones de acción arrancan apagados.
    })
    .catch(function (errorLectura) { // Fallo de red o JSON.
        listaDesplegablesBloques.innerHTML = `<p class="aviso-columna">No se pudieron leer los bloques: ${escaparHtml(errorLectura.message)}</p>`; // Error.
    });
