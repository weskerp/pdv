const db = require('./db');

const email = 'admin@pdv.com';
const senha = 'admin123'; // neste exemplo, a senha é armazenada em texto puro

db.run(
  "INSERT INTO usuarios (email, senha) VALUES (?, ?)",
  [email, senha],
  function (err) {
    if (err) {
      return console.error("Erro ao inserir usuário:", err.message);
    }
    console.log(`Usuário inserido com sucesso com ID ${this.lastID}`);
    db.close();
  }
);
