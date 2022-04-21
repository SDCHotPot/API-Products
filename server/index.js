const express = require('express');
const path = require('path');
const { sequelize } = require('../dbms/postgres/queries.js');

require('dotenv').config();

const app = express();

try {
  sequelize.authenticate()
    .then(() => console.log('DB connection established!'))
} catch (error) {
  console.error('DB connection failed!', error);
}

app.listen(process.env.PORT);