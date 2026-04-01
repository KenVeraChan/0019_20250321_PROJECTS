<?php
require "../servidor.php";

/*
 * ZONA A — Estado inicial (valores del formulario y banderas).
 * Se inicializa todo para que el HTML no use variables indefinidas.
 */
$mensaje = "";
$tipoMensaje = "";
$valorIdBusqueda = "";
$edicionVisible = false;
$bloque = "";
$titulo = "";
$fecha = "";
$horas = "";
$minutos = "";
$acontecimiento = "";
$personajes = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    /*
     * ZONA C — Actualizar fila existente (debe ir antes que la carga si ambas
     * condiciones pudieran coincidir; aquí se distingue por name="actualizar").
     */
    if (isset($_POST["actualizar"])) {
        $valorIdBusqueda = trim((string)($_POST["id"] ?? ""));
        $bloque = trim($_POST["bloque"] ?? "");
        $titulo = trim($_POST["titulo"] ?? "");
        $fecha = trim($_POST["fecha"] ?? "");
        $horas = trim($_POST["horas"] ?? "");
        $minutos = trim($_POST["minutos"] ?? "");
        $acontecimiento = trim($_POST["acontecimiento"] ?? "");
        $personajes = trim($_POST["personajes"] ?? "");

        $id = filter_var($valorIdBusqueda, FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);
        $h = filter_var($horas, FILTER_VALIDATE_INT, ["options" => ["min_range" => 0, "max_range" => 23]]);
        $m = filter_var($minutos, FILTER_VALIDATE_INT, ["options" => ["min_range" => 0, "max_range" => 59]]);

        if ($id === false || $bloque === "" || $titulo === "" || $fecha === "" || $acontecimiento === "" || $personajes === "" || $h === false || $m === false) {
            $mensaje = "Revisa el ID y todos los campos obligatorios (horas 0-23, minutos 0-59).";
            $tipoMensaje = "error";
            $edicionVisible = true;
        } else {
            try {
                $db = new Database();
                $conn = $db->connexion();
                if (!($conn instanceof PDO)) {
                    $mensaje = is_string($conn) ? $conn : "Error de conexión.";
                    $tipoMensaje = "error";
                    $edicionVisible = true;
                } else {
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $sql = "UPDATE cronologia SET bloque = :bloque, titulo = :titulo, fecha = :fecha, horas = :horas, minutos = :minutos, acontecimiento = :acontecimiento, personajes = :personajes WHERE id = :id";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindValue(":bloque", $bloque, PDO::PARAM_STR);
                    $stmt->bindValue(":titulo", $titulo, PDO::PARAM_STR);
                    $stmt->bindValue(":fecha", $fecha, PDO::PARAM_STR);
                    $stmt->bindValue(":horas", $h, PDO::PARAM_INT);
                    $stmt->bindValue(":minutos", $m, PDO::PARAM_INT);
                    $stmt->bindValue(":acontecimiento", $acontecimiento, PDO::PARAM_STR);
                    $stmt->bindValue(":personajes", $personajes, PDO::PARAM_STR);
                    $stmt->bindValue(":id", $id, PDO::PARAM_INT);
                    $stmt->execute();

                    $mensaje = "Acontecimiento actualizado correctamente.";
                    $tipoMensaje = "ok";
                    $edicionVisible = true;
                }
            } catch (PDOException $e) {
                $mensaje = "No se pudo actualizar el acontecimiento: " . $e->getMessage();
                $tipoMensaje = "error";
                $edicionVisible = true;
            }
        }
    /*
     * ZONA B — Cargar registro por ID (botón "Cargar datos" con name="cargar").
     */
    } elseif (isset($_POST["cargar"])) {
        $valorIdBusqueda = trim((string)($_POST["id"] ?? ""));
        $id = filter_var($valorIdBusqueda, FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);

        if ($id === false) {
            $mensaje = "Indica un ID numérico válido.";
            $tipoMensaje = "error";
        } else {
            try {
                $db = new Database();
                $conn = $db->connexion();
                if (!($conn instanceof PDO)) {
                    $mensaje = is_string($conn) ? $conn : "Error de conexión.";
                    $tipoMensaje = "error";
                } else {
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $sql = "SELECT * FROM cronologia WHERE id = :id";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindValue(":id", $id, PDO::PARAM_INT);
                    $stmt->execute();
                    $registro = $stmt->fetch(PDO::FETCH_ASSOC);

                    if ($registro) {
                        $bloque = (string)$registro["bloque"];
                        $titulo = (string)$registro["titulo"];
                        $fecha = (string)$registro["fecha"];
                        $horas = (string)(int)$registro["horas"];
                        $minutos = (string)(int)$registro["minutos"];
                        $acontecimiento = (string)$registro["acontecimiento"];
                        $personajes = (string)$registro["personajes"];
                        $edicionVisible = true;
                        $mensaje = "Acontecimiento cargado correctamente. Puedes editar y pulsar «Actualizar en base de datos».";
                        $tipoMensaje = "ok";
                    } else {
                        $mensaje = "No se encontró ningún registro con el ID proporcionado.";
                        $tipoMensaje = "error";
                    }
                }
            } catch (PDOException $e) {
                $mensaje = "No se pudo cargar los datos: " . $e->getMessage();
                $tipoMensaje = "error";
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Actualizar fecha</title>
    <style>
        * { box-sizing: border-box; }
        body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            background: #f2f4f8;
            color: #1f2c3d;
        }
        #imagenFondo{
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.55;
            z-index: -2;
        }
        .contenedor {
            width: min(780px, 92vw);
            margin: 28px auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
            padding: 22px;
        }
        h1 {
            margin: 0 0 16px 0;
            color: #153454;
            font-size: 1.5rem;
        }
        .acciones {
            display: flex;
            gap: 10px;
            margin-bottom: 14px;
        }
        .btn {
            display: inline-block;
            padding: 8px 14px;
            border-radius: 8px;
            border: 1px solid rgba(15, 45, 76, 0.45);
            background: rgba(255, 255, 255, 0.9);
            color: #153454;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 700;
            cursor: pointer;
        }
        .btn:hover {
            background: rgba(21, 52, 84, 0.93);
            color: #ffffff;
        }
        label {
            display: block;
            margin: 12px 0 6px;
            font-weight: 700;
        }
        input, textarea {
            width: 100%;
            border: 1px solid #c8d1de;
            border-radius: 8px;
            padding: 10px 12px;
            font: inherit;
        }
        textarea {
            min-height: 130px;
            resize: vertical;
        }
        .mensaje {
            margin: 8px 0 12px;
            padding: 10px 12px;
            border-radius: 8px;
            font-weight: 700;
        }
        .mensaje.ok {
            background: #e6f8ec;
            color: #0a5b2f;
            border: 1px solid #b6e6c7;
        }
        .mensaje.error {
            background: #fdecec;
            color: #8d1f1f;
            border: 1px solid #f0baba;
        }
    </style>
</head>
<body>
    <main class="contenedor">
        <h1>Actualizar acontecimiento</h1>
        <div class="acciones">
            <a class="btn" href="../0004_Acontecimientos/acontecimientos.php">Volver a cronologia</a>
        </div>
        <?php if ($mensaje !== ""): ?>
            <div class="mensaje <?= htmlspecialchars($tipoMensaje, ENT_QUOTES, 'UTF-8'); ?>">
                <?= htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8'); ?>
            </div>
        <?php endif; ?>

        <!-- ZONA D — Buscar por ID (solo envía id + acción cargar) -->
        <form method="post" action="">
            <label for="id">ID</label>
            <input
                id="id"
                name="id"
                type="number"
                min="1"
                value="<?= htmlspecialchars($valorIdBusqueda, ENT_QUOTES, 'UTF-8'); ?>"
                required
            >
            <p>
                <div class="acciones">
                    <button class="btn" type="submit" name="cargar" value="1">Cargar datos</button>
                </div>
            </p>
        </form>

        <!-- ZONA E — Edición: incluye input hidden id para que el UPDATE conozca la fila -->
        <?php if ($edicionVisible): ?>
            <form method="post" action="">
                <input type="hidden" name="id" value="<?= htmlspecialchars($valorIdBusqueda, ENT_QUOTES, 'UTF-8'); ?>">

                <label for="bloque">Bloque</label>
                <input
                    id="bloque"
                    name="bloque"
                    type="text"
                    maxlength="100"
                    value="<?= htmlspecialchars($bloque, ENT_QUOTES, 'UTF-8'); ?>"
                    required
                >
                <label for="titulo">Titulo</label>
                <input
                    id="titulo"
                    name="titulo"
                    type="text"
                    maxlength="100"
                    value="<?= htmlspecialchars($titulo, ENT_QUOTES, 'UTF-8'); ?>"
                    required
                >
                <label for="fecha">Fecha</label>
                <input
                    id="fecha"
                    name="fecha"
                    type="date"
                    value="<?= htmlspecialchars($fecha, ENT_QUOTES, 'UTF-8'); ?>"
                    required
                >
                <label for="horas">Horas</label>
                <input
                    id="horas"
                    name="horas"
                    type="number"
                    value="<?= htmlspecialchars($horas, ENT_QUOTES, 'UTF-8'); ?>"
                    min="0"
                    max="23"
                    required
                >
                <label for="minutos">Minutos</label>
                <input
                    id="minutos"
                    name="minutos"
                    type="number"
                    value="<?= htmlspecialchars($minutos, ENT_QUOTES, 'UTF-8'); ?>"
                    min="0"
                    max="59"
                    required
                >
                <label for="acontecimiento">Acontecimiento</label>
                <textarea
                    id="acontecimiento"
                    name="acontecimiento"
                    maxlength="1000"
                    required
                ><?= htmlspecialchars($acontecimiento, ENT_QUOTES, 'UTF-8'); ?></textarea>

                <label for="personajes">Personajes</label>
                <input
                    id="personajes"
                    name="personajes"
                    type="text"
                    maxlength="200"
                    value="<?= htmlspecialchars($personajes, ENT_QUOTES, 'UTF-8'); ?>"
                    required
                >
                <p>
                    <div class="acciones">
                        <button class="btn" type="submit" name="actualizar" value="1">Actualizar en base de datos</button>
                    </div>
                </p>
            </form>
        <?php endif; ?>
    </main>
    <img id="imagenFondo" src="../0004_Acontecimientos/images/manuscritos.png" alt="manuscritos antiguos de fondo">
</body>
</html>
