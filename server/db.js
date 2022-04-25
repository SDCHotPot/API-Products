const { Pool, Client } = require('pg');

const dbms = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'api_product',
  port: 5432
});

dbms.connect();

exports.dbms = dbms;