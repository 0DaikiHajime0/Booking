const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'devoewsq_kardex',
  password: 'recursosvirt1',
  database: 'devoewsq_booking',
  port: '3306'
});
module.exports =pool.promise();