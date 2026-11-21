
import express from 'express';

import {
    salvarConsulta,
    listarConsultas
} from '../controllers/consultaController.js';

import { autenticar } from '../middlewares/autenticar.js';

const router = express.Router();

// CADASTRAR CONSULTA
router.post('/', autenticar, salvarConsulta);

// LISTAR CONSULTAS
router.get('/', autenticar, listarConsultas);

export default router;
