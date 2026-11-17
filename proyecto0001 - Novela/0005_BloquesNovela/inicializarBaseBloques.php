<?php
/*
 * Abre data/bloques.db y crea la tabla bloques si aún no existe.
 * Si la tabla está vacía, carga data/bloques.sql (solo el CREATE).
 */

require_once __DIR__ . "/../servidor.php"; // Clase Database.
require_once __DIR__ . "/../cargarDatosSql.php"; // Carga de .sql.

function obtenerConexionBloques() // PDO de data/bloques.db.
{
    $baseDatosBloques = new Database("bloques.db"); // Base bloques.
    $conexionBloques = $baseDatosBloques->connexion(); // Abre o crea el archivo.

    if (!($conexionBloques instanceof PDO)) { // Fallo de conexión.
        return $conexionBloques; // Texto de error.
    }

    $conexionBloques->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Excepciones SQL.
    $conexionBloques->exec("CREATE TABLE IF NOT EXISTS bloques (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        NOMBRE VARCHAR(200) NOT NULL,
        CAPITULOS INTEGER NOT NULL DEFAULT 0,
        DESCRIPCION VARCHAR(8000)
    )"); // Tabla pedida: NOMBRE, CAPITULOS, DESCRIPCION.

    if (tablaSinFilas($conexionBloques, "bloques")) { // Primera vez.
        ejecutarArchivoSql($conexionBloques, __DIR__ . "/../data/bloques.sql"); // CREATE del .sql.
    }

    return $conexionBloques; // Conexión lista.
}
