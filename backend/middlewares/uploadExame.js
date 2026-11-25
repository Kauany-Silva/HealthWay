
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pastaUploads = path.resolve(__dirname, '../uploads/exames');

const armazenamento = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, pastaUploads);
    },

    filename: (req, file, callback) => {
        const extensao = path.extname(file.originalname).toLowerCase();
        const nomeArquivo = `${randomUUID()}${extensao}`;

        callback(null, nomeArquivo);
    }
});

const verificarArquivo = (req, file, callback) => {
    const tiposPermitidos = [
        'image/jpeg',
        'image/png'
    ];

    if (tiposPermitidos.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error('Formato inválido. Envie uma imagem JPG ou PNG.'));
    }
};

const uploadExame = multer({
    storage: armazenamento,
    fileFilter: verificarArquivo,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

export default uploadExame;
