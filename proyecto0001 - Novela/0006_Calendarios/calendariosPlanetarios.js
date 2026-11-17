const nombresDiaSemana = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"]; // Etiquetas de pantalla; los días por mes salen de planetas.dias_mes.
const nombresMes = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]; // Doce nombres civiles.

let mapaZonasHorarias = {}; // Datos de la base horarios, tabla zonas_horarias.

const desplegablePlaneta = document.getElementById("planetaReferencia"); // Desplegable del planeta de origen.
const campoFechaReferencia = document.getElementById("fechaReferencia"); // Fecha civil de origen.
const campoHoraReferencia = document.getElementById("horaReferencia"); // Hora planetaria de origen.
const campoMinutoReferencia = document.getElementById("minutoReferencia"); // Minuto de origen.
const textoNombreDiaSemana = document.getElementById("nombreDiaSemana"); // Palabra del día junto a la fecha.
const listaTarjetas = document.getElementById("listaTarjetas"); // Contenedor de tarjetas destino.
const nombresDiaCalendario = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]; // Orden de Date.getDay() (0 = domingo).

let listaPlanetas = []; // Planetas leídos de la base cartografia (desplegable).
let segundosUniversalesActuales = 0; // Instante calculado a partir del formulario.

function escaparHtml(textoOriginal) { // Evita que un nombre se interprete como HTML.
    if (textoOriginal === null || textoOriginal === undefined) { // Si no hay texto.
        return ""; // Devuelve vacío.
    }

    return String(textoOriginal) // Convierte a cadena.
        .replaceAll("&", "&amp;") // Escapa ampersand.
        .replaceAll("<", "&lt;") // Escapa menor que.
        .replaceAll(">", "&gt;") // Escapa mayor que.
        .replaceAll('"', "&quot;") // Escapa comillas dobles.
        .replaceAll("'", "&#39;"); // Escapa comillas simples.
}

function normalizarNombrePlaneta(nombrePlaneta) { // Compara nombres sin mayúsculas ni acentos raros.
    return String(nombrePlaneta || "").trim().toLowerCase(); // Minúsculas y sin espacios extra.
}

function extraerPrimerNumero(textoOrigen, valorPorDefecto) { // Lee "30 horas" o "292 dias" desde la base cartografia.
    const coincidencia = String(textoOrigen ?? "").replace(",", ".").match(/-?\d+(?:\.\d+)?/); // Primer número.
    if (!coincidencia) { // No hay cifra.
        return valorPorDefecto; // Valor de respaldo.
    }

    const numeroLeido = parseFloat(coincidencia[0]); // Convierte.
    if (!Number.isFinite(numeroLeido) || numeroLeido <= 0) { // Inválido.
        return valorPorDefecto; // Respaldo.
    }

    return numeroLeido; // Número usable.
}

function partirDiasMes(textoDiasMes, diasPorAnio) { // Convierte planetas.dias_mes ("24,24,25,...") en 12 enteros.
    const listaDias = String(textoDiasMes || "").split(/[,\s]+/).map(function (trozo) { // Parte por comas.
        return parseInt(trozo, 10); // Entero.
    }).filter(function (numeroDia) { // Quita basura.
        return Number.isFinite(numeroDia) && numeroDia > 0; // Solo días positivos.
    });

    if (listaDias.length === 12) { // Serie completa en la base.
        return listaDias; // Tal cual está en dias_mes.
    }

    const diasEnteros = Math.max(12, Math.round(diasPorAnio || 365)); // Reparte el año si faltara la columna.
    const diasBase = Math.floor(diasEnteros / 12); // Base por mes.
    let diasSobrantes = diasEnteros - diasBase * 12; // Resto.
    const listaReparto = []; // Acumulador.

    for (let indiceMes = 0; indiceMes < 12; indiceMes++) { // Doce meses.
        listaReparto.push(diasBase + (diasSobrantes > 0 ? 1 : 0)); // Un día extra mientras quede resto.
        if (diasSobrantes > 0) { // Aún hay resto.
            diasSobrantes -= 1; // Lo consume.
        }
    }

    return listaReparto; // Serie de emergencia.
}

function construirCalendario(datosPlaneta) { // Horas, año y meses salen de planetas (cartografia.db), no de constantes.
    const horasPorDia = extraerPrimerNumero(datosPlaneta.duracion_dia, extraerPrimerNumero(datosPlaneta.periodo_rotacion, 24)); // duracion_dia.
    const diasPorAnio = extraerPrimerNumero(datosPlaneta.periodo_traslacion, 365); // periodo_traslacion.
    const diasDeCadaMes = partirDiasMes(datosPlaneta.dias_mes, diasPorAnio); // dias_mes.

    return { // Calendario del planeta leído.
        horasPorDia: horasPorDia,
        diasPorAnio: diasPorAnio,
        diasDeCadaMes: diasDeCadaMes
    };
}

function continentesDesdeBaseHorarios(nombrePlaneta) { // Lee continentes y regiones de horarios.zonas_horarias.
    const claveExacta = Object.keys(mapaZonasHorarias).find(function (clavePlaneta) { // Busca Ambur / Tierra sin importar mayúsculas.
        return normalizarNombrePlaneta(clavePlaneta) === normalizarNombrePlaneta(nombrePlaneta); // Misma clave.
    });

    if (!claveExacta) { // Ese planeta no está en la tabla.
        return []; // Sin franjas.
    }

    return Array.isArray(mapaZonasHorarias[claveExacta]) ? mapaZonasHorarias[claveExacta] : []; // Lista de continentes.
}

function fechaCivilASegundos(anio, mes, dia, hora, minuto, calendario) { // Pasa fecha planetaria a segundos desde el año 1.
    const anioSeguro = Math.max(1, anio); // Año mínimo 1.
    const mesSeguro = Math.min(12, Math.max(1, mes)); // Mes entre 1 y 12.
    const diasDelMes = calendario.diasDeCadaMes[mesSeguro - 1]; // Tope de días de ese mes.
    const diaSeguro = Math.min(diasDelMes, Math.max(1, dia)); // Día válido en ese mes.
    const horaSegura = Math.max(0, Math.min(calendario.horasPorDia - 1, hora)); // Hora dentro del día planetario.
    const minutoSeguro = Math.max(0, Math.min(59, minuto)); // Minuto 0-59.
    const segundosPorDia = calendario.horasPorDia * 3600; // Un día en segundos.

    let diasAcumulados = (anioSeguro - 1) * calendario.diasPorAnio; // Días de los años anteriores.

    for (let indiceMes = 0; indiceMes < mesSeguro - 1; indiceMes++) { // Suma los meses ya cumplidos.
        diasAcumulados += calendario.diasDeCadaMes[indiceMes]; // Días de ese mes.
    }

    diasAcumulados += diaSeguro - 1; // Días del mes actual ya transcurridos.

    return diasAcumulados * segundosPorDia + horaSegura * 3600 + minutoSeguro * 60; // Instante en segundos.
}

function formatearHora(horaEntera, minutoEntero) { // Texto HH:MM, con 2 o 3 dígitos de hora.
    const textoHora = String(horaEntera).padStart(horaEntera >= 100 ? 3 : 2, "0"); // Hora con ceros a la izquierda.
    const textoMinuto = String(minutoEntero).padStart(2, "0"); // Minuto con dos dígitos.
    return textoHora + ":" + textoMinuto; // Hora lista para la pastilla.
}

function segundosAFechaCivil(segundosUniversales, calendario, desfaseHoras) { // Convierte el instante a fecha local de una fase.
    const segundosPorDia = calendario.horasPorDia * 3600; // Duración del día destino.
    const segundosPorAnio = calendario.diasPorAnio * segundosPorDia; // Duración del año destino.
    let segundosLocales = segundosUniversales + desfaseHoras * 3600; // Aplica la zona de esa fase.

    const signoAnio = segundosLocales < 0 ? -1 : 1; // Por si el desfase cruza el origen.
    segundosLocales = Math.abs(segundosLocales); // Trabaja con magnitud positiva.

    let anio = Math.floor(segundosLocales / segundosPorAnio) + 1; // Año civil.
    let restoSegundos = segundosLocales - (anio - 1) * segundosPorAnio; // Resto dentro del año.

    if (signoAnio < 0) { // Instante anterior al año 1.
        anio = 1; // Se queda en el origen visible.
        restoSegundos = 0; // Medianoche del primer día.
    }

    let mes = 1; // Empieza en enero.

    for (let indiceMes = 0; indiceMes < 12; indiceMes++) { // Recorre los doce meses.
        const segundosDelMes = calendario.diasDeCadaMes[indiceMes] * segundosPorDia; // Duración de ese mes.

        if (restoSegundos >= segundosDelMes && indiceMes < 11) { // Todavía cabe un mes más.
            restoSegundos -= segundosDelMes; // Resta ese mes.
            mes += 1; // Avanza de mes.
        } else { // Este es el mes actual.
            break; // Sale del bucle.
        }
    }

    const dia = Math.floor(restoSegundos / segundosPorDia) + 1; // Día del mes.
    restoSegundos = restoSegundos % segundosPorDia; // Resto dentro del día.
    const horaEntera = Math.floor(restoSegundos / 3600); // Hora planetaria (0-23 o 0-29).
    const minutoEntero = Math.floor((restoSegundos % 3600) / 60); // Minuto.
    const diasDesdeOrigen = Math.floor((segundosUniversales + desfaseHoras * 3600) / segundosPorDia); // Día corrido para la semana.
    const nombreDia = nombresDiaSemana[((diasDesdeOrigen % 7) + 7) % 7]; // Nombre del día de la semana.
    const nombreMes = nombresMes[mes - 1]; // Nombre del mes.

    return { // Fecha lista para pintar.
        nombreDia: nombreDia, // Lunes, martes...
        dia: dia, // Número de día.
        nombreMes: nombreMes, // Enero, febrero...
        anio: anio, // Año.
        hora: formatearHora(horaEntera, minutoEntero) // Hora local de la fase.
    };
}

function reglasContinentesDePlaneta(nombrePlaneta) { // Compatibilidad: ahora sale de la base horarios.
    return continentesDesdeBaseHorarios(nombrePlaneta); // Continentes y regiones de zonas_horarias.
}

function leerFechaDelFormulario() { // Lee fecha, hora y minuto del bloque superior.
    const valorFecha = campoFechaReferencia.value; // YYYY-MM-DD o vacío.
    const ahora = new Date(); // Reloj del navegador, por si falta la fecha.
    const trozosFecha = (valorFecha || "").split("-"); // Parte la fecha.

    return { // Estructura numérica.
        anio: parseInt(trozosFecha[0], 10) || ahora.getFullYear(), // Año de origen.
        mes: parseInt(trozosFecha[1], 10) || (ahora.getMonth() + 1), // Mes de origen.
        dia: parseInt(trozosFecha[2], 10) || ahora.getDate(), // Día de origen.
        hora: parseInt(campoHoraReferencia.value, 10) || 0, // Hora de origen.
        minuto: parseInt(campoMinutoReferencia.value, 10) || 0 // Minuto de origen.
    };
}

function ajustarLimiteHora() { // Cambia el máximo de hora al cambiar de planeta (24 o 30).
    const identificadorElegido = String(desplegablePlaneta.value || ""); // Id elegido.
    const planetaOrigen = listaPlanetas.find(function (datosPlaneta) { // Busca el planeta.
        return String(datosPlaneta.id) === identificadorElegido; // Compara ids.
    });

    if (!planetaOrigen) { // Todavía no hay planeta.
        campoHoraReferencia.max = 23; // Tope terrestre por defecto.
        return; // No sigue.
    }

    const calendarioOrigen = construirCalendario(planetaOrigen); // Horas de ese planeta.
    const horaMaxima = calendarioOrigen.horasPorDia - 1; // 23 o 29.
    campoHoraReferencia.max = String(horaMaxima); // Aplica el tope al input.

    if (parseInt(campoHoraReferencia.value, 10) > horaMaxima) { // Si la hora se sale.
        campoHoraReferencia.value = String(horaMaxima); // La recorta.
    }
}

function pintarDesplegable() { // Rellena Tierra y Ambur en el select.
    const opciones = listaPlanetas.map(function (datosPlaneta) { // Una option por planeta.
        return `<option value="${escaparHtml(String(datosPlaneta.id))}">${escaparHtml(datosPlaneta.nombre_planeta)}</option>`; // Valor = id.
    });

    if (opciones.length === 0) { // Base vacía.
        desplegablePlaneta.innerHTML = `<option value="">No hay planetas registrados</option>`; // Aviso.
        return; // No sigue.
    }

    desplegablePlaneta.innerHTML = opciones.join(""); // Inserta las opciones.
}

function plantillaBloqueFecha(fechaCivil) { // Pastillas: día semana, día, mes, año y hora.
    return `
        <div class="bloque-fecha">
            <span class="dato-fecha">${escaparHtml(fechaCivil.nombreDia)}</span>
            <span class="dato-fecha">${escaparHtml(String(fechaCivil.dia))}</span>
            <span class="dato-fecha">${escaparHtml(fechaCivil.nombreMes)}</span>
            <span class="dato-fecha">${escaparHtml(String(fechaCivil.anio))}</span>
            <span class="dato-fecha dato-hora">${escaparHtml(fechaCivil.hora)}</span>
        </div>
    `; // HTML de la fecha local.
}

function plantillaFases(datosContinente, nombrePlaneta) { // Barras de fase leídas de zonas_horarias.
    const listaRegiones = Array.isArray(datosContinente.regiones) ? datosContinente.regiones : []; // Regiones del continente.
    const htmlFases = listaRegiones.map(function (datosRegion) { // Una celda por numeroRegion.
        const desfaseHoras = datosRegion.desfaseHoras; // UTC guardado en la fila.
        const tituloRegion = datosRegion.nombreRegion || ((desfaseHoras >= 0 ? "+" : "") + desfaseHoras + " h"); // Tooltip.
        return `<button type="button" class="fase-horaria" data-desfase="${desfaseHoras}" data-nombre-planeta="${escaparHtml(nombrePlaneta)}" title="${escaparHtml(tituloRegion)}">${escaparHtml(String(desfaseHoras))}</button>`; // Botón de fase.
    }).join(""); // Junta las celdas.

    return `<div class="franja-fases">${htmlFases}</div>`; // Barra completa.
}

function pintarTarjetas() { // Pinta el planeta que no está elegido y sus continentes.
    const identificadorElegido = String(desplegablePlaneta.value || ""); // Planeta de origen.
    const planetaOrigen = listaPlanetas.find(function (datosPlaneta) { // Ficha de origen.
        return String(datosPlaneta.id) === identificadorElegido; // Mismo id.
    });

    if (!planetaOrigen) { // Nada elegido.
        listaTarjetas.innerHTML = `<p class="aviso-vacio">Elija un planeta de referencia para calcular la fecha.</p>`; // Aviso.
        return; // Sale.
    }

    const planetasDestino = listaPlanetas.filter(function (datosPlaneta) { // El resto de planetas.
        return String(datosPlaneta.id) !== identificadorElegido; // Excluye el origen.
    });

    if (planetasDestino.length === 0) { // Solo hay un planeta.
        listaTarjetas.innerHTML = `<p class="aviso-vacio">Hace falta Tierra y Ambur para comparar calendarios.</p>`; // Aviso.
        return; // Sale.
    }

    const fechaOrigen = leerFechaDelFormulario(); // Fecha escrita arriba.
    const calendarioOrigen = construirCalendario(planetaOrigen); // Calendario del origen.
    segundosUniversalesActuales = fechaCivilASegundos( // Instante común.
        fechaOrigen.anio, // Año origen.
        fechaOrigen.mes, // Mes origen.
        fechaOrigen.dia, // Día origen.
        fechaOrigen.hora, // Hora origen.
        fechaOrigen.minuto, // Minuto origen.
        calendarioOrigen // Reglas del origen.
    );

    const htmlTarjetas = planetasDestino.map(function (datosPlaneta) { // Una tarjeta por planeta destino.
        const calendarioDestino = construirCalendario(datosPlaneta); // Calendario destino.
        const listaContinentes = continentesDesdeBaseHorarios(datosPlaneta.nombre_planeta); // Franjas de horarios.zonas_horarias.

        const htmlContinentes = listaContinentes.map(function (datosContinente, indiceContinente) { // Un bloque por continente.
            const primeraRegion = (datosContinente.regiones && datosContinente.regiones[0]) ? datosContinente.regiones[0] : { desfaseHoras: 0 }; // Primera fase.
            const fechaInicial = segundosAFechaCivil(segundosUniversalesActuales, calendarioDestino, primeraRegion.desfaseHoras); // Fecha de esa fase.
            const claseColor = "continente-color-" + (indiceContinente % 10); // Color de apoyo.
            const colorFondo = datosContinente.colorContinente || "rgba(46, 109, 164, 0.78)"; // Color de la base.

            return `
                <article class="fila-continente ${claseColor}" style="background:${colorFondo}" title="${escaparHtml(datosContinente.franjaHoraria || "")}">
                    <div class="nombre-continente-tarjeta">${escaparHtml(datosContinente.nombreContinente)}</div>
                    ${plantillaFases(datosContinente, datosPlaneta.nombre_planeta)}
                    ${plantillaBloqueFecha(fechaInicial)}
                </article>
            `; // Fila: nombre, fases y fecha.
        }).join(""); // Junta continentes.

        return `
            <section class="tarjeta-planeta">
                <div class="nombre-planeta-tarjeta">${escaparHtml(datosPlaneta.nombre_planeta)}</div>
                ${htmlContinentes}
            </section>
        `; // Tarjeta del planeta destino.
    }).join(""); // Junta planetas destino.

    listaTarjetas.innerHTML = htmlTarjetas; // Vuelca el HTML al visor.
}

function actualizarFechaDeFase(botonFase) { // Al pasar el ratón, muestra la hora de esa región.
    const desfaseHoras = parseInt(botonFase.getAttribute("data-desfase"), 10); // UTC de la fase.
    const nombrePlaneta = botonFase.getAttribute("data-nombre-planeta"); // Planeta destino.
    const filaContinente = botonFase.closest(".fila-continente"); // Fila de ese continente.

    if (!filaContinente || !nombrePlaneta) { // Falta contexto.
        return; // No actualiza.
    }

    const datosPlanetaDestino = listaPlanetas.find(function (datosPlaneta) { // Ficha completa en cartografia.
        return normalizarNombrePlaneta(datosPlaneta.nombre_planeta) === normalizarNombrePlaneta(nombrePlaneta); // Mismo nombre.
    }) || { nombre_planeta: nombrePlaneta }; // Si faltara, al menos el nombre.
    const calendarioDestino = construirCalendario(datosPlanetaDestino); // Calendario leído de la base.
    const fechaLocal = segundosAFechaCivil(segundosUniversalesActuales, calendarioDestino, desfaseHoras); // Nueva fecha local.
    const bloqueFecha = filaContinente.querySelector(".bloque-fecha"); // Pastillas de la derecha.

    if (bloqueFecha) { // Si existen las pastillas.
        bloqueFecha.outerHTML = plantillaBloqueFecha(fechaLocal); // Las sustituye.
    }

    const fasesHermanas = filaContinente.querySelectorAll(".fase-horaria"); // Todas las fases del continente.
    fasesHermanas.forEach(function (botonHermano) { // Recorre las celdas.
        botonHermano.classList.remove("fase-activa"); // Quita el brillo anterior.
    });
    botonFase.classList.add("fase-activa"); // Marca la fase bajo el ratón.
}

listaTarjetas.addEventListener("mouseover", function (eventoRaton) { // Delegación: hover sobre cualquier fase.
    const botonFase = eventoRaton.target.closest(".fase-horaria"); // ¿Es una fase?

    if (!botonFase || !listaTarjetas.contains(botonFase)) { // Si no lo es.
        return; // Ignora el evento.
    }

    actualizarFechaDeFase(botonFase); // Muestra la hora de esa región.
});

function actualizarNombreDiaSemana() { // Escribe lunes, martes... según la fecha elegida.
    if (!textoNombreDiaSemana) { // Si el span no está en el HTML.
        return; // No hace nada.
    }

    const valorFecha = campoFechaReferencia.value; // YYYY-MM-DD del desplegable.
    if (!valorFecha) { // Sin fecha.
        textoNombreDiaSemana.textContent = ""; // Vacío.
        return; // Sale.
    }

    const fechaElegida = new Date(valorFecha + "T12:00:00"); // Mediodía evita desfases de zona.
    if (Number.isNaN(fechaElegida.getTime())) { // Fecha inválida.
        textoNombreDiaSemana.textContent = ""; // Vacío.
        return; // Sale.
    }

    textoNombreDiaSemana.textContent = nombresDiaCalendario[fechaElegida.getDay()]; // Solo la palabra del día.
}

function rellenarFechaPorDefecto() { // Pone la fecha y hora actuales del navegador.
    const ahora = new Date(); // Instante local del usuario.
    const anio = ahora.getFullYear(); // Año actual.
    const mes = String(ahora.getMonth() + 1).padStart(2, "0"); // Mes con dos dígitos.
    const dia = String(ahora.getDate()).padStart(2, "0"); // Día con dos dígitos.
    campoFechaReferencia.value = `${anio}-${mes}-${dia}`; // Fecha de hoy.
    campoHoraReferencia.value = String(ahora.getHours()); // Hora actual.
    campoMinutoReferencia.value = String(ahora.getMinutes()); // Minuto actual.
    actualizarNombreDiaSemana(); // Pinta el día de la semana de hoy.
}

desplegablePlaneta.addEventListener("change", function () { // Si cambia el planeta origen.
    ajustarLimiteHora(); // Adapta 24 h / 30 h.
    pintarTarjetas(); // Recalcula las tarjetas del otro planeta.
});

campoFechaReferencia.addEventListener("change", function () { // Recalcula al cambiar la fecha.
    actualizarNombreDiaSemana(); // Actualiza lunes, martes...
    pintarTarjetas(); // Recalcula las tarjetas.
});
campoFechaReferencia.addEventListener("input", actualizarNombreDiaSemana); // El día cambia al teclear o elegir fecha.
campoHoraReferencia.addEventListener("input", pintarTarjetas); // Recalcula al cambiar la hora.
campoMinutoReferencia.addEventListener("input", pintarTarjetas); // Recalcula al cambiar el minuto.

Promise.all([ // Lee planetas (cartografia) y zonas (horarios) a la vez.
    fetch("../0003_Cartografia/transformadorJSON.php").then(function (respuestaServidor) { return respuestaServidor.json(); }), // Planetas del desplegable.
    fetch("transformadorHorariosJSON.php").then(function (respuestaServidor) { return respuestaServidor.json(); }) // Tabla zonas_horarias.
])
    .then(function (respuestas) { // Los dos JSON ya están.
        listaPlanetas = Array.isArray(respuestas[0]) ? respuestas[0] : []; // Base cartografia.
        mapaZonasHorarias = respuestas[1] && typeof respuestas[1] === "object" ? respuestas[1] : {}; // Base horarios.
        pintarDesplegable(); // Rellena el select.
        rellenarFechaPorDefecto(); // Fecha de hoy.
        ajustarLimiteHora(); // Tope de hora según planeta.
        pintarTarjetas(); // Primera pintura desde zonas_horarias.
    })
    .catch(function (errorLectura) { // Fallo de red o JSON.
        listaTarjetas.innerHTML = `<p class="aviso-vacio">No se pudieron leer horarios o planetas: ${escaparHtml(errorLectura.message)}</p>`; // Error visible.
    });
