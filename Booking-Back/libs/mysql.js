const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'booking',
  port: 3306,
  /*host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT*/
});

module.exports = pool.promise();
