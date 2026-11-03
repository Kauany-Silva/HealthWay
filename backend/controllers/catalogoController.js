import db from '../db.js';

// Buscar vacinas disponíveis
export const listarVacinas = (req, res) => {
    const sql = `
        SELECT id_vacina, nome, descricao
        FROM vacinas
        ORDER BY nome
    `;

    db.query(sql, (err, resultado) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: 'Erro ao buscar vacinas.'
            });
        }

        return res.status(200).json({
            success: true,
            vacinas: resultado
        });
    });
};

// Buscar tipos de dose disponíveis
export const listarDoses = (req, res) => {
    const sql = `
        SELECT id_dose, nome
        FROM tipos_dose
        ORDER BY id_dose
    `;

    db.query(sql, (err, resultado) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: 'Erro ao buscar tipos de dose.'
            });
        }

        return res.status(200).json({
            success: true,
            doses: resultado
        });
    });
};