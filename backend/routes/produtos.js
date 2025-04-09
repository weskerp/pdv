const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM produtos', (err, rows) => {
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { nome, preco, estoque } = req.body;
  db.run('INSERT INTO produtos (nome, preco, estoque) VALUES (?, ?, ?)', [nome, preco, estoque], function (err) {
    res.json({ id: this.lastID, nome, preco, estoque });
  });
});

module.exports = router;
