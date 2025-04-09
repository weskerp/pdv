const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, password], (err, row) => {
    if (row) {
      res.json({ sucesso: true });
    } else {
      res.status(401).json({ erro: 'Usuário ou senha inválidos' });
    }
  });
});

module.exports = router;
