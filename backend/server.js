const express = require('express');
const cors = require('cors');
const app = express();
const loginRoutes = require('./routes/login');
const produtosRoutes = require('./routes/produtos');
const vendasRoutes = require('./routes/vendas');

app.use(cors());
app.use(express.json());

app.use('/api/login', loginRoutes);
app.use('/api/produtos', produtosRoutes);
app.use('/api/vendas', vendasRoutes);

app.listen(3001, () => console.log('Servidor backend rodando na porta 3001'));
