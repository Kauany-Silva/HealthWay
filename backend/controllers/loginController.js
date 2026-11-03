
import db from '../db.js';
import bcrypt from 'bcrypt';

export const realizarLogin = (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            success: false,
            message: 'Informe o email e a senha.'
        });
    }

    const sql = `
        SELECT
            id_usuario,
            nome_completo,
            email,
            endereco,
            senha_hash,
            tipo_usuario
        FROM usuarios
        WHERE email = ?
    `;

    db.query(sql, [email], async (err, resultado) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: 'Erro no servidor.'
            });
        }

        if (resultado.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Email ou senha inválidos.'
            });
        }

        const usuario = resultado[0];

        try {
            const senhaCorreta = await bcrypt.compare(
                senha,
                usuario.senha_hash
            );
            
            if (!senhaCorreta) {
                return res.status(401).json({
                    success: false,
                    message: 'Email ou senha inválidos.'
                });
            }

            // Não enviar o hash da senha para o frontend
            delete usuario.senha_hash;

            return res.status(200).json({
                success: true,
                message: 'Login realizado com sucesso!',
                usuario
            });

        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                success: false,
                message: 'Erro ao realizar login.'
            });
        }
    });
};
