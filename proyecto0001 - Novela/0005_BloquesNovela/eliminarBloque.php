<?php
/*
 * Borra el nombre en bloques.db y deja vacía la columna bloque de cronologia
 * para no perder los capítulos (siguen en datos/cronologia).
 */

require_once __DIR__ . "/inicializarBaseBloques.php"; // bloques.db.
require_once __DIR__ . "/lecturaCronologia.php"; // cronologia.db.

header("Content-Type: application/json; charset=utf-8"); // JSON de respuesta.

$cuerpoPeticion = json_decode(file_get_contents("php://input"), true); // Cuerpo JSON.
$idBloque = (int)($cuerpoPeticion["id"] ?? 0); // Identificador.

if ($idBloque <= 0) { // Falta el id.
    http_response_code(400); // Petición incorrecta.
    echo json_encode(["error" => "Falta el identificador del bloque."]); // Aviso.
    exit; // Sale.
}

$conexionBloques = obtenerConexionBloques(); // bloques.db.
$conexionCronologia = obtenerConexionCronologia(); // cronologia.db.

if (!($conexionBloques instanceof PDO) || !($conexionCronologia instanceof PDO)) { // Fallo.
    http_response_code(500); // Error de servidor.
    echo json_encode(["error" => "No se pudo abrir bloques o cronologia."]); // Detalle.
    exit; // Sale.
}

$sentenciaNombre = $conexionBloques->prepare("SELECT NOMBRE FROM bloques WHERE id = :id"); // Nombre a limpiar.
$sentenciaNombre->bindValue(":id", $idBloque, PDO::PARAM_INT); // Id.
$sentenciaNombre->execute(); // Lee.
$filaBloque = $sentenciaNombre->fetch(PDO::FETCH_ASSOC); // Fila.

if (!$filaBloque) { // No existe.
    http_response_code(404); // No encontrado.
    echo json_encode(["error" => "Ese bloque no existe."]); // Aviso.
    exit; // Sale.
}

$nombreBloque = trim((string)$filaBloque["NOMBRE"]); // Nombre.

$sentenciaBorrar = $conexionBloques->prepare("DELETE FROM bloques WHERE id = :id"); // Baja en bloques.db.
$sentenciaBorrar->bindValue(":id", $idBloque, PDO::PARAM_INT); // Id.
$sentenciaBorrar->execute(); // Ejecuta.

$sentenciaLiberar = $conexionCronologia->prepare("UPDATE cronologia SET bloque = '' WHERE bloque = :bloque"); // Los capítulos siguen, sin ese bloque.
$sentenciaLiberar->bindValue(":bloque", $nombreBloque, PDO::PARAM_STR); // Nombre.
$sentenciaLiberar->execute(); // Libera.

echo json_encode(["ok" => true, "id" => $idBloque]); // Confirmación.
