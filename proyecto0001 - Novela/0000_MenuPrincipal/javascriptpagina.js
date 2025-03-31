const matrizCelda= document.getElementsByClassName("celda");
const matrizCaja= document.getElementsByClassName("caja");
const matrizCajaOculta= document.getElementsByClassName("cajaOculta");
const matrizFila= document.getElementById("tablaContenidos");
const pulsador= document.getElementsByClassName("enlaceActivo");    

function activador()
{
    //proceso de aparición de la tabla
        matrizFila.style.transitionDuration = "0.5s";
        matrizFila.style.marginLeft = "20%"
    //proceso eventual de cambio de cartel
    for(let puntero=0;puntero<matrizCaja.length;puntero++)
        {
            matrizCelda[puntero].addEventListener("mouseenter", function(){
                matrizCaja[puntero].style.transitionDuration = "0.25s";
                matrizCaja[puntero].style.transform = "rotate3d(1,0,0,90deg)";
                //SE DARA LA VUELTA A LA CARA OCULTA MIENTRAS SE MUESTRA LA CARA PRINCIPAL
                matrizCajaOculta[puntero].style.transitionDelay = "0.25s";
                matrizCajaOculta[puntero].style.transitionDuration = "0.25s";
                matrizCajaOculta[puntero].style.transform = "rotate3d(1,0,0,0deg)";
                matrizCajaOculta[puntero].style.zIndex = "0";
            });
            matrizCelda[puntero].addEventListener("mouseleave", function(){
                matrizCaja[puntero].style.transitionDuration = "0.25s";
                matrizCaja[puntero].style.transform = "rotate3d(1,0,0,0deg)";
                //SE DARA LA VUELTA A LA CARA OCULTA PARA DEJARLA EN OCULTA DE NUEVO
                matrizCajaOculta[puntero].style.transitionDelay = "0.25s";
                matrizCajaOculta[puntero].style.transitionDuration = "0.25s";
                matrizCajaOculta[puntero].style.transform = "rotate3d(1,0,0,90deg)";
                matrizCajaOculta[puntero].style.zIndex = "-1";
            });
            pulsador[puntero].addEventListener("click", function(){
                
            });
        }
}
