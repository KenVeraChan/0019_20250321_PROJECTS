const lineaTiempo = document.getElementById("lineaTiempo");
const visor = document.querySelector(".visor");

let desplazamientoY = 0;
const pasoRueda = 80;

function limiteInferior() {
    const altoContenido = lineaTiempo.scrollHeight;
    const altoVisor = visor.clientHeight;
    return Math.min(0, altoVisor - altoContenido - 48);
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
window.addEventListener("load", aplicarDesplazamiento);
