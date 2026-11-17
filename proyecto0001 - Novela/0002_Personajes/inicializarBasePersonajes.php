<?php
// Abre personajes.db y, si personajesNovela está vacía, carga data/personajes.sql.

require_once __DIR__ . "/../servidor.php"; // Clase Database.
require_once __DIR__ . "/../cargarDatosSql.php"; // Carga de .sql.

function obtenerConexionPersonajes() // PDO de data/personajes.db.
{
    $baseDatosPersonajes = new Database("personajes.db"); // Base personajes.
    $conexionPersonajes = $baseDatosPersonajes->connexion(); // Abre o crea el archivo.

    if (!($conexionPersonajes instanceof PDO)) { // Fallo.
        return $conexionPersonajes; // Texto de error.
    }

    $conexionPersonajes->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Excepciones.
    $conexionPersonajes->exec("CREATE TABLE IF NOT EXISTS personajesNovela (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        NOMBRE VARCHAR(200) NOT NULL,
        APELLIDOS VARCHAR(200) NOT NULL,
        HOBBIE VARCHAR(500),
        PROFESION VARCHAR(500),
        SIMBOLOGIA_PERSONALIDAD VARCHAR(1000),
        FECHA_NACIMIENTO DATE,
        ZONA_RESIDENCIA VARCHAR(300)
    )"); // Tabla de fichas.

    if (tablaSinFilas($conexionPersonajes, "personajesNovela")) { // Primera vez.
        ejecutarArchivoSql($conexionPersonajes, __DIR__ . "/../data/personajes.sql"); // INSERT iniciales.
    }

    return $conexionPersonajes; // Conexión lista.
}
