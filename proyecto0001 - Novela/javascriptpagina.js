const matrizCelda= document.getElementsByClassName("celda");
const matrizCaja= document.getElementsByClassName("caja");
const matrizCajaOculta= document.getElementsByClassName("cajaOculta");
function activador()
{
    for(let puntero=0;puntero<matrizCaja.length;puntero++)
        {
            matrizCelda[puntero].addEventListener("mouseenter", function(){
                matrizCaja[puntero].style.transitionDuration = "0.5s";
                matrizCaja[puntero].style.background = "orange";
                matrizCaja[puntero].style.height = "0px";
                matrizCaja[puntero].style.width = "0px";
                matrizCaja[puntero].style.transform = "rotate3d(1,0,0,90deg)";
                //SE DARA LA VUELTA A LA CARA OCULTA MIENTRAS SE MUESTRA LA CARA PRINCIPAL
                matrizCajaOculta[puntero].style.transitionDuration = "0.5s";
                matrizCajaOculta[puntero].style.background = "blue";
                matrizCajaOculta[puntero].style.height = "200px";
                matrizCajaOculta[puntero].style.width = "200px";
                matrizCajaOculta[puntero].style.transform = "rotate3d(1,0,0,0deg)";
            });
            matrizCelda[puntero].addEventListener("mouseleave", function(){
                matrizCaja[puntero].style.transitionDuration = "0.5s";
                matrizCaja[puntero].style.background = "rgb(208, 255, 0)";
                matrizCaja[puntero].style.height = "120px";
                matrizCaja[puntero].style.width = "200px";
                matrizCaja[puntero].style.transform = "rotate3d(1,0,0,0deg)";
                //SE DARA LA VUELTA A LA CARA OCULTA PARA DEJARLA EN OCULTA DE NUEVO
                matrizCajaOculta[puntero].style.transitionDuration = "0.5s";
                matrizCajaOculta[puntero].style.background = "blue";
                matrizCajaOculta[puntero].style.height = "0px";
                matrizCajaOculta[puntero].style.width = "0px";
                matrizCajaOculta[puntero].style.transform = "rotate3d(1,0,0,90deg)";
            });
        }
}