
import db from '../db.js';

// SALVAR UMA VACINAÇÃO
export const salvarVacinacao = (req, res) => {
    const {
        id_vacina,
        id_dose,
        data_aplicacao,
        idade_na_aplicacao
    } = req.body;

    const id_usuario = req.usuario.id_usuario;

    if (
        !id_vacina ||
        !id_dose ||
        !data_aplicacao ||
        !idade_na_aplicacao
    ) {
        return res.status(400).json({
            success: false,
            message: 'Preencha todos os campos.'
        });
    }

    const sql = `
        INSERT INTO vacinacoes
        (id_usuario, id_vacina, id_dose, data_vacinacao, idade)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            id_usuario,
            id_vacina,
            id_dose,
            data_aplicacao,
            idade_na_aplicacao
        ],
        (err, resultado) => {
            if (err) {
                console.error('Erro ao salvar vacinação:', err);

                return res.status(500).json({
                    success: false,
                    message: 'Erro ao salvar a vacinação.'
                });
            }

            return res.status(201).json({
                success: true,
                message: 'Vacinação salva com sucesso!',
                id_registro: resultado.insertId
            });
        }
    );
};


// LISTAR VACINAÇÕES DO USUÁRIO
export const listarVacinacoes = (req, res) => {
    const id_usuario = req.usuario.id_usuario;

    const sql = `
        SELECT
            v.id_vacinacao AS id_registro,
            v.id_vacina,
            va.nome AS nome_vacina,
            va.descricao,
            v.id_dose,
            d.nome AS nome_dose,
            v.data_vacinacao AS data_aplicacao,
            v.idade AS idade_na_aplicacao
        FROM vacinacoes v
        INNER JOIN vacinas va
            ON v.id_vacina = va.id_vacina
        INNER JOIN doses d
            ON v.id_dose = d.id_dose
        WHERE v.id_usuario = ?
        ORDER BY v.data_vacinacao DESC
    `;

    db.query(sql, [id_usuario], (err, resultado) => {
        if (err) {
            console.error('Erro ao buscar vacinações:', err);

            return res.status(500).json({
                success: false,
                message: 'Erro ao buscar vacinações.'
            });
        }

        return res.status(200).json({
            success: true,
            vacinas: resultado
        });
    });
};


// EDITAR UMA VACINAÇÃO
export const editarVacinacao = (req, res) => {
    const { id } = req.params;

    const {
        id_vacina,
        id_dose,
        data_aplicacao,
        idade_na_aplicacao
    } = req.body;

    const id_usuario = req.usuario.id_usuario;

    if (
        !id_vacina ||
        !id_dose ||
        !data_aplicacao ||
        !idade_na_aplicacao
    ) {
        return res.status(400).json({
            success: false,
            message: 'Preencha todos os campos.'
        });
    }

    const sql = `
        UPDATE vacinacoes
        SET
            id_vacina = ?,
            id_dose = ?,
            data_vacinacao = ?,
            idade = ?
        WHERE id_vacinacao = ? AND id_usuario = ?
    `;

    db.query(
        sql,
        [
            id_vacina,
            id_dose,
            data_aplicacao,
            idade_na_aplicacao,
            id,
            id_usuario
        ],
        (err, resultado) => {
            if (err) {
                console.error('Erro ao editar vacinação:', err);

                return res.status(500).json({
                    success: false,
                    message: 'Erro ao editar vacinação.'
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Vacinação não encontrada.'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Vacinação atualizada com sucesso!'
            });
        }
    );
};


// EXCLUIR UMA VACINAÇÃO
export const excluirVacinacao = (req, res) => {
    const { id } = req.params;

    const id_usuario = req.usuario.id_usuario;

    const sql = `
        DELETE FROM vacinacoes
        WHERE id_vacinacao = ? AND id_usuario = ?
    `;

    db.query(sql, [id, id_usuario], (err, resultado) => {
        if (err) {
            console.error('Erro ao excluir vacinação:', err);

            return res.status(500).json({
                success: false,
                message: 'Erro ao excluir vacinação.'
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Vacinação não encontrada.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Vacinação excluída com sucesso!'
        });
    });
};
