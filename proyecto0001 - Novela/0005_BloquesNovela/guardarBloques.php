<?php
/*
 * Escribe la pertenencia de cada capítulo en cronologia.bloque (data/cronologia.db / datos.sql).
 * En bloques.db solo actualiza el entero CAPITULOS. No copia títulos en DESCRIPCION.
 */

require_once __DIR__ . "/inicializarBaseBloques.php"; // bloques.db.
require_once __DIR__ . "/lecturaCronologia.php"; // cronologia.db.

header("Content-Type: application/json; charset=utf-8"); // JSON de respuesta.

$cuerpoPeticion = json_decode(file_get_contents("php://input"), true); // Cuerpo JSON.
$listaBloques = $cuerpoPeticion["bloques"] ?? null; // Array de bloques.

if (!is_array($listaBloques)) { // Formato incorrecto.
    http_response_code(400); // Petición incorrecta.
    echo json_encode(["error" => "Se esperaba un array de bloques."]); // Aviso.
    exit; // Sale.
}

$conexionBloques = obtenerConexionBloques(); // bloques.db.
$conexionCronologia = obtenerConexionCronologia(); // cronologia.db.

if (!($conexionBloques instanceof PDO) || !($conexionCronologia instanceof PDO)) { // Fallo.
    http_response_code(500); // Error de servidor.
    echo json_encode(["error" => "No se pudo abrir bloques o cronologia."]); // Detalle.
    exit; // Sale.
}

$sentenciaActualizarBloque = $conexionBloques->prepare(
    "UPDATE bloques SET CAPITULOS = :CAPITULOS, DESCRIPCION = :DESCRIPCION WHERE id = :id"
); // Solo el recuento.
$sentenciaLimpiarNombre = $conexionCronologia->prepare(
    "UPDATE cronologia SET bloque = '' WHERE bloque = :bloque"
); // Quita ese nombre de cronologia antes de reasignar.
$sentenciaAsignarCapitulo = $conexionCronologia->prepare(
    "UPDATE cronologia SET bloque = :bloque WHERE titulo = :titulo AND fecha = :fecha"
); // Fuente única: misma fila de acontecimiento.

$conexionBloques->beginTransaction(); // bloques.db.
$conexionCronologia->beginTransaction(); // cronologia.db.

try {
    foreach ($listaBloques as $datosBloque) { // Recorre cada bloque de la interfaz.
        $nombreBloque = trim((string)($datosBloque["NOMBRE"] ?? "")); // Nombre.

        if ($nombreBloque === "") { // Inválido.
            continue; // Siguiente.
        }

        $sentenciaLimpiarNombre->bindValue(":bloque", $nombreBloque, PDO::PARAM_STR); // Nombre a vaciar.
        $sentenciaLimpiarNombre->execute(); // Los capítulos de este bloque quedan libres un momento.
    }

    foreach ($listaBloques as $datosBloque) { // Reasigna desde la interfaz.
        $idBloque = (int)($datosBloque["id"] ?? 0); // Id en bloques.db.
        $nombreBloque = trim((string)($datosBloque["NOMBRE"] ?? "")); // Nombre.
        $capitulosBloque = is_array($datosBloque["capitulos"] ?? null) ? $datosBloque["capitulos"] : []; // Lista UI.
        $listaLimpia = []; // Título + fecha válidos.

        foreach ($capitulosBloque as $datosCapitulo) { // Normaliza.
            $tituloCapitulo = trim((string)($datosCapitulo["titulo"] ?? "")); // Título.
            $fechaCapitulo = trim((string)($datosCapitulo["fecha"] ?? "")); // Fecha.

            if ($tituloCapitulo === "" || $fechaCapitulo === "") { // Incompleto.
                continue; // Omite.
            }

            $listaLimpia[] = ["titulo" => $tituloCapitulo, "fecha" => $fechaCapitulo]; // De cronologia.
            $sentenciaAsignarCapitulo->bindValue(":bloque", $nombreBloque, PDO::PARAM_STR); // Columna bloque.
            $sentenciaAsignarCapitulo->bindValue(":titulo", $tituloCapitulo, PDO::PARAM_STR); // Mismo título.
            $sentenciaAsignarCapitulo->bindValue(":fecha", $fechaCapitulo, PDO::PARAM_STR); // Misma fecha.
            $sentenciaAsignarCapitulo->execute(); // Actualiza las filas de ese capítulo.
        }

        if ($idBloque <= 0) { // Sin fila en bloques.db.
            continue; // No actualiza el recuento.
        }

        $sentenciaActualizarBloque->bindValue(":id", $idBloque, PDO::PARAM_INT); // Id.
        $sentenciaActualizarBloque->bindValue(":CAPITULOS", count($listaLimpia), PDO::PARAM_INT); // Entero.
        $sentenciaActualizarBloque->bindValue(":DESCRIPCION", "", PDO::PARAM_STR); // Sin copiar capítulos.
        $sentenciaActualizarBloque->execute(); // Guarda el recuento.
    }

    $conexionCronologia->commit(); // Confirma cronologia.
    $conexionBloques->commit(); // Confirma bloques.
    echo json_encode(["ok" => true]); // Listo.
} catch (PDOException $excepcionGuardado) { // Error SQL.
    $conexionCronologia->rollBack(); // Deshace cronologia.
    $conexionBloques->rollBack(); // Deshace bloques.
    http_response_code(500); // Error de servidor.
    echo json_encode(["error" => "No se pudo actualizar: " . $excepcionGuardado->getMessage()]); // Detalle.
}
