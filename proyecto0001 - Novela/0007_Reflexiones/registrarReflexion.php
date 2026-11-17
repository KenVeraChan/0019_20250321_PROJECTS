<?php
/*
 * Alta de una reflexión en reflexones.ideas.
 * Recibe JSON: NOMBRE, APELLIDOS, REFLEXION, FECHA_IDEA.
 * Sin fecha no se guarda.
 */

require_once __DIR__ . "/inicializarBaseReflexones.php"; // Conexión.

header("Content-Type: application/json; charset=utf-8"); // JSON de respuesta.

$cuerpoPeticion = json_decode(file_get_contents("php://input"), true); // Cuerpo.
$nombrePersonaje = trim((string)($cuerpoPeticion["NOMBRE"] ?? "")); // Nombre.
$apellidosPersonaje = trim((string)($cuerpoPeticion["APELLIDOS"] ?? "")); // Apellidos.
$textoReflexion = trim((string)($cuerpoPeticion["REFLEXION"] ?? "")); // Texto.
$fechaIdea = trim((string)($cuerpoPeticion["FECHA_IDEA"] ?? "")); // Fecha obligatoria.

if ($nombrePersonaje === "" || $apellidosPersonaje === "") { // Falta el personaje.
    http_response_code(400); // Petición incorrecta.
    echo json_encode(["error" => "Faltan el nombre o los apellidos del personaje."]); // Aviso.
    exit; // Sale.
}

if ($fechaIdea === "" || !preg_match("/^\d{4}-\d{2}-\d{2}$/", $fechaIdea)) { // Sin fecha no se guarda.
    http_response_code(400); // Petición incorrecta.
    echo json_encode(["error" => "Hay que elegir una fecha para guardar la reflexión."]); // Aviso.
    exit; // Sale.
}

if ($textoReflexion === "") { // Texto vacío.
    http_response_code(400); // Petición incorrecta.
    echo json_encode(["error" => "Escribe la reflexión del personaje."]); // Aviso.
    exit; // Sale.
}

$conexionReflexones = obtenerConexionReflexones(); // Abre reflexones.db.

if (!($conexionReflexones instanceof PDO)) { // Fallo.
    http_response_code(500); // Error de servidor.
    echo json_encode(["error" => is_string($conexionReflexones) ? $conexionReflexones : "Error de conexión"]); // Detalle.
    exit; // Sale.
}

$sentenciaInsertar = $conexionReflexones->prepare(
    "INSERT INTO ideas (NOMBRE, APELLIDOS, REFLEXION, \"FECHA IDEA\") VALUES (:NOMBRE, :APELLIDOS, :REFLEXION, :FECHA_IDEA)"
); // Actualiza la tabla ideas.
$sentenciaInsertar->bindValue(":NOMBRE", $nombrePersonaje, PDO::PARAM_STR); // Nombre.
$sentenciaInsertar->bindValue(":APELLIDOS", $apellidosPersonaje, PDO::PARAM_STR); // Apellidos.
$sentenciaInsertar->bindValue(":REFLEXION", $textoReflexion, PDO::PARAM_STR); // Texto.
$sentenciaInsertar->bindValue(":FECHA_IDEA", $fechaIdea, PDO::PARAM_STR); // Fecha.
$sentenciaInsertar->execute(); // Guarda.

echo json_encode([
    "ok" => true,
    "id" => (int)$conexionReflexones->lastInsertId(),
    "NOMBRE" => $nombrePersonaje,
    "APELLIDOS" => $apellidosPersonaje,
    "REFLEXION" => $textoReflexion,
    "FECHA_IDEA" => $fechaIdea
]); // Confirmación.
