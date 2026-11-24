
import express from 'express';

import {
    salvarConsulta,
    listarConsultas,
    editarConsulta,
    atualizarStatusConsulta
} from '../controllers/consultaController.js';

import { autenticar } from '../middlewares/autenticar.js';

const router = express.Router();

// CADASTRAR CONSULTA
router.post('/', autenticar, salvarConsulta);

// LISTAR CONSULTAS
router.get('/', autenticar, listarConsultas);

// EDITAR CONSULTA
router.put('/:id', autenticar, editarConsulta);

// CONCLUIR OU CANCELAR CONSULTA
router.patch('/:id/status', autenticar, atualizarStatusConsulta);

export default router;
