/*
BBDD: 2024-06-10 12:00:00 
NOMBRE: BBDD_ESF
DESTINO: EscritoresSinFronteras
*/

/* ESTO RESPETA ACENTOS Y DEMÁS REGLAS ORTOGRAFICAS CON MYSQL */
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET character_set_connection = utf8mb4;

/********************************************************************************/
/******************   TABLA PARA NOTICIAS: APARTADO 1 INICIO ********************/
/********************************************************************************/

CREATE TABLE noticias (     
    id INT PRIMARY KEY AUTO_INCREMENT,
    titular VARCHAR(2000) NOT NULL,
    subTitular VARCHAR(2000) NOT NULL,
    fecha DATE NOT NULL,
    imagen varchar(200) NOT NULL,
    audio varchar(200) NOT NULL,
    video varchar(200) NOT NULL,
    noticia TEXT NOT NULL
);

INSERT INTO noticias (titular, subTitular, fecha, imagen, audio, video, noticia) VALUES (
'Escritores Sin Fronteras: Un puente literario que une culturas y rompe barreras', 
'Descubre cómo esta iniciativa global está transformando el mundo de la literatura al conectar a escritores de todo el mundo y fomentar la diversidad cultural a través de las palabras.', 
'2024-06-10',
'',
'',
'',
'En un mundo cada vez más interconectado, la literatura se ha convertido en un poderoso medio para conectar culturas y romper barreras. Escritores Sin Fronteras es una iniciativa global que ha surgido como un puente literario que une a escritores de todo el mundo, fomentando la diversidad cultural y promoviendo la inclusión a través de las palabras. Esta plataforma innovadora ha revolucionado la forma en que los escritores se conectan, colaboran y comparten sus historias, creando un espacio donde las voces diversas pueden ser escuchadas y apreciadas. Escritores Sin Fronteras no solo ha abierto puertas para escritores emergentes, sino que también ha fortalecido la comunidad literaria global al promover el intercambio cultural y la comprensión mutua. A través de eventos, talleres y colaboraciones internacionales, esta iniciativa está transformando el panorama literario y demostrando que las palabras tienen el poder de unirnos más allá de las fronteras geográficas y culturales.'
);
INSERT INTO noticias (titular, subTitular, fecha, imagen, audio, video, noticia) VALUES (
'Escritores Sin Fronteras 1: Un puente literario que une culturas y rompe barreras', 
'Descubre cómo esta iniciativa global está transformando el mundo de la literatura al conectar a escritores de todo el mundo y fomentar la diversidad cultural a través de las palabras.', 
'2024-06-10',
'',
'',
'',
'En un mundo cada vez más interconectado, la literatura se ha convertido en un poderoso medio para conectar culturas y romper barreras. Escritores Sin Fronteras es una iniciativa global que ha surgido como un puente literario que une a escritores de todo el mundo, fomentando la diversidad cultural y promoviendo la inclusión a través de las palabras. Esta plataforma innovadora ha revolucionado la forma en que los escritores se conectan, colaboran y comparten sus historias, creando un espacio donde las voces diversas pueden ser escuchadas y apreciadas. Escritores Sin Fronteras no solo ha abierto puertas para escritores emergentes, sino que también ha fortalecido la comunidad literaria global al promover el intercambio cultural y la comprensión mutua. A través de eventos, talleres y colaboraciones internacionales, esta iniciativa está transformando el panorama literario y demostrando que las palabras tienen el poder de unirnos más allá de las fronteras geográficas y culturales.'
);
INSERT INTO noticias (titular, subTitular, fecha, imagen, audio, video, noticia) VALUES (
'Escritores Sin Fronteras 2: Un puente literario que une culturas y rompe barreras', 
'Descubre cómo esta iniciativa global está transformando el mundo de la literatura al conectar a escritores de todo el mundo y fomentar la diversidad cultural a través de las palabras.', 
'2024-06-10',
'eventoMayo2026.png',
'',
'',
'En un mundo cada vez más interconectado, la literatura se ha convertido en un poderoso medio para conectar culturas y romper barreras. Escritores Sin Fronteras es una iniciativa global que ha surgido como un puente literario que une a escritores de todo el mundo, fomentando la diversidad cultural y promoviendo la inclusión a través de las palabras. Esta plataforma innovadora ha revolucionado la forma en que los escritores se conectan, colaboran y comparten sus historias, creando un espacio donde las voces diversas pueden ser escuchadas y apreciadas. Escritores Sin Fronteras no solo ha abierto puertas para escritores emergentes, sino que también ha fortalecido la comunidad literaria global al promover el intercambio cultural y la comprensión mutua. A través de eventos, talleres y colaboraciones internacionales, esta iniciativa está transformando el panorama literario y demostrando que las palabras tienen el poder de unirnos más allá de las fronteras geográficas y culturales.'
);
INSERT INTO noticias (titular, subTitular, fecha, imagen, audio, video, noticia) VALUES (
'Escritores Sin Fronteras 3: Un puente literario que une culturas y rompe barreras', 
'Descubre cómo esta iniciativa global está transformando el mundo de la literatura al conectar a escritores de todo el mundo y fomentar la diversidad cultural a través de las palabras.', 
'2024-06-10',
'eventoMayo2026.png',
'',
'',
'En un mundo cada vez más interconectado, la literatura se ha convertido en un poderoso medio para conectar culturas y romper barreras. Escritores Sin Fronteras es una iniciativa global que ha surgido como un puente literario que une a escritores de todo el mundo, fomentando la diversidad cultural y promoviendo la inclusión a través de las palabras. Esta plataforma innovadora ha revolucionado la forma en que los escritores se conectan, colaboran y comparten sus historias, creando un espacio donde las voces diversas pueden ser escuchadas y apreciadas. Escritores Sin Fronteras no solo ha abierto puertas para escritores emergentes, sino que también ha fortalecido la comunidad literaria global al promover el intercambio cultural y la comprensión mutua. A través de eventos, talleres y colaboraciones internacionales, esta iniciativa está transformando el panorama literario y demostrando que las palabras tienen el poder de unirnos más allá de las fronteras geográficas y culturales.'
);
INSERT INTO noticias (titular, subTitular, fecha, imagen, audio, video, noticia) VALUES (
'Escritores Sin Fronteras 4: Un puente literario que une culturas y rompe barreras', 
'Descubre cómo esta iniciativa global está transformando el mundo de la literatura al conectar a escritores de todo el mundo y fomentar la diversidad cultural a través de las palabras.', 
'2024-06-10',
'eventoMayo2026.png',
'',
'',
'En un mundo cada vez más interconectado, la literatura se ha convertido en un poderoso medio para conectar culturas y romper barreras. Escritores Sin Fronteras es una iniciativa global que ha surgido como un puente literario que une a escritores de todo el mundo, fomentando la diversidad cultural y promoviendo la inclusión a través de las palabras. Esta plataforma innovadora ha revolucionado la forma en que los escritores se conectan, colaboran y comparten sus historias, creando un espacio donde las voces diversas pueden ser escuchadas y apreciadas. Escritores Sin Fronteras no solo ha abierto puertas para escritores emergentes, sino que también ha fortalecido la comunidad literaria global al promover el intercambio cultural y la comprensión mutua. A través de eventos, talleres y colaboraciones internacionales, esta iniciativa está transformando el panorama literario y demostrando que las palabras tienen el poder de unirnos más allá de las fronteras geográficas y culturales.'
);
INSERT INTO noticias (titular, subTitular, fecha, imagen, audio, video, noticia) VALUES (
'Escritores Sin Fronteras 5: Un puente literario que une culturas y rompe barreras', 
'Descubre cómo esta iniciativa global está transformando el mundo de la literatura al conectar a escritores de todo el mundo y fomentar la diversidad cultural a través de las palabras.', 
'2024-06-10',
'',
'',
'',
'En un mundo cada vez más interconectado, la literatura se ha convertido en un poderoso medio para conectar culturas y romper barreras. Escritores Sin Fronteras es una iniciativa global que ha surgido como un puente literario que une a escritores de todo el mundo, fomentando la diversidad cultural y promoviendo la inclusión a través de las palabras. Esta plataforma innovadora ha revolucionado la forma en que los escritores se conectan, colaboran y comparten sus historias, creando un espacio donde las voces diversas pueden ser escuchadas y apreciadas. Escritores Sin Fronteras no solo ha abierto puertas para escritores emergentes, sino que también ha fortalecido la comunidad literaria global al promover el intercambio cultural y la comprensión mutua. A través de eventos, talleres y colaboraciones internacionales, esta iniciativa está transformando el panorama literario y demostrando que las palabras tienen el poder de unirnos más allá de las fronteras geográficas y culturales.'
);
INSERT INTO noticias (titular, subTitular, fecha, imagen, audio, video, noticia) VALUES (
'Escritores Sin Fronteras 6: Un puente literario que une culturas y rompe barreras', 
'Descubre cómo esta iniciativa global está transformando el mundo de la literatura al conectar a escritores de todo el mundo y fomentar la diversidad cultural a través de las palabras.', 
'2024-06-10',
'',
'',
'',
'En un mundo cada vez más interconectado, la literatura se ha convertido en un poderoso medio para conectar culturas y romper barreras. Escritores Sin Fronteras es una iniciativa global que ha surgido como un puente literario que une a escritores de todo el mundo, fomentando la diversidad cultural y promoviendo la inclusión a través de las palabras. Esta plataforma innovadora ha revolucionado la forma en que los escritores se conectan, colaboran y comparten sus historias, creando un espacio donde las voces diversas pueden ser escuchadas y apreciadas. Escritores Sin Fronteras no solo ha abierto puertas para escritores emergentes, sino que también ha fortalecido la comunidad literaria global al promover el intercambio cultural y la comprensión mutua. A través de eventos, talleres y colaboraciones internacionales, esta iniciativa está transformando el panorama literario y demostrando que las palabras tienen el poder de unirnos más allá de las fronteras geográficas y culturales.'
);
INSERT INTO noticias (titular, subTitular, fecha, imagen, audio, video, noticia) VALUES (
'Escritores Sin Fronteras 7: Un puente literario que une culturas y rompe barreras', 
'Descubre cómo esta iniciativa global está transformando el mundo de la literatura al conectar a escritores de todo el mundo y fomentar la diversidad cultural a través de las palabras.', 
'2024-06-10',
'eventoMayo2026.png',
'',
'',
'En un mundo cada vez más interconectado, la literatura se ha convertido en un poderoso medio para conectar culturas y romper barreras. Escritores Sin Fronteras es una iniciativa global que ha surgido como un puente literario que une a escritores de todo el mundo, fomentando la diversidad cultural y promoviendo la inclusión a través de las palabras. Esta plataforma innovadora ha revolucionado la forma en que los escritores se conectan, colaboran y comparten sus historias, creando un espacio donde las voces diversas pueden ser escuchadas y apreciadas. Escritores Sin Fronteras no solo ha abierto puertas para escritores emergentes, sino que también ha fortalecido la comunidad literaria global al promover el intercambio cultural y la comprensión mutua. A través de eventos, talleres y colaboraciones internacionales, esta iniciativa está transformando el panorama literario y demostrando que las palabras tienen el poder de unirnos más allá de las fronteras geográficas y culturales.'
);
INSERT INTO noticias (titular, subTitular, fecha, imagen, audio, video, noticia) VALUES (
'Escritores Sin Fronteras 8: Un puente literario que une culturas y rompe barreras', 
'Descubre cómo esta iniciativa global está transformando el mundo de la literatura al conectar a escritores de todo el mundo y fomentar la diversidad cultural a través de las palabras.', 
'2024-06-10',
'eventoMayo2026.png',
'',
'',
'En un mundo cada vez más interconectado, la literatura se ha convertido en un poderoso medio para conectar culturas y romper barreras. Escritores Sin Fronteras es una iniciativa global que ha surgido como un puente literario que une a escritores de todo el mundo, fomentando la diversidad cultural y promoviendo la inclusión a través de las palabras. Esta plataforma innovadora ha revolucionado la forma en que los escritores se conectan, colaboran y comparten sus historias, creando un espacio donde las voces diversas pueden ser escuchadas y apreciadas. Escritores Sin Fronteras no solo ha abierto puertas para escritores emergentes, sino que también ha fortalecido la comunidad literaria global al promover el intercambio cultural y la comprensión mutua. A través de eventos, talleres y colaboraciones internacionales, esta iniciativa está transformando el panorama literario y demostrando que las palabras tienen el poder de unirnos más allá de las fronteras geográficas y culturales.'
);

/***********************************************************************************************************************************************************/
/***********************************************************************************************************************************************************/

/*******************************************************************************************/
/******************   TABLA PARA HISTORIAS: APARTADO 2 NUESTRA HISTORIA ********************/
/*******************************************************************************************/

CREATE TABLE historia (     
    id INT PRIMARY KEY AUTO_INCREMENT,
    mes INT NOT NULL,
    anio VARCHAR(7) NOT NULL,
    contenido VARCHAR(2000) NOT NULL
);
INSERT INTO historia (mes, anio, contenido) VALUES (5,"2025","En mayo de este año se realizó el boceto de la empresa Ecritores Sin Fronteras online");
INSERT INTO historia (mes, anio, contenido) VALUES (7,"2025","En verano de este mismo año se iniciaron los cursos online rediseñando la dirección de la empresa como escuela de enseñanza");
INSERT INTO historia (mes, anio, contenido) VALUES (8,"2025","Creación online, en la primera quincena del mes, de un grupo llamado Escritores Sin Fronteras en Facebook");
INSERT INTO historia (mes, anio, contenido) VALUES (8,"2025","Creación online, en la segunda quincena del mes, de un grupo llamado Ecritores Sin Fronteras en Instagram");
INSERT INTO historia (mes, anio, contenido) VALUES (9,"2025","Reunión de los tres accionistas en Atlanta para tramitar la formalización de la empresa con sede jurisdiccional en Colombia");
INSERT INTO historia (mes, anio, contenido) VALUES (10,"2025","La empresa: Escritores Sin Fronteras comienza su actividad siguiendo con los cursos y ofreciendo serivicios de docencia online preparada");
INSERT INTO historia (mes, anio, contenido) VALUES (11,"2025","Se forja la primera alianza con la correctora, redctora: Daniela Patrone, para unirse al equipo de trabajo");
INSERT INTO historia (mes, anio, contenido) VALUES (12,"2025","Contratación de las primeras contables que redirigirían la contabilidad creciente de la empresa");
INSERT INTO historia (mes, anio, contenido) VALUES (12,"2025","Hacia finales del mes, se forjan más alianzas individales de amigos y conocidos al cometido para una primera expansión literaria y de la palabra");
INSERT INTO historia (mes, anio, contenido) VALUES (1,"2026","Se entablan las primeras consideraciones sobre una primera feria Internacional del libro");
INSERT INTO historia (mes, anio, contenido) VALUES (1,"2026","Hacia finales del mes se establece el lugar, en Madrid - España, para la primera feria Internacional de Escritores Sin Fronteras"); 


/***********************************************************************************************************************************************************/
/***********************************************************************************************************************************************************/

/*******************************************************************************************/
/******************   PARA TODAS LAS TABLAS DE LA BASE DE DATOS CREADA  ********************/
/*******************************************************************************************/

ALTER TABLE noticias CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE historia CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
