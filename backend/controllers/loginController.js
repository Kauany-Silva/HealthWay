import db from '../db.js';

export const realizarLogin = (req, res) => {

  const { email, senha } = req.body;

  const sql = `
    SELECT *
    FROM usuario
    WHERE usu_email = ?
    AND usu_senha = ?
  `;

  db.query(
    sql,
    [email, senha],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Erro no servidor'
        });
      }

      if (result.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Email ou senha inválidos'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Login realizado',
        usuario: result[0]
      });

    }
  );
};