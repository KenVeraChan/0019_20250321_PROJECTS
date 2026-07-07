import cors from 'cors';         //Importo cors para manejar el Cross-Origin Resource Sharing (CORS)
import express from 'express';   //Importo el framework Express para crear un servidor web
import helmet from 'helmet';     //Importo helmet para mejorar la seguridad de la aplicación Express configurando varios encabezados HTTP
import dotenv from 'dotenv';     //Importo dotenv para cargar variables de entorno desde un archivo .env
import { query, body, validationResult } from 'express-validator';  //Importo funciones de express-validator para validar y sanitizar las entradas de los usuarios

dotenv.config();                 // Cargo las variables de entorno desde el archivo .env
const { db } = await import('./db.js');    //Importo la conexión a la base de datos desde el archivo 'db.js' una vez cargadas las variables de entorno
const app = express();   //Creo una instancia de la aplicación Express
app.use(helmet());  //Aplico las configuraciones de seguridad de Helmet
//Middle Ware globales para todas las rutas y manejo de CORS
// Aquí va CORS
app.use(cors());
// Para poder leer JSON del frontend
app.use(express.json());
//Defino una ruta GET en '/api/saludo' que responde con un mensaje JSON
app.get("/api/saludo", (req, res) => {
  res.json({ mensaje: "Hola" });
});

//PARA OBTENER LAS NOTICIAS DESDE LA BASE DE DATOS
//ENLACES EJECUTADAS DESDE EL BACKEND POR NODE.JS Y EXPRESS PARA OBTENER LAS NOTICIAS DESDE LA BASE DE DATOS
//APARTADO 0: PAGINA PRINCIPAL
//APARTADO 1: PAGINA HISTORIA
//APARTADO 2: PAGINA PRODUCTOS
//APARTADO 3: PAGINA SERVICIOS
//APARTADO 4: PAGINA PROYECTOS
//APARTADO 5: PAGINA DEL CLIENTE
//APARTADO 6: PAGINA DE RR.HH.
//APARTADO 7: PAGINA DE JEFES

const areaConsultada = {                                                         /* ANALIZAR SI SE PUEDEN AÑADIR EN LA CONSULTA DE MÁS ABAJO LAS ESPECIFICACIONES DE LA CONSULTA */
  inicio: { db: 'bbdd003_clientes', table: 'imagenesinterfazweb', destino1: 'SLIDER', destino2: 'NOVEDADES' },                                                                                /* CONSULTA: select ID,NOMBRE,DETALLES from imagenesinterfazweb where DESTINO='SLIDER' or DESTINO='NOVEDADES'; */
  historia: { db: 'bbdd003_clientes', table: 'historias' },                                                                                                                                   /* CONSULTA: select * from historias; */
  productos: { db: 'bbdd003_clientes', table: 'imagenesinterfazweb', destino1: 'PRODUCTOS', select1: 'ID', select2: 'NOMBRE', select3: 'DESTINO', select4: 'SECTOR', select5: 'DETALLES'},    /* CONSULTA: select ID,NOMBRE,DESTINO,SECTOR,DETALLES from imagenesinterfazweb where DESTINO='PRODUCTOS'; */
  servicios: { db: 'bbdd003_clientes', table: 'imagenesinterfazweb', destino1: 'SERVICIOS', select1: 'ID', select2: 'NOMBRE', select3: 'DESTINO', select4: 'SECTOR', select5: 'DETALLES'},    /* CONSULTA: select ID,NOMBRE,DESTINO,SECTOR,DETALLES from imagenesinterfazweb where DESTINO='SERVICIOS'; */
  proyectos: { db: 'bbdd003_clientes', table: 'imagenesinterfazweb', destino1: 'PROYECTOS', select1: 'ID', select2: 'NOMBRE', select3: 'DESTINO', select4: 'SECTOR', select5: 'DETALLES'},    /* CONSULTA: select ID,NOMBRE,DESTINO,SECTOR,DETALLES from imagenesinterfazweb where DESTINO='PROYECTOS'; */
  loginclientes: { db: 'bbdd003_clientes', table: 'loginclientes' },             /* CONSULTA: select * from loginclientes; */
  loginjefes: { db: 'bbdd001_jefes_rrhh', table: 'login', rol: 'JEFE'},          /* CONSULTA: select * from login WHERE ROL='JEFE'; */
  loginrrhh: { db: 'bbdd001_jefes_rrhh', table: 'login', rol: 'RRHH'},           /* CONSULTA: select * from login WHERE ROL='RRHH'; */
  gestionpeticiones: { db: 'bbdd001_jefes_rrhh', table: 'gestionpeticiones' },   /* CONSULTA: select * from gestionpeticiones; */
  gestiongannt: { db: 'bbdd001_jefes_rrhh', table: 'diagrama_gannt' },           /* CONSULTA: select * from diagrama_gannt; */
  empleados: { db: 'bbdd002_empleados', table: 'empleados_empresa' },            /* CONSULTA: select * from empleados_empresa; */
  candidaturas: { db: 'bbdd002_empleados', table: 'contactos_empresa' },         /* CONSULTA: select * from contactos_empresa; */
  carritocompra: { db: 'bbdd003_clientes', table: 'clientescarrito' },           /* CONSULTA: select * from clientescarrito; */
  pedidoscompra: { db: 'bbdd003_clientes', table: 'clientespedidos' },           /* CONSULTA: select * from clientespedidos; */
  datosbancarios: { db: 'bbdd003_clientes', table: 'datosbancarios' },           /* CONSULTA: select * from datosbancarios; */
  imagenesfondos: { db: 'bbdd004_paginas', table: 'fondosimagenes' },            /* CONSULTA: select * from fondosimagenes; */  
  // ajusta según tu lógica real
};

app.get('/api/:area',[
  query('limit').optional().isInt({ min: 1, max: 50 }),  //Valida que el parámetro 'limit' sea un número entero opcional entre 1 y 50
  query('page').optional().isInt({ min: 1 })             //Valida que el parámetro 'page' sea un número entero opcional mayor o igual a 1
], async (req, res) => {
  const errors = validationResult(req);                  //Verifica si hay errores de validación en los parámetros de la consulta y, si los hay, devuelve una respuesta con un código de estado 400 y un mensaje de error detallado
  const area= req.params.area;                           //Obtiene el valor del parámetro 'area' de la ruta
  
  const entry =areaConsultada[area];                     //Busca el nombre de la tabla correspondiente al área consultada utilizando el objeto 'areaConsultada'. Si el área no es válida, 'tabla' será undefined, lo que también se considera un error de validación
  if (!errors.isEmpty() || !entry) {                     //Si hay errores de validación o el área no es válida, devuelve una respuesta con un código de estado 400 y un mensaje de error detallado
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 100, 100);  //Obtiene el valor del parámetro 'limit' de la consulta, lo convierte a un número entero y, si no se proporciona o no es válido, establece un valor predeterminado de 10 y maximo de 100 registros
    const page  = parseInt(req.query.page, 10) || 1;    //Obtiene el valor del parámetro 'page' de la consulta, lo convierte a un número entero y, si no se proporciona o no es válido, establece un valor predeterminado de 1
    const offset = (page - 1) * limit;                  //Calcula el desplazamiento (offset) para la consulta SQL en función de la página y el límite, lo que permite paginar los resultados de la consulta
    
   //SE TIENE QUE DISTINGUIR ENTRE LAS DIFERENTES AREAS QUE HAY PORQUE LA CONSULTA ES DIFERENTE EN CADA UNA DE ELLAS
   // CASO 1) inicio
   switch (area) {
    case 'inicio':
          {
            const [rows] = await db.query(
              `SELECT * FROM \`${entry.db}\`\.\`${entry.table}\` WHERE DESTINO = ? OR DESTINO = ? LIMIT ? OFFSET ?`, [entry.destino1, entry.destino2, limit, offset]);   //Ejecuta una consulta SQL para obtener todos las entradas de la tabla 'noticias' en la base de datos
            res.json(rows);    //Envía la respuesta al cliente en formato JSON con los datos obtenidos de la base de datos 
            break;
          }
    case 'productos':
    case 'servicios':
    case 'proyectos':
          {
            switch(area)
            {
              case 'productos':
                entry.destino1='PRODUCTOS';
                break;
              case 'servicios':
                entry.destino1='SERVICIOS';
                break;
              case 'proyectos':
                entry.destino1='PROYECTOS';
                break;
            }
            const [rows] = await db.query(
              `SELECT \`${entry.select1}\`,\`${entry.select2}\`,\`${entry.select3}\`,\`${entry.select4}\`,\`${entry.select5}\` FROM \`${entry.db}\`\.\`${entry.table}\` WHERE DESTINO = ? LIMIT ? OFFSET ?`, [entry.destino1, limit, offset]);   //Ejecuta una consulta SQL para obtener todos las entradas de la tabla 'noticias' en la base de datos
            res.json(rows);    //Envía la respuesta al cliente en formato JSON con los datos obtenidos de la base de datos 
            break;
          } 
    case 'loginclientes':
          {
            const [rows] = await db.query(
              `SELECT * FROM \`${entry.db}\`\.\`${entry.table}\` LIMIT ? OFFSET ?`, [limit, offset]);   //Ejecuta una consulta SQL para obtener todos las entradas de la tabla 'noticias' en la base de datos
            res.json(rows);    //Envía la respuesta al cliente en formato JSON con los datos obtenidos de la base de datos 
            break;
          }   
    case 'loginjefes':
    case 'loginrrhh':
          {
            switch(area){
              case 'loginjefes':
                entry.rol='JEFE';
                break;  
              case 'loginrrhh':
                entry.rol='RRHH';
                break;  
            } 
            const [rows] = await db.query(
              `SELECT * FROM \`${entry.db}\`\.\`${entry.table}\` WHERE ROL = ? LIMIT ? OFFSET ?`, [entry.rol, limit, offset]);   //Ejecuta una consulta SQL para obtener todos las entradas de la tabla 'noticias' en la base de datos
            res.json(rows);    //Envía la respuesta al cliente en formato JSON con los datos obtenidos de la base de datos 
            break;
          }
    case 'gestionpeticiones':
    case 'historia':
    case 'gestiongannt':
    case 'empleados':
    case 'candidaturas':
    case 'carritocompra':
    case 'pedidoscompra':
    case 'datosbancarios':
    case 'imagenesfondos':
          { 
            switch(area){
              case 'historia':
                    {
                      entry.table='historias';
                      break;
                    }
              case 'gestiongannt':
                    { 
                      entry.table='diagrama_gannt';
                      break; 
                    } 
              case 'empleados':
                    {
                      entry.table='empleados_empresa';
                      break;
                    }
              case 'candidaturas':
                    {
                      entry.table='contactos_empresa';
                      break;
                    }
              case 'carritocompra':
                    { 
                      entry.table='clientescarrito';
                      break;
                    }
              case 'pedidoscompra':
                    {
                      entry.table='clientespedidos';
                      break;
                    }
              case 'datosbancarios':
                    {
                      entry.table='datosbancarios';
                      break;
                    }
              case 'imagenesfondos':
                    {
                      entry.table='fondosimagenes';
                      entry.db='bbdd004_paginas';
                      break;
                    } 
            }
            const [rows] = await db.query(
              `SELECT * FROM \`${entry.db}\`\.\`${entry.table}\` LIMIT ? OFFSET ?`, [ limit, offset]);   //Ejecuta una consulta SQL para obtener todos las entradas de la tabla 'noticias' en la base de datos
            res.json(rows);    //Envía la respuesta al cliente en formato JSON con los datos obtenidos de la base de datos 
            break; 
          }
      default:
      {
        return res.status(400).json({ error: `Área no válida: ${area}` });
      }
    }
  }catch (err) {
      console.error(err);
      res.status(500).json({ error: `Error al obtener los datos del APARTADO: ${entry.table} desde la base de datos` });
      //En caso de error, envía una respuesta con un mensaje de error y un código de estado 500
  }
});

/**
 * Convierte el campo "tipo" del JSON (texto o número) al INT que guarda MySQL.
 * Tabla blog (init.sql): 0 = verso, 1 = prosa, 2 = reflexión.
 * Devuelve null si el valor no es reconocible (el validador rechazará la petición).
 */
function tipoBlogToInt(tipo) {
  // Acepta string 'verso', número 0 o string '0' desde el frontend o la BD
  if (tipo === 'verso' || tipo === 0 || tipo === '0') return 0;
  // Acepta 'prosa', 1 o '1'
  if (tipo === 'prosa' || tipo === 1 || tipo === '1') return 1;
  // Acepta 'reflexion', 2 o '2'
  if (tipo === 'reflexion' || tipo === 2 || tipo === '2') return 2;
  // Valor no válido: el validador custom de body('tipo') lanzará error 400
  return null;
}

/*
 * POST /api/blog — Crear entrada del blog literario.
 *
 * Flujo con Angular (estudiar junto a blogs.ts y variablesCompartidas.ts):
 *   submitPost() → Conexion.crearEntradaBlog(entrada) → POST http://localhost:3000/api/blog
 *   → validadores body() → INSERT tabla blog → SELECT por id → res.status(201).json(fila)
 *
 * Cuerpo JSON esperado (claves en minúsculas como la BD):
 *   titulo, tipo, contenido, nombre, primerapellido, segundoapellido, pais, email [, fecha]
 *
 * Códigos de respuesta:
 *   201 = creado (subscribe next en Angular)
 *   400 = validación fallida (subscribe error → mensajeErrorHttp)
 *   500 = error SQL o conexión BD (subscribe error)
 */
app.post('/api/blog', [
  // titulo: VARCHAR(500) en init.sql; trim() quita espacios al inicio/final
  body('titulo').trim().isLength({ min: 3, max: 500 }),
  // Regla: contenido obligatorio, entre 10 y 2000 caracteres (como VARCHAR(2000))
  body('contenido').trim().isLength({ min: 10, max: 2000 }),
  // Regla: nombre obligatorio, entre 2 y 50 caracteres
  body('nombre').trim().isLength({ min: 2, max: 50 }),
  // Acepta primerapellido (BD) o primerApellido (Angular)
  body('primerapellido').optional().trim().isLength({ min: 2, max: 50 }),
  body('primerApellido').optional().trim().isLength({ min: 2, max: 50 }),
  body('segundoapellido').optional().trim().isLength({ min: 2, max: 50 }),
  body('segundoApellido').optional().trim().isLength({ min: 2, max: 50 }),
  // País: letras y espacios entre palabras (p. ej. "Costa Rica"), 3–50 caracteres
  body('pais')
    .trim()
    .isLength({ min: 3, max: 50 })
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/)
    .withMessage('El país solo puede contener letras y espacios entre palabras'),
  // Regla: email con formato válido; normalizeEmail() lo deja en minúsculas y forma estándar
  body('email').isEmail().normalizeEmail(),
  // Regla custom: tipo debe poder convertirse a 0, 1 o 2 mediante tipoBlogToInt
  body('tipo').custom((value) => {
    // Si el tipo no es verso/prosa/reflexion ni 0/1/2, se rechaza la petición
    if (tipoBlogToInt(value) === null) {
      throw new Error('tipo debe ser verso, prosa, reflexion o 0, 1, 2');
    }
    // Validación correcta: express-validator continúa con el siguiente campo
    return true;
  }),
  // Regla opcional: si el cliente envía fecha, debe ser ISO8601 (p. ej. 2024-06-10 o con hora)
  body('fecha').optional().isISO8601({ strict: false }),
], async (req, res) => {
  // Recoge todos los errores de las reglas body() anteriores
  const errors = validationResult(req);
  // Si hay algún error de validación, no se toca la base de datos
  if (!errors.isEmpty()) {
    // 400 Bad Request + detalle de qué campo falló (útil para depurar en el frontend)
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Campos que coinciden exactamente con el nombre de columna en MySQL
    const { titulo, contenido, email, nombre, pais } = req.body;
    // Angular envía primerapellido/segundoapellido; por compatibilidad aceptamos camelCase
    const primerapellido =
      req.body.primerapellido ?? req.body.primerApellido ?? '';
    const segundoapellido =
      req.body.segundoapellido ?? req.body.segundoApellido ?? '';
    if (!primerapellido || !segundoapellido) {
      return res.status(400).json({
        error: 'Faltan primerapellido y/o segundoapellido en el cuerpo de la petición',
      });
    }
    // tipo llega como 'reflexion' desde Angular; la columna tipo en BD es INT
    const tipo = tipoBlogToInt(req.body.tipo);
    // Columna fecha es DATE: solo YYYY-MM-DD; si no envían fecha, hoy
    const fecha = req.body.fecha
      ? String(req.body.fecha).slice(0, 10)
      : new Date().toISOString().slice(0, 10);

    // Los ? evitan inyección SQL; el orden debe coincidir con las columnas del INSERT
    const [result] = await db.query(
      'INSERT INTO blog (titulo, tipo, contenido, nombre, primerapellido, segundoapellido, pais, email, fecha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [titulo, tipo, contenido, nombre, primerapellido, segundoapellido, pais, email, fecha],
    );

    // result.insertId = id autogenerado por AUTO_INCREMENT en MySQL
    const [rows] = await db.query('SELECT * FROM blog WHERE id = ?', [result.insertId]);
    // 201 Created: devuelve la fila tal como la verá el GET /api/blog y mapFilaABlogPost en blogs.ts
    res.status(201).json(rows[0]);
  } catch (err) {
    // Error de conexión, SQL, etc.: se registra en consola del servidor
    console.error(err);
    // 500 Internal Server Error: mensaje genérico al cliente (sin filtrar datos sensibles)
    res.status(500).json({ error: 'Error al guardar la entrada del blog en la base de datos' });
  }
});

/* Para comprobaciones mediante URLS en el navegador de lo que recibamos del servidor*/
/* http://127.0.0.1:3000/api/inicio?limit=10&page=1 es un ejemplo de cómo cargar datos */

app.listen(3000,"0.0.0.0", () => {
  console.log("Servidor escuchando en http://localhost:3000 - directamente con el servidor");
});

/* Para que la escucha del servidor acepte también direcciones IPv6 */
app.listen(3000, '::', () => {
  console.log('Servidor escuchando en http://localhost:3000 - con IPv6');
});

/* Para que la escucha del servidor acepte también direcciones IPv4 */
app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000 - con IPv4');
});