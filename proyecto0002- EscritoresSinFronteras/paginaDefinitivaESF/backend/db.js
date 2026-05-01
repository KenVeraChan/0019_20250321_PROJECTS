import mysql from 'mysql2/promise';

export const db = await mysql.createConnection({
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '1234',
  database: process.env.DB_NAME || 'BBDD_ESF'
});

console.log('Conectado a MySQL');
