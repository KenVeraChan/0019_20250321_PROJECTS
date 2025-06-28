$(document).ready(()=> {
    $.ajax({
        //url: "",
        //type: "GET",
        //dataType: "json",
        success: function(data) 
        {
            const tablaDatos= creaTablaDinamica(data);
            $("#container").append(tablaDatos);
        },
        error: function(xhr, status, error) {
            console.error("Error al cargar los datos:", error);
        },
        complete: function() {
            // Aquí puedes realizar acciones después de que la solicitud se complete
            console.log("Solicitud completada");
        }
    });
});

function creaTablaDinamica(data)
{
    //CREANDO LOS ELEMENTOS DE LA TABLA
    const tablaDatos= document.createElement("table");
    tablaDatos.setAttribute("id", "tablaDatos");
        Object.assign(tablaDatos.style, {
            width: "100%",
            borderCollapse: "collapse",
            margin: "20px auto",
            marginBottom: "0px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            overflow: "hidden"
        });
    
    const filaCabecera= document.createElement("tr");
    filaCabecera.setAttribute("id", "filaCabecera");
        Object.assign(filaCabecera.style, {
            width: "100%",
            height: "10px",
            textAlign: "center",
        });

    const celdaCabecera= document.createElement("td");
    celdaCabecera.setAttribute("id", "celdaCabecera");
    celdaCabecera.setAttribute("colspan","3");
    celdaCabecera.textContent="CRONOLOGÍA DE LA NOVELA COMETIDO 4321";
        Object.assign(celdaCabecera.style, {
            width: "100%",
            height: "10px",
            textAlign: "center",
            backgroundColor: "rgba(247, 148, 0, 0.49)",
            font: "sans-serif",
            fontSize: "1.25em",
            padding: "10px"
        });

    const filaEncabezado= document.createElement("tr");
    filaEncabezado.setAttribute("id", "filaEncabezado");
        Object.assign(filaEncabezado.style, {
            width: "100%",
            textAlign: "center",
        });

    //CELDA DEL ID
    const celdaEncabezadoId= document.createElement("td");
    celdaEncabezadoId.setAttribute("class", "encabezado");
    celdaEncabezadoId.textContent = "ID";
        Object.assign(celdaEncabezadoId.style, {
            width: "10%",
            textAlign: "center",
            border: "1px solid rgb(255, 255, 255)",
            backgroundColor: "rgba(233, 124, 0, 0.42)",
            font: "sans-serif",
            fontSize: "1em",
        });

    //CELDA DE LA FECHA
    const celdaEncabezadoFecha= document.createElement("td");
    celdaEncabezadoFecha.setAttribute("class", "encabezado");
    celdaEncabezadoFecha.textContent = "FECHA";
        Object.assign(celdaEncabezadoFecha.style, {
            width: "20%",
            textAlign: "center",
            border: "1px solid rgb(255, 255, 255)",
            backgroundColor: "rgba(233, 124, 0, 0.42)",
            font: "sans-serif",
            fontSize: "1em",
        });

    //CELDA DEL CONCEPTO
    const celdaEncabezadoConcepto= document.createElement("td");
    celdaEncabezadoConcepto.setAttribute("class", "encabezado");
    celdaEncabezadoConcepto.textContent = "ACONTECIMIENTO";
        Object.assign(celdaEncabezadoConcepto.style, {
            width: "100%",
            textAlign: "center",
            border: "1px solid rgb(255, 255, 255)",
            backgroundColor: "rgba(233, 124, 0, 0.42)",
            font: "sans-serif",
            fontSize: "1em",
        });
    
        const imagenFondo= document.createElement("img");
        imagenFondo.setAttribute("id", "imagenFondo");
        imagenFondo.setAttribute("src", "/0004_Acontecimientos/images/manuscritos.png","alt", "libros antiguos de fondo");
        imagenFondo.style.width = "100%";
        imagenFondo.style.height = "auto";
        imagenFondo.style.position = "fixed";
        imagenFondo.style.top = "0";
        imagenFondo.style.left = "0";
        imagenFondo.style.zIndex = "-1";
        imagenFondo.style.opacity = "0.75";  
    
    //AGREGANDO LA FILA DE ENCABEZADO A LA TABLA
    //FILA 1
    tablaDatos.appendChild(filaCabecera);
    filaCabecera.appendChild(celdaCabecera);
    //FILA 2
    tablaDatos.appendChild(filaEncabezado);
    filaEncabezado.appendChild(celdaEncabezadoId);
    filaEncabezado.appendChild(celdaEncabezadoFecha);
    filaEncabezado.appendChild(celdaEncabezadoConcepto);

    //AGREGANDO FILAS Y CELDAS SEGUN ACONTECIMIENTOS
    for (let i = 0; i < 3; i++) 
    {
        const filaEvento = document.createElement("tr");
        filaEvento.setAttribute("class", "datos");
        Object.assign(filaEvento.style, {
                width: "100%",
                borderCollapse: "collapse",
                margin: "20px auto",
                marginBottom: "0px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                overflow: "hidden"
            });
            const celdaDatosId=document.createElement("td");
            celdaDatosId.setAttribute("class", "datoId");
                Object.assign(celdaDatosId.style, {
                    width: "10%",
                    height: "20px",
                    margin: "1px",
                    textAlign: "center",
                    border: "1px solid rgb(197, 93, 7)",
                    backgroundColor: "rgba(252, 252, 251, 0.2)",
                    font: "sans-serif",
                    fontSize: "1em",
                });
            const celdaDatosFecha=document.createElement("td");
            celdaDatosFecha.setAttribute("class", "datoFecha");
                Object.assign(celdaDatosFecha.style, {
                    width: "20%",
                    height: "20px",
                    margin: "1px",
                    textAlign: "center",
                    border: "1px solid rgb(197, 93, 7)",
                    backgroundColor: "rgba(252, 252, 251, 0.2)",
                    font: "sans-serif",
                    fontSize: "1em",
                });
            const celdaDatosAcontecimiento=document.createElement("td");
            celdaDatosAcontecimiento.setAttribute("class", "datoAcontecimiento");
                Object.assign(celdaDatosAcontecimiento.style, {
                    width: "100%",
                    height: "20px",
                    margin: "1px",
                    textAlign: "center",
                    border: "1px solid rgb(197, 93, 7)",
                    backgroundColor: "rgba(252, 252, 251, 0.2)",
                    font: "sans-serif",
                    fontSize: "1em",
                });
        //CELDAS DE DATOS
        tablaDatos.appendChild(filaEvento);
        filaEvento.appendChild(celdaDatosId);
        filaEvento.appendChild(celdaDatosFecha);
        filaEvento.appendChild(celdaDatosAcontecimiento);
    }
    //IMAGEN DE FONDO
    $("#container").append(imagenFondo);

return tablaDatos;
}