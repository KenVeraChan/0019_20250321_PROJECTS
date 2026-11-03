<?php
/*
 * Abre data/reflexones.db y crea la tabla ideas si aún no existe.
 * Si ideas está vacía, carga data/reflexones.sql (CREATE).
 */

require_once __DIR__ . "/../servidor.php"; // Clase Database.
require_once __DIR__ . "/../cargarDatosSql.php"; // Carga de .sql.

function obtenerConexionReflexones() // PDO de data/reflexones.db.
{
    $baseDatosReflexones = new Database("reflexones.db"); // Nombre pedido: reflexones.
    $conexionReflexones = $baseDatosReflexones->connexion(); // Abre o crea el archivo.

    if (!($conexionReflexones instanceof PDO)) { // Fallo.
        return $conexionReflexones; // Texto de error.
    }

    $conexionReflexones->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Excepciones.
    $conexionReflexones->exec("CREATE TABLE IF NOT EXISTS ideas (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        NOMBRE VARCHAR(200) NOT NULL,
        APELLIDOS VARCHAR(200) NOT NULL,
        REFLEXION VARCHAR(4000) NOT NULL,
        \"FECHA IDEA\" DATE NOT NULL
    )"); // Tabla ideas con las columnas pedidas.

    if (tablaSinFilas($conexionReflexones, "ideas")) { // Primera vez.
        ejecutarArchivoSql($conexionReflexones, __DIR__ . "/../data/reflexones.sql"); // CREATE del .sql.
    }

    return $conexionReflexones; // Conexión lista.
}
