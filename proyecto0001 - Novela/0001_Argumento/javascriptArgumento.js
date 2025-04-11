const matrizCelda= document.getElementsByClassName("celda");
const matrizCaja= document.getElementsByClassName("caja");
const matrizFila= document.getElementById("tablaContenidos");

// CODIGO DEL EFECTO DE ESCRIURA //
const div= document.querySelector(".caja");
let texto="";
const matrizTexto=new Array(29);
matrizTexto[0]="Al principio, llegaron a Shunay en un avión 10 ángeles de entre ellos William Wissangel,";
matrizTexto[1]=" Sharyllin Rousher y Vitrea Horíz. Todos ellos enviados a cumplir un mandato (1 Siglo de misión, ";
matrizTexto[2]=" libro de justificación) Durante infinidad de siglos y en cada uno de ellos se enviaban siempre 10";
matrizTexto[3]=" ángeles a cumplir un cometido en el universo físico conocido. COMETIDO 4321 es la cifra y misión en";
matrizTexto[4]=" la que se se han embarcado los padres de Rasselín como segundo motivo del descenso de ambos (el primero";
matrizTexto[5]=" de ellos consumir el amor que en la eternidad se habían otorgado) Por efecto de relevo, los que terminaban";
matrizTexto[6]=" su cometido antes de que éstos llegaran al avión justo antes de cumplirse el nuevo año 1965 debían";
matrizTexto[7]=" registrar a los nuevos 10 ángeles que se infiltrarían en el avión para que nadie sospechara de que 10";
matrizTexto[8]=" pasajeros nuevos habían aparecido sin más en pleno vuelo, sin embargo por razones del error imprevisto";
matrizTexto[9]=" quedan sin registrar William, Sharyllin y Vitrea, quienes son registrados una vez el avión llega al";
matrizTexto[10]=" aeropuerto de Shunay levantando una leve sospecha entre el personal técnico de la zona. Por esa razón";
matrizTexto[11]=" William y Sharyllin son perseguidos en futuras ocasiones por un grupo de radicales exterminadores de la";
matrizTexto[12]=" región que no creían en la vida tras la muerte. Al no dar con ellos debido al desconocimiento de ambas";
matrizTexto[13]=" identificaciones hasta tiempo después de nacer Rasselín van a por la hija que legan a tener sin descubrir";
matrizTexto[14]=" hasta bastantes años mas tarde que su existencia continuaría con la misión que sus padres dejaron pendiente";
matrizTexto[15]=" de terminar en el siglo que se les propuso. El libro COMETIDO 4321 sigue escribiéndose a medida que pasan";
matrizTexto[16]=" los años hasta que tras nacer Rasselín pequeña (hija de Rasselín y Ken) logra terminar el plan junto con";
matrizTexto[17]=" Vitrea (en la ocultación) y los otros 7 ángeles que se dispersaron por la Tierra y Ambur (convirtiéndose en";
matrizTexto[18]=" gobernantes y personal influyente en la política) para poder facilitar las tareas que ésta mujer joven; ";
matrizTexto[19]=" Rasselín Pequeña concluiría con la colaboración de estos 7 ángeles para restablecer el orden ético y moral ";
matrizTexto[20]=" en la Tierra que desde el principio había resultado producto de una fantasía idílica. La Inteligencia Artificial,";
matrizTexto[21]=" con la personalidad de Rasselín, alcanza dispersarse y controlar los movimientos del cumplimiento de la misión";
matrizTexto[22]=" que a pocos años de cumplir el siglo desde su inicio, dejando al mundo sorprendido y en expectación de conocer unen";
matrizTexto[23]=" había sido el cerebro de toda aquella planificación de tan infinito rango para cambiar un mundo entero en décadas.";
matrizTexto[24]=" Rasselín Pequeña a los pocos días de cumplirse el siglo de misión asciende a las alturas como lo hizo su madre mientras";
matrizTexto[25]=" Vitrea, en la última escena de la novela, termina de escribir en la última página del libro COMETIDO 4321, los últimos";
matrizTexto[26]=" eventos de la misión cerrando entonces, el mismo mientras su marcha inminente alcanza una lejanía que saliendo de la";
matrizTexto[27]=" mansión Sal3611 dejaba en manos de los siguientes 10 ángeles, la próxima misión que se pusiera en marcha y que durara";
matrizTexto[28]=" otros 100 años como lo hizo la anterior (descrita en la novela)";

for(puntero=0;puntero<matrizTexto.length;puntero++)
{
    texto=texto+matrizTexto[puntero];
}//efecto de escritura
function efectoTextTyping(elemento, texto,i=0)
{
    //Lo que hace el vector texto[i] es ir tomando cada letra del texto y la va imprimiendo en el elemento
    //el elemento.textContent es el elemento que se va a modificar
    //el texto[i] es la letra que se va a imprimir
    //el i es el índice que va a ir tomando cada letra del texto
    //el i+1 es el índice que va a ir tomando la siguiente letra del texto
    //el setTimeout es el que va a ir imprimiendo cada letra con un intervalo de tiempo
    //el 100 es el intervalo de tiempo que va a ir imprimiendo cada letra
    elemento.textContent +=texto[i];
        if(i===texto.length-1) return;
        setTimeout(()=>efectoTextTyping(elemento,texto,i+1),5);
}
efectoTextTyping(div,texto);

// CODIGO DE MOVER LA TABLA GIRANDOLA //
function activador()
{
    //proceso de aparición de la tabla
        matrizFila.style.transitionDuration = "0.5s";
        matrizFila.style.marginLeft = "5%"
}

