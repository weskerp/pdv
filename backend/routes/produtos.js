const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;
  const search = req.query.search || '';

  const searchQuery = `%${search}%`;


  if (search) {
    db.all('SELECT * FROM produtos WHERE nome LIKE ? ', [searchQuery], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        produtos: rows
      });
    })
  } else {
    let params = [limit, offset];
    db.all('SELECT * FROM produtos LIMIT ? OFFSET ?', params, (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      db.get('SELECT COUNT(*) as total FROM produtos',  (err2, countResult) => {
        if (err2) return res.status(500).json({ error: err2.message });

        let total = 0;
        let hasMore = false;

        if (countResult) {
          total = countResult.total;
          hasMore = offset + limit < total;
        }

        res.json({
          produtos: rows,
          hasMore: hasMore,
          total:total,
          limit,
          offset,
          countResult
        
        });
      });
    });
  }

});


router.post('/', (req, res) => {
  const { nome, preco, estoque } = req.body;
  db.run('INSERT INTO produtos (nome, preco, estoque) VALUES (?, ?, ?)', [nome, preco, estoque], function (err) {
    res.json({ id: this.lastID, nome, preco, estoque });
  });
});


module.exports = router;
