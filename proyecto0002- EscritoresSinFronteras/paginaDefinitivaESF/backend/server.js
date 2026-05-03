import cors from 'cors';         //Importo cors para manejar el Cross-Origin Resource Sharing (CORS)
import express from 'express';   //Importo el framework Express para crear un servidor web
import { db } from './db.js';    //Importo la conexión a la base de datos desde el archivo 'db.js'
import dotenv from 'dotenv';     //Importo dotenv para cargar variables de entorno desde un archivo .env

dotenv.config();                 // Cargo las variables de entorno desde el archivo .env
const app = express();   //Creo una instancia de la aplicación Express
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

const areaConsultada= ['noticias','historia','equipo','blog','servicios','publicaciones','contacto'];  //Ruta para obtener las noticias desde la base de datos

app.get('/api/' + areaConsultada[0] + '/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ' + areaConsultada[0]);   //Ejecuta una consulta SQL para obtener todos las entradas de la tabla 'noticias' en la base de datos
    res.json(rows);    //Envía la respuesta al cliente en formato JSON con los datos obtenidos de la base de datos
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los datos deL APARTADO: ' + areaConsultada[0] + ' desde la base de datos' });  
    //En caso de error, envía una respuesta con un mensaje de error y un código de estado 500    
  }
});


app.listen(3000,"0.0.0.0", () => {
  console.log("Servidor escuchando en http://localhost:3000");
});

