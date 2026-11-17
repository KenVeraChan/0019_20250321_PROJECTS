<?php
/*
 * JSON único para la interfaz: bloques (nombres en bloques.db) + capítulos leídos de cronologia.db
 * (data/datos.sql). No se copian títulos en DESCRIPCION.
 */

require_once __DIR__ . "/inicializarBaseBloques.php"; // Tabla bloques.
require_once __DIR__ . "/lecturaCronologia.php"; // cronologia.db.

header("Content-Type: application/json; charset=utf-8"); // Respuesta JSON.

$conexionBloques = obtenerConexionBloques(); // bloques.db.
$conexionCronologia = obtenerConexionCronologia(); // cronologia.db.

if (!($conexionBloques instanceof PDO)) { // Fallo bloques.
    echo json_encode(["error" => is_string($conexionBloques) ? $conexionBloques : "Error de conexión a bloques"]); // Aviso.
    exit; // No sigue.
}

if (!($conexionCronologia instanceof PDO)) { // Fallo cronologia.
    echo json_encode(["error" => is_string($conexionCronologia) ? $conexionCronologia : "Error de conexión a cronologia"]); // Aviso.
    exit; // No sigue.
}

$capitulosUnicos = listarCapitulosUnicosCronologia($conexionCronologia); // Título + fecha, una vez.
sincronizarNombresBloqueDesdeCronologia($conexionBloques, $capitulosUnicos); // Prologo y demás nombres ya usados.

$consultaBloques = $conexionBloques->query("SELECT id, NOMBRE, CAPITULOS, DESCRIPCION FROM bloques ORDER BY id ASC"); // Filas de bloques.db.
$filasBloques = $consultaBloques->fetchAll(PDO::FETCH_ASSOC); // Array.

$capitulosPorNombreBloque = []; // Agrupa sin duplicar datos.

foreach ($capitulosUnicos as $datosCapitulo) { // Reparte según cronologia.bloque.
    $nombreBloque = $datosCapitulo["bloque"]; // Nombre.

    if ($nombreBloque === "") { // Sin bloque.
        continue; // Solo sale en la columna de años.
    }

    if (!isset($capitulosPorNombreBloque[$nombreBloque])) { // Primer capítulo de ese bloque.
        $capitulosPorNombreBloque[$nombreBloque] = []; // Lista.
    }

    $capitulosPorNombreBloque[$nombreBloque][] = [
        "titulo" => $datosCapitulo["titulo"], // De cronologia.
        "fecha" => $datosCapitulo["fecha"] // De cronologia.
    ];
}

$listaBloques = []; // Salida de la columna dorada.

foreach ($filasBloques as $filaBloque) { // Cada nombre registrado.
    $nombreBloque = trim((string)$filaBloque["NOMBRE"]); // Nombre.
    $capitulosDeEsteBloque = $capitulosPorNombreBloque[$nombreBloque] ?? []; // Leídos de cronologia.

    $listaBloques[] = [
        "id" => (int)$filaBloque["id"], // Id en bloques.db.
        "NOMBRE" => $nombreBloque, // Nombre.
        "CAPITULOS" => count($capitulosDeEsteBloque), // Entero real, no una copia.
        "capitulos" => $capitulosDeEsteBloque // Título y fecha de cronologia.
    ];
}

$listaCapitulosAnio = []; // Columna verde: todos los capítulos únicos de cronologia.

foreach ($capitulosUnicos as $datosCapitulo) { // Sin el campo bloque.
    $listaCapitulosAnio[] = [
        "titulo" => $datosCapitulo["titulo"], // Título.
        "fecha" => $datosCapitulo["fecha"] // Fecha.
    ];
}

echo json_encode([
    "bloques" => $listaBloques, // Izquierda.
    "capitulos" => $listaCapitulosAnio // Derecha.
]); // Una sola fuente: cronologia + nombres de bloques.db.
