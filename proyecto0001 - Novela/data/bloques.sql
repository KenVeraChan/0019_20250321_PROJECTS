-- Base de datos: bloques  (archivo SQLite data/bloques.db)
-- Tabla: bloques
-- Columnas pedidas: NOMBRE VARCHAR, CAPITULOS INTEGER, DESCRIPCION VARCHAR
-- DESCRIPCION no copia capítulos: esos salen de cronologia (data/datos.sql).
-- CAPITULOS es el recuento de capítulos asignados en cronologia.bloque.

CREATE TABLE IF NOT EXISTS bloques (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    NOMBRE VARCHAR(200) NOT NULL,
    CAPITULOS INTEGER NOT NULL DEFAULT 0,
    DESCRIPCION VARCHAR(8000)
);
