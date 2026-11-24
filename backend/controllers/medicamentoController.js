import db from '../db.js';


// Executar consultas sql com promise
const executar = (sql, parametros = []) => {
    return new Promise((resolve, reject) => {
        db.query(sql, parametros, (erro, resultado) => {
            if (erro) reject(erro);
            else resolve(resultado);
        });
    });
};


// Iniciar transação
const iniciarTransacao = () => {
    return new Promise((resolve, reject) => {
        db.beginTransaction((erro) => {
            if (erro) reject(erro);
            else resolve();
        });
    });
};


// Confirmar transação
const confirmarTransacao = () => {
    return new Promise((resolve, reject) => {
        db.commit((erro) => {
            if (erro) reject(erro);
            else resolve();
        });
    });
};


// Desfazer transação
const desfazerTransacao = () => {
    return new Promise((resolve) => {
        db.rollback(() => resolve());
    });
};


// Inserir dias e horários do medicamento
const inserirDiasEHorarios = async (idMedicamento, dias, horarios) => {

    if (dias.length > 0) {
        const valoresDias = dias.map(dia => [idMedicamento, dia]);

        await executar(
            `INSERT INTO dias_medicamento
            (id_medicamento, dia_semana)
            VALUES ?`,
            [valoresDias]
        );
    }

    if (horarios.length > 0) {
        const valoresHorarios = horarios.map(horario => [
            idMedicamento,
            horario
        ]);

        await executar(
            `INSERT INTO horarios_medicamento
            (id_medicamento, horario)
            VALUES ?`,
            [valoresHorarios]
        );
    }
};


// Validar dados do medicamento
const validarMedicamento = (nome, dias, horarios) => {

    if (!nome || !nome.trim()) {
        return 'Informe o nome do medicamento.';
    }

    if (!Array.isArray(dias) || dias.length === 0) {
        return 'Selecione pelo menos um dia da semana.';
    }

    if (!Array.isArray(horarios) || horarios.length === 0) {
        return 'Informe pelo menos um horário.';
    }

    const diasPermitidos = [
        'domingo',
        'segunda',
        'terca',
        'quarta',
        'quinta',
        'sexta',
        'sabado'
    ];

    if (!dias.every(dia => diasPermitidos.includes(dia))) {
        return 'Um ou mais dias informados são inválidos.';
    }

    const horarioValido = /^([01]\d|2[0-3]):[0-5]\d$/;

    if (!horarios.every(horario => horarioValido.test(horario))) {
        return 'Um ou mais horários são inválidos.';
    }

    return null;
};


// Cadastrar medicamento
export const cadastrarMedicamento = async (req, res) => {

    const idUsuario = req.usuario.id_usuario;

    const { nome, finalidade, dias, horarios } = req.body;

    const erroValidacao = validarMedicamento(nome, dias, horarios);

    if (erroValidacao) {
        return res.status(400).json({
            success: false,
            message: erroValidacao
        });
    }

    try {
        await iniciarTransacao();

        const resultado = await executar(
            `INSERT INTO medicamentos
            (id_usuario, nome, finalidade)
            VALUES (?, ?, ?)`,
            [
                idUsuario,
                nome.trim(),
                finalidade?.trim() || null
            ]
        );

        const idMedicamento = resultado.insertId;

        await inserirDiasEHorarios(
            idMedicamento,
            [...new Set(dias)],
            [...new Set(horarios)]
        );

        await confirmarTransacao();

        return res.status(201).json({
            success: true,
            message: 'Medicamento cadastrado com sucesso!',
            id_medicamento: idMedicamento
        });

    } catch (erro) {
        await desfazerTransacao();

        console.error('Erro ao cadastrar medicamento:', erro);

        return res.status(500).json({
            success: false,
            message: 'Erro ao cadastrar medicamento.'
        });
    }
};


// Listar medicamentos
export const listarMedicamentos = async (req, res) => {

    const idUsuario = req.usuario.id_usuario;

    const sql = `
        SELECT
            m.id_medicamento,
            m.nome,
            m.finalidade,
            m.status,

            GROUP_CONCAT(
                DISTINCT d.dia_semana
                ORDER BY FIELD(
                    d.dia_semana,
                    'domingo',
                    'segunda',
                    'terca',
                    'quarta',
                    'quinta',
                    'sexta',
                    'sabado'
                )
                SEPARATOR ','
            ) AS dias,

            GROUP_CONCAT(
                DISTINCT TIME_FORMAT(h.horario, '%H:%i')
                ORDER BY h.horario
                SEPARATOR ','
            ) AS horarios

        FROM medicamentos m

        LEFT JOIN dias_medicamento d
            ON m.id_medicamento = d.id_medicamento

        LEFT JOIN horarios_medicamento h
            ON m.id_medicamento = h.id_medicamento

        WHERE m.id_usuario = ?

        GROUP BY m.id_medicamento

        ORDER BY m.data_cadastro DESC
    `;

    try {
        const resultado = await executar(sql, [idUsuario]);

        const medicamentos = resultado.map(medicamento => ({
            ...medicamento,
            dias: medicamento.dias
                ? medicamento.dias.split(',')
                : [],
            horarios: medicamento.horarios
                ? medicamento.horarios.split(',')
                : []
        }));

        return res.status(200).json({
            success: true,
            medicamentos
        });

    } catch (erro) {
        console.error('Erro ao listar medicamentos:', erro);

        return res.status(500).json({
            success: false,
            message: 'Erro ao buscar medicamentos.'
        });
    }
};


// Editar medicamento
export const editarMedicamento = async (req, res) => {

    const idUsuario = req.usuario.id_usuario;
    const { id } = req.params;

    const { nome, finalidade, dias, horarios } = req.body;

    const erroValidacao = validarMedicamento(nome, dias, horarios);

    if (erroValidacao) {
        return res.status(400).json({
            success: false,
            message: erroValidacao
        });
    }

    try {
        await iniciarTransacao();

        const medicamento = await executar(
            `SELECT id_medicamento
             FROM medicamentos
             WHERE id_medicamento = ?
             AND id_usuario = ?`,
            [id, idUsuario]
        );

        if (medicamento.length === 0) {
            await desfazerTransacao();

            return res.status(404).json({
                success: false,
                message: 'Medicamento não encontrado.'
            });
        }

        await executar(
            `UPDATE medicamentos
             SET nome = ?, finalidade = ?
             WHERE id_medicamento = ?
             AND id_usuario = ?`,
            [
                nome.trim(),
                finalidade?.trim() || null,
                id,
                idUsuario
            ]
        );

        await executar(
            `DELETE FROM dias_medicamento
             WHERE id_medicamento = ?`,
            [id]
        );

        await executar(
            `DELETE FROM horarios_medicamento
             WHERE id_medicamento = ?`,
            [id]
        );

        await inserirDiasEHorarios(
            id,
            [...new Set(dias)],
            [...new Set(horarios)]
        );

        await confirmarTransacao();

        return res.status(200).json({
            success: true,
            message: 'Medicamento atualizado com sucesso!'
        });

    } catch (erro) {
        await desfazerTransacao();

        console.error('Erro ao editar medicamento:', erro);

        return res.status(500).json({
            success: false,
            message: 'Erro ao atualizar medicamento.'
        });
    }
};


// Excluir medicamento
export const excluirMedicamento = (req, res) => {

    const idUsuario = req.usuario.id_usuario;
    const { id } = req.params;

    const sql = `
        DELETE FROM medicamentos
        WHERE id_medicamento = ?
        AND id_usuario = ?
    `;

    db.query(sql, [id, idUsuario], (erro, resultado) => {

        if (erro) {
            console.error('Erro ao excluir medicamento:', erro);

            return res.status(500).json({
                success: false,
                message: 'Erro ao excluir medicamento.'
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Medicamento não encontrado.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Medicamento excluído com sucesso!'
        });
    });
};