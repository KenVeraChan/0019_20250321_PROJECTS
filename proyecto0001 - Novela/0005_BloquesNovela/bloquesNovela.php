<?php
/*
 * MENSAJE PREVIO AL CÓDIGO — PUESTA EN MARCHA
 * Base de datos: bloques  (archivo SQLite data/bloques.db)
 * Tabla SQL:     bloques
 * Columnas: NOMBRE VARCHAR, CAPITULOS INTEGER, DESCRIPCION VARCHAR
 * Capítulos y fechas: cronologia.db (arranca con data/datos.sql), no se duplican.
 */
require_once __DIR__ . "/inicializarBaseBloques.php"; // Crea bloques.db si no existe.
obtenerConexionBloques(); // Asegura la tabla antes de pintar la página.
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Codificación para textos en español -->
    <meta charset="UTF-8">
    <!-- Escala correcta en móvil y escritorio -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Título de la pestaña -->
    <title>Bloques de la Novela</title>
    <!-- Estilos de columnas, desplegables y botones -->
    <link rel="stylesheet" href="estilosBloquesNovela.css">
</head>
<body>
    <!-- Capa general de la página -->
    <div id="container">
        <!-- Foto de fondo centrada a pantalla completa -->
        <img id="imagenFondo" src="images/anotacionesHistóricas.png" alt="anotaciones históricas de fondo">

        <!-- Cabecera con título y botones de acción -->
        <header class="cabecera">
            <!-- Título de la sección -->
            <h1>Bloques de la novela<br>"COMETIDO 4321"</h1>

            <!-- Botones azul marino cálido: volver, borrar bloque, borrar capítulo, guardar -->
            <div class="barra-botones">
                <a class="btn-marino" href="../index.php">Volver al menu principal</a>
                <button type="button" class="btn-marino" id="botonEliminarBloque" disabled>Eliminar bloque</button>
                <button type="button" class="btn-marino" id="botonEliminarCapitulo" disabled>Eliminar capítulo del bloque</button>
                <button type="button" class="btn-marino" id="botonActualizarBase" disabled>Actualizar la base de datos</button>
            </div>
        </header>

        <!-- Dos zonas: bloques a la izquierda, capítulos por año a la derecha -->
        <main class="visor">
            <!-- Columna dorada de bloques -->
            <section class="columna-bloques" id="columnaBloques">
                <h2>Bloques</h2>
                <!-- Alta de un bloque: solo pide el nombre -->
                <div class="alta-bloque">
                    <label for="nombreNuevoBloque">Nombre del bloque</label>
                    <div class="fila-alta">
                        <input id="nombreNuevoBloque" type="text" maxlength="200" placeholder="Escribe el nombre">
                        <button type="button" class="btn-marino" id="botonCrearBloque">Añadir bloque</button>
                    </div>
                </div>
                <!-- Cada bloque es un desplegable (vacío al crearlo) -->
                <div id="listaDesplegablesBloques" class="lista-desplegables"></div>
            </section>

            <!-- Columna verde diamante: capítulos agrupados por año -->
            <section class="columna-capitulos" id="columnaCapitulos">
                <h2>Capítulos por año</h2>
                <!-- Añade al bloque enfocado el capítulo elegido a la derecha -->
                <button type="button" class="btn-marino" id="botonAnadirCapitulo" disabled>Añadir capítulo al bloque</button>
                <!-- Un desplegable por año, con el año escrito al lado -->
                <div id="listaDesplegablesAnios" class="lista-desplegables"></div>
            </section>
        </main>
    </div>

    <!-- Lógica de foco, altas, bajas y guardado -->
    <script src="javascriptBloquesNovela.js?v=<?= time() ?>"></script>
</body>
</html>
