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
    const bloque = escapeHtml(evento.bloque || "Bloque sin definir");
    const titulo = escapeHtml(evento.titulo || "Título sin definir");
    const fechaLarga = escapeHtml(evento.fecha || "Fecha sin definir");
    const horas = escapeHtml(evento.horas || "");
    const minutos = escapeHtml(evento.minutos || "");
    const acontecimientos = escapeHtml(evento.acontecimiento || "");
    const personajes = escapeHtml(evento.personajes || "");
    const imagen = evento.imagen ? `<img class="imagen-evento" src="${escapeHtml(evento.imagen)}" alt="imagen del acontecimiento">` : "";

    return `
    <article class="${claseFila}" onclick="mostrarTarjeta(${indice})" onmouseover="efectoFecha(${indice})" onmouseout="quitarEfectoFecha(${indice})">
        <div class="nexo">
            <span class="fecha-larga">${indice+1}) ${diaSemana(fechaLarga)}, ${diaMes(fechaLarga)} de ${nombreMes(fechaLarga)} de ${anio(fechaLarga)} a las ${horas ? ` ${horas}` : "00:"}${minutos ? `:${minutos} h` : ":00 h"}</span>   
        </div>
        <div class="tarjeta">
            <h3>${bloque}</h3>
            <h4>${titulo}</h4>
            <p>${acontecimientos}</p>
            <p>${personajes}</p>
            ${imagen}
        </div>
    </article>
    `;
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

window.efectoFecha = function(elementoFecha)
{    const fecha = document.querySelectorAll(".fecha-larga")[elementoFecha];
    fecha.style.background = "#0b1f3a";
    fecha.style.color = "#ffffff";
};

window.quitarEfectoFecha = function(elementoFecha)
{    const fecha = document.querySelectorAll(".fecha-larga")[elementoFecha];
    fecha.style.background = "rgba(255, 255, 255, 0.96)";
    fecha.style.color = "#1f2c3d";
};

//conversor de fecha a dia de la semana, para mostrarlo en la tarjeta del evento
function diaSemana(fechaStr) {
  const fecha = new Date(fechaStr);
  return fecha.toLocaleDateString("es-ES", { weekday: "long" });
}
//Conversor para extraer el nombre de un mes a partir de su número, para mostrarlo en la tarjeta del evento
function nombreMes(fechaStr) {
  const fecha = new Date(fechaStr); 
    return fecha.toLocaleDateString("es-ES", { month: "long" });
}
//Conversor para extraer el día de una fecha de formato YYYY-MM-DD, para mostrarlo en la tarjeta del evento
function diaMes(fechaStr) {
  const fecha = new Date(fechaStr); 
    return fecha.getDate();
}
//Conversor para extraer el año de una fecha de formato YYYY-MM-DD, para mostrarlo en la tarjeta del evento
function anio(fechaStr) {
  const fecha = new Date(fechaStr); 
    return fecha.getFullYear();
}

function pintarEventos(data) {
    const eventos = Array.isArray(data) ? data : [];
    const html = eventos.map((evento, indice) => plantillaEvento(evento, indice)).join("");
    lineaTiempo.innerHTML = html;
    aplicarDesplazamiento();
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
        pintarEventos(data);
    })
    .catch((error) => {
        alert("Error al cargar los datos. Se mostrarán eventos de ejemplo. El error es: "+error.message);
        pintarEventos(completarConEjemplos([]));
    });