<?php
// Genera data/horarios.sql con INSERT de cada region. Se ejecuta una vez desde la consola.

$continentes = array(
    array("planeta" => "Ambur", "nombre" => "GRENZLIN", "desde" => -13, "hasta" => -7, "color" => "rgba(46, 109, 164, 0.78)"),
    array("planeta" => "Ambur", "nombre" => "WELLIS", "desde" => -14, "hasta" => -4, "color" => "rgba(164, 86, 46, 0.78)"),
    array("planeta" => "Ambur", "nombre" => "CHALIKETS", "desde" => -13, "hasta" => 1, "color" => "rgba(62, 140, 92, 0.78)"),
    array("planeta" => "Ambur", "nombre" => "SHUNAY", "desde" => -15, "hasta" => -5, "color" => "rgba(140, 62, 118, 0.78)"),
    array("planeta" => "Ambur", "nombre" => "SKYGITAL", "desde" => -7, "hasta" => 1, "color" => "rgba(176, 140, 48, 0.78)"),
    array("planeta" => "Ambur", "nombre" => "WAVDUR", "desde" => 6, "hasta" => 15, "color" => "rgba(48, 140, 176, 0.78)"),
    array("planeta" => "Ambur", "nombre" => "YEBERDAN", "desde" => 6, "hasta" => 15, "color" => "rgba(118, 70, 160, 0.78)"),
    array("planeta" => "Ambur", "nombre" => "VOLDINTHON", "desde" => 3, "hasta" => 15, "color" => "rgba(180, 80, 80, 0.78)"),
    array("planeta" => "Ambur", "nombre" => "LYNLLAN", "desde" => 4, "hasta" => 15, "color" => "rgba(80, 90, 160, 0.78)"),
    array("planeta" => "Tierra", "nombre" => "Africa", "desde" => -1, "hasta" => 4, "color" => "rgba(70, 120, 80, 0.78)"),
    array("planeta" => "Tierra", "nombre" => "America del Norte", "desde" => -10, "hasta" => -3, "color" => "rgba(164, 86, 46, 0.78)"),
    array("planeta" => "Tierra", "nombre" => "America del Sur", "desde" => -5, "hasta" => -2, "color" => "rgba(160, 110, 60, 0.78)"),
    array("planeta" => "Tierra", "nombre" => "Antartida", "desde" => -3, "hasta" => 12, "color" => "rgba(48, 140, 176, 0.78)"),
    array("planeta" => "Tierra", "nombre" => "Asia", "desde" => 2, "hasta" => 12, "color" => "rgba(176, 140, 48, 0.78)"),
    array("planeta" => "Tierra", "nombre" => "Europa", "desde" => 0, "hasta" => 3, "color" => "rgba(46, 109, 164, 0.78)"),
    array("planeta" => "Tierra", "nombre" => "Oceania", "desde" => 8, "hasta" => 14, "color" => "rgba(118, 70, 160, 0.78)")
);

function q($texto) {
    return "'" . str_replace("'", "''", $texto) . "'";
}

function textoFranja($desdeHora, $hastaHora) {
    $textoDesde = ($desdeHora >= 0 ? "UTC+" : "UTC") . $desdeHora;
    $textoHasta = ($hastaHora >= 0 ? "UTC+" : "UTC") . $hastaHora;
    return $textoDesde . " a " . $textoHasta;
}

$lineas = array();
$lineas[] = "-- MENSAJE PREVIO DE PUESTA EN MARCHA";
$lineas[] = "-- Nombre de la base de datos: horarios";
$lineas[] = "-- Archivo SQLite:              data/horarios.db";
$lineas[] = "-- Tabla SQL:                   zonas_horarias";
$lineas[] = "";
$lineas[] = "CREATE TABLE IF NOT EXISTS zonas_horarias (";
$lineas[] = "    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,";
$lineas[] = "    nombrePlaneta VARCHAR(80) NOT NULL,";
$lineas[] = "    nombreContinente VARCHAR(120) NOT NULL,";
$lineas[] = "    franjaHoraria VARCHAR(120) NOT NULL,";
$lineas[] = "    numRegiones INTEGER NOT NULL,";
$lineas[] = "    numeroRegion INTEGER NOT NULL,";
$lineas[] = "    desfaseHoras INTEGER NOT NULL,";
$lineas[] = "    colorContinente VARCHAR(80) NOT NULL,";
$lineas[] = "    nombreRegion VARCHAR(200) NOT NULL,";
$lineas[] = "    caracteristicas VARCHAR(500) NOT NULL,";
$lineas[] = "    oficiosDestacados VARCHAR(500) NOT NULL";
$lineas[] = ");";
$lineas[] = "";
$lineas[] = "INSERT INTO zonas_horarias (";
$lineas[] = "    nombrePlaneta, nombreContinente, franjaHoraria, numRegiones, numeroRegion,";
$lineas[] = "    desfaseHoras, colorContinente, nombreRegion, caracteristicas, oficiosDestacados";
$lineas[] = ") VALUES";

$valores = array();
foreach ($continentes as $datosContinente) {
    $desdeHora = (int)$datosContinente["desde"];
    $hastaHora = (int)$datosContinente["hasta"];
    $numRegiones = ($hastaHora - $desdeHora) + 1;
    $franja = textoFranja($desdeHora, $hastaHora);
    $numeroRegion = 1;
    for ($desfaseHoras = $desdeHora; $desfaseHoras <= $hastaHora; $desfaseHoras++) {
        $etiquetaUtc = ($desfaseHoras >= 0 ? "UTC+" : "UTC") . $desfaseHoras;
        $nombreRegion = "Region " . $numeroRegion . " (" . $etiquetaUtc . ")";
        $valores[] = "(" .
            q($datosContinente["planeta"]) . ", " .
            q($datosContinente["nombre"]) . ", " .
            q($franja) . ", " .
            $numRegiones . ", " .
            $numeroRegion . ", " .
            $desfaseHoras . ", " .
            q($datosContinente["color"]) . ", " .
            q($nombreRegion) . ", " .
            q("Pendiente de registrar") . ", " .
            q("Pendiente de registrar") .
        ")";
        $numeroRegion += 1;
    }
}

$lineas[] = implode(",\n", $valores) . ";";
$lineas[] = "";

file_put_contents(__DIR__ . "/horarios.sql", implode("\n", $lineas));
echo "OK " . count($valores) . " filas\n";
