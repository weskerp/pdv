// backend/api/index.js
const express = require('express');
const cors = require('cors');

const loginRoutes = require('../routes/login');
const produtosRoutes = require('../routes/produtos');
const vendasRoutes = require('../routes/vendas');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/login', loginRoutes);
app.use('/api/produtos', produtosRoutes);
app.use('/api/vendas', vendasRoutes);

module.exports = app;
