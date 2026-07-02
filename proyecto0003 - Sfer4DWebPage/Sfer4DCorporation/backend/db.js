import fs from 'fs/promises';
import path from 'path';
import mysql from 'mysql2/promise';


async function runSqlFiles(db, dir) {
try {
  const items = await fs.readdir(dir);
  const files = items.filter(f => f.endsWith('.sql')).sort();
  for (const file of files) {
  const sql = await fs.readFile(path.join(dir, file), 'utf8');
  console.log(`Ejecutando SQL: ${file}`);
  await db.query(sql);
}
} catch (err) {
    if (err.code === 'ENOENT') {
    console.log(`Directorio SQL no encontrado: ${dir} — omitiendo inicialización desde archivos.`);
    } else {
    throw err;
    }
  }
}

async function connectWithRetry() {
  while (true) {     //Reintenta indefinidamente esperando sin cargar la CPU en rendimiento
    try {
      const dbHost = process.env.DB_HOST;
      const dbPort = parseInt(process.env.DB_PORT || '3306', 10);
      const dbUser = process.env.DB_USER;
      const dbPass = process.env.DB_PASS;
      const dbName = process.env.DB_NAME;

      //Se mostrará un mensaje de conexión a MySQL con los detalles de la conexión, como son 3 BBDD creadas se conectará a la que se indique en la variable de entorno DB_NAME, si no se indica ninguna se conectará sin seleccionar ninguna base de datos.
      // CONSIDERARACIONES DE SEGURIDAD: No se recomienda mostrar la contraseña en el log, por lo que no se mostrará en el mensaje de conexión.
      //Se conectará por defecto a la BBDD: bbdd001_jefes_rrhh, si no se indica ninguna base de datos en la variable de entorno DB_NAME.
      console.log(`Conectando a MySQL en ${dbHost}:${dbPort} usuario=${dbUser} base=${dbName || '(ninguna)'}`);
      // Configuración de la conexión a MySQL
      const config = {
        host: dbHost,
        port: dbPort,
        user: dbUser,
        password: dbPass,
        database: dbName,
        charset: 'utf8mb4'
      };
      if (dbName) {
        config.database = dbName;
      }

      const db = await mysql.createConnection(config);

      await db.query("SET NAMES utf8mb4");
      await db.query("SET CHARACTER SET utf8mb4");
      await db.query("SET character_set_connection = utf8mb4");

      console.log("Conectado a MySQL");
      return db;
    } catch (err) {
      console.error("Error de conexión a MySQL:", err);
      console.log("MySQL no está listo, reintentando en 3s...");
      await new Promise(res => setTimeout(res, 3000));
    }
  }
}

export const db = await connectWithRetry();
