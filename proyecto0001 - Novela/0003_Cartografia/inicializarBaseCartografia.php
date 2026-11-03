<?php
// Abre cartografia.db, crea tablas y, si están vacías, carga data/cartografia.sql (INSERT).

require_once __DIR__ . "/../servidor.php"; // Clase Database.
require_once __DIR__ . "/../cargarDatosSql.php"; // ejecutarArchivoSql y tablaSinFilas.

function obtenerConexionCartografia() // PDO de data/cartografia.db.
{
    $baseDatosCartografia = new Database("cartografia.db"); // Base cartografia.
    $conexionCartografia = $baseDatosCartografia->connexion(); // Abre o crea el archivo.

    if (!($conexionCartografia instanceof PDO)) { // Fallo.
        return $conexionCartografia; // Texto de error.
    }

    $conexionCartografia->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Excepciones.
    $conexionCartografia->exec("PRAGMA foreign_keys = ON"); // Claves foráneas.

    $rutaSql = __DIR__ . "/../data/cartografia.sql"; // CREATE + INSERT oficiales.
    if (!tablaExiste($conexionCartografia, "planetas") || tablaSinFilas($conexionCartografia, "planetas")) { // Primera puesta en marcha.
        ejecutarArchivoSql($conexionCartografia, $rutaSql); // Carga el .sql completo.
        asegurarColumnaDiasMes($conexionCartografia); // Garantiza dias_mes tras el INSERT.
    } else {
        asegurarColumnaDiasMes($conexionCartografia); // Bases antiguas: añade dias_mes si falta.
    }

    return $conexionCartografia; // Conexión lista.
}

function tablaExiste($conexionCartografia, $nombreTabla) // Comprueba sqlite_master.
{
    $consulta = $conexionCartografia->prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = :nombre"); // Busca la tabla.
    $consulta->bindValue(":nombre", $nombreTabla, PDO::PARAM_STR); // Nombre.
    $consulta->execute(); // Ejecuta.
    return (bool)$consulta->fetchColumn(); // Existe o no.
}

function asegurarColumnaDiasMes($conexionCartografia) // El calendario lee los 12 meses desde planetas.dias_mes.
{
    $columnas = $conexionCartografia->query("PRAGMA table_info(planetas)")->fetchAll(PDO::FETCH_ASSOC); // Columnas actuales.
    $existeDiasMes = false; // Bandera.

    foreach ($columnas as $columna) { // Recorre el esquema.
        if (($columna["name"] ?? "") === "dias_mes") { // Ya está.
            $existeDiasMes = true; // Encontrada.
            break; // Sale.
        }
    }

    if (!$existeDiasMes) { // Bases creadas antes de dias_mes.
        $conexionCartografia->exec("ALTER TABLE planetas ADD COLUMN dias_mes TEXT"); // Añade la columna.
    }

    $conexionCartografia->exec("UPDATE planetas SET dias_mes = '24,24,25,24,24,25,24,24,25,24,24,25' WHERE nombre_planeta = 'Ambur' AND (dias_mes IS NULL OR dias_mes = '')"); // Serie de Ambur.
    $conexionCartografia->exec("UPDATE planetas SET dias_mes = '31,28,31,30,31,30,31,31,30,31,30,31' WHERE nombre_planeta = 'Tierra' AND (dias_mes IS NULL OR dias_mes = '')"); // Serie de la Tierra.
}
