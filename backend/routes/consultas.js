
import express from 'express';

import {
    salvarConsulta,
    listarConsultas,
    editarConsulta,
    atualizarStatusConsulta
} from '../controllers/consultaController.js';

import { autenticar } from '../middlewares/autenticar.js';

const router = express.Router();

// Cadastrar consulta
router.post('/', autenticar, salvarConsulta);

// Listar consultas
router.get('/', autenticar, listarConsultas);

// Editar consulta
router.put('/:id', autenticar, editarConsulta);

// Concluir ou cancelar consulta
router.patch('/:id/status', autenticar, atualizarStatusConsulta);

export default router;
