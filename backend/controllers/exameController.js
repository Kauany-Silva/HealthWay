
import db from '../db.js';
import { createWorker } from 'tesseract.js';
import fs from 'fs';

export const cadastrarExame = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: 'Selecione um arquivo para enviar.'
        });
    }

    const idUsuario = req.usuario.id_usuario;
    const { nome_exame, data_exame } = req.body;

    let worker;

    try {
        // Iniciar OCR em português
        worker = await createWorker('por');

        const resultadoOCR = await worker.recognize(req.file.path);
        const textoExtraido = resultadoOCR.data.text;

        await worker.terminate();
        worker = null;

        // Salvar informações no banco
        const sql = `
            INSERT INTO exames (
                id_usuario,
                nome_exame,
                data_exame,
                arquivo_nome,
                arquivo_caminho,
                tipo_arquivo,
                texto_extraido,
                status_processamento
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [
            idUsuario,
            nome_exame || 'Exame laboratorial',
            data_exame || null,
            req.file.originalname,
            req.file.path,
            req.file.mimetype,
            textoExtraido,
            'revisao'
        ], (erro, resultado) => {
            if (erro) {
                console.error('Erro ao salvar exame:', erro);

                fs.unlink(req.file.path, () => {});

                return res.status(500).json({
                    success: false,
                    message: 'Erro ao salvar o exame.'
                });
            }

            return res.status(201).json({
                success: true,
                message: 'Exame enviado e texto reconhecido com sucesso!',
                id_exame: resultado.insertId,
                texto_extraido: textoExtraido
            });
        });

    } catch (erro) {
        console.error('Erro no OCR:', erro);

        if (worker) {
            await worker.terminate();
        }

        fs.unlink(req.file.path, () => {});

        return res.status(500).json({
            success: false,
            message: 'Não foi possível processar o exame.'
        });
    }
};
