const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM vendas', (err, rows) => {
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { total } = req.body;
  db.run('INSERT INTO vendas (total) VALUES (?)', [total], function (err) {
    res.json({ id: this.lastID, total });
  });
});

module.exports = router;
