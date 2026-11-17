<?php
// MENSAJE PREVIO: base de datos "horarios"; tabla "zonas_horarias".
// Agrupa las filas por planeta y continente para la interfaz de calendarios.

require_once __DIR__ . "/inicializarBaseHorarios.php"; // Abre horarios.db y siembra si esta vacia.

$conexionHorarios = obtenerConexionHorarios(); // PDO de horarios.
header("Content-Type: application/json; charset=utf-8"); // Respuesta JSON.

if (!($conexionHorarios instanceof PDO)) { // Sin conexion.
    echo json_encode(new stdClass()); // Objeto vacio.
    exit; // Termina.
}

$consultaZonas = $conexionHorarios->query(
    "SELECT nombrePlaneta, nombreContinente, franjaHoraria, numRegiones, numeroRegion,
            desfaseHoras, colorContinente, nombreRegion, caracteristicas, oficiosDestacados
     FROM zonas_horarias
     ORDER BY id ASC, numeroRegion ASC"
); // Lee todas las regiones ordenadas.
$filasZonas = $consultaZonas->fetchAll(PDO::FETCH_ASSOC); // Array asociativo.

$mapaPlanetas = array(); // { Ambur: [ continentes... ], Tierra: [ ... ] }

foreach ($filasZonas as $filaZona) { // Recorre cada region.
    $nombrePlaneta = $filaZona["nombrePlaneta"]; // Ambur o Tierra.
    $nombreContinente = $filaZona["nombreContinente"]; // Nombre del continente.

    if (!isset($mapaPlanetas[$nombrePlaneta])) { // Primer continente de ese planeta.
        $mapaPlanetas[$nombrePlaneta] = array(); // Lista de continentes.
    }

    $indiceContinente = -1; // Busca si el continente ya esta abierto.
    foreach ($mapaPlanetas[$nombrePlaneta] as $indiceActual => $continenteActual) { // Recorre los ya agrupados.
        if ($continenteActual["nombreContinente"] === $nombreContinente) { // Mismo continente.
            $indiceContinente = $indiceActual; // Lo reutiliza.
            break; // Sale.
        }
    }

    if ($indiceContinente < 0) { // Continente nuevo.
        $mapaPlanetas[$nombrePlaneta][] = array( // Cabecera del continente.
            "nombreContinente" => $nombreContinente,
            "franjaHoraria" => $filaZona["franjaHoraria"],
            "numRegiones" => (int)$filaZona["numRegiones"],
            "colorContinente" => $filaZona["colorContinente"],
            "regiones" => array()
        );
        $indiceContinente = count($mapaPlanetas[$nombrePlaneta]) - 1; // Ultimo anadido.
    }

    $mapaPlanetas[$nombrePlaneta][$indiceContinente]["regiones"][] = array( // Una fase/region.
        "numeroRegion" => (int)$filaZona["numeroRegion"],
        "desfaseHoras" => (int)$filaZona["desfaseHoras"],
        "nombreRegion" => $filaZona["nombreRegion"],
        "caracteristicas" => $filaZona["caracteristicas"],
        "oficiosDestacados" => $filaZona["oficiosDestacados"]
    );
}

echo json_encode($mapaPlanetas); // Arbol planeta → continente → regiones.
