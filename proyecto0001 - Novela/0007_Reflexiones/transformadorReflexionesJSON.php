<?php
/*
 * JSON de la sección: personajes (nombre y apellidos) + ideas de reflexones.ideas.
 */

require_once __DIR__ . "/../0002_Personajes/inicializarBasePersonajes.php"; // personajes.db.
require_once __DIR__ . "/inicializarBaseReflexones.php"; // reflexones.db.

header("Content-Type: application/json; charset=utf-8"); // Respuesta JSON.

$conexionPersonajes = obtenerConexionPersonajes(); // Lee fichas.
$conexionReflexones = obtenerConexionReflexones(); // Lee ideas.

if (!($conexionPersonajes instanceof PDO) || !($conexionReflexones instanceof PDO)) { // Fallo.
    echo json_encode(["error" => "No se pudo abrir personajes o reflexones.", "personajes" => [], "ideas" => []]); // Vacío.
    exit; // Sale.
}

$listaPersonajes = $conexionPersonajes->query(
    "SELECT id, NOMBRE, APELLIDOS FROM personajesNovela ORDER BY APELLIDOS ASC, NOMBRE ASC"
)->fetchAll(PDO::FETCH_ASSOC); // Solo nombre y apellidos para la fila de paneles.

$listaIdeas = $conexionReflexones->query(
    "SELECT id, NOMBRE, APELLIDOS, REFLEXION, \"FECHA IDEA\" AS FECHA_IDEA FROM ideas ORDER BY \"FECHA IDEA\" ASC, id ASC"
)->fetchAll(PDO::FETCH_ASSOC); // Reflexiones de cada personaje.

echo json_encode([
    "personajes" => $listaPersonajes, // Paneles.
    "ideas" => $listaIdeas // Listas desplegadas.
]);
