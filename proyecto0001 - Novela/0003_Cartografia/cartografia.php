<?php
/*
 * MENSAJE PREVIO AL CÓDIGO — PUESTA EN MARCHA DE LA BASE DE DATOS
 * ----------------------------------------------------------------
 * Nombre de la base de datos: cartografia
 * Archivo SQLite a usar:      data/cartografia.db
 * Tablas SQL a consultar:
 *   1) planetas                 → ficha padre de cada planeta
 *   2) continentes              → ficha hija de cada continente (usa planeta_id)
 *   3) eventos_continentales    → eventos históricos del apartado 13 (usa continente_id)
 * El archivo data/cartografia.sql contiene el CREATE TABLE listo para ejecutar.
 * Esta página también crea las tablas sola la primera vez que se abre.
 */
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Codificación de caracteres para textos en español -->
    <meta charset="UTF-8">
    <!-- Adaptación de la vista a móviles y escritorio -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Título de la pestaña del navegador -->
    <title>Cartografía de la Novela</title>
    <!-- Hoja de estilos propia de cartografía -->
    <link rel="stylesheet" href="cartografia.css">
</head>
<body>
    <!-- Contenedor general de la página, igual que en acontecimientos.php -->
    <div id="container">
        <!-- Foto de fondo centrada y cubriendo toda la ventana -->
        <img id="imagenFondo" src="images/cartografia.png" alt="libros antiguos de fondo">

        <!-- Cabecera con título y botones de registro / consulta -->
        <header class="cabecera">
            <!-- Título principal de la sección -->
            <h1>Cartografía planetaria de la novela<br>"COMETIDO 4321"</h1>
            <!-- Enlace de retorno al menú -->
            <a class="btn-volver" href="../index.php">Volver al menu principal</a>
            <!-- Enlace al formulario padre: registrar planeta -->
            <a class="btn-registrar" href="registroPlaneta.php">Registrar planeta</a>
            <!-- Enlace al formulario hijo: registrar continente -->
            <a class="btn-registrar" href="registroContinente.php">Registrar continente</a>
        </header>

        <!-- Zona de consulta: paneles deslizantes de planetas y continentes -->
        <main class="visor">
            <!-- Lista que el JavaScript rellena leyendo la base de datos -->
            <section class="galeria-paneles" id="galeriaPaneles"></section>
        </main>
    </div>

    <!-- Lógica de paneles, hover y lectura JSON -->
    <script src="cartografia.js?v=<?= time() ?>"></script>
</body>
</html>
