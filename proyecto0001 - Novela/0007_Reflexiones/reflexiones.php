<?php
/*
 * MENSAJE PREVIO AL CÓDIGO — PUESTA EN MARCHA
 * Personajes: base personajes / tabla personajesNovela (NOMBRE, APELLIDOS)
 * Reflexiones: base reflexones / tabla ideas
 * Columnas ideas: NOMBRE, APELLIDOS, REFLEXION (VARCHAR), "FECHA IDEA" (DATE)
 */
require_once __DIR__ . "/inicializarBaseReflexones.php"; // Crea reflexones.db si no existe.
require_once __DIR__ . "/../0002_Personajes/inicializarBasePersonajes.php"; // Asegura personajes.db.
obtenerConexionReflexones(); // Tabla ideas.
obtenerConexionPersonajes(); // Tabla de fichas.
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Codificación para textos en español -->
    <meta charset="UTF-8">
    <!-- Escala correcta en móvil y escritorio -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Título de la pestaña -->
    <title>Reflexiones del personaje</title>
    <!-- Estilos de la fila de paneles -->
    <link rel="stylesheet" href="estilosReflexiones.css">
</head>
<body>
    <!-- Capa general de la página -->
    <div id="container">
        <!-- Foto de fondo centrada a pantalla completa -->
        <img id="imagenFondo" src="images/reflexiones.png" alt="manuscritos de fondo">

        <!-- Cabecera con título y retorno al menú -->
        <header class="cabecera">
            <h1>Reflexiones del personaje<br>"COMETIDO 4321"</h1>
            <a class="btn-volver" href="../index.php">Volver al menu principal</a>
        </header>

        <!-- Fila de paneles: un personaje por caja -->
        <main class="visor">
            <section class="galeria-paneles" id="galeriaPaneles"></section>
        </main>
    </div>

    <!-- Lógica de despliegue, fecha y registro -->
    <script src="javascriptReflexiones.js?v=<?= time() ?>"></script>
</body>
</html>
