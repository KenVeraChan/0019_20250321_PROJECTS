<?php
// Semilla de Tierra y Ambur: calendarios, duración del día y continentes con franjas horarias.

function guardarOActualizarPlaneta($conexionCartografia, $nombrePlaneta, $camposPlaneta) // Crea o actualiza un planeta por nombre.
{
    $consultaPlaneta = $conexionCartografia->prepare("SELECT id FROM planetas WHERE nombre_planeta = :nombre_planeta"); // Busca si ya existe.
    $consultaPlaneta->bindValue(":nombre_planeta", $nombrePlaneta, PDO::PARAM_STR); // Nombre exacto (Tierra o Ambur).
    $consultaPlaneta->execute(); // Ejecuta la búsqueda.
    $filaPlaneta = $consultaPlaneta->fetch(PDO::FETCH_ASSOC); // Lee la fila o false.

    if ($filaPlaneta) { // El planeta ya estaba registrado.
        $sqlActualizar = "UPDATE planetas SET
            intensidad_gravitatoria = :intensidad_gravitatoria,
            masa_planeta = :masa_planeta,
            radio_planeta = :radio_planeta,
            superficie_total = :superficie_total,
            volumen_total = :volumen_total,
            velocidad_escape = :velocidad_escape,
            densidad_total = :densidad_total,
            velocidad_rotacion = :velocidad_rotacion,
            periodo_rotacion = :periodo_rotacion,
            duracion_dia = :duracion_dia,
            periodo_traslacion = :periodo_traslacion,
            tiempo_luz_sol = :tiempo_luz_sol,
            distancia_sol_ambur = :distancia_sol_ambur,
            distancia_ua_tierra = :distancia_ua_tierra,
            grosor_atmosfera = :grosor_atmosfera,
            continentes_en_ambur = :continentes_en_ambur
            WHERE id = :id"; // Actualiza la ficha física y el calendario.
        $sentenciaActualizar = $conexionCartografia->prepare($sqlActualizar); // Prepara el UPDATE.
        foreach ($camposPlaneta as $nombreCampo => $valorCampo) { // Recorre los campos de la ficha.
            $sentenciaActualizar->bindValue(":" . $nombreCampo, $valorCampo, PDO::PARAM_STR); // Asigna cada valor.
        }
        $sentenciaActualizar->bindValue(":id", (int)$filaPlaneta["id"], PDO::PARAM_INT); // Identificador del planeta.
        $sentenciaActualizar->execute(); // Guarda los cambios.
        return (int)$filaPlaneta["id"]; // Devuelve el id existente.
    }

    $sqlInsertar = "INSERT INTO planetas (
        nombre_planeta, intensidad_gravitatoria, masa_planeta, radio_planeta, superficie_total,
        volumen_total, velocidad_escape, densidad_total, velocidad_rotacion, periodo_rotacion,
        duracion_dia, periodo_traslacion, tiempo_luz_sol, distancia_sol_ambur, distancia_ua_tierra,
        grosor_atmosfera, continentes_en_ambur
    ) VALUES (
        :nombre_planeta, :intensidad_gravitatoria, :masa_planeta, :radio_planeta, :superficie_total,
        :volumen_total, :velocidad_escape, :densidad_total, :velocidad_rotacion, :periodo_rotacion,
        :duracion_dia, :periodo_traslacion, :tiempo_luz_sol, :distancia_sol_ambur, :distancia_ua_tierra,
        :grosor_atmosfera, :continentes_en_ambur
    )"; // Alta del planeta si no existía.
    $sentenciaInsertar = $conexionCartografia->prepare($sqlInsertar); // Prepara el INSERT.
    $sentenciaInsertar->bindValue(":nombre_planeta", $nombrePlaneta, PDO::PARAM_STR); // Nombre del planeta.
    foreach ($camposPlaneta as $nombreCampo => $valorCampo) { // Recorre el resto de campos.
        $sentenciaInsertar->bindValue(":" . $nombreCampo, $valorCampo, PDO::PARAM_STR); // Asigna cada valor.
    }
    $sentenciaInsertar->execute(); // Inserta la fila.
    return (int)$conexionCartografia->lastInsertId(); // Devuelve el id nuevo.
}

function reemplazarContinentesPlaneta($conexionCartografia, $identificadorPlaneta, $listaContinentes) // Sustituye los hijos oficiales.
{
    $consultaHijos = $conexionCartografia->prepare("SELECT id FROM continentes WHERE planeta_id = :planeta_id"); // Lista de continentes actuales.
    $consultaHijos->bindValue(":planeta_id", $identificadorPlaneta, PDO::PARAM_INT); // Planeta padre.
    $consultaHijos->execute(); // Ejecuta.
    $filasHijos = $consultaHijos->fetchAll(PDO::FETCH_ASSOC); // Ids de continentes.

    $borrarEventos = $conexionCartografia->prepare("DELETE FROM eventos_continentales WHERE continente_id = :continente_id"); // Limpia eventos huérfanos.
    foreach ($filasHijos as $filaHijo) { // Recorre cada continente viejo.
        $borrarEventos->bindValue(":continente_id", (int)$filaHijo["id"], PDO::PARAM_INT); // Eventos de ese hijo.
        $borrarEventos->execute(); // Borra eventos.
    }

    $borrarContinentes = $conexionCartografia->prepare("DELETE FROM continentes WHERE planeta_id = :planeta_id"); // Quita los continentes antiguos (Valdara, Europa de prueba, etc.).
    $borrarContinentes->bindValue(":planeta_id", $identificadorPlaneta, PDO::PARAM_INT); // Planeta padre.
    $borrarContinentes->execute(); // Borra hijos.

    $sqlInsertarContinente = "INSERT INTO continentes (
        planeta_id, nombre_continente, caracteristicas_territoriales, empleos_destacados,
        financiacion_estatal, importaciones, exportaciones, fuerzas_militares,
        clima_primavera, clima_verano, clima_otono, clima_invierno,
        coordenadas_geograficas, zona_horaria
    ) VALUES (
        :planeta_id, :nombre_continente, :caracteristicas_territoriales, :empleos_destacados,
        :financiacion_estatal, :importaciones, :exportaciones, :fuerzas_militares,
        :clima_primavera, :clima_verano, :clima_otono, :clima_invierno,
        :coordenadas_geograficas, :zona_horaria
    )"; // Alta de cada continente oficial.
    $sentenciaContinente = $conexionCartografia->prepare($sqlInsertarContinente); // Prepara el INSERT.

    foreach ($listaContinentes as $datosContinente) { // Recorre la lista oficial.
        $sentenciaContinente->bindValue(":planeta_id", $identificadorPlaneta, PDO::PARAM_INT); // Padre.
        $sentenciaContinente->bindValue(":nombre_continente", $datosContinente["nombre"], PDO::PARAM_STR); // Nombre.
        $sentenciaContinente->bindValue(":caracteristicas_territoriales", $datosContinente["caracteristicas"], PDO::PARAM_STR); // Ficha breve.
        $sentenciaContinente->bindValue(":empleos_destacados", "", PDO::PARAM_STR); // Campo reservado.
        $sentenciaContinente->bindValue(":financiacion_estatal", "", PDO::PARAM_STR); // Campo reservado.
        $sentenciaContinente->bindValue(":importaciones", "", PDO::PARAM_STR); // Campo reservado.
        $sentenciaContinente->bindValue(":exportaciones", "", PDO::PARAM_STR); // Campo reservado.
        $sentenciaContinente->bindValue(":fuerzas_militares", "", PDO::PARAM_STR); // Campo reservado.
        $sentenciaContinente->bindValue(":clima_primavera", "", PDO::PARAM_STR); // Campo reservado.
        $sentenciaContinente->bindValue(":clima_verano", "", PDO::PARAM_STR); // Campo reservado.
        $sentenciaContinente->bindValue(":clima_otono", "", PDO::PARAM_STR); // Campo reservado.
        $sentenciaContinente->bindValue(":clima_invierno", "", PDO::PARAM_STR); // Campo reservado.
        $sentenciaContinente->bindValue(":coordenadas_geograficas", $datosContinente["coordenadas"], PDO::PARAM_STR); // Coordenadas de referencia.
        $sentenciaContinente->bindValue(":zona_horaria", $datosContinente["zona"], PDO::PARAM_STR); // Franja de fases horarias.
        $sentenciaContinente->execute(); // Guarda el continente.
    }
}

function asegurarSemillaCalendarios($conexionCartografia) // Deja Tierra y Ambur listos para el visor de calendarios.
{
    if (!($conexionCartografia instanceof PDO)) { // Sin conexión no se siembra nada.
        return; // Sale en silencio.
    }

    $camposTierra = array( // Ficha de la Tierra: 365 días y 24 horas.
        "intensidad_gravitatoria" => "1 g",
        "masa_planeta" => "5.97 x 10^24 kg",
        "radio_planeta" => "6371 km",
        "superficie_total" => "510 millones km2",
        "volumen_total" => "1.08 x 10^12 km3",
        "velocidad_escape" => "11.2 km/s",
        "densidad_total" => "5.51 g/cm3",
        "velocidad_rotacion" => "1674 km/h",
        "periodo_rotacion" => "24 horas",
        "duracion_dia" => "24 horas",
        "periodo_traslacion" => "365 dias",
        "tiempo_luz_sol" => "8.3 minutos",
        "distancia_sol_ambur" => "149.6 millones km",
        "distancia_ua_tierra" => "1 UA",
        "grosor_atmosfera" => "100 km",
        "continentes_en_ambur" => "Siete continentes terrestres"
    );
    $identificadorTierra = guardarOActualizarPlaneta($conexionCartografia, "Tierra", $camposTierra); // Asegura el planeta Tierra.

    $camposAmbur = array( // Ficha de Ambur: 292 días y 30 horas.
        "intensidad_gravitatoria" => "0.92 g",
        "masa_planeta" => "5.1 x 10^24 kg",
        "radio_planeta" => "6120 km",
        "superficie_total" => "470 millones km2",
        "volumen_total" => "9.6 x 10^11 km3",
        "velocidad_escape" => "10.8 km/s",
        "densidad_total" => "5.3 g/cm3",
        "velocidad_rotacion" => "1670 km/h",
        "periodo_rotacion" => "30 horas",
        "duracion_dia" => "30 horas",
        "periodo_traslacion" => "292 dias",
        "tiempo_luz_sol" => "8.4 minutos",
        "distancia_sol_ambur" => "151 millones km",
        "distancia_ua_tierra" => "1.01 UA",
        "grosor_atmosfera" => "120 km",
        "continentes_en_ambur" => "GRENZLIN, WELLIS, CHALIKETS, SHUNAY, SKYGITAL, WAVDUR, YEBERDAN, VOLDINTHON, LYNLLAN (el décimo nombre no llegó en el listado)"
    );
    $identificadorAmbur = guardarOActualizarPlaneta($conexionCartografia, "Ambur", $camposAmbur); // Asegura el planeta Ambur.

    $continentesTierra = array( // Continentes terrestres con varias zonas horarias, como en la realidad.
        array("nombre" => "África", "zona" => "UTC-1 a UTC+4", "coordenadas" => "0 N, 20 E", "caracteristicas" => "Franja UTC-1 a UTC+4"),
        array("nombre" => "América del Norte", "zona" => "UTC-10 a UTC-3", "coordenadas" => "45 N, 100 W", "caracteristicas" => "Franja UTC-10 a UTC-3"),
        array("nombre" => "América del Sur", "zona" => "UTC-5 a UTC-2", "coordenadas" => "15 S, 60 W", "caracteristicas" => "Franja UTC-5 a UTC-2"),
        array("nombre" => "Antártida", "zona" => "UTC-3 a UTC+12", "coordenadas" => "80 S, 0 E", "caracteristicas" => "Franja UTC-3 a UTC+12"),
        array("nombre" => "Asia", "zona" => "UTC+2 a UTC+12", "coordenadas" => "40 N, 90 E", "caracteristicas" => "Franja UTC+2 a UTC+12"),
        array("nombre" => "Europa", "zona" => "UTC+0 a UTC+3", "coordenadas" => "50 N, 10 E", "caracteristicas" => "Franja UTC+0 a UTC+3"),
        array("nombre" => "Oceanía", "zona" => "UTC+8 a UTC+14", "coordenadas" => "20 S, 150 E", "caracteristicas" => "Franja UTC+8 a UTC+14")
    );
    reemplazarContinentesPlaneta($conexionCartografia, $identificadorTierra, $continentesTierra); // Graba los siete continentes de la Tierra.

    $continentesAmbur = array( // Nueve continentes nombrados; el décimo no vino en el listado del usuario.
        array("nombre" => "GRENZLIN", "zona" => "UTC-13 a UTC-7 (7 fases)", "coordenadas" => "franja -13 a -7", "caracteristicas" => "Siete fases horarias"),
        array("nombre" => "WELLIS", "zona" => "UTC-14 a UTC-4 (11 fases)", "coordenadas" => "franja -14 a -4", "caracteristicas" => "Once fases horarias"),
        array("nombre" => "CHALIKETS", "zona" => "UTC-13 a UTC+1 (14 fases pedidas; enteros inclusivos: 15)", "coordenadas" => "franja -13 a +1", "caracteristicas" => "Catorce fases declaradas"),
        array("nombre" => "SHUNAY", "zona" => "UTC-15 a UTC-5 (11 fases)", "coordenadas" => "franja -15 a -5", "caracteristicas" => "Once fases horarias"),
        array("nombre" => "SKYGITAL", "zona" => "UTC-7 a UTC+1 (9 fases)", "coordenadas" => "franja -7 a +1", "caracteristicas" => "Nueve fases horarias"),
        array("nombre" => "WAVDUR", "zona" => "UTC+6 a UTC+15 (10 fases)", "coordenadas" => "franja +6 a +15", "caracteristicas" => "Diez fases horarias"),
        array("nombre" => "YEBERDAN", "zona" => "UTC+6 a UTC+15 (10 fases)", "coordenadas" => "franja +6 a +15", "caracteristicas" => "Diez fases horarias"),
        array("nombre" => "VOLDINTHON", "zona" => "UTC+3 a UTC+15 (13 fases)", "coordenadas" => "franja +3 a +15", "caracteristicas" => "Trece fases horarias"),
        array("nombre" => "LYNLLAN", "zona" => "UTC+4 a UTC+15 (12 fases)", "coordenadas" => "franja +4 a +15", "caracteristicas" => "Doce fases horarias")
    );
    reemplazarContinentesPlaneta($conexionCartografia, $identificadorAmbur, $continentesAmbur); // Graba los continentes de Ambur.
}
