import mysql from 'mysql2/promise';

async function connectWithRetry() {
  while (true) {     //Reintenta indefinidamente esperando sin cargar la CPU en rendimiento
    try {
      const db = await mysql.createConnection({
        host: process.env.DB_HOST,      // ← ESTO ES LO IMPORTANTE para acentos y reglas ortográficas
        user: process.env.DB_USER,      // ← ESTO ES LO IMPORTANTE para acentos y reglas ortográficas
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        charset: 'utf8mb4' // ← ESTO ES LO IMPORTANTE para acentos y reglas ortográficas
      });

      await db.query("SET NAMES utf8mb4");
      await db.query("SET CHARACTER SET utf8mb4");
      await db.query("SET character_set_connection = utf8mb4");

      console.log("Conectado a MySQL");
      return db;
    } catch (err) {
      console.log("MySQL no está listo, reintentando en 3s...");
      await new Promise(res => setTimeout(res, 3000));
    }
  }
}

export const db = await connectWithRetry();
