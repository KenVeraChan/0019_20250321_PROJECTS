--PRIMERO SE CREA LA TALBA EN DONDE ESTARÁN LOS DATOS DE LA BBDD
CREATE TABLE IF NOT EXISTS cronologia(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    bloque VARCHAR(100) NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    fecha date NOT NULL,
    horas INTEGER NOT NULL,
    minutos INTEGER NOT NULL,
    acontecimiento VARCHAR(1000) NOT NULL,
    personajes VARCHAR(200) NOT NULL
);

-- SEGUNDO: Se introducen los datos iniciales (de forma opcional)
INSERT INTO cronologia (bloque,titulo,fecha,horas,minutos,acontecimiento,personajes) VALUES
('Prologo','Debut filmografico','2039-10-20', 17, 40, 'COMETIDO 4321 - Bloque I: Lugares simbolicos de la historia', 'Sin definir'),
('Prologo','Desvelando el porvenir','2039-10-20', 18, 40, 'COMETIDO 4321 - Bloque I: Lugares simbolicos de la historia', 'Sin definir'),
('Prologo','Confines de la oscuridad','1950-01-01', 03, 50, 'Tierras infertiles, un enemigo, una transmisión y tres estrellas', 'William Wissangel, Sharyllin Rousher, Vitrea Horiz, El Enemigo'),
('Prologo','El despertar de la humanidad','1950-01-01', 04, 20, 'Tierras infertiles, un enemigo, una transmision y tres estrellas', 'William Wissangel, Sharyllin Rousher, Vitrea Horiz, El Enemigo'),
('Prologo','El despertar de la humanidad','1950-01-01', 04, 50, 'Tierras infertiles, un enemigo, una transmision y tres estrellas', 'William Wissangel, Sharyllin Rousher, Vitrea Horiz, El Enemigo');
