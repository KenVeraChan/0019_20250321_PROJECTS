/*
BBDD: 2024-06-10 12:00:00 
NOMBRE: BBDD_ESF
DESTINO: EscritoresSinFronteras
*/

/******************   TABLA PARA NOTICIAS: APARTADO 1 INICIO ********************/
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
/*INTRODUCCION DE DATOS EN LA TABLA*/
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

