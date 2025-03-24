const matrizCelda= document.getElementsByClassName("celda");
const matrizCaja= document.getElementsByClassName("caja");
const matrizCajaOculta= document.getElementsByClassName("cajaOculta");
function activador()
{
    for(let puntero=0;puntero<matrizCaja.length;puntero++)
        {
            matrizCelda[puntero].addEventListener("mouseenter", function(){
                matrizCaja[puntero].style.transitionDuration = "0.25s";
                matrizCaja[puntero].style.transform = "rotate3d(1,0,0,90deg)";
                //SE DARA LA VUELTA A LA CARA OCULTA MIENTRAS SE MUESTRA LA CARA PRINCIPAL
                matrizCajaOculta[puntero].style.transitionDelay = "0.25s";
                matrizCajaOculta[puntero].style.transitionDuration = "0.25s";
                matrizCajaOculta[puntero].style.transform = "rotate3d(1,0,0,0deg)";
            });
            matrizCelda[puntero].addEventListener("mouseleave", function(){
                matrizCaja[puntero].style.transitionDuration = "0.25s";
                matrizCaja[puntero].style.transform = "rotate3d(1,0,0,0deg)";
                //SE DARA LA VUELTA A LA CARA OCULTA PARA DEJARLA EN OCULTA DE NUEVO
                matrizCajaOculta[puntero].style.transitionDelay = "0.25s";
                matrizCajaOculta[puntero].style.transitionDuration = "0.25s";
                matrizCajaOculta[puntero].style.transform = "rotate3d(1,0,0,90deg)";
            });
        }
}