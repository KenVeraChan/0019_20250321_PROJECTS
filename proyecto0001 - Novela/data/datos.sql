--PRIMERO SE CREA LA TALBA EN DONDE ESTARÁN LOS DATOS DE LA BBDD
CREATE TABLE IF NOT EXISTS cronologia(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    fecha date NOT NULL,
    titulo VARCHAR(500) NOT NULL,
    acontecimiento VARCHAR(1000) NOT NULL
);

-- SEGUNDO: Se introducen los datos iniciales (de forma opcional)
INSERT INTO cronologia (fecha, titulo, acontecimiento) VALUES
('1950-01-01', 'Nacimiento del proyecto', 'Inicio de la cronología'),
('1950-01-01', 'Primer hito', 'Se añadió la primera funcionalidad');