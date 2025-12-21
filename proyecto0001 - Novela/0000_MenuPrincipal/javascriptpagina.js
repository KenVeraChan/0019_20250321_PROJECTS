const matrizCaja= document.getElementsByClassName("caja");
const matrizCajaOculta= document.getElementsByClassName("cajaOculta");
const matrizFila= document.getElementById("tablaContenidos");
const pulsador= document.getElementsByClassName("enlaceActivo"); 
let enlace= document.createElement("a");   
let anchoPantalla=0;

function cargando()
{
    //proceso de aparición de la tabla
        matrizFila.style.transitionDuration = "0.5s";
        matrizFila.style.marginLeft = "10%";
        anchoPantalla=window.innerWidth;
}

function activador(puntero)
{
    //proceso eventual de cambio de cartel
        matrizCaja[puntero].addEventListener("mouseenter", function(){
        matrizCaja[puntero].style.transitionDuration = "0.15s";
        matrizCaja[puntero].style.transform = "rotate3d(1,0,0,360deg)";
        matrizCaja[puntero].style.backgroundColor= "rgba(18, 158, 139, 1)";
        matrizCaja[puntero].textContent="";
        matrizCaja[puntero].appendChild(enlace);
            anchoPantalla=window.innerWidth;  //Recoge el valor del ancho de la pantalla
        if(anchoPantalla>=100 && anchoPantalla<=200)
        {
            enlace.setAttribute('style','font-size:x-small; color:white; text-decoration:none; padding-left:8px');
        }
        if(anchoPantalla>200 && anchoPantalla<=550)
        {
            enlace.setAttribute('style','font-size:small; color:white; text-decoration:none; padding-left:8px');
        }
        if(anchoPantalla>500)
        {
            enlace.setAttribute('style','font-size:medium; color:white; text-decoration:none; padding-left:8px');
        }
            switch(puntero)
            {
                case 0:
                    {
                        enlace.setAttribute('href','../0001_Argumento/argumento.php');
                        enlace.textContent="ACCEDER A ARGUMENTO"; 
                        break;
                    }
                case 1:
                    {
                        enlace.setAttribute('href','../0002_Personajes/personajes.php');
                        enlace.textContent="ACCEDER A PERSONAJES";
                        break;
                    }
                case 2:
                    {
                        enlace.setAttribute('href','../0003_Cartografia/cartografia.php');
                        enlace.textContent="ACCEDER A CARTOGRAFÍA";
                        break;
                    }
                case 3:
                    {
                        enlace.setAttribute('href','../0004_Acontecimientos/acontecimientos.php');
                        enlace.textContent="ACCEDER A ACONTECIMIENTOS";
                        break;
                    }
                case 4:
                    {
                        enlace.setAttribute('href','../0005_Anotaciones/bloquesNovela.php');
                        enlace.textContent="ACCEDER A BLOQUES";
                        break;
                    }
                case 5:
                    {
                        enlace.setAttribute('href','../0006_Calendarios/calendariosPlanetarios.php');
                        enlace.textContent="ACCEDER A CALENDARIOS";
                        break;
                    }
                default:
                    {   break;    }
            }
            //SE DARA LA VUELTA A LA CARA OCULTA MIENTRAS SE MUESTRA LA CARA PRINCIPAL
        });
    }

function reactivador(puntero)
{   
        matrizCaja[puntero].addEventListener("mouseleave", function(){
            //SE DARA LA VUELTA A LA CARA OCULTA PARA DEJARLA EN OCULTA DE NUEVO
            matrizCaja[puntero].style.transitionDuration = "0.15s";
            matrizCaja[puntero].style.transform = "rotate3d(1,0,0,360deg)";
            matrizCaja[puntero].style.backgroundColor= "rgb(208, 255, 0)";
            matrizCaja[puntero].style.color="black";
            matrizCaja[puntero].style.paddingLeft="5px";
            matrizCaja[puntero].style.fontSize="large";
            anchoPantalla=window.innerWidth;  //Recoge el valor del ancho de la pantalla
                if(anchoPantalla>=100 && anchoPantalla<=200)
                {
                    matrizCaja[puntero].style.fontSize="13px";
                }
                if(anchoPantalla>200 && anchoPantalla<=550)
                {
                    matrizCaja[puntero].style.fontSize="medium";
                }
                if(anchoPantalla>500)
                {
                    matrizCaja[puntero].style.fontSize="large";
                }
            switch(puntero)
            {
                case 0:
                    {
                        matrizCaja[puntero].textContent="ARGUMENTO";
                        break;
                    }
                case 1:
                    {
                        matrizCaja[puntero].textContent="PERSONAJES";
                        break;
                    }
                case 2:
                    {
                        matrizCaja[puntero].textContent="CARTOGRAFÍA";
                        break;
                    }
                case 3:
                    {
                        matrizCaja[puntero].textContent="ACONTECIMIENTOS";
                        break;
                    }
                case 4:
                    {
                        matrizCaja[puntero].textContent="BLOQUES";
                        break;
                    }
                case 5:
                    {
                        matrizCaja[puntero].textContent="CALENDARIOS";
                        break;
                    }
                default:
                    {   break;    }
            }
        });
        pulsador[puntero].addEventListener("click", function(){  
    });
}

