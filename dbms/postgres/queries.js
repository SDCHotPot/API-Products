const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize('api_product', 'postgres', 'postgres', {
  host: process.env.SQLHOST,
  dialect: 'postgres',
})

exports.sequelize = sequelize;