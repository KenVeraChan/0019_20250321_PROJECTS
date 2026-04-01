<?php
require "../servidor.php";

$mensaje = "";
$tipoMensaje = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $bloque = trim($_POST["bloque"] ?? "");
    $titulo = trim($_POST["titulo"] ?? "");
    $fecha = trim($_POST["fecha"] ?? "");
    $horas = trim($_POST["horas"] ?? "");
    $minutos = trim($_POST["minutos"] ?? "");
    $acontecimiento = trim($_POST["acontecimiento"] ?? "");
    $personajes = trim($_POST["personajes"] ?? "");

    if ($fecha === "" || $titulo === "" || $acontecimiento === "") {
        $mensaje = "Todos los campos son obligatorios.";
        $tipoMensaje = "error";
    } else {
        try {
            $db = new Database();
            $conn = $db->connexion();

            $sql = "INSERT INTO cronologia (bloque, titulo, fecha, horas, minutos, acontecimiento, personajes) VALUES (:bloque, :titulo, :fecha, :horas, :minutos, :acontecimiento, :personajes)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":bloque", $bloque, PDO::PARAM_STR);
            $stmt->bindParam(":titulo", $titulo, PDO::PARAM_STR);
            $stmt->bindParam(":fecha", $fecha, PDO::PARAM_STR);
            $stmt->bindParam(":horas", $horas, PDO::PARAM_STR);
            $stmt->bindParam(":minutos", $minutos, PDO::PARAM_STR);
            $stmt->bindParam(":acontecimiento", $acontecimiento, PDO::PARAM_STR);
            $stmt->bindParam(":personajes", $personajes, PDO::PARAM_STR);
            $stmt->execute();

            $mensaje = "Acontecimiento registrado correctamente.";
            $tipoMensaje = "ok";

            // Limpiar formulario tras guardar.
            $_POST = [];
        } catch (PDOException $e) {
            $mensaje = "No se pudo guardar el acontecimiento: " . $e->getMessage();
            $tipoMensaje = "error";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrar fecha</title>
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
        <h1>Registrar nuevo acontecimiento</h1>
        <div class="acciones">
            <a class="btn" href="../0004_Acontecimientos/acontecimientos.php">Volver a cronologia</a>
        </div>
        <?php if ($mensaje !== ""): ?>
            <div class="mensaje <?= htmlspecialchars($tipoMensaje, ENT_QUOTES, 'UTF-8'); ?>">
                <?= htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8'); ?>
            </div>
        <?php endif; ?>

        <form method="post" action="">
        <!-- 1) BLOQUE  -->
            <label for="titulo">Bloque</label>
            <input
                id="bloque"
                name="bloque"
                type="text"
                maxlength="500"
                value="<?= htmlspecialchars($_POST["bloque"] ?? "", ENT_QUOTES, 'UTF-8'); ?>"
                required
            >
        <!-- 2) TITULO  -->
            <label for="titulo">Titulo</label>
            <input
                id="titulo"
                name="titulo"
                type="text"
                maxlength="500"
                value="<?= htmlspecialchars($_POST["titulo"] ?? "", ENT_QUOTES, 'UTF-8'); ?>"
                required
            >
        <!-- 3) FECHA  -->
            <label for="fecha">Fecha</label>
            <input
                id="fecha"
                name="fecha"
                type="date"
                value="<?= htmlspecialchars($_POST["fecha"] ?? "", ENT_QUOTES, 'UTF-8'); ?>"
                required
            >
        <!-- 4) HORAS  -->
            <label for="horas">Horas</label>
            <input
                id="horas"
                name="horas"
                type="number"
                value="<?= htmlspecialchars($_POST["horas"] ?? "", ENT_QUOTES, 'UTF-8'); ?>"
                min="0"
                max="23"
                required
            >
        <!-- 5) MINUTOS  -->
            <label for="minutos">Minutos</label>
            <input
                id="minutos"
                name="minutos"
                type="number"
                value="<?= htmlspecialchars($_POST["minutos"] ?? "", ENT_QUOTES, 'UTF-8'); ?>"
                min="0"
                max="59"
                required
            >
        <!-- 6) ACONTECIMIENTO  -->
            <label for="acontecimiento">Acontecimiento</label>
            <textarea
                id="acontecimiento"
                name="acontecimiento"
                maxlength="3000"
                required
                value="<?= htmlspecialchars($_POST["acontecimiento"] ?? "", ENT_QUOTES, 'UTF-8'); ?>"
                required
            ></textarea>  
        <!-- 7) PERSONAJES  -->
            <label for="personajes">Personajes</label>
            <textarea
                id="personajes"
                name="personajes"
                maxlength="200"
                required
                value="<?= htmlspecialchars($_POST["personajes"] ?? "", ENT_QUOTES, 'UTF-8'); ?>"
                required
            ></textarea>
            <div class="acciones">
                <button class="btn" type="submit">Guardar en base de datos</button>
            </div>
        </form>
    </main>
    <img id="imagenFondo" src="../0004_Acontecimientos/images/manuscritos.png" alt="manuscritos antiguos de fondo">
</body>
</html>
