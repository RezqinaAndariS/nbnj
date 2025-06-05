import mysql from 'mysql2/promise';

export async function getConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',       // sesuaikan
    user: 'root',            // sesuaikan username db kamu
    password: '123',            // sesuaikan password db kamu
    database: 'dbrere'     // nama database kamu
  });
  return connection;
}
