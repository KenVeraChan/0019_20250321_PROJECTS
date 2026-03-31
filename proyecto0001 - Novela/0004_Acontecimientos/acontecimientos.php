<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acontecimientos de la Novela</title>
    <link rel="stylesheet" href="../0004_Acontecimientos/acontecimiento.css">
</head>
<body>
    <div id="container">
        <img id="imagenFondo" src="../0004_Acontecimientos/images/manuscritos.png" alt="manuscritos antiguos de fondo">
        <header class="cabecera">
            <h1 style="text-align:center">Cronologia de Acontecimientos en la Novela <br> "COMETIDO 4321"</h1>
            <a class="btn-volver" href="../index.php">Volver al menu principal</a>
            <a class="btn-registrar" href="../0004_Acontecimientos/registro.php">Registrar nueva fecha</a>
        </header>
        <main class="visor">
            <section class="linea-tiempo" id="lineaTiempo">
                    <script src="estructuraCrono.js?v=<?= time()?>"></script>
            </section>
        </main>
    </div>
</body>
</html>