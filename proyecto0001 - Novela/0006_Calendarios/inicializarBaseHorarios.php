<?php
// Abre horarios.db y, si zonas_horarias está vacía, ejecuta data/horarios.sql (INSERT de cada región).

require_once __DIR__ . "/../servidor.php"; // Clase Database.
require_once __DIR__ . "/../cargarDatosSql.php"; // Carga de .sql.

function obtenerConexionHorarios() // PDO de data/horarios.db.
{
    $baseDatosHorarios = new Database("horarios.db"); // Base horarios.
    $conexionHorarios = $baseDatosHorarios->connexion(); // Abre o crea el archivo.

    if (!($conexionHorarios instanceof PDO)) { // Fallo.
        return $conexionHorarios; // Texto de error.
    }

    $conexionHorarios->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Excepciones.

    $conexionHorarios->exec("CREATE TABLE IF NOT EXISTS zonas_horarias (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        nombrePlaneta VARCHAR(80) NOT NULL,
        nombreContinente VARCHAR(120) NOT NULL,
        franjaHoraria VARCHAR(120) NOT NULL,
        numRegiones INTEGER NOT NULL,
        numeroRegion INTEGER NOT NULL,
        desfaseHoras INTEGER NOT NULL,
        colorContinente VARCHAR(80) NOT NULL,
        nombreRegion VARCHAR(200) NOT NULL,
        caracteristicas VARCHAR(500) NOT NULL,
        oficiosDestacados VARCHAR(500) NOT NULL
    )"); // Tabla por si el .sql aún no se ha ejecutado.

    if (tablaSinFilas($conexionHorarios, "zonas_horarias")) { // Primera vez.
        ejecutarArchivoSql($conexionHorarios, __DIR__ . "/../data/horarios.sql"); // INSERT de Ambur y Tierra.
    }

    return $conexionHorarios; // Conexión lista.
}
