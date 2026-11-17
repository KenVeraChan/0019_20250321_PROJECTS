<?php
/*
 * MENSAJE PREVIO AL CÓDIGO — PUESTA EN MARCHA
 * Base de datos: personajes  (archivo SQLite data/personajes.db)
 * Tabla SQL:     personajesNovela
 * Columnas: NOMBRE, APELLIDOS, HOBBIE, PROFESION, SIMBOLOGIA_PERSONALIDAD,
 *           FECHA_NACIMIENTO (DATE), ZONA_RESIDENCIA
 */

require_once __DIR__ . "/inicializarBasePersonajes.php"; // Conexión y CREATE TABLE.

$mensajeUsuario = ""; // Texto de guardado.
$tipoMensaje = ""; // ok o error.
$vistaActiva = trim($_GET["vista"] ?? "menu"); // menu, nuevo o lista.

if ($_SERVER["REQUEST_METHOD"] === "POST") { // Alta de personaje.
    $nombrePersonaje = trim($_POST["NOMBRE"] ?? ""); // Nombre.
    $apellidosPersonaje = trim($_POST["APELLIDOS"] ?? ""); // Apellidos.
    $hobbiePersonaje = trim($_POST["HOBBIE"] ?? ""); // Hobbie.
    $profesionPersonaje = trim($_POST["PROFESION"] ?? ""); // Profesión.
    $simbologiaPersonaje = trim($_POST["SIMBOLOGIA_PERSONALIDAD"] ?? ""); // Simbología de personalidad.
    $fechaNacimiento = trim($_POST["FECHA_NACIMIENTO"] ?? ""); // Fecha de nacimiento.
    $zonaResidencia = trim($_POST["ZONA_RESIDENCIA"] ?? ""); // Zona de residencia.
    $vistaActiva = "nuevo"; // Se queda en el formulario si hay error.

    if ($nombrePersonaje === "" || $apellidosPersonaje === "") { // Nombre y apellidos son obligatorios.
        $mensajeUsuario = "El nombre y los apellidos son obligatorios."; // Aviso.
        $tipoMensaje = "error"; // Estilo de error.
    } else {
        try {
            $conexionPersonajes = obtenerConexionPersonajes(); // Abre personajes.db.

            if (!($conexionPersonajes instanceof PDO)) { // Conexión fallida.
                $mensajeUsuario = is_string($conexionPersonajes) ? $conexionPersonajes : "Error de conexión."; // Detalle.
                $tipoMensaje = "error"; // Estilo de error.
            } else {
                $sqlInsertar = "INSERT INTO personajesNovela (
                    NOMBRE, APELLIDOS, HOBBIE, PROFESION, SIMBOLOGIA_PERSONALIDAD, FECHA_NACIMIENTO, ZONA_RESIDENCIA
                ) VALUES (
                    :NOMBRE, :APELLIDOS, :HOBBIE, :PROFESION, :SIMBOLOGIA_PERSONALIDAD, :FECHA_NACIMIENTO, :ZONA_RESIDENCIA
                )"; // Alta en personajesNovela.
                $sentenciaInsertar = $conexionPersonajes->prepare($sqlInsertar); // Prepara el INSERT.
                $sentenciaInsertar->bindValue(":NOMBRE", $nombrePersonaje, PDO::PARAM_STR); // Nombre.
                $sentenciaInsertar->bindValue(":APELLIDOS", $apellidosPersonaje, PDO::PARAM_STR); // Apellidos.
                $sentenciaInsertar->bindValue(":HOBBIE", $hobbiePersonaje, PDO::PARAM_STR); // Hobbie.
                $sentenciaInsertar->bindValue(":PROFESION", $profesionPersonaje, PDO::PARAM_STR); // Profesión.
                $sentenciaInsertar->bindValue(":SIMBOLOGIA_PERSONALIDAD", $simbologiaPersonaje, PDO::PARAM_STR); // Simbología.
                $sentenciaInsertar->bindValue(":FECHA_NACIMIENTO", $fechaNacimiento, PDO::PARAM_STR); // Fecha.
                $sentenciaInsertar->bindValue(":ZONA_RESIDENCIA", $zonaResidencia, PDO::PARAM_STR); // Residencia.
                $sentenciaInsertar->execute(); // Guarda la ficha.

                $mensajeUsuario = "Personaje registrado correctamente."; // Confirmación.
                $tipoMensaje = "ok"; // Estilo correcto.
                $vistaActiva = "lista"; // Pasa a la lista tras guardar.
                $_POST = []; // Limpia el formulario.
            }
        } catch (PDOException $excepcionGuardado) { // Error SQL.
            $mensajeUsuario = "No se pudo guardar el personaje: " . $excepcionGuardado->getMessage(); // Detalle.
            $tipoMensaje = "error"; // Estilo de error.
        }
    }
}

function valorCampoPersonaje($nombreCampo) // Recupera un POST para no perder lo escrito.
{
    return htmlspecialchars($_POST[$nombreCampo] ?? "", ENT_QUOTES, "UTF-8"); // Texto seguro.
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Personajes de la Novela</title>
    <link rel="stylesheet" href="estilosPersonajes.css">
</head>
<body>
    <div id="container">
        <img id="imagenFondo" src="images/personajes.png" alt="fondo del apartado personajes">

        <header class="cabecera">
            <h1>Personajes de la novela<br>"COMETIDO 4321"</h1>
            <a class="btn-volver" href="../index.php">Volver al menu principal</a>
            <a class="btn-accion" href="personajes.php?vista=nuevo">Introducir personaje nuevo</a>
            <a class="btn-accion" href="personajes.php?vista=lista">Mostrar lista de personajes</a>
        </header>

        <main class="visor">
            <?php if ($mensajeUsuario !== ""): ?>
                <div class="mensaje <?= htmlspecialchars($tipoMensaje, ENT_QUOTES, "UTF-8"); ?>">
                    <?= htmlspecialchars($mensajeUsuario, ENT_QUOTES, "UTF-8"); ?>
                </div>
            <?php endif; ?>

            <?php if ($vistaActiva === "nuevo"): ?>
            <form class="formulario-personaje" method="post" action="personajes.php?vista=nuevo">
                <h2>Introducir un personaje nuevo</h2>

                <label for="NOMBRE">Nombre</label>
                <input id="NOMBRE" name="NOMBRE" type="text" maxlength="200" value="<?= valorCampoPersonaje("NOMBRE"); ?>" required>

                <label for="APELLIDOS">Apellidos</label>
                <input id="APELLIDOS" name="APELLIDOS" type="text" maxlength="200" value="<?= valorCampoPersonaje("APELLIDOS"); ?>" required>

                <label for="HOBBIE">Hobbie</label>
                <input id="HOBBIE" name="HOBBIE" type="text" maxlength="500" value="<?= valorCampoPersonaje("HOBBIE"); ?>">

                <label for="PROFESION">Profesión</label>
                <input id="PROFESION" name="PROFESION" type="text" maxlength="500" value="<?= valorCampoPersonaje("PROFESION"); ?>">

                <label for="SIMBOLOGIA_PERSONALIDAD">Simbología personalidad</label>
                <textarea id="SIMBOLOGIA_PERSONALIDAD" name="SIMBOLOGIA_PERSONALIDAD"><?= valorCampoPersonaje("SIMBOLOGIA_PERSONALIDAD"); ?></textarea>

                <label for="FECHA_NACIMIENTO">Fecha de nacimiento</label>
                <input id="FECHA_NACIMIENTO" name="FECHA_NACIMIENTO" type="date" value="<?= valorCampoPersonaje("FECHA_NACIMIENTO"); ?>">

                <label for="ZONA_RESIDENCIA">Zona de residencia</label>
                <input id="ZONA_RESIDENCIA" name="ZONA_RESIDENCIA" type="text" maxlength="300" value="<?= valorCampoPersonaje("ZONA_RESIDENCIA"); ?>">

                <button class="btn-accion" type="submit">Guardar en base de datos</button>
            </form>
            <?php elseif ($vistaActiva === "lista"): ?>
            <section class="galeria-cajas" id="galeriaCajas"></section>
            <?php else: ?>
            <section class="eleccion-inicial">
                <p class="aviso-vacio">Elija primero si quiere introducir un personaje nuevo o mostrar la lista ya registrada.</p>
                <a class="btn-grande" href="personajes.php?vista=nuevo">Introducir personaje nuevo</a>
                <a class="btn-grande" href="personajes.php?vista=lista">Mostrar lista de personajes</a>
            </section>
            <?php endif; ?>
        </main>
    </div>

    <?php if ($vistaActiva === "lista"): ?>
    <script src="javascriptPersonajes.js?v=<?= time() ?>"></script>
    <?php endif; ?>
</body>
</html>
