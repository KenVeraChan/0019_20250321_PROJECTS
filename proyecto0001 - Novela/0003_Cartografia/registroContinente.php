<?php
/*
 * MENSAJE PREVIO AL CÓDIGO — PUESTA EN MARCHA
 * Base de datos: cartografia
 * Tablas SQL:    continentes (hijo) y eventos_continentales (apartado 13)
 * Relación:      continentes.planeta_id → planetas.id
 */

require_once __DIR__ . "/inicializarBaseCartografia.php";  // Conexión y CREATE TABLE.

$mensajeUsuario = "";  // Texto de confirmación o error.
$tipoMensaje = "";  // Clase CSS: ok o error.
$listaPlanetas = [];  // Opciones del desplegable padre.

$conexionCartografia = obtenerConexionCartografia();  // Abre data/cartografia.db.

if ($conexionCartografia instanceof PDO) {  // Solo si hay conexión válida.
    $consultaPlanetas = $conexionCartografia->query("SELECT id, nombre_planeta FROM planetas ORDER BY nombre_planeta ASC");  // Lista de padres.
    $listaPlanetas = $consultaPlanetas->fetchAll(PDO::FETCH_ASSOC);  // Array de planetas.
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {  // El usuario envió el formulario hijo.
    $identificadorPlaneta = filter_var($_POST["planeta_id"] ?? "", FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);  // Padre elegido.
    $nombreContinente = trim($_POST["nombre_continente"] ?? "");  // 0) Nombre del continente.
    $caracteristicasTerritoriales = trim($_POST["caracteristicas_territoriales"] ?? "");  // 1) Características territoriales.
    $empleosDestacados = trim($_POST["empleos_destacados"] ?? "");  // 2) Empleos más destacados.
    $financiacionEstatal = trim($_POST["financiacion_estatal"] ?? "");  // 3) Financiación destacada del gobierno estatal.
    $importaciones = trim($_POST["importaciones"] ?? "");  // 4) Importaciones más exigidas.
    $exportaciones = trim($_POST["exportaciones"] ?? "");  // 5) Exportaciones más exigidas.
    $fuerzasMilitares = trim($_POST["fuerzas_militares"] ?? "");  // 6) Fuerzas militares.
    $climaPrimavera = trim($_POST["clima_primavera"] ?? "");  // 7) Climatología en primavera.
    $climaVerano = trim($_POST["clima_verano"] ?? "");  // 8) Climatología en verano.
    $climaOtono = trim($_POST["clima_otono"] ?? "");  // 9) Climatología en otoño.
    $climaInvierno = trim($_POST["clima_invierno"] ?? "");  // 10) Climatología en invierno.
    $coordenadasGeograficas = trim($_POST["coordenadas_geograficas"] ?? "");  // 11) Colocación coordenadas geográficas.
    $zonaHoraria = trim($_POST["zona_horaria"] ?? "");  // 12) Zona horaria territorial.
    $textosEventos = $_POST["textos_eventos"] ?? [];  // 13) Lista de textareas de eventos.

    if (!is_array($textosEventos)) {  // Defensa si el campo no llega como array.
        $textosEventos = [];  // Lista vacía.
    }

    $eventosLimpios = [];  // Eventos válidos que se guardarán.

    foreach ($textosEventos as $textoEventoBruto) {  // Recorre cada textarea.
        $textoEvento = trim((string)$textoEventoBruto);  // Quita espacios.

        if ($textoEvento === "") {  // Textarea vacío: se ignora.
            continue;  // Pasa al siguiente.
        }

        if (mb_strlen($textoEvento) > 2000) {  // Tope de 2000 caracteres.
            $textoEvento = mb_substr($textoEvento, 0, 2000);  // Recorta el exceso.
        }

        $eventosLimpios[] = $textoEvento;  // Añade el evento.
    }

    if ($identificadorPlaneta === false) {  // No hay planeta padre.
        $mensajeUsuario = "Debe elegir un planeta padre antes de registrar el continente.";  // Aviso.
        $tipoMensaje = "error";  // Estilo de error.
    } elseif ($nombreContinente === "") {  // El nombre es obligatorio para el panel compacto.
        $mensajeUsuario = "El nombre del continente es obligatorio.";  // Aviso.
        $tipoMensaje = "error";  // Estilo de error.
    } elseif (!($conexionCartografia instanceof PDO)) {  // Sin base de datos.
        $mensajeUsuario = "No hay conexión con la base de datos cartografia.";  // Aviso.
        $tipoMensaje = "error";  // Estilo de error.
    } else {
        try {
            $conexionCartografia->beginTransaction();  // Guarda continente y eventos juntos.

            $sqlInsertarContinente = "INSERT INTO continentes (
                planeta_id, nombre_continente, caracteristicas_territoriales, empleos_destacados,
                financiacion_estatal, importaciones, exportaciones, fuerzas_militares,
                clima_primavera, clima_verano, clima_otono, clima_invierno,
                coordenadas_geograficas, zona_horaria
            ) VALUES (
                :planeta_id, :nombre_continente, :caracteristicas_territoriales, :empleos_destacados,
                :financiacion_estatal, :importaciones, :exportaciones, :fuerzas_militares,
                :clima_primavera, :clima_verano, :clima_otono, :clima_invierno,
                :coordenadas_geograficas, :zona_horaria
            )";  // Alta en la tabla hija.

            $sentenciaContinente = $conexionCartografia->prepare($sqlInsertarContinente);  // Prepara el INSERT.
            $sentenciaContinente->bindValue(":planeta_id", $identificadorPlaneta, PDO::PARAM_INT);  // Padre.
            $sentenciaContinente->bindValue(":nombre_continente", $nombreContinente, PDO::PARAM_STR);  // 0.
            $sentenciaContinente->bindValue(":caracteristicas_territoriales", $caracteristicasTerritoriales, PDO::PARAM_STR);  // 1.
            $sentenciaContinente->bindValue(":empleos_destacados", $empleosDestacados, PDO::PARAM_STR);  // 2.
            $sentenciaContinente->bindValue(":financiacion_estatal", $financiacionEstatal, PDO::PARAM_STR);  // 3.
            $sentenciaContinente->bindValue(":importaciones", $importaciones, PDO::PARAM_STR);  // 4.
            $sentenciaContinente->bindValue(":exportaciones", $exportaciones, PDO::PARAM_STR);  // 5.
            $sentenciaContinente->bindValue(":fuerzas_militares", $fuerzasMilitares, PDO::PARAM_STR);  // 6.
            $sentenciaContinente->bindValue(":clima_primavera", $climaPrimavera, PDO::PARAM_STR);  // 7.
            $sentenciaContinente->bindValue(":clima_verano", $climaVerano, PDO::PARAM_STR);  // 8.
            $sentenciaContinente->bindValue(":clima_otono", $climaOtono, PDO::PARAM_STR);  // 9.
            $sentenciaContinente->bindValue(":clima_invierno", $climaInvierno, PDO::PARAM_STR);  // 10.
            $sentenciaContinente->bindValue(":coordenadas_geograficas", $coordenadasGeograficas, PDO::PARAM_STR);  // 11.
            $sentenciaContinente->bindValue(":zona_horaria", $zonaHoraria, PDO::PARAM_STR);  // 12.
            $sentenciaContinente->execute();  // Guarda el continente.

            $identificadorContinente = (int)$conexionCartografia->lastInsertId();  // Id del hijo recién creado.

            $sqlInsertarEvento = "INSERT INTO eventos_continentales (continente_id, orden_evento, texto_evento)
                VALUES (:continente_id, :orden_evento, :texto_evento)";  // Alta de cada evento del apartado 13.
            $sentenciaEvento = $conexionCartografia->prepare($sqlInsertarEvento);  // Prepara el INSERT de eventos.

            foreach ($eventosLimpios as $indiceEvento => $textoEvento) {  // Recorre eventos válidos.
                $ordenEvento = $indiceEvento + 1;  // Orden 1, 2, 3...
                $sentenciaEvento->bindValue(":continente_id", $identificadorContinente, PDO::PARAM_INT);  // Continente dueño.
                $sentenciaEvento->bindValue(":orden_evento", $ordenEvento, PDO::PARAM_INT);  // Posición.
                $sentenciaEvento->bindValue(":texto_evento", $textoEvento, PDO::PARAM_STR);  // Texto (máx. 2000).
                $sentenciaEvento->execute();  // Guarda el evento.
            }

            $conexionCartografia->commit();  // Confirma continente + eventos.
            $mensajeUsuario = "Continente registrado correctamente.";  // Confirmación.
            $tipoMensaje = "ok";  // Estilo correcto.
            $_POST = [];  // Limpia el formulario.
        } catch (PDOException $excepcionGuardado) {  // Error SQL.
            if ($conexionCartografia->inTransaction()) {  // Si la transacción sigue abierta.
                $conexionCartografia->rollBack();  // Deshace el lote.
            }
            $mensajeUsuario = "No se pudo guardar el continente: " . $excepcionGuardado->getMessage();  // Detalle.
            $tipoMensaje = "error";  // Estilo de error.
        }
    }
}

function valorCampoContinente($nombreCampo)  // Recupera un valor POST para no perder lo escrito.
{
    return htmlspecialchars($_POST[$nombreCampo] ?? "", ENT_QUOTES, "UTF-8");  // Texto seguro.
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrar continente</title>
    <link rel="stylesheet" href="cartografia.css">
</head>
<body>
    <img id="imagenFondo" src="images/cartografia.png" alt="libros antiguos de fondo">
    <main class="contenedor-formulario">
        <h1>Registrar continente (panel hijo)</h1>
        <div class="acciones">
            <a class="btn" href="cartografia.php">Volver a cartografía</a>
            <a class="btn" href="registroPlaneta.php">Registrar planeta padre</a>
        </div>

        <?php if ($mensajeUsuario !== ""): ?>
            <div class="mensaje <?= htmlspecialchars($tipoMensaje, ENT_QUOTES, "UTF-8"); ?>">
                <?= htmlspecialchars($mensajeUsuario, ENT_QUOTES, "UTF-8"); ?>
            </div>
        <?php endif; ?>

        <?php if (count($listaPlanetas) === 0): ?>
            <div class="mensaje error">Primero registre un planeta. Sin panel padre no se puede crear un continente.</div>
        <?php else: ?>
        <form method="post" action="" id="formularioContinente">
            <label for="planeta_id">Planeta padre</label>
            <select id="planeta_id" name="planeta_id" required>
                <option value="">Elija un planeta</option>
                <?php foreach ($listaPlanetas as $filaPlaneta): ?>
                    <?php $identificadorOpcion = (int)$filaPlaneta["id"]; ?>
                    <option
                        value="<?= $identificadorOpcion; ?>"
                        <?= ((string)($_POST["planeta_id"] ?? "") === (string)$identificadorOpcion) ? "selected" : ""; ?>
                    >
                        <?= htmlspecialchars($filaPlaneta["nombre_planeta"], ENT_QUOTES, "UTF-8"); ?>
                    </option>
                <?php endforeach; ?>
            </select>

            <label for="nombre_continente">0) Nombre del continente</label>
            <input id="nombre_continente" name="nombre_continente" type="text" maxlength="200" value="<?= valorCampoContinente("nombre_continente"); ?>" required>

            <label for="caracteristicas_territoriales">1) Características territoriales</label>
            <textarea id="caracteristicas_territoriales" name="caracteristicas_territoriales" class="caja-extendible"><?= valorCampoContinente("caracteristicas_territoriales"); ?></textarea>

            <label for="empleos_destacados">2) Empleos más destacados</label>
            <textarea id="empleos_destacados" name="empleos_destacados" class="caja-extendible"><?= valorCampoContinente("empleos_destacados"); ?></textarea>

            <label for="financiacion_estatal">3) Financiación destacada del gobierno estatal</label>
            <textarea id="financiacion_estatal" name="financiacion_estatal" class="caja-extendible"><?= valorCampoContinente("financiacion_estatal"); ?></textarea>

            <label for="importaciones">4) Importaciones más exigidas</label>
            <textarea id="importaciones" name="importaciones" class="caja-extendible"><?= valorCampoContinente("importaciones"); ?></textarea>

            <label for="exportaciones">5) Exportaciones más exigidas</label>
            <textarea id="exportaciones" name="exportaciones" class="caja-extendible"><?= valorCampoContinente("exportaciones"); ?></textarea>

            <label for="fuerzas_militares">6) Fuerzas militares</label>
            <textarea id="fuerzas_militares" name="fuerzas_militares" class="caja-extendible"><?= valorCampoContinente("fuerzas_militares"); ?></textarea>

            <label for="clima_primavera">7) Climatología en la estación de primavera</label>
            <textarea id="clima_primavera" name="clima_primavera" class="caja-extendible"><?= valorCampoContinente("clima_primavera"); ?></textarea>

            <label for="clima_verano">8) Climatología en la estación de verano</label>
            <textarea id="clima_verano" name="clima_verano" class="caja-extendible"><?= valorCampoContinente("clima_verano"); ?></textarea>

            <label for="clima_otono">9) Climatología en la estación de otoño</label>
            <textarea id="clima_otono" name="clima_otono" class="caja-extendible"><?= valorCampoContinente("clima_otono"); ?></textarea>

            <label for="clima_invierno">10) Climatología en la estación de invierno</label>
            <textarea id="clima_invierno" name="clima_invierno" class="caja-extendible"><?= valorCampoContinente("clima_invierno"); ?></textarea>

            <label for="coordenadas_geograficas">11) Colocación coordenadas geográficas</label>
            <input id="coordenadas_geograficas" name="coordenadas_geograficas" type="text" maxlength="300" value="<?= valorCampoContinente("coordenadas_geograficas"); ?>">

            <label for="zona_horaria">12) Zona horaria territorial</label>
            <input id="zona_horaria" name="zona_horaria" type="text" maxlength="120" value="<?= valorCampoContinente("zona_horaria"); ?>">

            <label for="cantidad_eventos">13) Eventos históricos territoriales de índole característico (cantidad)</label>
            <select id="cantidad_eventos">
                <?php for ($cantidad = 0; $cantidad <= 15; $cantidad++): ?>
                    <option value="<?= $cantidad; ?>"><?= $cantidad; ?></option>
                <?php endfor; ?>
            </select>
            <div id="contenedorEventos"></div>

            <div class="acciones">
                <button class="btn" type="submit">Guardar continente en base de datos</button>
            </div>
        </form>
        <?php endif; ?>
    </main>

    <script>
        // Ajusta la altura de un textarea al texto escrito.
        function ajustarAlturaCaja(cajaTexto) {
            cajaTexto.style.height = "auto"; // Resetea para medir el contenido real.
            cajaTexto.style.height = cajaTexto.scrollHeight + "px"; // Crece con el texto.
        }

        // Activa el crecimiento automático en todas las cajas extendibles.
        function activarCajasExtendibles() {
            const listaCajas = document.querySelectorAll(".caja-extendible"); // Todas las textareas del formulario.

            listaCajas.forEach(function (cajaTexto) { // Recorre cada caja.
                cajaTexto.addEventListener("input", function () { // Cada pulsación.
                    ajustarAlturaCaja(cajaTexto); // Recalcula altura.
                });
                ajustarAlturaCaja(cajaTexto); // Ajuste inicial.
            });
        }

        // Crea tantas textareas de evento como indique el desplegable.
        function pintarCajasEventos() {
            const desplegableCantidad = document.getElementById("cantidad_eventos"); // Select del apartado 13.
            const contenedorEventos = document.getElementById("contenedorEventos"); // Zona donde se insertan las cajas.
            const cantidadElegida = parseInt(desplegableCantidad.value, 10); // Número de eventos.
            let htmlEventos = ""; // Acumulador HTML.

            for (let numeroEvento = 1; numeroEvento <= cantidadElegida; numeroEvento++) { // Un bloque por evento.
                htmlEventos += `
                    <label for="evento_${numeroEvento}">Evento histórico ${numeroEvento} (máximo 2000 caracteres)</label>
                    <textarea
                        id="evento_${numeroEvento}"
                        name="textos_eventos[]"
                        class="caja-extendible"
                        maxlength="2000"
                        placeholder="Describa el evento histórico territorial..."
                    ></textarea>
                `; // Textarea extendible ligada al POST.
            }

            contenedorEventos.innerHTML = htmlEventos; // Pinta las cajas nuevas.
            activarCajasExtendibles(); // Vuelve a enlazar el autoajuste.
        }

        const desplegableCantidad = document.getElementById("cantidad_eventos"); // Referencia al select.

        if (desplegableCantidad) { // Solo si el formulario está visible.
            desplegableCantidad.addEventListener("change", pintarCajasEventos); // Recrea cajas al cambiar la cantidad.
            activarCajasExtendibles(); // Activa las textareas de los apartados 1 a 10.
        }
    </script>
</body>
</html>
