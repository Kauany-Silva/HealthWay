
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


// EDITAR CONSULTA
export const editarConsulta = (req, res) => {
    const { id } = req.params;

    const {
        tipo,
        data,
        hora,
        profissional,
        local,
        observacoes
    } = req.body;

    const id_usuario = req.usuario.id_usuario;

    if (!tipo || !data || !hora || !profissional) {
        return res.status(400).json({
            success: false,
            message: 'Preencha todos os campos obrigatórios.'
        });
    }

    const sql = `
        UPDATE consultas
        SET
            tipo = ?,
            data = ?,
            hora = ?,
            profissional = ?,
            local = ?,
            observacoes = ?
        WHERE
            id_consulta = ?
            AND id_usuario = ?
            AND status IN ('agendada', 'remarcada')
    `;

    db.query(
        sql,
        [
            tipo,
            data,
            hora,
            profissional,
            local || null,
            observacoes || null,
            id,
            id_usuario
        ],
        (err, resultado) => {
            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: 'Erro ao editar a consulta.'
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Consulta não encontrada ou não pode mais ser editada.'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Consulta atualizada com sucesso!'
            });
        }
    );
};


// CONCLUIR OU CANCELAR CONSULTA
export const atualizarStatusConsulta = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const id_usuario = req.usuario.id_usuario;

    const statusPermitidos = ['realizada', 'cancelada'];

    if (!statusPermitidos.includes(status)) {
        return res.status(400).json({
            success: false,
            message: 'Status inválido.'
        });
    }

    const sql = `
        UPDATE consultas
        SET status = ?
        WHERE
            id_consulta = ?
            AND id_usuario = ?
            AND status IN ('agendada', 'remarcada')
    `;

    db.query(
        sql,
        [status, id, id_usuario],
        (err, resultado) => {
            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: 'Erro ao atualizar o status da consulta.'
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Consulta não encontrada ou já finalizada.'
                });
            }

            return res.status(200).json({
                success: true,
                message: status === 'realizada'
                    ? 'Consulta marcada como concluída!'
                    : 'Consulta cancelada com sucesso!'
            });
        }
    );
};
