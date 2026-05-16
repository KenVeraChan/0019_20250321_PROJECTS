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

/********************************************************************************/
/**************   TABLA PARA EQUIPO: APARTADO 3 QUIENES SOMOS *******************/
/********************************************************************************/

CREATE TABLE equipo (     
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    profesion VARCHAR(200) NOT NULL,
    nacionalidad VARCHAR(30) NOT NULL,
    biografia VARCHAR(4000) NOT NULL,
    fotografia VARCHAR(500) NOT NULL
);

INSERT INTO equipo (nombre, apellidos, profesion, nacionalidad, biografia, fotografia) VALUES ("Ken","Vera Chan","Ingeniero, profesor, escritor y cofundador de E.S.F.","Española", "Ken Vera Chan es un escritor apasionado por la literatura contemporánea y la narrativa innovadora. Con una carrera que abarca más de una década, Ken ha publicado varias novelas y colecciones de cuentos que han sido aclamadas por la crítica. Además de su trabajo literario, Ken es el fundador de 'Escritores Sin Fronteras', una plataforma dedicada a apoyar a escritores emergentes de todo el mundo.","assets/images/equipoESF/kenVeraChan.png");
INSERT INTO equipo (nombre, apellidos, profesion, nacionalidad, biografia, fotografia) VALUES ("Diana","Emilce Zamora","Psicóloga, escritora y cofundadora de E.S.F.","Colombiana", "Diana Emilce Zamora es una editora experimentada con un profundo amor por la literatura hispanoamericana. Ha trabajado en diversas editoriales, ayudando a dar forma a las voces de nuevos escritores. Como co-fundadora de 'Escritores Sin Fronteras', Diana se dedica a crear oportunidades para que los escritores de diferentes culturas puedan compartir sus historias con una audiencia global.","assets/images/equipoESF/dianaEmilceZamora.png");
INSERT INTO equipo (nombre, apellidos, profesion, nacionalidad, biografia, fotografia) VALUES ("Cassandra","Romanova","Community Manager y cofundadora de E.S.F.", "Italiana", "Cassandra Romanova es una experta en gestión de comunidades en línea y redes sociales. Con una sólida experiencia en marketing digital, Cassandra ha ayudado a numerosas organizaciones a construir y mantener comunidades vibrantes. En 'Escritores Sin Fronteras', Cassandra se encarga de conectar a escritores y lectores, fomentando un espacio inclusivo para el intercambio de ideas y creatividad.","assets/images/equipoESF/cassandraRomanova.png");
INSERT INTO equipo (nombre, apellidos, profesion, nacionalidad, biografia, fotografia) VALUES ("Sergio","Alvear","Desarrollador personal y docente", "Peruano", "Sergio Alvear es un desarrollador web talentoso con una pasión por crear experiencias digitales intuitivas y atractivas. Con experiencia en diversas tecnologías web, Sergio ha contribuido al desarrollo de múltiples plataformas en línea. En 'Escritores Sin Fronteras', Sergio es responsable de mantener y mejorar la infraestructura técnica del sitio, asegurando que los usuarios tengan una experiencia fluida y agradable.","assets/images/equipoESF/sergioAlvear.png");
INSERT INTO equipo (nombre, apellidos, profesion, nacionalidad, biografia, fotografia) VALUES ("María Isabel","Muñoz","Diseñadora gráfica e interpersoanl","Colombiana", "Maria Isabel Muñoz es una diseñadora gráfica creativa con un ojo para el detalle y la estética visual. Ha trabajado en proyectos de diseño para editoriales, campañas publicitarias y plataformas digitales. En 'Escritores Sin Fronteras', Maria Isabel se encarga de la identidad visual de la plataforma, creando diseños que reflejan la misión y los valores de la comunidad de escritores.","assets/images/equipoESF/mariaIsabelMunioz.png");
INSERT INTO equipo (nombre, apellidos, profesion, nacionalidad, biografia, fotografia) VALUES ("Daniela","Patrone","Coordinadora de eventos y profesora", "Argentina", "Daniela Patrone es una profesional en gestión de eventos con una pasión por la literatura y la cultura. Ha organizado numerosos eventos literarios, talleres y conferencias que han reunido a escritores y lectores de diversas partes del mundo. En 'Escritores Sin Fronteras', Daniela coordina eventos que promueven la interacción y el crecimiento de la comunidad literaria.","assets/images/equipoESF/danielaPatrone.png");
INSERT INTO equipo (nombre, apellidos, profesion, nacionalidad, biografia, fotografia) VALUES ("Mario","Alberto","Diseñador gráfico y multimedia", "Argentina", "Mario Alberto Gómez es un diseñador gráfico y multimedia con una amplia experiencia en la creación de contenido visual para plataformas digitales. Ha trabajado en proyectos que van desde el diseño web hasta la producción de videos promocionales. En 'Escritores Sin Fronteras', Mario Alberto aporta su talento para desarrollar materiales visuales que enriquecen la experiencia de los usuarios y promueven la plataforma.","assets/images/equipoESF/marioAlberto.png");
INSERT INTO equipo (nombre, apellidos, profesion, nacionalidad, biografia, fotografia) VALUES ("Nilton","Gómez","Publicador profesional y creador de contenido", "Peruano","Nilton es creador digital y un coach dedicado a las personas en redes sociales, además de escritor y novelista","assets/images/equipoESF/niltonGomez.png");

/***********************************************************************************************************************************************************/
/***********************************************************************************************************************************************************/

/********************************************************************************/
/**************   TABLA PARA BLOG: APARTADO 4 BLOG LITERARIO ********************/
/********************************************************************************/

CREATE TABLE blog (     
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(500) NOT NULL,
    tipo INT NOT NULL,
    contenido VARCHAR(2000) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    primerapellido VARCHAR(50) NOT NULL,
    segundoapellido VARCHAR(50) NOT NULL,
    pais VARCHAR(50) NOT NULL,
    email VARCHAR(70) NOT NULL,
    fecha DATE NOT NULL
);

INSERT INTO blog (titulo, tipo, contenido, nombre, primerapellido, segundoapellido, pais, email, fecha) VALUES ("Frontera de tinta",0,"'Cruzo la página, no por huir del mundo, sino por nombrarlo. Y en cada palabra una casa posible para lo que duele.'","Juan","Martínez","Salgado","Cuba","equipo@esf.org","2024-06-10");
INSERT INTO blog (titulo, tipo, contenido, nombre, primerapellido, segundoapellido, pais, email, fecha) VALUES ("El susurro que dejó la noche",2,"'Cruzo la página, no por huir del mundo, sino por nombrarlo. Y en cada palabra una casa posible para lo que duele.'","Jimeno","Orlando","Treffen","Argentina","equipo@esf.org","2026-05-16");
INSERT INTO blog (titulo, tipo, contenido, nombre, primerapellido, segundoapellido, pais, email, fecha) VALUES ("Donde el viento aprende mi nombre",2,"'Cruzo la página no por huir del mundo sino por nombrarlo. Y en cada palabra una casa posible para lo que duele.'","Maria","Romero","Nalda","Mexico","equipo@esf.org","2026-02-01");
INSERT INTO blog (titulo, tipo, contenido, nombre, primerapellido, segundoapellido, pais, email, fecha) VALUES ("Cartografía de un latido cansado",1,"'Cruzo la página, no por huir del mundo, sino por nombrarlo. Y en cada palabra una casa posible para lo que duele.'","Jacinto","Martín","Robles","España","equipo@esf.org","2025-02-11");
INSERT INTO blog (titulo, tipo, contenido, nombre, primerapellido, segundoapellido, pais, email, fecha) VALUES ("La orilla que nunca regresa",1,"'Cruzo la página, no por huir del mundo, sino por nombrarlo. Y en cada palabra una casa posible para lo que duele.'","Blanca","Pascual","Neruda","República Dominicana","equipo@esf.org","2026-04-03");
INSERT INTO blog (titulo, tipo, contenido, nombre, primerapellido, segundoapellido, pais, email, fecha) VALUES ("Inventario de silencios rotos",2,"'Cruzo la página, no por huir del mundo, sino por nombrarlo. Y en cada palabra una casa posible para lo que duele.'","Lucas","Ponce","Laredo","Portugal","equipo@esf.org","2025-09-09");
INSERT INTO blog (titulo, tipo, contenido, nombre, primerapellido, segundoapellido, pais, email, fecha) VALUES ("El eco que se quedó a vivir en mí",0,"'Cruzo la página, no por huir del mundo, sino por nombrarlo. Y en cada palabra una casa posible para lo que duele.'","Carmen","Escila","Norris","Canadá","equipo@esf.org","2026-02-02");

/*******************************************************************************************/
/******************   PARA TODAS LAS TABLAS DE LA BASE DE DATOS CREADA  ********************/
/*******************************************************************************************/

ALTER TABLE noticias CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE historia CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
