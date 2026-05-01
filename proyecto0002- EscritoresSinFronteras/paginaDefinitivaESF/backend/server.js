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

app.listen(3000,"0.0.0.0", () => {
  console.log("Servidor escuchando en http://localhost:3000");
});

