<?php
/*
 * Lectura de cronologia.db (el archivo que arranca con data/datos.sql).
 * Los capítulos y su columna bloque son la fuente única; no se copian a bloques.DESCRIPCION.
 */

require_once __DIR__ . "/../servidor.php"; // Clase Database.

function obtenerConexionCronologia() // PDO de data/cronologia.db.
{
    $baseDatosCronologia = new Database("cronologia.db"); // Misma base que acontecimientos.
    $conexionCronologia = $baseDatosCronologia->connexion(); // Abre el archivo.

    if ($conexionCronologia instanceof PDO) { // Conexión correcta.
        $conexionCronologia->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Excepciones.
    }

    return $conexionCronologia; // PDO o texto de error.
}

function listarCapitulosUnicosCronologia($conexionCronologia) // Un capítulo = título + fecha, sin repetir filas de evento.
{
    $consultaEventos = $conexionCronologia->query(
        "SELECT bloque, titulo, fecha FROM cronologia ORDER BY fecha ASC, horas ASC, minutos ASC, id ASC"
    ); // Orden de la novela.
    $filasEventos = $consultaEventos->fetchAll(PDO::FETCH_ASSOC); // Todas las filas.
    $capitulosUnicos = []; // clave titulo|fecha.

    foreach ($filasEventos as $filaEvento) { // Recorre cronologia.
        $tituloCapitulo = trim((string)($filaEvento["titulo"] ?? "")); // Título.
        $fechaCapitulo = trim((string)($filaEvento["fecha"] ?? "")); // Fecha.
        $nombreBloque = trim((string)($filaEvento["bloque"] ?? "")); // Columna bloque.

        if ($tituloCapitulo === "" || $fechaCapitulo === "") { // Fila incompleta.
            continue; // La omite.
        }

        $claveCapitulo = $tituloCapitulo . "|" . $fechaCapitulo; // Identificador.

        if (isset($capitulosUnicos[$claveCapitulo])) { // Ya salió este capítulo.
            continue; // No duplica.
        }

        $capitulosUnicos[$claveCapitulo] = [
            "titulo" => $tituloCapitulo, // Nombre del capítulo.
            "fecha" => $fechaCapitulo, // Fecha adjunta.
            "bloque" => $nombreBloque // Bloque en cronologia.
        ];
    }

    return array_values($capitulosUnicos); // Lista plana.
}

function sincronizarNombresBloqueDesdeCronologia($conexionBloques, $capitulosUnicos) // Crea en bloques.db los nombres que ya están en cronologia.
{
    $consultaExistentes = $conexionBloques->query("SELECT NOMBRE FROM bloques"); // Nombres ya dados de alta.
    $nombresExistentes = []; // Mapa de nombres.

    foreach ($consultaExistentes->fetchAll(PDO::FETCH_ASSOC) as $filaBloque) { // Recorre.
        $nombresExistentes[trim((string)$filaBloque["NOMBRE"])] = true; // Marca.
    }

    $sentenciaInsertar = $conexionBloques->prepare(
        "INSERT INTO bloques (NOMBRE, CAPITULOS, DESCRIPCION) VALUES (:NOMBRE, :CAPITULOS, :DESCRIPCION)"
    ); // Alta mínima, sin copiar títulos.

    $conteoPorBloque = []; // Cuántos capítulos únicos tiene cada nombre.

    foreach ($capitulosUnicos as $datosCapitulo) { // Cuenta.
        $nombreBloque = $datosCapitulo["bloque"]; // Nombre en cronologia.

        if ($nombreBloque === "") { // Sin asignar.
            continue; // No crea bloque vacío.
        }

        if (!isset($conteoPorBloque[$nombreBloque])) { // Primero.
            $conteoPorBloque[$nombreBloque] = 0; // Cero.
        }

        $conteoPorBloque[$nombreBloque]++; // Suma.
    }

    foreach ($conteoPorBloque as $nombreBloque => $cantidadCapitulos) { // Uno por nombre.
        if (isset($nombresExistentes[$nombreBloque])) { // Ya está en bloques.db.
            continue; // No duplica la fila.
        }

        $sentenciaInsertar->bindValue(":NOMBRE", $nombreBloque, PDO::PARAM_STR); // Nombre de cronologia.
        $sentenciaInsertar->bindValue(":CAPITULOS", (int)$cantidadCapitulos, PDO::PARAM_INT); // Entero pedido.
        $sentenciaInsertar->bindValue(":DESCRIPCION", "", PDO::PARAM_STR); // Vacío: los capítulos siguen en cronologia.
        $sentenciaInsertar->execute(); // Inserta.
        $nombresExistentes[$nombreBloque] = true; // Evita repetir en este ciclo.
    }
}
