<?php
/*
 * MENSAJE PREVIO AL CÓDIGO — PUESTA EN MARCHA
 * Base de datos: cartografia
 * Tabla SQL:     planetas
 */

require_once __DIR__ . "/inicializarBaseCartografia.php";  // Conexión y CREATE TABLE.

$mensajeUsuario = "";  // Texto de confirmación o error.
$tipoMensaje = "";  // Clase CSS: ok o error.

if ($_SERVER["REQUEST_METHOD"] === "POST") {  // El usuario envió el formulario padre.
    $nombrePlaneta = trim($_POST["nombre_planeta"] ?? "");  // Nombre del planeta (necesario para el panel padre).
    $intensidadGravitatoria = trim($_POST["intensidad_gravitatoria"] ?? "");  // Intensidad gravitatoria.
    $masaPlaneta = trim($_POST["masa_planeta"] ?? "");  // Masa del planeta.
    $radioPlaneta = trim($_POST["radio_planeta"] ?? "");  // Radio del planeta.
    $superficieTotal = trim($_POST["superficie_total"] ?? "");  // Superficie total.
    $volumenTotal = trim($_POST["volumen_total"] ?? "");  // Volumen total.
    $velocidadEscape = trim($_POST["velocidad_escape"] ?? "");  // Velocidad de escape.
    $densidadTotal = trim($_POST["densidad_total"] ?? "");  // Densidad total.
    $velocidadRotacion = trim($_POST["velocidad_rotacion"] ?? "");  // Velocidad de rotación.
    $periodoRotacion = trim($_POST["periodo_rotacion"] ?? "");  // Período de rotación.
    $duracionDia = trim($_POST["duracion_dia"] ?? "");  // Duración del día.
    $periodoTraslacion = trim($_POST["periodo_traslacion"] ?? "");  // Período de traslación a su sol.
    $tiempoLuzSol = trim($_POST["tiempo_luz_sol"] ?? "");  // Tiempo en que llega la luz del sol.
    $distanciaSolAmbur = trim($_POST["distancia_sol_ambur"] ?? "");  // Distancia al sol desde Ambur.
    $distanciaUaTierra = trim($_POST["distancia_ua_tierra"] ?? "");  // Distancia anterior en U.A. (Tierra).
    $grosorAtmosfera = trim($_POST["grosor_atmosfera"] ?? "");  // Grosor completo de la atmósfera.
    $continentesEnAmbur = trim($_POST["continentes_en_ambur"] ?? "");  // Continentes en el planeta Ambur.

    if ($nombrePlaneta === "") {  // Sin nombre no se puede crear el panel padre.
        $mensajeUsuario = "El nombre del planeta es obligatorio.";  // Aviso.
        $tipoMensaje = "error";  // Estilo de error.
    } else {
        try {
            $conexionCartografia = obtenerConexionCartografia();  // Abre data/cartografia.db.

            if (!($conexionCartografia instanceof PDO)) {  // La conexión no es usable.
                $mensajeUsuario = is_string($conexionCartografia) ? $conexionCartografia : "Error de conexión.";  // Texto de fallo.
                $tipoMensaje = "error";  // Estilo de error.
            } else {
                $sqlInsertarPlaneta = "INSERT INTO planetas (
                    nombre_planeta, intensidad_gravitatoria, masa_planeta, radio_planeta, superficie_total,
                    volumen_total, velocidad_escape, densidad_total, velocidad_rotacion, periodo_rotacion,
                    duracion_dia, periodo_traslacion, tiempo_luz_sol, distancia_sol_ambur, distancia_ua_tierra,
                    grosor_atmosfera, continentes_en_ambur
                ) VALUES (
                    :nombre_planeta, :intensidad_gravitatoria, :masa_planeta, :radio_planeta, :superficie_total,
                    :volumen_total, :velocidad_escape, :densidad_total, :velocidad_rotacion, :periodo_rotacion,
                    :duracion_dia, :periodo_traslacion, :tiempo_luz_sol, :distancia_sol_ambur, :distancia_ua_tierra,
                    :grosor_atmosfera, :continentes_en_ambur
                )";  // Alta en la tabla padre.

                $sentenciaInsertar = $conexionCartografia->prepare($sqlInsertarPlaneta);  // Prepara el INSERT.
                $sentenciaInsertar->bindValue(":nombre_planeta", $nombrePlaneta, PDO::PARAM_STR);  // Nombre.
                $sentenciaInsertar->bindValue(":intensidad_gravitatoria", $intensidadGravitatoria, PDO::PARAM_STR);  // Gravedad.
                $sentenciaInsertar->bindValue(":masa_planeta", $masaPlaneta, PDO::PARAM_STR);  // Masa.
                $sentenciaInsertar->bindValue(":radio_planeta", $radioPlaneta, PDO::PARAM_STR);  // Radio.
                $sentenciaInsertar->bindValue(":superficie_total", $superficieTotal, PDO::PARAM_STR);  // Superficie.
                $sentenciaInsertar->bindValue(":volumen_total", $volumenTotal, PDO::PARAM_STR);  // Volumen.
                $sentenciaInsertar->bindValue(":velocidad_escape", $velocidadEscape, PDO::PARAM_STR);  // Escape.
                $sentenciaInsertar->bindValue(":densidad_total", $densidadTotal, PDO::PARAM_STR);  // Densidad.
                $sentenciaInsertar->bindValue(":velocidad_rotacion", $velocidadRotacion, PDO::PARAM_STR);  // Rotación.
                $sentenciaInsertar->bindValue(":periodo_rotacion", $periodoRotacion, PDO::PARAM_STR);  // Periodo rotación.
                $sentenciaInsertar->bindValue(":duracion_dia", $duracionDia, PDO::PARAM_STR);  // Día.
                $sentenciaInsertar->bindValue(":periodo_traslacion", $periodoTraslacion, PDO::PARAM_STR);  // Traslación.
                $sentenciaInsertar->bindValue(":tiempo_luz_sol", $tiempoLuzSol, PDO::PARAM_STR);  // Luz solar.
                $sentenciaInsertar->bindValue(":distancia_sol_ambur", $distanciaSolAmbur, PDO::PARAM_STR);  // Distancia Ambur.
                $sentenciaInsertar->bindValue(":distancia_ua_tierra", $distanciaUaTierra, PDO::PARAM_STR);  // Distancia UA.
                $sentenciaInsertar->bindValue(":grosor_atmosfera", $grosorAtmosfera, PDO::PARAM_STR);  // Atmósfera.
                $sentenciaInsertar->bindValue(":continentes_en_ambur", $continentesEnAmbur, PDO::PARAM_STR);  // Continentes Ambur.
                $sentenciaInsertar->execute();  // Guarda la fila.

                $mensajeUsuario = "Planeta registrado correctamente.";  // Confirmación.
                $tipoMensaje = "ok";  // Estilo correcto.
                $_POST = [];  // Limpia el formulario.
            }
        } catch (PDOException $excepcionGuardado) {  // Error SQL.
            $mensajeUsuario = "No se pudo guardar el planeta: " . $excepcionGuardado->getMessage();  // Detalle.
            $tipoMensaje = "error";  // Estilo de error.
        }
    }
}

function valorCampo($nombreCampo)  // Recupera un valor POST para no perder lo escrito.
{
    return htmlspecialchars($_POST[$nombreCampo] ?? "", ENT_QUOTES, "UTF-8");  // Texto seguro para el HTML.
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrar planeta</title>
    <link rel="stylesheet" href="cartografia.css">
</head>
<body>
    <img id="imagenFondo" src="images/cartografia.png" alt="libros antiguos de fondo">
    <main class="contenedor-formulario">
        <h1>Registrar planeta (panel padre)</h1>
        <div class="acciones">
            <a class="btn" href="cartografia.php">Volver a cartografía</a>
        </div>
        <?php if ($mensajeUsuario !== ""): ?>
            <div class="mensaje <?= htmlspecialchars($tipoMensaje, ENT_QUOTES, "UTF-8"); ?>">
                <?= htmlspecialchars($mensajeUsuario, ENT_QUOTES, "UTF-8"); ?>
            </div>
        <?php endif; ?>

        <form method="post" action="">
            <label for="nombre_planeta">Nombre del planeta</label>
            <input id="nombre_planeta" name="nombre_planeta" type="text" maxlength="200" value="<?= valorCampo("nombre_planeta"); ?>" required>

            <label for="intensidad_gravitatoria">Intensidad gravitatoria</label>
            <input id="intensidad_gravitatoria" name="intensidad_gravitatoria" type="text" value="<?= valorCampo("intensidad_gravitatoria"); ?>">

            <label for="masa_planeta">Masa del planeta</label>
            <input id="masa_planeta" name="masa_planeta" type="text" value="<?= valorCampo("masa_planeta"); ?>">

            <label for="radio_planeta">Radio del planeta</label>
            <input id="radio_planeta" name="radio_planeta" type="text" value="<?= valorCampo("radio_planeta"); ?>">

            <label for="superficie_total">Superficie total</label>
            <input id="superficie_total" name="superficie_total" type="text" value="<?= valorCampo("superficie_total"); ?>">

            <label for="volumen_total">Volumen total</label>
            <input id="volumen_total" name="volumen_total" type="text" value="<?= valorCampo("volumen_total"); ?>">

            <label for="velocidad_escape">Velocidad de escape</label>
            <input id="velocidad_escape" name="velocidad_escape" type="text" value="<?= valorCampo("velocidad_escape"); ?>">

            <label for="densidad_total">Densidad total</label>
            <input id="densidad_total" name="densidad_total" type="text" value="<?= valorCampo("densidad_total"); ?>">

            <label for="velocidad_rotacion">Velocidad de rotación</label>
            <input id="velocidad_rotacion" name="velocidad_rotacion" type="text" value="<?= valorCampo("velocidad_rotacion"); ?>">

            <label for="periodo_rotacion">Período de rotación</label>
            <input id="periodo_rotacion" name="periodo_rotacion" type="text" value="<?= valorCampo("periodo_rotacion"); ?>">

            <label for="duracion_dia">Duración del día</label>
            <input id="duracion_dia" name="duracion_dia" type="text" value="<?= valorCampo("duracion_dia"); ?>">

            <label for="periodo_traslacion">Período de traslación a su sol</label>
            <input id="periodo_traslacion" name="periodo_traslacion" type="text" value="<?= valorCampo("periodo_traslacion"); ?>">

            <label for="tiempo_luz_sol">Tiempo en que llega la luz del sol</label>
            <input id="tiempo_luz_sol" name="tiempo_luz_sol" type="text" value="<?= valorCampo("tiempo_luz_sol"); ?>">

            <label for="distancia_sol_ambur">Distancia al sol desde Ambur</label>
            <input id="distancia_sol_ambur" name="distancia_sol_ambur" type="text" value="<?= valorCampo("distancia_sol_ambur"); ?>">

            <label for="distancia_ua_tierra">Distancia anterior en U.A. (Tierra)</label>
            <input id="distancia_ua_tierra" name="distancia_ua_tierra" type="text" value="<?= valorCampo("distancia_ua_tierra"); ?>">

            <label for="grosor_atmosfera">Grosor completo de la atmósfera</label>
            <input id="grosor_atmosfera" name="grosor_atmosfera" type="text" value="<?= valorCampo("grosor_atmosfera"); ?>">

            <label for="continentes_en_ambur">Continentes en el planeta Ambur</label>
            <textarea id="continentes_en_ambur" name="continentes_en_ambur"><?= valorCampo("continentes_en_ambur"); ?></textarea>

            <div class="acciones">
                <button class="btn" type="submit">Guardar planeta en base de datos</button>
            </div>
        </form>
    </main>
</body>
</html>
