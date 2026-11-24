import express from 'express';

import {
    cadastrarMedicamento,
    listarMedicamentos,
    editarMedicamento,
    excluirMedicamento
} from '../controllers/medicamentoController.js';

import { autenticar } from '../middlewares/autenticar.js';

const router = express.Router();

// Cadastrar medicamento
router.post('/', autenticar, cadastrarMedicamento);

// Listar medicamentos
router.get('/', autenticar, listarMedicamentos);

// Editar medicamento
router.put('/:id', autenticar, editarMedicamento);

// Excluir medicamento
router.delete('/:id', autenticar, excluirMedicamento);

export default router;