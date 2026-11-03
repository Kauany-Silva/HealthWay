
import db from '../db.js';
import bcrypt from 'bcrypt';

export const cadastrarUsuario = async (req, res) => {
    const {
        nome,
        email,
        endereco,
        senha
    } = req.body;

    // Verifica se todos os campos obrigatórios foram enviados
    if (!nome || !email || !senha) {
        return res.status(400).json({
            success: false,
            message: 'Preencha todos os campos obrigatórios.'
        });
    }

    try {
        // Verifica se o email já está cadastrado
        const sqlVerificar = `
            SELECT id_usuario
            FROM usuarios
            WHERE email = ?
        `;

        db.query(sqlVerificar, [email], async (err, resultado) => {
            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: 'Erro ao verificar usuário.'
                });
            }

            if (resultado.length > 0) {
                return res.status(409).json({
                    success: false,
                    message: 'Este email já está cadastrado.'
                });
            }

            try {
                // Protege a senha antes de salvar
                const senhaHash = await bcrypt.hash(senha, 10);

                const sqlCadastro = `
                    INSERT INTO usuarios
                    (nome_completo, email, endereco, senha_hash)
                    VALUES (?, ?, ?, ?)
                `;

                db.query(
                    sqlCadastro,
                    [nome, email, endereco || null, senhaHash],
                    (erro, resultadoCadastro) => {
                        if (erro) {
                            console.error(erro);

                            return res.status(500).json({
                                success: false,
                                message: 'Erro ao cadastrar usuário.'
                            });
                        }

                        return res.status(201).json({
                            success: true,
                            message: 'Usuário cadastrado com sucesso!'
                        });
                    }
                );
            } catch (erro) {
                console.error(erro);

                return res.status(500).json({
                    success: false,
                    message: 'Erro ao proteger a senha.'
                });
            }
        });
    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            success: false,
            message: 'Erro no servidor.'
        });
    }
};
