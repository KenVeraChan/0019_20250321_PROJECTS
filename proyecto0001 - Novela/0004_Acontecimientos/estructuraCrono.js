const lineaTiempo = document.getElementById("lineaTiempo");
const visor = document.querySelector(".visor");
const tamHorizPantalla= window.addEventListener("resize", function() {
    return window.innerWidth.toString();  //devuelve el tamaño de la pantalla para fijar condiciones
});

let desplazamientoY = 0;
const pasoRueda = 85;

function escapeHtml(texto) {
    if (texto === null || texto === undefined) {
        return "";
    }

    return String(texto)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function limiteInferior() {
    const altoContenido = lineaTiempo.scrollHeight;
    const altoVisor = visor.clientHeight;
    return Math.min(0, altoVisor - altoContenido - 30);
}

function aplicarDesplazamiento() {
    const minimo = limiteInferior();

    if (desplazamientoY > 0) {
        desplazamientoY = 0;
    }
    if (desplazamientoY < minimo) {
        desplazamientoY = minimo;
    }

    lineaTiempo.style.transform = `translateY(${desplazamientoY}px)`;
}

function plantillaEvento(evento, indice) 
{
    const ladoIzquierdo = indice % 2 === 0;
    const claseFila = ladoIzquierdo ? "fila lado-izquierdo" : "fila lado-derecho";
    const titulo = escapeHtml(evento.titulo || "ACONTECIMIENTO");
    const descripcion = escapeHtml(evento.acontecimiento || evento.descripcion || "");
    const fechaLarga = escapeHtml(evento.fecha || "Fecha pendiente");
    const imagen = evento.imagen ? `<img class="imagen-evento" src="${escapeHtml(evento.imagen)}" alt="imagen del acontecimiento">` : "";

if(tamHorizPantalla >= 900)
    {
        if (ladoIzquierdo) {
            return `
                <article class="${claseFila}" onclick="mostrarTarjeta(${indice})">
                    <div class="tarjeta">
                        <h2>${titulo}</h2>
                        <p>${descripcion}</p>
                        ${imagen}
                    </div>
                    <div class="nexo">
                        <span class="fecha-larga">${fechaLarga}</span>
                    </div>
                </article>
            `;
        }
        return `
            <article class="${claseFila}" onclick="mostrarTarjeta(${indice})">
                <div class="nexo">
                    <span class="fecha-larga">${fechaLarga}</span>
                </div>
                <div class="tarjeta">
                    <h2>${titulo}</h2>
                    <p>${descripcion}</p>
                    ${imagen}
                </div>
            </article>
        `;
    } 
    else 
    {
        return `
        <article class="${claseFila}" onclick="mostrarTarjeta(${indice})">
            <div class="nexo">
                <span class="fecha-larga">${fechaLarga}</span>   
            </div>
            <div class="tarjeta">
                <h2>${titulo}</h2>
                <p>${descripcion}</p>
                ${imagen}
            </div>
        </article>
    `;
    }
}

window.mostrarTarjeta = function(elementoFecha) 
{
    //Gestion del elemento clase TARJETA
    const tarjeta = document.querySelectorAll(".tarjeta")[elementoFecha];
    if (tarjeta.style.display === "block") {
        tarjeta.style.display = "none";
    } else {
        tarjeta.style.display = "block";
        tarjeta.style.marginTop = "-40px";
    }  

    //Gestion del elemento clase FILA
    const fila = document.querySelectorAll(".fila")[elementoFecha]; 
    if (fila.style.gridTemplateRows === "100px auto auto") {
        fila.style.gridTemplateRows = "50px auto auto";
    } else {
        fila.style.gridTemplateRows = "100px auto auto";
    }   
    const ladoIzquierdo = elementoFecha % 2 === 0;
    if (ladoIzquierdo) {
        fila.style.gridTemplateRows = "50px auto auto";    
    } else {
        fila.style.gridTemplateRows = "50px auto auto";
    }
    const ladoDerecho = elementoFecha % 2 !== 0;
    if (ladoDerecho) {
        fila.style.gridTemplateRows = "50px auto auto";    
    } else {
        fila.style.gridTemplateRows = "50px auto auto";
    }  
};

function pintarEventos(data) {
    const eventos = Array.isArray(data) ? data : [];
    const html = eventos.map((evento, indice) => plantillaEvento(evento, indice)).join("");
    lineaTiempo.innerHTML = html;
    aplicarDesplazamiento();
}

function datosEjemplo() {
    return [
        {
            fecha: "Lunes, 21 de octubre de 2426 a las 08:45",
            titulo: "Inicio de la expedicion",
            acontecimiento: "La tripulacion llega al punto de insercion y comienza la primera fase de reconocimiento."
        },
        {
            fecha: "Martes, 22 de octubre de 2426 a las 19:10",
            titulo: "Primer contacto",
            acontecimiento: "Se detecta una señal no prevista. El equipo redefine objetivos para evitar riesgos mayores. Uno de los bloques de poder acepta colaborar. Esto altera el equilibrio politico del conflicto. Uno de los bloques de poder acepta colaborar. Esto altera el equilibrio politico del conflicto. Se detecta una señal no prevista. El equipo redefine objetivos para evitar riesgos mayores. Uno de los bloques de poder acepta colaborar. Esto altera el equilibrio politico del conflicto. Uno de los bloques de poder acepta colaborar. Esto altera el equilibrio politico del conflicto. Se detecta una señal no prevista. El equipo redefine objetivos para evitar riesgos mayores. Uno de los bloques de poder acepta colaborar. Esto altera el equilibrio politico del conflicto. Uno de los bloques de poder acepta colaborar. Esto altera el equilibrio politico del conflicto. Se detecta una señal no prevista. El equipo redefine objetivos para evitar riesgos mayores. Uno de los bloques de poder acepta colaborar. Esto altera el equilibrio politico del conflicto. Uno de los bloques de poder acepta colaborar. Esto altera el equilibrio politico del conflicto. Se detecta una señal no prevista. El equipo redefine objetivos para evitar riesgos mayores. Uno de los bloques de poder acepta colaborar. Esto altera el equilibrio politico del conflicto. Uno de los bloques de poder acepta colaborar. Esto altera el equilibrio politico del conflicto. Se detecta una señal no prevista. El equipo redefine objetivos para evitar riesgos mayores. Uno de los bloques de poder acepta colaborar. Esto altera el equilibrio politico del conflicto. Uno de los bloques de poder acepta colaborar. Esto altera el equilibrio politico del conflicto. Se detecta una señal no prevista. El equipo redefine objetivos para evitar riesgos mayores. Uno de los bloques de poder acepta colaborar. Esto altera el equilibrio politico del conflicto. Uno de los bloques de poder acepta colaborar. Esto altera el equilibrio politico del conflicto. Se detecta una señal no prevista. El equipo redefine objetivos para evitar riesgos mayores. Uno de los bloques de poder acepta colaborar. Esto altera el equilibrio politico del conflicto. Uno de los bloques de poder acepta colaborar. Esto altera el equilibrio politico del conflicto. "
        },
        {
            fecha: "Jueves, 24 de octubre de 2426 a las 02:30",
            titulo: "Cambio de alianza",
            acontecimiento: "Uno de los bloques de poder acepta colaborar. Esto altera el equilibrio politico del conflicto. Uno de los bloques de poder acepta colaborar. Esto altera el equilibrio politico del conflicto. Uno de los bloques de poder acepta colaborar. Esto altera el equilibrio politico del conflicto. Uno de los bloques de poder acepta colaborar. Esto altera el equilibrio politico del conflicto."
        },
        {
            fecha: "Sabado, 26 de octubre de 2426 a las 11:20",
            titulo: "Apertura del archivo sellado",
            acontecimiento: "Se confirma la autenticidad de los manuscritos y se descubre una referencia directa al nucleo del conflicto."
        },
        {
            fecha: "Domingo, 27 de octubre de 2426 a las 23:05",
            titulo: "Interferencia en las comunicaciones",
            acontecimiento: "Una tormenta electromagnetica afecta el enlace principal y obliga a cambiar el protocolo de transmision.",
            imagen: "../0004_Acontecimientos/images/manuscritos.png"
        },
        {
            fecha: "Miercoles, 30 de octubre de 2426 a las 06:55",
            titulo: "Reunion de emergencia",
            acontecimiento: "Los lideres de las facciones implicadas negocian una tregua temporal para continuar la investigacion."
        },
        {
            fecha: "Viernes, 01 de noviembre de 2426 a las 15:40",
            titulo: "Despliegue final",
            acontecimiento: "Se ejecuta la fase final de la operacion con apoyo logistico completo y cobertura de seguridad reforzada."
        },
        {
            fecha: "Sabado, 02 de noviembre de 2426 a las 21:25",
            titulo: "Colapso del corredor secundario",
            acontecimiento: "El acceso alternativo queda inutilizado y obliga a redirigir la expedicion por una ruta mas extensa."
        },
        {
            fecha: "Domingo, 03 de noviembre de 2426 a las 04:15",
            titulo: "Recuperacion de artefacto",
            acontecimiento: "Se localiza una pieza clave para comprender la secuencia historica de los acontecimientos previos."
        },
        {
            fecha: "Lunes, 04 de noviembre de 2426 a las 13:05",
            titulo: "Cruce de testimonios",
            acontecimiento: "Los relatos de varios testigos coinciden y permiten confirmar la autoria de la operacion clandestina."
        },
        {
            fecha: "Martes, 05 de noviembre de 2426 a las 18:50",
            titulo: "Notificacion oficial",
            acontecimiento: "La autoridad central emite una directiva urgente para formalizar el nuevo marco de actuacion.",
            imagen: "../0004_Acontecimientos/images/manuscritos.png"
        },
        {
            fecha: "Miercoles, 06 de noviembre de 2426 a las 09:40",
            titulo: "Resolucion provisional",
            acontecimiento: "Se cierra la fase critica del caso y se prepara el informe final para las facciones implicadas."
        }
    ];
}

function completarConEjemplos(data) {
    const base = Array.isArray(data) ? data.slice() : [];
    const minimos = 14;
    const ejemplos = datosEjemplo();

    if (base.length >= minimos) {
        return base;
    }

    let indice = 0;
    while (base.length < minimos) {
        const ejemplo = ejemplos[indice % ejemplos.length];
        base.push({
            ...ejemplo,
            titulo: `${ejemplo.titulo} (ejemplo ${indice + 1})`
        });
        indice += 1;
    }

    return base;
}

window.addEventListener("wheel", function (evento) {
    evento.preventDefault();

    if (evento.deltaY > 0) {
        desplazamientoY -= pasoRueda;
    } else {
        desplazamientoY += pasoRueda;
    }

    aplicarDesplazamiento();
}, { passive: false });

window.addEventListener("resize", aplicarDesplazamiento);

fetch("transformadorJSON.php")
    .then((respuesta) => respuesta.json())
    .then((data) => {
        const eventosFinales = completarConEjemplos(data);
        pintarEventos(eventosFinales);
    })
    .catch(() => {
        pintarEventos(completarConEjemplos([]));
    });