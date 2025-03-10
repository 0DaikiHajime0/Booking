const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'booking',
  port: 3306,
});
module.exports =pool.promise();