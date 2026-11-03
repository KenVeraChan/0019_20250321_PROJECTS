<?php
// MENSAJE PREVIO: base de datos "personajes"; tabla "personajesNovela".

require_once __DIR__ . "/inicializarBasePersonajes.php"; // Abre SQLite y crea la tabla.

$conexionPersonajes = obtenerConexionPersonajes(); // PDO de personajes.
header("Content-Type: application/json; charset=utf-8"); // Respuesta JSON.

if (!($conexionPersonajes instanceof PDO)) { // Sin conexión.
    echo json_encode([]); // Lista vacía.
    exit; // Termina.
}

$consultaPersonajes = $conexionPersonajes->query("SELECT * FROM personajesNovela ORDER BY id ASC"); // Lee todas las fichas.
$listaPersonajes = $consultaPersonajes->fetchAll(PDO::FETCH_ASSOC); // Array asociativo.
echo json_encode($listaPersonajes); // Envía el JSON al visor.
