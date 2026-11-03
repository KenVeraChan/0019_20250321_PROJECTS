<?php
/*
 * MENSAJE PREVIO AL CÓDIGO — PUESTA EN MARCHA
 * Base de datos de horarios: horarios  (archivo SQLite data/horarios.db)
 * Tabla SQL:                 zonas_horarias
 * Columnas: nombreContinente, franjaHoraria, numRegiones, numeroRegion,
 *           nombreRegion, caracteristicas, oficiosDestacados
 * Extra:    nombrePlaneta, desfaseHoras, colorContinente
 * Lectura:  transformadorHorariosJSON.php
 * Planetas del desplegable: base cartografia (data/cartografia.db)
 */
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Codificación para textos en español -->
    <meta charset="UTF-8">
    <!-- Escala correcta en móvil y escritorio -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Título de la pestaña -->
    <title>Calendarios planetarios de la Novela</title>
    <!-- Estilos de tarjetas, fases horarias y fondo -->
    <link rel="stylesheet" href="calendariosPlanetarios.css">
</head>
<body>
    <!-- Capa general de la página -->
    <div id="container">
        <!-- Foto de fondo centrada a pantalla completa -->
        <img id="imagenFondo" src="images/calendariosPlanetarios.png" alt="libros antiguos de fondo">

        <!-- Panel principal elevado -->
        <div class="zona-trabajo">
            <div class="panel-principal">
                <!-- Cabecera con desplegable de planeta origen -->
                <header class="cabecera">
                    <!-- Título de la sección -->
                    <h1>Calendarios planetarios de la novela<br>"COMETIDO 4321"</h1>

                    <!-- Controles para elegir planeta, fecha y hora de origen -->
                    <div class="bloque-calculo">
                        <!-- Etiqueta del desplegable de planetas -->
                        <label for="planetaReferencia">Planeta desde el que se calcula la fecha</label>
                        <!-- Mitad: planeta. Mitad: volver al menú -->
                        <div class="fila-planeta">
                            <!-- El usuario elige Tierra o Ambur; el otro se pinta debajo -->
                            <select id="planetaReferencia">
                                <!-- Opción temporal mientras llega el JSON -->
                                <option value="">Cargando planetas...</option>
                            </select>
                            <!-- Ocupa el hueco a la derecha del desplegable acortado -->
                            <a class="btn-volver" href="../index.php">Volver al menu principal</a>
                        </div>

                        <!-- Fecha, día de la semana, hora y minuto en una sola línea -->
                        <div class="fila-fecha-hora">
                            <label for="fechaReferencia">Fecha</label>
                            <input id="fechaReferencia" class="caja-fecha" type="date">
                            <span id="nombreDiaSemana" class="nombre-dia-semana"></span>
                            <label for="horaReferencia">Hora</label>
                            <input id="horaReferencia" class="caja-entero caja-hora" type="number" min="0" max="23" value="0">
                            <label for="minutoReferencia">Minuto</label>
                            <input id="minutoReferencia" class="caja-entero" type="number" min="0" max="59" value="0">
                        </div>
                    </div>
                </header>

                <!-- Visor con las tarjetas del planeta destino -->
                <main class="visor">
                    <!-- Aquí el JS pinta continentes y fases horarias -->
                    <section class="lista-tarjetas" id="listaTarjetas"></section>
                </main>
            </div>
        </div>
    </div>

    <!-- Lógica de conversión, fases y hover -->
    <script src="calendariosPlanetarios.js?v=<?= time() ?>"></script>
</body>
</html>
