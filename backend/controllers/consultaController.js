
import db from '../db.js';

// SALVAR UMA CONSULTA
export const salvarConsulta = (req, res) => {

    const {
        tipo,
        data,
        hora,
        profissional,
        local,
        observacoes
    } = req.body;

    const id_usuario = req.usuario.id_usuario;

    // VALIDAR CAMPOS OBRIGATÓRIOS
    if (!tipo || !data || !hora || !profissional) {
        return res.status(400).json({
            success: false,
            message: 'Preencha todos os campos obrigatórios.'
        });
    }

    const sql = `
        INSERT INTO consultas
        (
            id_usuario,
            tipo,
            data,
            hora,
            profissional,
            local,
            observacoes
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            id_usuario,
            tipo,
            data,
            hora,
            profissional,
            local || null,
            observacoes || null
        ],
        (err, resultado) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: 'Erro ao salvar a consulta.'
                });
            }

            return res.status(201).json({
                success: true,
                message: 'Consulta cadastrada com sucesso!',
                id_consulta: resultado.insertId
            });
        }
    );
};


// LISTAR CONSULTAS DO USUÁRIO
export const listarConsultas = (req, res) => {

    const id_usuario = req.usuario.id_usuario;

    const sql = `
        SELECT
            id_consulta,
            tipo,
            data,
            hora,
            profissional,
            local,
            observacoes,
            status,
            id_consulta_original,
            criado_em
        FROM consultas
        WHERE id_usuario = ?
        ORDER BY data ASC, hora ASC
    `;

    db.query(sql, [id_usuario], (err, resultado) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: 'Erro ao buscar consultas.'
            });
        }

        return res.status(200).json({
            success: true,
            consultas: resultado
        });
    });
};
