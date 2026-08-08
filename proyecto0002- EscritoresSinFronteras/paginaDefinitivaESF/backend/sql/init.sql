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

INSERT INTO equipo (nombre, apellidos, profesion, nacionalidad, biografia, fotografia) 
    VALUES ("Ken",
            "Vera Chan",
            "Ingeniero de Software, profesor, escritor y cofundador de E.S.F.",
            "España", 
            "Comencé mi existencia un sábado 15 de junio de 1991, sobre las 10:00 de la mañana en Valladolid, una provincia de la comunidad de Castilla y León en España. Crecí en una familia en donde se ha forjado siempre la personalidad del esfuerzo por lograr lo soñado, la persistencia pese a las dificultades de esta corta vida y sobretodo el amor por lo que se va haciendo día a día. Debido a las sabias casualidades de la vida, inicié mi rumbo de vida, en paralelo a la del estudiante, en el universo de la escritura. Un sueño me condujo a escribir una biografía, una que aún sigue sin terminar, pero repleta de sentimientos y emociones que una persona puede experimentar a lo largo de una estructurada vida. A lo largo de los años, escribir se convirtió en un hobbie, 'Una doble vida' que hacía que mis días tuvieran más de 24 horas. Espero poder terminar algún idóneo día, la tan expresiva novela biográfica que sigue creciendo como mi vida misma, pues mi profesión de programador y profesor intentan monopolizar mis horas libres, como suele suceder con los momentos destinados al deber y a la realización personal de uno mismo. Y actualmente, formo parte de una corporación como cofundador con un grupo de personas en la distancia, dignas de haberlas podido conocer en persona, en donde hablamos con nuevos escritores, veteranos y aspirantes a serlo algún día. El mundo de la escritura ha significado el encuentro con facetas nuevas y el conocer a personas con mentalidades abiertas y pensamientos afines.",
            "assets/images/equipoESF/kenVeraChan.png");

INSERT INTO equipo (nombre, apellidos, profesion, nacionalidad, biografia, fotografia) 
    VALUES ("Diana",
            "Emilce Zamora",
            "Psicóloga, escritora y cofundadora de E.S.F.",
            "Colombia", 
            "Diana Zamora (Caldas, Colombia, 1975) es licenciada en Educación y Pedagogía. Estudió Psicología y se especializó en el área infantil, graduada de la Universidad Católica de Colombia, tiene veinte años de experiencia como maestra y psicóloga en escuelas de educación básica primaria y secundaria. Desarrolló talleres y proyectos en el área de discapacidad y atención del niño, joven y adolescente con necesidades especiales. Estudió Teología y cursó el ministerio pastoral con la Universidad de Dallas, Texas. Además de diferentes diplomados en las áreas de neurolingüística, manejo de las tecnologías TICS, problemas de aprendizaje, educación ambiental y atención psicosocial al migrante en comunidades multicolores con la Universidad Intercontinental de la Ciudad de México. Actualmente estudia y es miembro de la Academia Guipil: “Escribe y Publica tu pasión” donde ha participado en escritos de los libros Testimonios de fe y Devocional soy mujer Valiosa. Es servidora del Movimiento Católico Conquistando las Naciones para Cristo, en Atlanta, Georgia donde reside con su esposo e hijos.",
            "assets/images/equipoESF/dianaEmilceZamora.png");

INSERT INTO equipo (nombre, apellidos, profesion, nacionalidad, biografia, fotografia) 
    VALUES ("Sergio",
            "Alvear Pérez",
            "Profesor de refuerzo a niños y jóvenes", 
            "Peruano", 
            "Nació el 15 de junio de 1972 en Villa Rosa, Atlántico, (Colombia). Desde joven desarrolló una profunda pasión por la poesía y la literatura infantil, vocación que ha cultivado junto a su labor educativa. Realizó estudios en Administración Documental e Informática y se ha dedicado a impartir clases de refuerzo a niños y jóvenes. Es autor de obras como Resplandor del alba, Susurros de mi pluma, Lecciones encantadas y ¿Por qué no has podido mantener tu felicidad?, además de la obra de misterio Almas perdidas, escrita en coautoría. En 2025 recibió el Premio Hispanoamericano de Literatura Simón Bolívar y cuenta con un diplomado internacional en cultura y paz. También colabora como articulista en medios digitales y radiales de Colombia y México. Actualmente reside en Lima, Perú, desde donde continúa promoviendo la literatura y la reflexión humana.",
            "assets/images/equipoESF/sergioAlvear.png");

INSERT INTO equipo (nombre, apellidos, profesion, nacionalidad, biografia, fotografia) 
    VALUES ("María Isabel",
            "Muñoz Suaza",
            "Estudió contabilidad básica y emprendimiento. Posteriormente se dedicó a la escritura y a la literatura, participando en talleres y antologías literarias.",
            "Colombia", 
            "Nació el 13 de febrero de 1975 en Anserma, Caldas, en un entorno campesino que marcó profundamente su sensibilidad y visión del mundo. Debido a la violencia en Colombia, se desplazó a Pereira, donde inició una nueva vida. Estudió contabilidad básica y emprendimiento, y culminó su bachillerato en 2023 en el colegio Manuela Beltrán. Desde 2022 forma parte del taller literario Caza de Palabras, donde comenzó su camino como escritora. Participó en la antología Crisálidas de la Memoria con su obra ¡Libertad! y pertenece a la Academia Colombiana de Historia, Literatura y Arte con el grupo Quijotes Creadores, destacándose con el escrito Crepúsculo. Ha participado en espacios literarios nacionales e internacionales, consolidándose como una voz sensible y comprometida con la narrativa y la poesía.",
            "assets/images/equipoESF/mariaIsabelMunioz.png");

INSERT INTO equipo (nombre, apellidos, profesion, nacionalidad, biografia, fotografia) 
    VALUES ("Daniela",
            "Patrone",
            "Coordinadora de eventos y profesora", 
            "Argentina", 
            "Daniela Patrone es una profesional en gestión de eventos con una pasión por la literatura y la cultura. Ha organizado numerosos eventos literarios, talleres y conferencias que han reunido a escritores y lectores de diversas partes del mundo. En 'Escritores Sin Fronteras', Daniela coordina eventos que promueven la interacción y el crecimiento de la comunidad literaria.",
            "assets/images/equipoESF/danielaPatrone.png");

INSERT INTO equipo (nombre, apellidos, profesion, nacionalidad, biografia, fotografia) 
    VALUES ("Luisa Camila",
            "Espinal Guevara",
            "Psicóloga. Psicología clínica y conductual (Autónoma)",
            "Colombia",
            "Capacitación psicología positiva y comunicadora en redes sociales. Fue encargada de empresa de paquetería y correos e instructora de desarrollo, en la empresa 'Regional cafetero'. Se ha dedicado al sector de la contratación, administración y gestión de RR.HH.",
            "assets/images/equipoESF/camilaGuevara.png");

INSERT INTO equipo (nombre, apellidos, profesion, nacionalidad, biografia, fotografia) 
    VALUES ("Cassandra",
            "Romanova",
            "Community Manager y cofundadora de E.S.F.", 
            "Italia", 
            "Cassandra Romanova es una experta en gestión de comunidades en línea y redes sociales. Con una sólida experiencia en marketing digital, Cassandra ha ayudado a numerosas organizaciones a construir y mantener comunidades vibrantes. En 'Escritores Sin Fronteras', Cassandra se encarga de conectar a escritores y lectores, fomentando un espacio inclusivo para el intercambio de ideas y creatividad.",
            "assets/images/equipoESF/cassandraRomanova.png");

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

/***********************************************************************************************************************************************************/
/***********************************************************************************************************************************************************/

/*********************************************************************************************/
/**************   TABLA PARA LOS SERVICIOS: APARTADO 5 NUESTROS SERVICIOS ********************/
/*********************************************************************************************/

CREATE TABLE servicios (     
    id INT PRIMARY KEY AUTO_INCREMENT,
    idservicio VARCHAR(50) NOT NULL,
    tituloservicio VARCHAR(100) NOT NULL,
    descripcionservicio VARCHAR(500) NOT NULL,
    subtitulo VARCHAR(500) NOT NULL,
    subdescripcion VARCHAR(1000) NOT NULL,
    imagenservicio VARCHAR(200) NOT NULL,
    audioservicio VARCHAR(200) NOT NULL,
    videoservicio VARCHAR(200) NOT NULL
);

INSERT INTO servicios (idservicio, tituloservicio, descripcionservicio, subtitulo, subdescripcion,imagenservicio,audioservicio,videoservicio) VALUES ("cursos","Cursos","Formación y talleres para escribir con rigor y creatividad.","Taller de narrativa breve","Sesiones prácticas para cerrar relatos con estructura clara y voz propia. Próxima convocatoria: consulte fechas.","","","");
INSERT INTO servicios (idservicio, tituloservicio, descripcionservicio, subtitulo, subdescripcion,imagenservicio,audioservicio,videoservicio) VALUES ("cursos","Cursos","Formación y talleres para escribir con rigor y creatividad.","Curso de poesía contemporánea","Exploración de métrica libre, imágenes y revisiones en grupo. Inscripciones abiertas según calendario anual.","","","");
INSERT INTO servicios (idservicio, tituloservicio, descripcionservicio, subtitulo, subdescripcion,imagenservicio,audioservicio,videoservicio) VALUES ("cursos","Cursos","Formación y talleres para escribir con rigor y creatividad.","Escritura creativa para no iniciados","Un punto de partida amable para quienes desean empezar sin miedo al folio en blanco.","","","");
INSERT INTO servicios (idservicio, tituloservicio, descripcionservicio, subtitulo, subdescripcion,imagenservicio,audioservicio,videoservicio) VALUES ("entrevistas","Entrevistas","Conversaciones con autores, editores y voces del sector.","Entrevista: oficio y rutina","Charla sobre hábitos de escritura, revisiones y equilibrio con otras responsabilidades.","","","");
INSERT INTO servicios (idservicio, tituloservicio, descripcionservicio, subtitulo, subdescripcion,imagenservicio,audioservicio,videoservicio) VALUES ("entrevistas","Entrevistas","Conversaciones con autores, editores y voces del sector.","Entrevista: del manuscrito al lector","Proceso editorial visto desde ambas orillas: autoría y acompañamiento profesional.","","","");
INSERT INTO servicios (idservicio, tituloservicio, descripcionservicio, subtitulo, subdescripcion,imagenservicio,audioservicio,videoservicio) VALUES ("ediciones","Ediciones","Lanzamientos, antologías y materiales que impulsamos o recomendamos.","Antología comunitaria","Selección de textos de la comunidad con criterios editoriales transparentes.","","","");
INSERT INTO servicios (idservicio, tituloservicio, descripcionservicio, subtitulo, subdescripcion,imagenservicio,audioservicio,videoservicio) VALUES ("ediciones","Ediciones","Lanzamientos, antologías y materiales que impulsamos o recomendamos.","Guía de buenas prácticas","Recursos descargables sobre presentación de originales y derechos básicos.","","","");
INSERT INTO servicios (idservicio, tituloservicio, descripcionservicio, subtitulo, subdescripcion,imagenservicio,audioservicio,videoservicio) VALUES ("tertulias","Tertulias","Encuentros informales para debatir lecturas y proyectos en curso.","Tertulia mensual online","Espacio virtual para comentar una obra propuesta y compañar redacciones abiertas.","","","");
INSERT INTO servicios (idservicio, tituloservicio, descripcionservicio, subtitulo, subdescripcion,imagenservicio,audioservicio,videoservicio) VALUES ("tertulias","Tertulias","Encuentros informales para debatir lecturas y proyectos en curso.","Círculo presencial (según sede)","Encuentros locales cuando la agenda lo permita; se anuncian con antelación.","","","");
INSERT INTO servicios (idservicio, tituloservicio, descripcionservicio, subtitulo, subdescripcion,imagenservicio,audioservicio,videoservicio) VALUES ("congresos","Congresos","Eventos de mayor alcance: ponencias, mesas y networking.","Congreso anual Escritores sin Fronteras","Jornadas con ponentes invitados, talleres intensivos y espacio para networking entre participantes.","","","");
INSERT INTO servicios (idservicio, tituloservicio, descripcionservicio, subtitulo, subdescripcion,imagenservicio,audioservicio,videoservicio) VALUES ("congresos","Congresos","Eventos de mayor alcance: ponencias, mesas y networking.","Mesa redonda: literatura y fronteras","Reflexión sobre traducción, migración de ideas y lectura transfronteriza.","","","");
INSERT INTO servicios (idservicio, tituloservicio, descripcionservicio, subtitulo, subdescripcion,imagenservicio,audioservicio,videoservicio) VALUES ("ferias","Ferias","Eventos realizados para promocionar libros en físico","Mesa para colocación de libros y obras literarias","Reflexión sobre traducción, migración de ideas y lectura transfronteriza.","","","");
INSERT INTO servicios (idservicio, tituloservicio, descripcionservicio, subtitulo, subdescripcion,imagenservicio,audioservicio,videoservicio) VALUES ("ferias","Ferias","Evento feria del libro en Los Ángeles","Mesa en la ciudad literatura en representación de Escritores Sin Fronteras","Reflexión sobre traducción, migración de ideas y lectura transfronteriza.","","","");


/***********************************************************************************************************************************************************/
/***********************************************************************************************************************************************************/

/*********************************************************************************************/
/**************   TABLA PARA LAS PUBLICACIONES: APARTADO 6 PUBLICACIONES ********************/
/*********************************************************************************************/

CREATE TABLE publicaciones (     
    id INT PRIMARY KEY AUTO_INCREMENT,
    idpubliGen VARCHAR(50) NOT NULL,
    titulopubli VARCHAR(50) NOT NULL,
    tipopubli INT NOT NULL,
    contenidopubli VARCHAR(500) NOT NULL,
    autorcorreopubli VARCHAR(500) NOT NULL,
    fechapubli DATE NOT NULL,
    titulofotolibropubli VARCHAR(200) NOT NULL,
    fotolibropubli VARCHAR(200) NOT NULL,
    tituloaudiolibropubli VARCHAR(200) NOT NULL,
    audiolibropubli VARCHAR(200) NOT NULL,
    titulovideopubli VARCHAR(200) NOT NULL,
    videolibropubli VARCHAR(200) NOT NULL
);

INSERT INTO publicaciones (idpubliGen,
                            titulopubli, 
                            tipopubli, 
                            contenidopubli, 
                            autorcorreopubli, 
                            fechapubli,
                            titulofotolibropubli,
                            fotolibropubli,
                            tituloaudiolibropubli,
                            audiolibropubli,
                            titulovideopubli,
                            videolibropubli) VALUES (
                                "",
                                "Frontera de tinta",
                                0,
                                "Cruzo la página y no por huir del mundo, sino por nombrarlo. Y en cada palabra una casa posible para lo que duele.",
                                "equipo@esf.org",
                                "2026-03-03",
                                "Novela de ciencia ficción - 'El fin de la eternidad' de Isaac Asimov",
                                "novelaCienciaFiccion.jpg",
                                "Audiolibro de ciencia ficción - 'Dune' de Frank Herbert",
                                "",
                                "Booktrailer de ciencia ficción - 'Neuromante' de William Gibson",
                                "");

INSERT INTO publicaciones (idpubliGen,
                            titulopubli, 
                            tipopubli, 
                            contenidopubli, 
                            autorcorreopubli, 
                            fechapubli,
                            titulofotolibropubli,
                            fotolibropubli,
                            tituloaudiolibropubli,
                            audiolibropubli,
                            titulovideopubli,
                            videolibropubli) VALUES (
                                "",
                                "Una reflexión para MAÑANA",
                                2,
                                "Cruzo la página y no por huir del mundo, sino por nombrarlo. Y en cada palabra una casa posible para lo que duele.",
                                "equipo@esf.org",
                                "2026-03-03",
                                "Presentación del libro Vitrea Horíz",
                                "Ken Vera Chan fin.png",
                                "Piano y danzas de Vitrea Horiz en las orillas del mar",
                                "Tony Anderson - Bloom.mp3",
                                "Video Vitrea en el tren a Chalikets",
                                "libreria.mp4");

/***********************************************************************************************************************************************************/
/***********************************************************************************************************************************************************/

/*******************************************************************************************/
/******************   PARA TODAS LAS TABLAS DE LA BASE DE DATOS CREADA  ********************/
/*******************************************************************************************/

ALTER TABLE noticias CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE historia CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
