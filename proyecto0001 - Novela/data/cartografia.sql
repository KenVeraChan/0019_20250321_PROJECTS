-- MENSAJE PREVIO DE PUESTA EN MARCHA
-- BASE DE DATOS: cartografia  (archivo SQLite: data/cartografia.db)
-- TABLAS: planetas, continentes, eventos_continentales
-- dias_mes: doce enteros separados por coma; el JS del calendario los lee de aqui.

CREATE TABLE IF NOT EXISTS planetas (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    nombre_planeta VARCHAR(200) NOT NULL,
    intensidad_gravitatoria TEXT,
    masa_planeta TEXT,
    radio_planeta TEXT,
    superficie_total TEXT,
    volumen_total TEXT,
    velocidad_escape TEXT,
    densidad_total TEXT,
    velocidad_rotacion TEXT,
    periodo_rotacion TEXT,
    duracion_dia TEXT,
    periodo_traslacion TEXT,
    tiempo_luz_sol TEXT,
    distancia_sol_ambur TEXT,
    distancia_ua_tierra TEXT,
    grosor_atmosfera TEXT,
    continentes_en_ambur TEXT,
    dias_mes TEXT
);

CREATE TABLE IF NOT EXISTS continentes (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    planeta_id INTEGER NOT NULL,
    nombre_continente VARCHAR(200) NOT NULL,
    caracteristicas_territoriales TEXT,
    empleos_destacados TEXT,
    financiacion_estatal TEXT,
    importaciones TEXT,
    exportaciones TEXT,
    fuerzas_militares TEXT,
    clima_primavera TEXT,
    clima_verano TEXT,
    clima_otono TEXT,
    clima_invierno TEXT,
    coordenadas_geograficas TEXT,
    zona_horaria TEXT,
    FOREIGN KEY (planeta_id) REFERENCES planetas(id)
);

CREATE TABLE IF NOT EXISTS eventos_continentales (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    continente_id INTEGER NOT NULL,
    orden_evento INTEGER NOT NULL,
    texto_evento VARCHAR(2000) NOT NULL,
    FOREIGN KEY (continente_id) REFERENCES continentes(id)
);

INSERT INTO planetas (
    id, nombre_planeta, intensidad_gravitatoria, masa_planeta, radio_planeta, superficie_total,
    volumen_total, velocidad_escape, densidad_total, velocidad_rotacion, periodo_rotacion,
    duracion_dia, periodo_traslacion, tiempo_luz_sol, distancia_sol_ambur, distancia_ua_tierra,
    grosor_atmosfera, continentes_en_ambur, dias_mes
) VALUES
(
    1, 'Ambur', '0.92 g', '5.1 x 10^24 kg', '6120 km', '470 millones km2',
    '9.6 x 10^11 km3', '10.8 km/s', '5.3 g/cm3', '1670 km/h', '30 horas',
    '30 horas', '292 dias', '8.4 minutos', '151 millones km', '1.01 UA',
    '120 km',
    'GRENZLIN, WELLIS, CHALIKETS, SHUNAY, SKYGITAL, WAVDUR, YEBERDAN, VOLDINTHON, LYNLLAN',
    '24,24,25,24,24,25,24,24,25,24,24,25'
),
(
    2, 'Tierra', '1 g', '5.97 x 10^24 kg', '6371 km', '510 millones km2',
    '1.08 x 10^12 km3', '11.2 km/s', '5.51 g/cm3', '1674 km/h', '24 horas',
    '24 horas', '365 dias', '8.3 minutos', '149.6 millones km', '1 UA',
    '100 km', 'Siete continentes terrestres',
    '31,28,31,30,31,30,31,31,30,31,30,31'
);

INSERT INTO continentes (
    planeta_id, nombre_continente, caracteristicas_territoriales, empleos_destacados,
    financiacion_estatal, importaciones, exportaciones, fuerzas_militares,
    clima_primavera, clima_verano, clima_otono, clima_invierno,
    coordenadas_geograficas, zona_horaria
) VALUES
(1, 'GRENZLIN', 'Siete fases horarias', '', '', '', '', '', '', '', '', '', 'franja -13 a -7', 'UTC-13 a UTC-7 (7 fases)'),
(1, 'WELLIS', 'Once fases horarias', '', '', '', '', '', '', '', '', '', 'franja -14 a -4', 'UTC-14 a UTC-4 (11 fases)'),
(1, 'CHALIKETS', 'Franja UTC-13 a UTC+1', '', '', '', '', '', '', '', '', '', 'franja -13 a +1', 'UTC-13 a UTC+1'),
(1, 'SHUNAY', 'Once fases horarias', '', '', '', '', '', '', '', '', '', 'franja -15 a -5', 'UTC-15 a UTC-5 (11 fases)'),
(1, 'SKYGITAL', 'Nueve fases horarias', '', '', '', '', '', '', '', '', '', 'franja -7 a +1', 'UTC-7 a UTC+1 (9 fases)'),
(1, 'WAVDUR', 'Diez fases horarias', '', '', '', '', '', '', '', '', '', 'franja +6 a +15', 'UTC+6 a UTC+15 (10 fases)'),
(1, 'YEBERDAN', 'Diez fases horarias', '', '', '', '', '', '', '', '', '', 'franja +6 a +15', 'UTC+6 a UTC+15 (10 fases)'),
(1, 'VOLDINTHON', 'Trece fases horarias', '', '', '', '', '', '', '', '', '', 'franja +3 a +15', 'UTC+3 a UTC+15 (13 fases)'),
(1, 'LYNLLAN', 'Doce fases horarias', '', '', '', '', '', '', '', '', '', 'franja +4 a +15', 'UTC+4 a UTC+15 (12 fases)'),
(2, 'Africa', 'Franja UTC-1 a UTC+4', '', '', '', '', '', '', '', '', '', '0 N, 20 E', 'UTC-1 a UTC+4'),
(2, 'America del Norte', 'Franja UTC-10 a UTC-3', '', '', '', '', '', '', '', '', '', '45 N, 100 W', 'UTC-10 a UTC-3'),
(2, 'America del Sur', 'Franja UTC-5 a UTC-2', '', '', '', '', '', '', '', '', '', '15 S, 60 W', 'UTC-5 a UTC-2'),
(2, 'Antartida', 'Franja UTC-3 a UTC+12', '', '', '', '', '', '', '', '', '', '80 S, 0 E', 'UTC-3 a UTC+12'),
(2, 'Asia', 'Franja UTC+2 a UTC+12', '', '', '', '', '', '', '', '', '', '40 N, 90 E', 'UTC+2 a UTC+12'),
(2, 'Europa', 'Franja UTC+0 a UTC+3', '', '', '', '', '', '', '', '', '', '50 N, 10 E', 'UTC+0 a UTC+3'),
(2, 'Oceania', 'Franja UTC+8 a UTC+14', '', '', '', '', '', '', '', '', '', '20 S, 150 E', 'UTC+8 a UTC+14');
