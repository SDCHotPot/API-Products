const express = require('express');
const path = require('path');
const { sequelize } = require('../dbms/postgres/queries.js');

const app = express();

try {
  sequelize.authenticate()
    .then(() => console.log('DB connection established!'))
} catch (error) {
  console.error('DB connection failed!', error);
}

app.listen(3500);