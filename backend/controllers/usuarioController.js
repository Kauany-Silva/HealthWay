import db from '../db.js';

export const cadastrarUsuario = (req, res) => {

  const {
    nome,
    email,
    cpf,
    idade,
    endereco,
    senha
  } = req.body;

  const sql = `
    INSERT INTO usuario
    (
      usu_nome,
      usu_email,
      usu_cpf,
      usu_idade,
      usu_endereco,
      usu_senha
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nome, email, cpf, idade, endereco, senha],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: 'Usuário cadastrado'
      });
    }
  );
};