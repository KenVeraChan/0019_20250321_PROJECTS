import cors from 'cors';         //Importo cors para manejar el Cross-Origin Resource Sharing (CORS)
import express from 'express';   //Importo el framework Express para crear un servidor web
import helmet from 'helmet';     //Importo helmet para mejorar la seguridad de la aplicación Express configurando varios encabezados HTTP
import { db } from './db.js';    //Importo la conexión a la base de datos desde el archivo 'db.js'
import dotenv from 'dotenv';     //Importo dotenv para cargar variables de entorno desde un archivo .env
import { query, validationResult } from 'express-validator';  //Importo funciones de express-validator para validar y sanitizar las entradas de los usuarios

dotenv.config();                 // Cargo las variables de entorno desde el archivo .env
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
//APARTADO 0: INICIO DE LA PAGINA WEB
//APARTADO 1: NUESTRA HISTORIA DE LA PAGINA WEB
//APARTADO 2: QUIENES SOMOS DE LA PAGINA WEB
//APARTADO 3: BLOG LITERARIO DE LA PAGINA WEB
//APARTADO 4: NUESTROS SERVICIOS DE LA PAGINA WEB
//APARTADO 5: PUBLICACIONES DE LA PAGINA WEB
//APARTADO 6: CONTACTO DE LA PAGINA WEB

const areaConsultada= {
  noticias: 'noticias',
  historia: 'historia',
  equipo: 'equipo',
  blog: 'blog',
  servicios: 'servicios',
  publicaciones: 'publicaciones',
  contacto: 'contacto'
};  //Ruta para obtener las noticias desde la base de datos

app.get('/api/:area',[
  query('limit').optional().isInt({ min: 1, max: 50 }),  //Valida que el parámetro 'limit' sea un número entero opcional entre 1 y 50
  query('page').optional().isInt({ min: 1 })             //Valida que el parámetro 'page' sea un número entero opcional mayor o igual a 1
], async (req, res) => {
  const errors = validationResult(req);                  //Verifica si hay errores de validación en los parámetros de la consulta y, si los hay, devuelve una respuesta con un código de estado 400 y un mensaje de error detallado
  const area= req.params.area;                           //Obtiene el valor del parámetro 'area' de la ruta
  const tabla =areaConsultada[area];                     //Busca el nombre de la tabla correspondiente al área consultada utilizando el objeto 'areaConsultada'. Si el área no es válida, 'tabla' será undefined, lo que también se considera un error de validación
  if (!errors.isEmpty() || !tabla) {        //Si hay errores de validación o el área no es válida, devuelve una respuesta con un código de estado 400 y un mensaje de error detallado
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 100, 100);  //Obtiene el valor del parámetro 'limit' de la consulta, lo convierte a un número entero y, si no se proporciona o no es válido, establece un valor predeterminado de 10 y maximo de 100 registros
    const page  = parseInt(req.query.page, 10) || 1;    //Obtiene el valor del parámetro 'page' de la consulta, lo convierte a un número entero y, si no se proporciona o no es válido, establece un valor predeterminado de 1
    const offset = (page - 1) * limit;                  //Calcula el desplazamiento (offset) para la consulta SQL en función de la página y el límite, lo que permite paginar los resultados de la consulta
    const [rows] = await db.query(`SELECT * FROM ${tabla} LIMIT ? OFFSET ?`, [limit, offset]);   //Ejecuta una consulta SQL para obtener todos las entradas de la tabla 'noticias' en la base de datos
    res.json(rows);    //Envía la respuesta al cliente en formato JSON con los datos obtenidos de la base de datos
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Error al obtener los datos del APARTADO: ${tabla} desde la base de datos` });  
    //En caso de error, envía una respuesta con un mensaje de error y un código de estado 500    
  }
});

app.listen(3000,"0.0.0.0", () => {
  console.log("Servidor escuchando en http://localhost:3000");
});

