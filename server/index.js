const express = require('express');
const path = require('path');
const { dbms } = require('./db.js');
const { productQuery, relatedQuery, stylesQuery } = require('./queries.js');

require('dotenv').config();


const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('*', (req, res, next) => {
  console.log(`${req.method} at ${req.path}`);
  next();
})

app.get('/products/:pId', (req, res) => {
  const pId = req.params.pId;
  productQuery(pId)
    .then((product) => {
      res.send(product);
    })
    .catch((err) => console.log(err));
});

app.get('/products/:pId/related', (req, res) => {
  const pId = req.params.pId;
  relatedQuery(pId)
    .then((related) => {
      res.send(related);
    })
    .catch((err) => console.log(err));
})

app.get('/products/:pId/styles', (req, res) => {
  const pId = req.params.pId;
  stylesQuery(pId)
  .then((styles) => res.send(styles))
})

app.listen(process.env.PORT);