const db = require('./db');

function gerarNome() {
  const adjetivos = ['Novo', 'Incrível', 'Barato', 'Premium', 'Importado'];
  const produtos = ['Mouse', 'Teclado', 'Monitor', 'Cadeira', 'Impressora', 'Notebook', 'Celular'];
  const adjetivo = adjetivos[Math.floor(Math.random() * adjetivos.length)];
  const produto = produtos[Math.floor(Math.random() * produtos.length)];
  return `${adjetivo} ${produto}`;
}

function gerarPreco() {
  return (Math.random() * 1000 + 50).toFixed(2); // preços entre 50 e 1050
}

function gerarEstoque() {
  return Math.floor(Math.random() * 50) + 1; // entre 1 e 50 unidades
}

db.serialize(() => {
  const stmt = db.prepare("INSERT INTO produtos (nome, preco, estoque) VALUES (?, ?, ?)");
  for (let i = 0; i < 100; i++) {
    const nome = gerarNome();
    const preco = parseFloat(gerarPreco());
    const estoque = gerarEstoque();
    stmt.run(nome, preco, estoque);
  }
  stmt.finalize(err => {
    if (err) console.error("Erro ao inserir produtos:", err);
    else console.log("100 produtos inseridos com sucesso!");
    db.close();
  });
});
