-- MENSAJE PREVIO DE PUESTA EN MARCHA
-- Nombre de la base de datos: personajes
-- Archivo SQLite:              data/personajes.db
-- Tabla SQL:                   personajesNovela

CREATE TABLE IF NOT EXISTS personajesNovela (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    NOMBRE VARCHAR(200) NOT NULL,
    APELLIDOS VARCHAR(200) NOT NULL,
    HOBBIE VARCHAR(500),
    PROFESION VARCHAR(500),
    SIMBOLOGIA_PERSONALIDAD VARCHAR(1000),
    FECHA_NACIMIENTO DATE,
    ZONA_RESIDENCIA VARCHAR(300)
);

INSERT INTO personajesNovela (NOMBRE, APELLIDOS, HOBBIE, PROFESION, SIMBOLOGIA_PERSONALIDAD, FECHA_NACIMIENTO, ZONA_RESIDENCIA) VALUES
('Sharyllin', 'Rousher', 'Cartografia nocturna', 'Exploradora', 'Estrella de tres puntas', '2012-04-17', 'Valdara, Ambur'),
('William', 'Wissangel', 'Observacion del cielo', 'Operador de mision', 'Tres estrellas', '2008-10-20', 'Tierra');
