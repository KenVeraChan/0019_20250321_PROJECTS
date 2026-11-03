<?php
// MENSAJE PREVIO: base de datos "cartografia"; tablas "planetas", "continentes" y "eventos_continentales".

require_once __DIR__ . "/inicializarBaseCartografia.php";  // Abre SQLite y crea tablas si faltan.

$conexionCartografia = obtenerConexionCartografia();  // Obtiene la conexión PDO.

header("Content-Type: application/json; charset=utf-8");  // La respuesta será JSON para el JavaScript.

if (!($conexionCartografia instanceof PDO)) {  // Si no hay conexión, se envía lista vacía.
    echo json_encode([]);  // Array vacío para que la página no se rompa.
    exit;  // Termina el script.
}

$consultaPlanetas = $conexionCartografia->query("SELECT * FROM planetas ORDER BY id ASC");  // Lee todos los planetas padre.
$listaPlanetas = $consultaPlanetas->fetchAll(PDO::FETCH_ASSOC);  // Convierte filas a array asociativo.

$consultaContinentes = $conexionCartografia->prepare("SELECT * FROM continentes WHERE planeta_id = :planeta_id ORDER BY id ASC");  // Continentes de un planeta.
$consultaEventos = $conexionCartografia->prepare("SELECT orden_evento, texto_evento FROM eventos_continentales WHERE continente_id = :continente_id ORDER BY orden_evento ASC");  // Eventos de un continente.

$resultadoCartografia = [];  // Array final que viajará al navegador.

foreach ($listaPlanetas as $filaPlaneta) {  // Recorre cada planeta.
    $identificadorPlaneta = (int)$filaPlaneta["id"];  // Identificador numérico del padre.
    $consultaContinentes->bindValue(":planeta_id", $identificadorPlaneta, PDO::PARAM_INT);  // Filtra por planeta.
    $consultaContinentes->execute();  // Ejecuta la consulta de hijos.
    $listaContinentes = $consultaContinentes->fetchAll(PDO::FETCH_ASSOC);  // Continentes de este planeta.

    $continentesDelPlaneta = [];  // Lista hija que se anidará.

    foreach ($listaContinentes as $filaContinente) {  // Recorre cada continente.
        $identificadorContinente = (int)$filaContinente["id"];  // Identificador del hijo.
        $consultaEventos->bindValue(":continente_id", $identificadorContinente, PDO::PARAM_INT);  // Filtra eventos.
        $consultaEventos->execute();  // Ejecuta la consulta de eventos.
        $listaEventos = $consultaEventos->fetchAll(PDO::FETCH_ASSOC);  // Eventos del continente.

        $filaContinente["eventos_historicos"] = $listaEventos;  // Añade el apartado 13 como lista.
        $continentesDelPlaneta[] = $filaContinente;  // Guarda el continente en el padre.
    }

    $filaPlaneta["continentes"] = $continentesDelPlaneta;  // Anida los hijos en el planeta.
    $resultadoCartografia[] = $filaPlaneta;  // Añade el planeta al JSON.
}

echo json_encode($resultadoCartografia);  // Envía el árbol planeta → continente → eventos.
