<?php
/*
 * Alta de un bloque vacío. Recibe JSON { NOMBRE }.
 * CAPITULOS empieza en 0. DESCRIPCION queda vacía: los capítulos se leen de cronologia.
 */

require_once __DIR__ . "/inicializarBaseBloques.php"; // Conexión.

header("Content-Type: application/json; charset=utf-8"); // JSON de respuesta.

$cuerpoPeticion = json_decode(file_get_contents("php://input"), true); // Cuerpo JSON.
$nombreBloque = trim((string)($cuerpoPeticion["NOMBRE"] ?? "")); // Nombre pedido al usuario.

if ($nombreBloque === "") { // Obligatorio.
    http_response_code(400); // Petición incorrecta.
    echo json_encode(["error" => "El nombre del bloque es obligatorio."]); // Aviso.
    exit; // Sale.
}

$conexionBloques = obtenerConexionBloques(); // Abre bloques.db.

if (!($conexionBloques instanceof PDO)) { // Fallo.
    http_response_code(500); // Error de servidor.
    echo json_encode(["error" => is_string($conexionBloques) ? $conexionBloques : "Error de conexión"]); // Detalle.
    exit; // Sale.
}

$sentenciaInsertar = $conexionBloques->prepare(
    "INSERT INTO bloques (NOMBRE, CAPITULOS, DESCRIPCION) VALUES (:NOMBRE, 0, :DESCRIPCION)"
); // Bloque nuevo, sin capítulos.
$sentenciaInsertar->bindValue(":NOMBRE", $nombreBloque, PDO::PARAM_STR); // Nombre.
$sentenciaInsertar->bindValue(":DESCRIPCION", "", PDO::PARAM_STR); // Vacío: no se copian capítulos.
$sentenciaInsertar->execute(); // Guarda.

$idNuevoBloque = (int)$conexionBloques->lastInsertId(); // Identificador.

echo json_encode([
    "id" => $idNuevoBloque,
    "NOMBRE" => $nombreBloque,
    "CAPITULOS" => 0,
    "DESCRIPCION" => "",
    "capitulos" => []
]); // Devuelve el bloque creado.
