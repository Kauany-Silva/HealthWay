
import db from '../db.js';

// Salvar uma vacinação
export const salvarVacinacao = (req, res) => {
    const {
        id_vacina,
        id_dose,
        data_aplicacao,
        idade_na_aplicacao
    } = req.body;

    // Identificação obtida pelo token
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
        INSERT INTO registros_vacinacao
        (id_usuario, id_vacina, id_dose, data_aplicacao, idade_na_aplicacao)
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
                console.error(err);

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

// Listar vacinações do usuário autenticado
export const listarVacinacoes = (req, res) => {
    const id_usuario = req.usuario.id_usuario;

    const sql = `
        SELECT
            rv.id_registro,
            rv.id_vacina,
            v.nome AS nome_vacina,
            v.descricao,
            rv.id_dose,
            d.nome AS nome_dose,
            rv.data_aplicacao,
            rv.idade_na_aplicacao
        FROM registros_vacinacao rv
        INNER JOIN vacinas v
            ON rv.id_vacina = v.id_vacina
        INNER JOIN tipos_dose d
            ON rv.id_dose = d.id_dose
        WHERE rv.id_usuario = ?
        ORDER BY rv.data_aplicacao DESC
    `;

    db.query(sql, [id_usuario], (err, resultado) => {
        if (err) {
            console.error(err);

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
