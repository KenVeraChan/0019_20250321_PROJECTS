<?php
// Utilidad: ejecutar un .sql y saber si una tabla está vacía.

function tablaSinFilas($conexionPdo, $nombreTabla) // True si no hay filas.
{
    $nombreSeguro = preg_replace("/[^a-zA-Z0-9_]/", "", $nombreTabla); // Solo identificadores simples.
    $cantidadFilas = (int)$conexionPdo->query("SELECT COUNT(*) FROM " . $nombreSeguro)->fetchColumn(); // Cuenta filas.
    return $cantidadFilas === 0; // Vacía o no.
}

function ejecutarArchivoSql($conexionPdo, $rutaArchivoSql) // Lanza CREATE/INSERT del fichero.
{
    if (!is_file($rutaArchivoSql)) { // El .sql no está.
        return; // No hace nada.
    }

    $contenidoSql = file_get_contents($rutaArchivoSql); // Lee el script.
    $conexionPdo->exec($contenidoSql); // SQLite admite varias sentencias.
}
