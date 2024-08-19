import mysql from 'mysql2/promise'
import 'dotenv/config';

export const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.SQL_PASSWORD,
    database: 'miranda',
});
