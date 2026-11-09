<?php

require_once __DIR__ . "/servidor.php";
require_once __DIR__ . "/cargarDatosSql.php";
require_once __DIR__ . "/0002_Personajes/inicializarBasePersonajes.php";
require_once __DIR__ . "/0003_Cartografia/inicializarBaseCartografia.php";
require_once __DIR__ . "/0005_BloquesNovela/inicializarBaseBloques.php";
require_once __DIR__ . "/0005_BloquesNovela/lecturaCronologia.php";
require_once __DIR__ . "/0006_Calendarios/inicializarBaseHorarios.php";
require_once __DIR__ . "/0007_Reflexiones/inicializarBaseReflexones.php";

$archivosSql = [
    "datos.sql",
    "personajes.sql",
    "cartografia.sql",
    "bloques.sql",
    "horarios.sql",
    "reflexones.sql"
];

foreach ($archivosSql as $archivoSql) {
    if (!is_file(__DIR__ . "/data/" . $archivoSql)) {
        throw new RuntimeException("No se encontró el archivo SQL requerido: data/" . $archivoSql);
    }
}

$conexionCronologia = (new Database())->connexion();
if (!($conexionCronologia instanceof PDO)) {
    throw new RuntimeException("No se pudo inicializar cronologia.db: " . $conexionCronologia);
}

$conexionCronologia->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$tablaCronologiaExiste = (bool)$conexionCronologia->query(
    "SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'cronologia'"
)->fetchColumn();

if (!$tablaCronologiaExiste || tablaSinFilas($conexionCronologia, "cronologia")) {
    ejecutarArchivoSql($conexionCronologia, __DIR__ . "/data/datos.sql");
}

$conexionPersonajes = obtenerConexionPersonajes();
$conexionCartografia = obtenerConexionCartografia();
$conexionBloques = obtenerConexionBloques();
$conexionHorarios = obtenerConexionHorarios();
$conexionReflexones = obtenerConexionReflexones();

foreach ([
    "personajes.db" => $conexionPersonajes,
    "cartografia.db" => $conexionCartografia,
    "bloques.db" => $conexionBloques,
    "horarios.db" => $conexionHorarios,
    "reflexones.db" => $conexionReflexones
] as $nombreBase => $conexion) {
    if (!($conexion instanceof PDO)) {
        throw new RuntimeException("No se pudo inicializar " . $nombreBase . ": " . $conexion);
    }
}

$capitulos = listarCapitulosUnicosCronologia($conexionCronologia);
sincronizarNombresBloqueDesdeCronologia($conexionBloques, $capitulos);

echo "Bases de datos inicializadas correctamente.\n";
